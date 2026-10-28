import React from 'react';
import { Lightbulb, FileText, Sparkles, Code } from 'lucide-react';

const PromptCard = ({ title, description, onClick, icon: Icon, color }) => {
  return (
    <button className="prompt-card" onClick={onClick}>
      <Icon size={20} color={color} />
      <div>
        <div className="prompt-card-title">{title}</div>
        <div className="prompt-card-description">{description}</div>
      </div>
    </button>
  );
};

export default PromptCard;
