import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import './SearchBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Shuffle } from 'lucide-react';

const axios = Axios.create({
  baseURL: 'https://db.ygoprodeck.com/api/v7/',
});

const cache = {};

const SearchBar = ({ isActive }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [showShuffleButton, setShowShuffleButton] = useState(true); // State to manage shuffle button visibility
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        !event.target.classList.contains('search-btn') // Check if the click is not on the search button
      ) {
        setIsClicked(false);
        setTimeout(() => {
          setShowShuffleButton(true); // Show shuffle button when search box is unclicked
        }, 50);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setShowShuffleButton(false); // Hide shuffle button when search box is clicked
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setName(`&fname=${event.target.value}`);
  };

  const queryBuilder = () => {
    return `cardinfo.php?num=30&offset=0` + name;
  };

  const request = async () => {
    if (!inputValue) return;

    const query = queryBuilder();
    if (cache[query]) {
      console.log('Fetching from cache');
      findMatchingCard(cache[query], inputValue);
      return;
    }

    try {
      let response = await axios.get(query);
      const data = response.data.data;
      cache[query] = data;
      findMatchingCard(data, inputValue);
    } catch (err) {
      alert(`No cards found`);
    }
  };

  const findMatchingCard = (data, input) => {
    const upperCaseInput = input.toUpperCase();
    for (let i = 0; i < Math.min(5, data.length); i++) {
      if (data[i].name.toUpperCase() === upperCaseInput) {
        console.log(data[i]);
        return;
      }
    }
    if (data.length > 0) {
      console.log('No exact match found. Logging first result:');
      console.log(data[0]);
      alert('No exact match found. Showing the first result.');
    } else {
      console.log('No results found');
      alert('No results found');
    }
  };

  return (
    <div className={`container ${isActive ? 'fade-in' : 'fade-out'}`}>
      <div
        className={`search-box ${isClicked ? 'clicked' : ''}`}
        onClick={handleClick}
        ref={searchBoxRef}
      >
        <input
          className="search-text"
          type="text"
          placeholder="Search Cards"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') request();
          }}
        />
        <a
          href="#"
          className="search-btn"
          onClick={(e) => {
            e.preventDefault();
            request();
          }}
        >
          <i className="fas fa-search"></i>
        </a>
      </div>
      {showShuffleButton && (
        // Conditionally render the shuffle button based on showShuffleButton state
        <a
          href="#"
          className="shuffle-btn"
          onClick={(e) => {
            e.preventDefault();
            // Add functionality for shuffle button
          }}
        >
          <Shuffle />
        </a>
      )}
    </div>
  );
};

export default SearchBar;
