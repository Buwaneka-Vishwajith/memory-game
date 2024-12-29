import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/game', { state: { playerName } });
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white opacity-60 mb-8">Memory Game</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Start;