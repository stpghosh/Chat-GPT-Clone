import { useState, useCallback } from 'react';
import { generateId } from '../utils/generateId';
import { sendMessage as sendMessageService } from '../services/chatService';
import { saveConversations, loadConversations } from '../services/storageService';

export const useChat = () => {
  const [conversations, setConversations] = useState(() => loadConversations());
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId) || null;

  const createNewConversation = useCallback(() => {
    const newConversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations(prev => {
      const updated = [newConversation, ...prev];
      saveConversations(updated);
      return updated;
    });
    setCurrentConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;
    
    let conversationId = currentConversationId;
    let conversationsToUpdate = conversations;
    
    if (!conversationId) {
      const newConv = {
        id: generateId(),
        title: content.trim().substring(0, 40) + (content.trim().length > 40 ? '...' : ''),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      conversationId = newConv.id;
      conversationsToUpdate = [newConv, ...conversations];
      setConversations(conversationsToUpdate);
      setCurrentConversationId(conversationId);
    }
    
    const userMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };
    
    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === conversationId) {
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, userMessage],
            updatedAt: Date.now(),
            title: conv.messages.length === 0 ? content.trim().substring(0, 40) + (content.trim().length > 40 ? '...' : '') : conv.title,
          };
          return updatedConv;
        }
        return conv;
      });
      saveConversations(updated);
      return updated;
    });
    
    setIsLoading(true);
    
    try {
      const response = await sendMessageService(content);
      const assistantMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, assistantMessage],
              updatedAt: Date.now(),
            };
          }
          return conv;
        });
        saveConversations(updated);
        return updated;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, errorMessage],
              updatedAt: Date.now(),
            };
          }
          return conv;
        });
        saveConversations(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, [conversations, currentConversationId]);

  const selectConversation = useCallback((conversationId) => {
    setCurrentConversationId(conversationId);
  }, []);

  const deleteConversation = useCallback((conversationId) => {
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== conversationId);
      saveConversations(updated);
      return updated;
    });
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
    }
  }, [currentConversationId]);

  const renameConversation = useCallback((conversationId, newTitle) => {
    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === conversationId) {
          return { ...conv, title: newTitle.trim() || 'New Chat' };
        }
        return conv;
      });
      saveConversations(updated);
      return updated;
    });
  }, []);

  return {
    conversations,
    currentConversation,
    currentConversationId,
    isLoading,
    createNewConversation,
    sendMessage,
    selectConversation,
    deleteConversation,
    renameConversation,
  };
};
