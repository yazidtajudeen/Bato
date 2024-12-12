import React from 'react';

const Circle = ({ icon: Icon }) => {
  return (
    <div className="circle-container">
      <div className="breathing-circle">
        <Icon className="text-[#AE4B68] text-2xl" />
      </div>
    </div>
  );
};

export default Circle;