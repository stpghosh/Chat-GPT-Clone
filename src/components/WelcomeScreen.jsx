import React from 'react';
import { Lightbulb, FileText, Sparkles, Code } from 'lucide-react';
import PromptCard from './PromptCard';

const WelcomeScreen = ({ onPromptClick }) => {
  const prompts = [
    {
      title: "Explain a complex topic",
      description: "Get clear explanations of difficult concepts",
      icon: Lightbulb,
      color: "#f59e0b",
      prompt: "Explain quantum computing in simple terms"
    },
    {
      title: "Write or improve content",
      description: "Help with writing, editing, and refining text",
      icon: FileText,
      color: "#3b82f6",
      prompt: "Help me write a professional email"
    },
    {
      title: "Generate creative ideas",
      description: "Brainstorm ideas for projects and content",
      icon: Sparkles,
      color: "#8b5cf6",
      prompt: "Give me creative ideas for a blog post"
    },
    {
      title: "Help with coding",
      description: "Write, debug, and explain code",
      icon: Code,
      color: "#10b981",
      prompt: "Write a React component for a todo list"
    }
  ];

  return (
    <div className="welcome-screen">
      <h1 className="welcome-heading">What can I help with?</h1>
      <p className="welcome-subheading">
        I'm here to assist you with questions, writing, coding, and more
      </p>
      <div className="prompt-cards-grid">
        {prompts.map((prompt, index) => (
          <PromptCard
            key={index}
            title={prompt.title}
            description={prompt.description}
            icon={prompt.icon}
            color={prompt.color}
            onClick={() => onPromptClick(prompt.prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
