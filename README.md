# Highlight Hunt - Sequence Memory Game 🎮

A dynamic memory game built with the MERN stack that challenges players to remember and reproduce sequences of highlighted cells in an expanding grid. The game features progressive difficulty levels, quick-flash patterns, and a global leaderboard.

## Features 🌟

### Core Game Mechanics
- **Progressive Grid System**: 
  - 3x3 grid (0-4 score) with 3 sequence patterns
  - 4x4 grid (5-9 score) with 4 sequence patterns
  - 5x5 grid (10+ score) with 5 sequence patterns

- **Quick-Flash Patterns**: Rapid sequence display mechanism for enhanced challenge
- **Real-time Score Tracking**: Instant score updates and game state management
- **Global Leaderboard**: Top 10 high scores displayed
- **Smooth Animations**: Enhanced user experience with clean transitions
- **Responsive Design**: Playable on various screen sizes

### Technical Features
- Full MERN stack implementation
- RESTful API for score management
- Custom React hooks for game state
- Tailwind CSS for modern styling
- MongoDB for persistent data storage

## Tech Stack 💻

### Frontend
- React.js
- Tailwind CSS
- Lucide React (for icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation & Setup 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Buwaneka-Vishwajith/memory-game.git
cd memory-game
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# In backend directory, create .env file
MONGODB_URI=your_mongodb_uri
PORT=5000

# In frontend directory, create .env file
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run start

# Start frontend server (from frontend directory)
npm run start
```

5. Open `http://localhost:3000` in your browser

## Game Rules 📖

1. **Starting the Game**
   - Enter your name to begin
   - Click "I'm Ready!" to start the sequence

2. **Gameplay**
   - Watch the sequence of highlighted cells
   - Reproduce the sequence by clicking the cells in order
   - Score increases with each successful round
   - Grid size and sequence length increase with score

3. **Difficulty Progression**
   - Score 0-4: 3x3 grid, 3 cell sequence
   - Score 5-9: 4x4 grid, 4 cell sequence
   - Score 10+: 5x5 grid, 5 cell sequence

4. **Game Over**
   - Incorrect sequence ends the game
   - Score is saved to the leaderboard
   - Option to restart game

## API Endpoints 🛣️

### Scores
- `GET /api/scores/highscores` - Get top 10 scores
- `POST /api/scores` - Save new score

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🙏

- Thanks to all contributors who have helped with the project
- Inspiration from classic memory games
- Built as a personal project to explore MERN stack development

## Contact 📧

Buwaneka Vishwajith - [Your LinkedIn/GitHub]

Project Link: [https://github.com/Buwaneka-Vishwajith/memory-game](https://github.com/Buwaneka-Vishwajith/memory-game)
