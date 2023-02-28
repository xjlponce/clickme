import React, { useState } from 'react';
import './App.css';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    setClickCount(clickCount + 1);

    if (clickCount >= 9) {
      setShowImage(true);
    }

    setButtonPosition({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  };

  const buttonStyle = {
    position: 'absolute',
    left: buttonPosition.x,
    top: buttonPosition.y,
  };

  return (
    <div className="App">
      {showImage && <img src="https://miro.medium.com/max/1200/1*Mf1hQ5HZp-Dmu-c-v-Z6NA.jpeg" alt="Random Image" />}
      <button style={buttonStyle} onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}


export default App;
