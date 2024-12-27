import React from "react";

const Card = () => {
  const gridItems = new Array(9).fill(null); // Create an array with 9 elements

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-3xl font-bold text-white mb-4">memorize</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {gridItems.map((_,index) => (
          <div
            key={index}
            className="bg-green-400 h-20 w-20 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Card;
