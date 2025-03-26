import React from 'react';
import { X } from 'lucide-react';

const GameAIAnalysis = ({ analysis, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 
                 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-title"
    >
      <div 
        className="bg-gray-800/90 rounded-xl p-6 max-w-md w-full relative 
                   transform transition-all duration-300 scale-100 
                   hover:scale-[1.02] hover:shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white 
                     transition-colors group"
          aria-label="Close AI Analysis"
        >
          <X 
            className="w-6 h-6 group-hover:rotate-90 transition-transform" 
          />
        </button>
        <h2 
          id="ai-analysis-title" 
          className="text-2xl font-bold text-purple-300 mb-4"
        >
          AI Game Analysis 🧠
        </h2>
        <div 
          className="text-white/80 text-base leading-relaxed tracking-wide"
        >
          {analysis}
        </div>
      </div>
    </div>
  );
};

export default GameAIAnalysis;