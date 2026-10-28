import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{margin:'8px 0',borderRadius:8,overflow:'hidden',background:'#1e1e1e'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'6px 12px',background:'#2d2d2d',color:'#ccc',fontSize:12}}>
        <span>{language || 'text'}</span>
        <button onClick={copy} style={{background:'none',border:'none',color:'#ccc',cursor:'pointer'}}>{copied?'Copied!':'Copy code'}</button>
      </div>
      <SyntaxHighlighter language={language || 'text'} style={vscDarkPlus} customStyle={{margin:0,padding:12}}>{value}</SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;