import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import Fade from '@material-ui/core/Fade';
import './card.css';
import { infinity } from 'ldrs';

infinity.register('card-loading');

const getRandomCard = async () => {
  let response = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
  return response.json();
};

const Card = () => {
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

  const handleClick = (data) => {
    if (cardState.isActive) {
      setCardState({ isActive: false });
      return;
    } else {
      setCardState({ isActive: true });
      console.log(data);
    }
  };

  let cardClassName = '';

  if (cardState.isActive) {
    cardClassName = 'tiltComponent card card-active';
  } else {
    cardClassName = 'tiltComponent card';
  }

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
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={20}
                    perspective={2000}
                    glareColor={'rgb(255,255,255)'}
                    tiltAngleYInitial={cardState.isActive ? -90 : null}
                    tiltAngleXInitial={cardState.isActive ? 0 : null}
                  >
                    <div
                      onClick={() => {
                        handleClick(card);
                      }}
                    >
                      {
                        <img
                          className="card-img"
                          src={card.card_images[0].image_url}
                          draggable={false}
                        />
                      }
                    </div>
                  </Tilt>
                </Fade>
              </div>
              {cardState.isActive && (
                <>
                  <div className={cardClassName}>
                    <Fade in={!isLoading} style={{ transitionDelay: '300ms' }}>
                      <Tilt
                        glareEnable={true}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={20}
                        perspective={2000}
                        glareColor={'rgb(255,255,255)'}
                        tiltAngleYManual={cardState.isActive ? -20 : null}
                        tiltAngleXManual={cardState.isActive ? 0 : null}
                      >
                        <div>
                          {
                            <img
                              className="card-img"
                              src={card.card_images[0].image_url}
                              draggable={false}
                            />
                          }
                        </div>
                      </Tilt>
                    </Fade>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
