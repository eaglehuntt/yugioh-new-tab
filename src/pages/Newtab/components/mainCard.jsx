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

const openDB = () => {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open('CardDatabase', 1);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id' });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject('Database error: ' + event.target.errorCode);
    };
  });
};

const clearDB = async (db) => {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(['cards'], 'readwrite');
    let objectStore = transaction.objectStore('cards');
    let clearRequest = objectStore.clear();

    clearRequest.onsuccess = function () {
      resolve();
    };

    clearRequest.onerror = function (event) {
      reject('Unable to clear data: ' + event.target.error);
    };
  });
};

const addCardToDB = async (card) => {
  const db = await openDB();
  await clearDB(db);

  return new Promise((resolve, reject) => {
    let transaction = db.transaction(['cards'], 'readwrite');
    let objectStore = transaction.objectStore('cards');
    let addRequest = objectStore.add(card);

    addRequest.onsuccess = function () {
      console.log('Card has been added to your database.');
      resolve();
    };

    addRequest.onerror = function (event) {
      reject('Unable to add data: ' + event.target.error);
    };
  });
};

const getCardFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(['cards'], 'readonly');
    let objectStore = transaction.objectStore('cards');
    let getRequest = objectStore.getAll();

    getRequest.onsuccess = function (event) {
      resolve(event.target.result);
    };

    getRequest.onerror = function (event) {
      reject('Unable to retrieve data: ' + event.target.error);
    };
  });
};

const MainCard = () => {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardState, setCardState] = useState({
    isActive: false,
  });

  const loadCardFromDB = async () => {
    const cards = await getCardFromDB();
    if (cards.length > 0) {
      setCard(cards[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCardFromDB();
  }, []);

  const handleCardClick = (data) => {
    setCardState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
    console.log(data);
  };

  const handleCardSearch = async (searchedCard) => {
    setIsLoading(true);
    await addCardToDB(searchedCard);
    setCard(searchedCard);
    setIsLoading(false);
  };

  const handleShuffle = async () => {
    setIsLoading(true);
    const randomCard = await getRandomCard();
    await addCardToDB(randomCard);
    setCard(randomCard);
    setIsLoading(false);
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
        {cardState.isActive && (
          <SearchBar
            isActive={cardState.isActive}
            onCardSearch={handleCardSearch}
            onShuffle={handleShuffle}
          />
        )}
      </div>
    </>
  );
};

export default MainCard;
