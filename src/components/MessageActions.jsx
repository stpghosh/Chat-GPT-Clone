import React, { useState } from 'react';
import { Copy, Volume2, Share2, MoreVertical } from 'lucide-react';

export const MessageActions = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const speak = () => {
    const u = new SpeechSynthesisUtterance(content);
    window.speechSynthesis.speak(u);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ text: content });
    } else {
      navigator.clipboard.writeText(content);
      alert('Copied for sharing');
    }
  };

  return (
    <div style={{display:'flex',gap:8,marginTop:8,position:'relative',color:'var(--text-primary)'}}>
      <button onClick={copy} title="Copy" style={{color:'#3b82f6',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}>{copied ? 'Copied!' : <Copy size={16} color="#3b82f6"/>}</button>
      <button onClick={speak} title="Read aloud" style={{color:'#10b981',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><Volume2 size={16} color="#10b981"/></button>
      <button onClick={share} title="Share" style={{color:'#f59e0b',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><Share2 size={16} color="#f59e0b"/></button>
      <button onClick={() => setMenuOpen(!menuOpen)} title="More" style={{color:'#8b5cf6',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><MoreVertical size={16} color="#8b5cf6"/></button>
      {menuOpen && (
        <div style={{position:'absolute',top:24,right:0,background:'var(--bg-secondary)',color:'var(--text-primary)',border:'1px solid var(--border-color)',borderRadius:8,padding:8,zIndex:10}}>
          <div onClick={copy} style={{cursor:'pointer',padding:4}}>Copy response</div>
          <div onClick={speak} style={{cursor:'pointer',padding:4}}>Read aloud</div>
          <div onClick={share} style={{cursor:'pointer',padding:4}}>Share response</div>
          <div onClick={() => setMenuOpen(false)} style={{cursor:'pointer',padding:4}}>Close</div>
        </div>
      )}
    </div>
  );
};

export default MessageActions;