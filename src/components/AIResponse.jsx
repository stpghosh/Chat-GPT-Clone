import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import MessageActions from './MessageActions';

export const AIResponse = ({ content }) => (
  <div style={{padding:12,background:'var(--ai-bubble)',borderRadius:8,margin:'8px 0',color:'var(--text-primary)'}}>
    <MarkdownRenderer content={content} />
    <MessageActions content={content} />
  </div>
);

export default AIResponse;