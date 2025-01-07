import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHighScores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/scores/highscores'); // Use full URL
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
    <div 
      id="leaderboard" 
      className="min-h-screen flex items-center justify-center p-4 bg-gray-900"
    >
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white text-center">Top Scores</h2>
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-4 text-white">Loading scores...</div>
          ) : (
            highScores.map((score, index) => (
              <div 
                key={score._id} 
                className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-400">
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
  );
};

export default Leaderboard;