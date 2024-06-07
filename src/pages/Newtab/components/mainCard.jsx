import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import Fade from '@material-ui/core/Fade';
import './mainCard.css';
import { infinity } from 'ldrs';
import SearchBar from './SearchBar/searchBar';

infinity.register('card-loading');

const getRandomCard = async () => {
  let response = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
  return response.json();
};

const MainCard = () => {
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cardState, setCardState] = useState({
    isActive: false,
  });

  useEffect(() => {
    // Get card data then set it to the card variable
    getRandomCard().then((data) => {
      setCard(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  }, []);

  const handleCardClick = (data) => {
    setCardState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
    console.log(data);
  };

  let cardClassName = `tiltComponent mainCard ${
    cardState.isActive ? 'card-active' : ''
  }`;

  return (
    <>
      <div aria-live="polite" aria-busy={isLoading}>
        {isLoading && (
          <card-loading
            size="80"
            stroke="5"
            speed="2"
            color="grey"
            stroke-length="0.5"
            bg-opacity="0.2"
          ></card-loading>
        )}
        {!isLoading && card && (
          <>
            <div className="card-info-grid">
              <div className={cardClassName}>
                <Fade in={!isLoading} style={{ transitionDelay: '300ms' }}>
                  <Tilt
                    glareEnable={true}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={10}
                    perspective={2000}
                    glareColor={'rgb(255,255,255)'}
                    glareMaxOpacity={0.2}
                    tiltReverse={true}
                    transitionSpeed={2000}
                  >
                    <div onClick={() => handleCardClick(card)}>
                      <img
                        className="card-img"
                        src={card.card_images[0].image_url}
                        draggable={false}
                      />
                    </div>
                  </Tilt>
                </Fade>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="search-bar-container">
        {cardState.isActive && <SearchBar isActive={cardState.isActive} />}
      </div>
    </>
  );
};

export default MainCard;
