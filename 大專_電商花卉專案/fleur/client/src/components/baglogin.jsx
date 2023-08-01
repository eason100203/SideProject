import React from 'react';

const Baglogin = ({ onClose }) => {
  return (
    <div>
      <div>
        <p>Please log in first</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Baglogin;