import React, { useState, useEffect } from 'react';

export default function GameNav({ Timer, selectedWord }) {
  const [timeLeft, setTimeLeft] = useState(Timer);

  // Reset the timeLeft whenever the Timer prop changes
  useEffect(() => {
    setTimeLeft(Timer);
  }, [Timer]);

  // Decrement the timer if it is not 0
  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const generateUnderscores = () => {
    if (!selectedWord) return '';
    return selectedWord.split('').map(() => "_").join(' ');
  };

  return (
    <div className="flex items-center mt-16 justify-between bg-black px-6 py-3">
      <div className="text-white text-left">{formatTime(timeLeft)}</div>
      <div className="text-white text-center flex-1 font-bold">
        {selectedWord ? ` ${generateUnderscores()}` : 'Waiting for Word...'}
      </div>
      <div className="text-white text-right font-bold">rounds</div>
    </div>
  );
}
