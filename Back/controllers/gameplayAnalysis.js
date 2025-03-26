import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzeGameplay = async (req, res) => {
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
      2. Include a brief, motivational feedback with a positive tone.
      3. Highlight key stats (correct highlights, accuracy, time, and score).
      4. Keep the response between 20-50 words.
      
      Keep response between 20-50 words.`;
      

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250
      });
  
      res.json({ 
        analysis: response.choices[0].message.content.trim() 
      });
    } catch (error) {
      console.error('Gameplay Analysis Error:', error);
      res.status(500).json({ 
        error: 'Failed to generate gameplay analysis' 
      });
    }
  };

export default analyzeGameplay;
