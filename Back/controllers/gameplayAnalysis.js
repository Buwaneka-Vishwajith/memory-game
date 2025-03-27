import OpenAI from 'openai';
import dotenv from 'dotenv';
import { performance } from 'perf_hooks';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzeGameplay = async (req, res) => {
    const startTime = performance.now();
    let apiCallStartTime, apiCallEndTime;

    try {
      const { 
        playerName, 
        correctHighlights, 
        timeTaken, 
        accuracyRate, 
        score 
      } = req.body;
  
      const prompt = `Generate a concise, encouraging performance analysis:

      Provide a breakdown for ${playerName}'s memory game performance:
      - Correct Highlights in the final round: ${correctHighlights}
      - Accuracy: ${accuracyRate.toFixed(2)}%
      - Time Taken: ${timeTaken.toFixed(2)} seconds
      - Score: ${score}
      
      Make sure to:
      1. Explicitly mention that the correct highlights are from the final round.
      2. Feedback with a positive tone.
      3. Highlight key stats (correct highlights, accuracy, time, and score).
      
      Keep response between 20-40 words.`;
      
      // Track API call time
      apiCallStartTime = performance.now();
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 80
      });
      apiCallEndTime = performance.now();
  
      const endTime = performance.now();
      
      // Calculate performance metrics
      const totalResponseTime = endTime - startTime;
      const apiCallTime = apiCallEndTime - apiCallStartTime;
      
      res.json({ 
        analysis: response.choices[0].message.content.trim(),
        performanceMetrics: {
          totalResponseTime: totalResponseTime.toFixed(2), // Total time for entire request
          apiCallTime: apiCallTime.toFixed(2), // Time taken by OpenAI API
          inputLength: prompt.length,
          outputLength: response.choices[0].message.content.trim().length,
          model: response.model,
          inputTokens: response.usage?.prompt_tokens || 0,
          outputTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0
        }
      });
    } catch (error) {
      const endTime = performance.now();
      const totalResponseTime = endTime - startTime;

      console.error('Gameplay Analysis Error:', error);
      res.status(500).json({ 
        error: 'Failed to generate gameplay analysis',
        performanceMetrics: {
          totalResponseTime: totalResponseTime.toFixed(2),
          errorOccurred: true,
          errorMessage: error.message
        }
      });
    }
  };

export default analyzeGameplay;