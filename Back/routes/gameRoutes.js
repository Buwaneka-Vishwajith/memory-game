import express from 'express';
import analyzeGameplay from '../controllers/gameplayAnalysis.js';

const router = express.Router();

// Gameplay analysis route
router.post('/api/gameplay/analyze', analyzeGameplay);

export default router;