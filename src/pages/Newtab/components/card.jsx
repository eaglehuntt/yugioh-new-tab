import React from 'react';
import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

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
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div aria-live="polite" aria-busy={isLoading}>
        {isLoading && <card-loading size="80" color="grey"></card-loading>}
        {!isLoading && card && (
          <>
            <div className="bg__gradient"></div>
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
          </>
        )}
      </div>
    </>
  );
};

export default Card;
