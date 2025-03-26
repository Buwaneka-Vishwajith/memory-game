import express from 'express';
import OpenAIService from '../services/openaiService.js'; // Import OpenAI service

const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
      console.log("Received request to /api/feedback/generate with body:", req.body); // Log incoming request
  
      const { playerName, score, correctHighlights, missedHighlights, timeTaken, accuracyRate } = req.body;
  
      const feedback = await OpenAIService.generateGameFeedback({
        playerName,
        score,
        correctHighlights,
        missedHighlights,
        timeTaken,
        accuracyRate
      });
  
      console.log("Generated AI Feedback:", feedback); // Log OpenAI response
  
      res.json({ feedback });
    } catch (error) {
      console.error('Error generating feedback:', error);
      res.status(500).json({ error: 'Failed to generate feedback' });
    }
  });
  

export default router;
