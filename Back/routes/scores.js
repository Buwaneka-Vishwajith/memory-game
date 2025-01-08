// routes/scores.js
import express from 'express';
import { Score } from '../Models/Score.js';

const router = express.Router();

// Create new score
router.post('/', async (req, res) => {
  try {
    console.log('Received score data:', req.body); // Debug log
    const { playerName, score } = req.body;
    const newScore = await Score.create({ playerName, score });
    console.log('Created new score:', newScore); // Debug log
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error creating score:', error); // Debug log
    res.status(400).json({ message: error.message });
  }
});

// Get high scores
router.get('/highscores', async (req, res) => {
  try {
    console.log('Fetching high scores'); // Debug log
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10);
    console.log('Retrieved scores:', scores); // Debug log
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

export default router;