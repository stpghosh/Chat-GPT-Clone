import React, { createContext, useContext } from 'react';
import { useChat } from '../hooks/useChat';
import { useTheme } from '../hooks/useTheme';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const chatData = useChat();
  const themeData = useTheme();

  return (
    <ChatContext.Provider value={{ ...chatData, ...themeData }}>
      {children}
    </ChatContext.Provider>
  );
};
