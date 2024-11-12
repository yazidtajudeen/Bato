import React from 'react';

const Circle = ({ icon: Icon, size = 60, color = '#DFB3C0' }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      }}
    >
      <Icon style={{ fontSize: `${size * 0.5}px`, color: 'black' }} />
    </div>
  );
}

export default Circle;