import React, { useEffect, useState } from 'react';

const Background = () => {
  const [boxes, setBoxes] = useState([]);
  
  useEffect(() => {
    const generateBoxes = () => {
      const newBoxes = Array(4).fill(null).map((_, i) => ({
        id: i,
        left: Math.random() * 80 + 10, 
        top: Math.random() * 80 + 10,  
        size: Math.random() * 60 + 100,  
        delay: Math.random() * 2000,    
        duration: Math.random() * 1000 + 2000 
      }));
      setBoxes(newBoxes);
    };

    

    generateBoxes();
    const interval = setInterval(generateBoxes, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {boxes.map((box) => (
        <div
          key={box.id}
          className="absolute bg-green-300 rounded-lg opacity-10 animate-pulse"
          style={{
            left: `${box.left}%`,
            top: `${box.top}%`,
            width: `${box.size}px`,
            height: `${box.size}px`,
            animation: `pulse ${box.duration}ms ease-in-out infinite`,
            animationDelay: `${box.delay}ms`
          }}
        />
      ))}
    </div>
  );
};

export default Background;