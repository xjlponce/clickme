import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showImage, setShowImage] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  const buttonRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (time === 0 && !showImage && audioRef.current) {
      setShowImage(true);
      audioRef.current.play(); // autoplay the audio
    } else if (time > 0 && !showImage) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
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
  
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;
    setButtonPosition({
      x: Math.random() * maxWidth,
      y: Math.random() * maxHeight,
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
    fontSize: '24px',
    padding: '12px 24px',
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
      {showImage && <img src="https://cdn3.whatculture.com/images/2019/01/0a474a9ae0b07ce8-1200x675.jpg" alt=""/>}
      <button ref={buttonRef} style={buttonStyle} onClick={handleClick}>
        Click Me
      </button>
      <div className="score">Score: {score}</div>
      <div className="timer">Time: {time}s</div>
      <audio ref={audioRef} src="onlymp3.to - Scary Scream Sound Effect HD-F2hvl2iOI8k-256k-1656015137467.mp3" autoPlay />

    </div>
  );
}

export default App;
