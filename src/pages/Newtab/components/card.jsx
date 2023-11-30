import React from 'react';
import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import Fade from '@material-ui/core/Fade';

import './card.css';

import { infinity } from 'ldrs';
infinity.register('card-loading');

const getCard = async () => {
  let response = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
  return response.json();
};

const Card = () => {
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCard().then((data) => {
      setCard(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  }, []);

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
            <Fade in={!isLoading} style={{ transitionDelay: '300ms' }}>
              <Tilt
                glareEnable={true}
                tiltMaxAngleX={10}
                tiltMaxAngleY={20}
                perspective={2000}
                glareColor={'rgb(255,255,255)'}
              >
                <div className="tiltComponent card">
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
          </>
        )}
      </div>
    </>
  );
};

export default Card;
