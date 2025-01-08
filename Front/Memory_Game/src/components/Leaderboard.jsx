// Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';


const Leaderboard = () => {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHighScores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/scores/highscores');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHighScores(data);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighScores();
  }, []);

  return (

  
    <section className="relative w-full bg-gray-900 overflow-x-hidden">
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="text-[13.6vw] font-black opacity-60 mb-8">
        <span className="text-green-100">L</span>
        <span className="text-blue-300">E</span>
        <span className="text-green-100">A</span>
        <span className="text-green-300">D</span>
        <span className="text-blue-300">E</span>
        <span className="text-blue-400">R</span>
        <span className="text-blue-300">B</span>
        <span className="text-green-100">O</span>     
        <span className="text-green-100">A</span>
        <span className="text-green-300">R</span>
        <span className="text-green-100">D</span>
        </div>
      </div>

      <div 
        id="leaderboard" 
        className="z-10 relative min-h-screen flex justify-center items-center p-4"
      >
       <div
  className=" w-full max-w-sm rounded-lg p-5 z-10 backdrop-blur-lg"
  style={{
    boxShadow: "10px 10px 11px 5px rgba(0, 0, 0, 0.2)", // Added example color for clarity
  }}
>
          {/* <div className="mb-6">
            <h2 className="text-2xl font-bold text-white text-center">Top Scores</h2>
          </div> */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-4 text-white">Loading scores...</div>
            ) : (
              highScores.map((score, index) => (
                <div 
                  key={score._id} 
                  className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-400/30 transition-colors"
                >
                  <div className="flex items-center space-x-4 ">
                    <span className="text-xl font-bold text-gray-400 ">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-white">{score.playerName}</span>
                  </div>
                  <span className="text-lg font-bold text-green-400">
                    {score.score}
                  </span>
                </div>
              ))
            )}
          </div>         
        </div>        
      </div>
    </section>
  );
};

export default Leaderboard;