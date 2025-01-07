import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Background from "./Background"; //removed
import { ChevronDown } from 'lucide-react';


import { saveScore } from '../services/scoreService';

const MemoryGame = () => {
  const location = useLocation();
  const playerName = location.state?.playerName || "Player";

  const [active, setActive] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gameState, setGameState] = useState("waiting"); // Changed initial state to "waiting"
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);

  // const getGridSize = (score) => (score >= 5 ? 16 : 9);

  const getGridSize = (score) => {
    if(score >= 10){
      return 25;
    }else if (score >= 5){
      return 16;
    }else{
      return 9;
    }
  };

  const getPatternLength = (score) => {
    if(score >= 10){
      return 5;
    }else if(score >= 5){
      return 4;
    }else{
      return 3; 
    }
  };

  // const getPatternLength = (score) => (score >= 5 ? 4 : 3);

  const getRandom = () => {
    const random = new Set();
    const gridSize = getGridSize(score);
    const patternLength = getPatternLength(score); 

    console.log("Grid size:", gridSize);
    console.log("Pattern length:", patternLength);
    
    while (random.size < patternLength) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      random.add(randomIndex);
    }
    
    console.log("Generated random indices:", Array.from(random));
    return Array.from(random);
  };

  const startGame = () => {
    setGameState("initial");
  };

   
  useEffect(() => {
    if (gameState === "initial" || gameState === "nextLevel") {
      const startTimer = setTimeout(() => {
        const newPattern = getRandom();
        setPattern(newPattern);
        setActive(newPattern);
        console.log("New active indices:", newPattern);
        setGameState("ongoing");
      }, 300);
      return () => clearTimeout(startTimer);
    }
  }, [gameState, score]);

  useEffect(() => {
    if (gameState === "ongoing" && active.length > 0) {
      console.log("Active boxes:", active);
      const hideTimer = setTimeout(() => {
        setActive([]);
      }, score >= 5 ? 400 : 300);
      return () => clearTimeout(hideTimer);
    }
  }, [gameState, active, score]);


  useEffect(() => {
    if (gameState === "gameOver") {

          // Save score to database
    const saveGameScore = async () => {
      try {
        await saveScore(playerName, score);
        console.log('Score saved successfully');
      } catch (error) {
        console.error('Error saving score:', error);
      }
    };

    saveGameScore();

      const resetTimer = setTimeout(() => {
        setClicked([]);
        setScore(0);
        setPattern([]);
        setGameState("waiting"); // Changed to return to waiting state
      }, 3000);
      return () => clearTimeout(resetTimer);
    }  
  }, [gameState,score,playerName]);

  const handleClick = (index) => {
    const patternLength = getPatternLength(score);
    if (
      gameState !== "ongoing" ||
      clicked.includes(index) ||
      clicked.length >= patternLength
    )
      return;

    const newClicked = [...clicked, index];
    setClicked(newClicked);

    if (newClicked.length === patternLength) {
      if (newClicked.sort().join(",") === pattern.sort().join(",")) {
        setScore(score + 1);
        setClicked([]);
        setGameState("nextLevel");
      } else {
        setGameState("gameOver");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-4">
      {/* <Background playerName={playerName} /> */}
      <h1 className="text-4xl font-bold text-white opacity-60 mb-6">
        {playerName}
      </h1>
      <div className="text-xl text-white mb-4 font-bold opacity-80">
        Score: {score}
      </div>
      <div
      //  className={`grid ${score >= 5 ? 'grid-cols-4 grid-rows-4' : 'grid-cols-3 grid-rows-3'} gap-2 rounded-md p-4`}
      className={`grid ${score >= 10 ? 'grid-cols-5 grid-rows-5': score >= 5 ? 'grid-cols-4 grid-rows-4': 'grid-cols-3 grid-rows-3'
      } gap-2 rounded-md p-4`}
      >
        {Array(getGridSize(score))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={gameState !== "ongoing" || clicked.length >= getPatternLength(score)}
              className={`
              h-16 w-16 rounded-md transition-all duration-300
              ${
                clicked.includes(index)
                  ? "bg-gray-900 opacity-100"
                  : active.includes(index)
                  ? "bg-green-100 opacity-100"
                  : "bg-green-400 opacity-100"
              }
              hover:opacity-90 disabled:cursor-not-allowed
            `}
            />
          ))}
      </div>
      {gameState === "gameOver" && (
        <div className="text-red-500 text-2xl mt-4 font-bold opacity-70">
          <h2 className="">Game Over! Score: {score}</h2>
        </div>
      )}
      {gameState === "initial" && (
        <div className="text-white text-2xl mt-4 font-bold opacity-70">
          Get Ready!
        </div>
      )}
      {gameState === "waiting" && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-gray-700 text-white hover:bg-gray-300 hover:text-gray-800
                     transition-colors text-md font-bold mt-4 bg-opacity-50 backdrop-blur-xl
                      rounded-xl z-10 shadow-lg"
        >
          I'm Ready!
        </button>
      )}

      {/* ChevronDown */}
      <div 
          className="absolute bottom-8  transform -translate-x-1/2 cursor-pointer animate-bounce"
          // onClick={scrollToLeaderboard}
        >
          <ChevronDown 
            size={38} 
            className="text-white opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
    </div>
  );
};

export default MemoryGame;