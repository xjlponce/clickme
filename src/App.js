import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showImage, setShowImage] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (time > 0 && !showImage) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, showImage]);

  useEffect(() => {
    if (time === 0 && !showImage) {
      setShowImage(true);
    }
  }, [time, showImage]);

  const handleClick = () => {
    if (isCursorInButton() && !showImage) {
      setAttempts(attempts + 1);
      setScore(score + 10);
      if (attempts >= 9) {
        setShowImage(true);
      }
    }

    setButtonPosition({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  };

  const handleMouseMove = (event) => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isCursorInButton = (
        event.clientX >= buttonRect.left &&
        event.clientX <= buttonRect.right &&
        event.clientY >= buttonRect.top &&
        event.clientY <= buttonRect.bottom
      );
      if (isCursorInButton) {
        setButtonPosition({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });
      }
    }
  };

  const buttonStyle = {
    position: 'absolute',
    left: buttonPosition.x,
    top: buttonPosition.y,
  };

  const isCursorInButton = (event) => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isCursorInButton = (
        event.clientX >= buttonRect.left &&
        event.clientX <= buttonRect.right &&
        event.clientY >= buttonRect.top &&
        event.clientY <= buttonRect.bottom
      );
      return isCursorInButton;
    }
    return false;
  };
  
  

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {showImage && <img src="https://miro.medium.com/max/1200/1*Mf1hQ5HZp-Dmu-c-v-Z6NA.jpeg" alt=""/>}
      <button ref={buttonRef} style={buttonStyle} onClick={handleClick}>
        Click Me
      </button>
      <div className="score">Score: {score}</div>
      <div className="timer">Time: {time}s</div>
    </div>
  );
}

export default App;
