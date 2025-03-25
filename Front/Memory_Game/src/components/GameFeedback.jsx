import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const GameFeedback = ({ 
  playerName = 'Player', 
  score = 0, 
  correctHighlights = 0, 
  missedHighlights = 0, 
  timeTaken = 0, 
  accuracyRate = 0 
}) => {
  const [feedback, setFeedback] = useState('Generating performance insights...');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const gameStats = {
          playerName,
          score,
          correctHighlights,
          missedHighlights,
          timeTaken,
          accuracyRate: accuracyRate || (score > 0 ? Math.min(100, (score / Math.max(1, correctHighlights)) * 100) : 0)
        };
  
        console.log('Sending game stats:', gameStats);
  
        const response = await axios.post('/api/feedback/generate', gameStats);
  
        // Debugging response
        console.log('Feedback response:', response);
  
        if (response.data && response.data.feedback) {
          setFeedback(response.data.feedback);
        } else {
          throw new Error('No feedback received');
        }
      } catch (error) {
        console.error("Feedback generation failed", error);
        setFeedback(`Great job, ${playerName}! You scored ${score} points. Keep challenging your memory!`);
      }
    };
  
    // Only fetch feedback if there are meaningful stats
    if (score > 0 || correctHighlights > 0) {
      fetchFeedback();
    }
  }, [playerName, score, correctHighlights, missedHighlights, timeTaken, accuracyRate]);

  
  return (
    <div className="bg-green-800 p-4 rounded-md text-white">
      <h3 className="font-bold mb-2">Performance Insights</h3>
      <p>{feedback}</p>
    </div>
  );
};

GameFeedback.propTypes = {
  playerName: PropTypes.string,
  score: PropTypes.number,
  correctHighlights: PropTypes.number,
  missedHighlights: PropTypes.number,
  timeTaken: PropTypes.number,
  accuracyRate: PropTypes.number
};

export default GameFeedback;