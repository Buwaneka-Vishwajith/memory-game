// models/Score.js
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const Score = mongoose.model('Score', scoreSchema);