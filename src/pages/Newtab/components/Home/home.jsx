import React from 'react';
import { useRef, useState, useEffect } from 'react';

import MainCard from '../mainCard';
import Builder from '../Builder/builder';

import './Home.css';

const Home = () => {
  const [showCard, setShowCard] = useState(true);

  const handleDeckButtonClick = () => {
    setShowCard((prevShowCard) => !prevShowCard);
    console.log('Button clicked, showCard state will be:', !showCard);
  };

  return (
    <>
      <div className="home-container">
        {showCard ? <MainCard /> : <Builder />}
        {/* <button className="deck-button" onClick={handleDeckButtonClick}>
        DECKS
      </button> */}
      </div>
    </>
  );
};

export default Home;
