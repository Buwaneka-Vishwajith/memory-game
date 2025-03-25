import express from 'express';
import OpenAIService from '../services/openaiService.js'; // Import OpenAI service

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { playerName, score, correctHighlights, missedHighlights, timeTaken, accuracyRate } = req.body;

    // Call the OpenAIService to generate feedback
    const feedback = await OpenAIService.generateGameFeedback({
      playerName,
      score,
      correctHighlights,
      missedHighlights,
      timeTaken,
      accuracyRate
    });

    res.json({ feedback });
  } catch (error) {
    console.error('Error generating feedback:', error);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
});

export default router;
