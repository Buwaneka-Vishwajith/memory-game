import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import scoreRoutes from './routes/scores.js';
import connectDB from "./Config/db.js"



const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// Routes
app.use('/api/scores', scoreRoutes);

// Basic test route test
app.get('/', (req, res) => {
  res.send('Memory Game API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});