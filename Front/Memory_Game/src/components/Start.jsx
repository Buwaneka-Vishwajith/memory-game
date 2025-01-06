import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from './Background';


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
      <Background />
      <div className="p-8 rounded-xl bg-gray-800/30 backdrop-blur-lg ">
      <div className="z-10 flex flex-col items-center gap-8">

      <h1 className="text-5xl font-bold opacity-80 mb-8">
        <span className="text-green-100">H</span>
        <span className="text-blue-300">i</span>
        <span className="text-green-100">g</span>
        <span className="text-green-300">h</span>
        <span className="text-green-100">L</span>
        <span className="text-blue-300">i</span>
        <span className="text-blue-400">g</span>
        <span className="text-blue-300">h</span>
        <span className="text-green-100">t</span>{" "}       
        <span className="text-green-100">Hunt</span>
      </h1>

        
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Name Yourself!"
              className="px-4 py-2 rounded-md text-center bg-gray-800/30 text-white 
                         focus:outline-none backdrop-blur-sm placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-400 text-gray-900 font-bold rounded-md hover:bg-green-200 transition-colors backdrop-blur-sm"
            >
              Let's Go!
            </button>
          </form>
        </div>
      </div>
    </div>
   );
};

export default Start;