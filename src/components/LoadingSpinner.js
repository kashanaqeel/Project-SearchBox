import React from 'react';
import './LoadingSpinner.css'; // Ensure to import the CSS

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White outer ring */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#F2F4F8" // White ring
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Animated inner circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#6833FF" // Color of the moving part
          strokeWidth="10"
          strokeLinecap="round"
          className="moving-circle" // Class for animation
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
