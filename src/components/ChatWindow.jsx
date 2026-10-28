import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import WelcomeScreen from './WelcomeScreen';
import { useChatContext } from '../context/ChatContext';

const ChatWindow = ({ onToggleSidebar }) => {
  const { currentConversation, sendMessage, isLoading } = useChatContext();
  
  const messages = currentConversation?.messages || [];
  const title = currentConversation?.title || 'New Chat';

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="chat-window">
      <ChatHeader onToggleSidebar={onToggleSidebar} title={title} />
      <div className="chat-content">
        {messages.length === 0 && !isLoading ? (
          <WelcomeScreen onPromptClick={handlePromptClick} />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}
      </div>
      <MessageComposer onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
