import React from "react";

const Background = ({ playerName }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {Array(50) // Adjust the number for how many times you want the name to appear
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
              opacity: Math.random() * 0.05 + 0.15,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {playerName}
          </div>
        ))}
    </div>
  );
};

export default Background;
