// routes/scores.js
import express from 'express';
import { Score } from '../Models/Score.js';

const router = express.Router();

// Create new score
router.post('/', async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const newScore = await Score.create({ playerName, score });
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get high scores
router.get('/highscores', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;