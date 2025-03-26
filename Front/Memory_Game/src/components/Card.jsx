import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, Trophy, Sparkles } from 'lucide-react';
import Leaderboard from './Leaderboard';
import { saveScore } from "../services/scoreService";
import Water from "./Water";
import axios from 'axios';
import GameAIAnalysis from "./GameAIAnalysis";

const GridBackground = () => {   
  const location = useLocation();
  const playerName = location.state?.playerName || "Player";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => { 
      const currentScrollPos = window.scrollY;
      
      if (currentScrollPos > 30) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-auto cursor-custom">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      <h1 
        className={`flex items-center justify-center font-bold text-blue-300/40 text-[8.9vw]
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-60' : 'opacity-0'}`}
      > 
        {playerName} 
      </h1>
      <Water />   
    </div>
  );
};

const MemoryGame = () => {
  const location = useLocation();
  const playerName = location.state?.playerName || "Player";

  const [active, setActive] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [gameState, setGameState] = useState("waiting");
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [feedback, setFeedback] = useState("");
  
  // New state for AI analysis
  const [aiAnalysis, setAIAnalysis] = useState(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const [starttime, setStartTime] = useState(null);
  const [missedHighlights, setMissedHighlights] = useState(0);

  const getGridSize = (score) => {
    if(score >= 10) {
      return 25;
    } else if (score >= 5) {
      return 16;
    } else {
      return 9;
    }
  };

  const getPatternLength = (score) => {
    if(score >= 10) {
      return 5;
    } else if(score >= 5) {
      return 4;
    } else {
      return 3; 
    }
  };

  const getRandom = () => {
    const random = new Set();
    const gridSize = getGridSize(score);
    const patternLength = getPatternLength(score); 
    
    while (random.size < patternLength) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      random.add(randomIndex);
    }
    
    return Array.from(random);
  };

  // New method for AI analysis
  const handleAIAnalysis = async () => {
    setIsLoadingAnalysis(true);
    try {
      // Calculate the number of correct clicks
      const correctClicks = clicked.filter(click => pattern.includes(click)).length;
  
      // Calculate the number of incorrect clicks (those not in the pattern)
      const incorrectClicks = clicked.length - correctClicks;
  
      // Calculate the missed highlights: total pattern items - correct clicks
      const missed = pattern.length - correctClicks;
  
      // Calculate accuracy rate (correct clicks vs total attempts made)
      const accuracyRate = pattern.length > 0 
        ? ((correctClicks / (correctClicks + incorrectClicks)) * 100)
        : 0;
  
      // Calculate time taken in seconds
      const timeTaken = Math.max((Date.now() - starttime) / 1000, 0.01); // Avoid 0 seconds
  
      // Send the data to your API for analysis
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/gameplay/analyze`, {
        playerName,
        correctHighlights: correctClicks,
        missedHighlights: missed,
        timeTaken,
        accuracyRate,
        score
      });
  
      // Set the AI-generated analysis to be displayed
      setAIAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      setAIAnalysis("Unable to generate AI analysis at this moment.");
    } finally {
      setIsLoadingAnalysis(false);
    }
  };
  

  const startGame = () => {
    setStartTime(Date.now());  //start the timer
    setGameState("initial");
  };

  const scrollToLeaderboard = () => {
    document.getElementById('leaderboard').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
 
  useEffect(() => {
    if (gameState === "initial" || gameState === "nextLevel") {
      const startTimer = setTimeout(() => {
        const newPattern = getRandom();
        setPattern(newPattern);
        setActive(newPattern);
        setGameState("ongoing");
      }, 300);
      return () => clearTimeout(startTimer);
    }
  }, [gameState, score]);

  useEffect(() => { 
    if (gameState === "ongoing" && active.length > 0) {
      const hideTimer = setTimeout(() => {
        setActive([]);
      }, score >= 5 ? 400 : 300);
      return () => clearTimeout(hideTimer); 
    }
  }, [gameState, active, score]); 
 
  useEffect(() => {
    if (gameState === "gameOver") {
      const saveGameScore = async () => {
        try {
          const missed = pattern.length - clicked.length;  //missed highlights
          setMissedHighlights(missed);

          const timeTaken = (Date.now() - starttime) / 1000  //in seconds

          // Calculate accuracy rate
          const accuracyRate = (clicked.length / pattern.length) * 100;

          // Save score
          await saveScore(playerName, score);
          console.log('Score saved for:', playerName, score); 

          // Generate AI Feedback (if needed)
          const response = await axios.post('/api/feedback/generate', {
            playerName,
            correctHighlights: score,
            missedHighlights: missed,
            timeTaken: timeTaken,
            accuracyRate: accuracyRate,
            score: score
          });

          setFeedback(response.data.feedback);
        } catch (error) {
          console.error('Error saving score or generating feedback:', error);
          setFeedback("Great job playing! Keep playing to improve your memory skills.");
        }
      };

      saveGameScore();

      const resetTimer = setTimeout(() => {
        setClicked([]);
        setScore(0);
        setPattern([]);
        setGameState("waiting");
        setFeedback("");
      }, 3000);
      return () => clearTimeout(resetTimer); 
    }  
  }, [gameState, score, playerName]);

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
    <div className="overflow-hidden min-h-screen cursor-custom">
      <div className="bg-gray-900 relative">
        <GridBackground />

        <div className=" flex flex-col justify-center items-center h-screen bg-transparent p-4 relative z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Trophy className="text-green-300 w-5 h-5" />
              <span className="text-xl text-white/70 font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white/70 font-bold tracking-wider">
                {score >= 10 ? 'Memory Godzilla 🦖' : score >= 5 ? 'Almost Einstein 🧠' : 'Potato Brain 🥔'}
              </span>
            </div>
          </div>
          <div
            className={`grid ${
              score >= 10 ? 'grid-cols-5 grid-rows-5': 
              score >= 5 ? 'grid-cols-4 grid-rows-4': 
              'grid-cols-3 grid-rows-3'
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
                    h-16 w-16  rounded-md transition-all duration-300
                    transform hover:scale-95 active:scale-90 
                    ${
                      clicked.includes(index)
                        ? "bg-gray-900 opacity-100"
                        : active.includes(index)
                        ? "bg-green-100 opacity-100"
                        : "bg-green-400 opacity-100"
                    }
                    hover:opacity-90 disabled:cursor-not-allowed
                    hover:shadow-lg cursor-custom
                  `}
                />
              ))}
          </div>
          {gameState === "gameOver" && (
            <div className="text-center mt-4">
              <h2 className="text-red-500 text-2xl font-bold opacity-70">
                Back to Potato Brain? 🥔 Score: {score}
              </h2>
              <button
                onClick={handleAIAnalysis}
                disabled={isLoadingAnalysis}
                className="px-6 py-3 bg-purple-700/50 text-white/80 hover:bg-purple-300 hover:text-purple-800
                           transition-colors text-md font-bold mt-4 backdrop-blur-xl
                           rounded-xl z-10 shadow-lg cursor-custom flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isLoadingAnalysis ? 'Analyzing...' : 'Get AI Gameplay Analysis'}
              </button>
              
              {aiAnalysis && (
                <GameAIAnalysis 
                  analysis={aiAnalysis} 
                  onClose={() => setAIAnalysis(null)} 
                />
              )}
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
              className="px-6 py-3 bg-gray-700/50 text-white/80 hover:bg-gray-300 hover:text-gray-800
                       transition-colors text-md font-bold mt-4 backdrop-blur-xl
                       rounded-xl z-10 shadow-lg cursor-custom"
            >
              I'm Ready!
            </button>
          )}
          <div 
            className="absolute bottom-8 transform -translate-x-1/2 cursor-pointer animate-bounce"
            onClick={scrollToLeaderboard}
          >
            <ChevronDown
              size={38} 
              className="text-white opacity-60 hover:opacity-100 transition-opacity cursor-custom"
            />
          </div>
        </div>   
      </div>
      <Leaderboard />
    </div>
  );
};

export default MemoryGame;