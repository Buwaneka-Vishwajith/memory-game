import React, { useEffect, useState } from "react";

const Card = () => {
  const gridItems = new Array(9).fill(null); 
  const [active , setActive] = useState([]);

  //geberate random colored boxes
  const getRandom = () =>{
    const random = [];

    while(random.length <3){
      const randomIndex = Math.floor(Math.random() * 9 );
      if(!random.includes(randomIndex)){
        random.push(randomIndex);
      }
    }
    return random;
  };

  useEffect(() => {
    
    setActive(getRandom());

    const timer = setTimeout(() => {
      setActive([]);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }

  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-4xl font-bold text-white opacity-60 mb-10">memorize</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {gridItems.map((_,index) => (
          <div
            key={index}
            className={`bg-green-400 h-20 w-20 rounded-md 
                        ${active.includes(index)? "bg-green-100" : "bg-green-400"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Card;
