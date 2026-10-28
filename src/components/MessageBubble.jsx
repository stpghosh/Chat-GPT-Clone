import React from 'react';
import AIResponse from './AIResponse';
import UserMessage from './UserMessage';

const MessageBubble = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';
  return isUser ? <UserMessage content={content} /> : <AIResponse content={content} />;
};

export default MessageBubble;