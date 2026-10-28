import React from 'react';
import { Menu } from 'lucide-react';

const ChatHeader = ({ onToggleSidebar, title }) => {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button className="header-btn" onClick={onToggleSidebar} title="Toggle sidebar">
          <Menu size={18} />
        </button>
        <div className="chat-title">{title || 'New Chat'}</div>
      </div>
    </header>
  );
};

export default ChatHeader;
