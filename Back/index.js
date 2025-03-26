import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import scoreRoutes from './routes/scores.js';
import connectDB from "./Config/db.js"
// import feedbackRoutes from "./routes/feedback.js"
import gameRoutes from './routes/gameRoutes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(gameRoutes);

connectDB();


app.use('/api/scores', scoreRoutes);
// app.use('/api/feedback', feedbackRoutes); 



app.get('/', (req, res) => {
  res.send('Memory Game API is running');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
});