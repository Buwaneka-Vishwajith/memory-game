import React, { useEffect, useState } from 'react';

const MemoryGame = () => {
  const [active, setActive] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);

  const getRandom = () => {
    const random = [];
    while (random.length < 3) {
      const randomIndex = Math.floor(Math.random() * 9);
      if (!random.includes(randomIndex)) {
        random.push(randomIndex);
      }
    }
    return random;
  };

  useEffect(() => {
    if (gameState === 'start') {
      const startTimer = setTimeout(() => {
        const newPattern = getRandom();
        setPattern(newPattern);
        setActive(newPattern);
        setGameState('ongoing');
      }, 1000);
      return () => clearTimeout(startTimer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'ongoing' && active.length > 0) {
      const hideTimer = setTimeout(() => {
        setActive([]);
      }, 2000);
      return () => clearTimeout(hideTimer);
    }
  }, [gameState, active]);

  useEffect(() => {
    if (gameState === 'gameOver') {
      const resetTimer = setTimeout(() => {
        setClicked([]);
        setScore(0);
        setPattern([]);
        setGameState('start');
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [gameState]);

  const handleClick = (index) => {
    if (gameState !== 'ongoing' || clicked.includes(index) || clicked.length >= 3) return;
    
    const newClicked = [...clicked, index];
    setClicked(newClicked);

    if (newClicked.length === 3) {
      if (newClicked.sort().join('') === pattern.sort().join('')) {
        setScore(score + 1);
        setClicked([]);
        const newPattern = getRandom();
        setPattern(newPattern);
        setActive(newPattern);
      } else {
        setGameState('gameOver');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white opacity-60 mb-6">Memory Game</h1>
      <div className="text-xl text-white mb-4">Score: {score}</div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 rounded-md p-4">
        {Array(9).fill(null).map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={gameState !== 'ongoing' || clicked.length >= 3}
            className={`
              h-20 w-20 rounded-md transition-all duration-300
              ${active.includes(index) ? 'bg-green-100' : 'bg-green-400'}
              ${clicked.includes(index) ? 'bg-blue-500' : ''}
              hover:opacity-90 disabled:cursor-not-allowed
            `}
          />
        ))}
      </div>
      {gameState === 'gameOver' && (
        <div className="text-red-500 text-2xl mt-4">Game Over! Score: {score}</div>
      )}
      {gameState === 'start' && (
        <div className="text-white text-2xl mt-4">Get Ready!</div>
      )}
    </div>
  );
};

export default MemoryGame;
