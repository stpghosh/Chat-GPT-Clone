import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

const MessageComposer = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="composer-container">
      <div className="composer-wrapper">
        <form className="composer-form" onSubmit={handleSubmit}>
          <button
            type="button"
            className="composer-btn"
            title="Attach file"
            disabled={disabled}
          >
            <Paperclip size={18} />
          </button>
          <textarea
            ref={textareaRef}
            className="composer-textarea"
            placeholder="Message Chat GPT..."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={disabled}
          />
          <div className="composer-actions">
            <button
              type="button"
              className="composer-btn"
              title="Voice input"
              disabled={disabled}
            >
              <Mic size={18} />
            </button>
            <button
              type="submit"
              className="composer-btn send"
              disabled={!message.trim() || disabled}
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <div className="composer-hint">
          Chat GPT can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
