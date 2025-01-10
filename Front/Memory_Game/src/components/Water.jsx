import React from 'react';

const Water = () => {
  return (
    <div className="absolute inset-0">
      {/* Left Side */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="pr-[95%] text-[4vw] font-black opacity-60"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          <span className="text-gray-700">H</span>
          <span className="text-gray-600">I</span>
          <span className="text-gray-700">G</span>
          <span className="text-gray-700">H</span>
          <span className="text-gray-700">L</span>
          <span className="text-gray-600">I</span>
          <span className="text-gray-500">G</span>
          <span className="text-gray-700">H</span>
          <span className="text-gray-700">T</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="pr-[78%] text-[4vw] font-black opacity-60 mb-[43%]">
            <span className="text-gray-500">U </span>
            <span className="text-gray-700">N </span>
            <span className="text-gray-600">T </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="pl-[95%] text-[4vw] font-black opacity-60"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          <span className="text-gray-500">H</span>
          <span className="text-gray-600">I</span>
          <span className="text-gray-700">G</span>
          <span className="text-gray-700">H</span>
          <span className="text-gray-600">L</span>
          <span className="text-gray-600">I</span>
          <span className="text-gray-700">G</span>
          <span className="text-gray-500">H</span>
          <span className="text-gray-700">T</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="pl-[78%] text-[4vw] font-black opacity-60 mb-[42.6%]">
            <span className="text-gray-500">T </span>
            <span className="text-gray-600">N </span>
            <span className="text-gray-700">U </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Water;