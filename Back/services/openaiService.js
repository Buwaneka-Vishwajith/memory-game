import OpenAI from 'openai';

export class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateGameFeedback(gameStats) {
    try {
      // Validate and sanitize input
      const sanitizedStats = {
        playerName: gameStats.playerName || 'Player',
        score: gameStats.score || 0,
        correctHighlights: gameStats.correctHighlights || 0,
        missedHighlights: gameStats.missedHighlights || 0,
        accuracyRate: gameStats.accuracyRate || 0
      };

      // Detailed prompt for personalized feedback
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a supportive and engaging game performance coach. Provide personalized, motivational feedback that is encouraging, specific, and helps the player improve their memory skills."
          },
          {
            role: "user",
            content: `Provide a personalized feedback message for a memory game player:

Player Details:
- Name: ${sanitizedStats.playerName}
- Score: ${sanitizedStats.score}
- Correct Memorizations: ${sanitizedStats.correctHighlights}
- Missed Patterns: ${sanitizedStats.missedHighlights}
- Accuracy: ${sanitizedStats.accuracyRate}%

Please create a brief, motivational message that:
1. Acknowledges the player's current performance
2. Offers a specific, actionable tip for improvement
3. Maintains an encouraging and fun tone
4. Is no more than 50 words`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      const feedback = response.choices[0].message.content.trim();
      return feedback || this.getFallbackFeedback(sanitizedStats);

    } catch (error) {
      console.error("OpenAI Feedback Generation Error:", error);
      return this.getFallbackFeedback(gameStats);
    }
  }

  getFallbackFeedback(gameStats) {
    const performanceTiers = [
      {
        threshold: 10,
        message: `Wow, ${gameStats.playerName}! You're a memory master! Your brain is working like a supercomputer. Keep challenging yourself and you'll become a legend!`
      },
      {
        threshold: 5,
        message: `Great job, ${gameStats.playerName}! You're developing impressive memory skills. Stay focused and keep practicing to unlock your full potential!`
      },
      {
        threshold: 0,
        message: `Nice attempt, ${gameStats.playerName}! Every game is a learning opportunity. Stay curious and keep training your memory muscles!`
      }
    ];

    const feedback = performanceTiers.find(tier => gameStats.score >= tier.threshold);
    return feedback ? feedback.message : "Keep practicing to improve your memory skills!";
  }
}

export default new OpenAIService();