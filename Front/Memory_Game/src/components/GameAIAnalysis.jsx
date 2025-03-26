import React from 'react';
import { X } from 'lucide-react';

const GameAIAnalysis = ({ analysis, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-800/90 rounded-xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          AI Game Analysis 🧠
        </h2>
        <div className="text-white/80 text-base leading-relaxed">
          {analysis}
        </div>
      </div>
    </div>
  );
};

export default GameAIAnalysis;