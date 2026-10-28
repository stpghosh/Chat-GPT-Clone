import React, { useState } from 'react';
import { Menu, Plus, Search, MessageSquare, Edit3, Trash2, Settings, Moon, Sun, User } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { truncateText } from '../utils/chatHelpers';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { 
    conversations, 
    currentConversationId, 
    createNewConversation, 
    selectConversation, 
    deleteConversation,
    renameConversation,
    theme,
    toggleTheme
  } = useChatContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    createNewConversation();
  };

  const handleRename = (conv) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleRenameSubmit = (e, convId) => {
    e.preventDefault();
    renameConversation(convId, editTitle);
    setEditingId(null);
    setEditTitle('');
  };

  const handleDelete = (convId) => {
    if (window.confirm('Delete this conversation?')) {
      deleteConversation(convId);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">CG</div>
          {!isCollapsed && <span>Chat GPT</span>}
        </div>
      </div>

      <button className="new-chat-btn" onClick={handleNewChat}>
        <Plus size={18} />
        {!isCollapsed && <span>New chat</span>}
      </button>

      {!isCollapsed && (
        <>
          <div className="sidebar-search">
            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-content">
            <div className="chat-history-section">
              <div className="chat-history-title">Recent</div>
              <div className="chat-history-list">
                {filteredConversations.map((conv) => (
                  <div key={conv.id} style={{ position: 'relative' }}>
                    {editingId === conv.id ? (
                      <form onSubmit={(e) => handleRenameSubmit(e, conv.id)} style={{ padding: '0.5rem' }}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '0.375rem 0.5rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.875rem'
                          }}
                        />
                      </form>
                    ) : (
                      <button
                        className={`chat-history-item ${currentConversationId === conv.id ? 'active' : ''}`}
                        onClick={() => selectConversation(conv.id)}
                      >
                        <MessageSquare size={16} />
                        <span className="chat-history-item-text">
                          {truncateText(conv.title)}
                        </span>
                        <div className="chat-history-item-actions">
                          <button
                            className="chat-history-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRename(conv);
                            }}
                            title="Rename"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            className="chat-history-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(conv.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-footer">
            <button className="sidebar-footer-btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
            </button>
            <button className="sidebar-footer-btn">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="sidebar-footer-btn">
              <User size={18} />
              <span>User</span>
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
