import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="message-bubble-container assistant">
      <div className="message-avatar">CG</div>
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
