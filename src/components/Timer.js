// Timer.js
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false, 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        fractionalSecondDigits: 3 });
      setCurrentTime(timeString);
    };

    // Update time immediately and then every 100 milliseconds
    updateTime();
    const interval = setInterval(updateTime, 100);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="timer">
      System Time: {currentTime}
    </div>
  );
};

export default Timer;
