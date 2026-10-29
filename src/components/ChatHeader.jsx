import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const ChatHeader = ({ onToggleSidebar, title }) => {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <div className="chat-title">{title || 'New Chat'}</div>
      </div>
      <div style={{marginLeft:'auto'}}>
        <button className="header-btn" onClick={onToggleSidebar} title="Toggle sidebar">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
