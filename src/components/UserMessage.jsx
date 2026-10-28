import React from 'react';
import { Copy, Share2, Pencil } from 'lucide-react';

export const UserMessage = ({ content }) => (
  <div style={{padding:12,background:'var(--user-bubble)',borderRadius:8,margin:'8px 0',textAlign:'right',color:'var(--text-primary)'}}>
    <div>{content}</div>
    <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:6}}>
      <button onClick={() => navigator.clipboard.writeText(content)} title="Copy" style={{color:'var(--text-primary)',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><Copy size={16}/></button>
      <button onClick={async () => { if(navigator.share) await navigator.share({text:content}); else {navigator.clipboard.writeText(content); alert('Copied');} }} title="Share" style={{color:'var(--text-primary)',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><Share2 size={16}/></button>
      <button title="Edit" style={{color:'var(--text-primary)',background:'var(--bg-tertiary)',borderRadius:4,padding:4}}><Pencil size={16}/></button>
    </div>
  </div>
);

export default UserMessage;