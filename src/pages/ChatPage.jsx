import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="app-layout">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      <main className="main-content">
        <ChatWindow onToggleSidebar={toggleSidebar} />
      </main>
      {mobileSidebarOpen && (
        <div 
          className="mobile-overlay" 
          onClick={toggleMobileSidebar}
        />
      )}
    </div>
  );
};

export default ChatPage;
