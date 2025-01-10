import React from 'react'

const Water = () => {
  return (
    <>
    <div className="absolute inset-0 flex items-center justify-center">
     <div 
      className="pr-[95%] text-[4vw] font-black opacity-60 "
      style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
      <span className="text-gray-700">H</span>
      <span className="text-gray-700">I</span>
      <span className="text-gray-700">L</span>
      <span className="text-gray-700">I</span>
      <span className="text-gray-700">G</span>
      <span className="text-gray-700">H</span>
      <span className="text-gray-700">T</span>
     </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pr-[78%] text-[4vw] font-black opacity-60 mb-[32%]">
        <span className="text-gray-700">U </span>
        <span className="text-gray-700">N </span>
        <span className="text-gray-700">T </span>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Water