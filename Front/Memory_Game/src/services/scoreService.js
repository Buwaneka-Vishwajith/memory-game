import axios from 'axios';

const API_URL = 'http://localhost:5000/api/scores';

export const saveScore = async (playerName, score) => {
  try {
    console.log('Sending score data:', { playerName, score }); // Debug log
    const response = await axios.post(API_URL, { playerName, score });
    console.log('Score saved successfully:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const getHighScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/highscores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching high scores:', error);
    throw error;
  }
};