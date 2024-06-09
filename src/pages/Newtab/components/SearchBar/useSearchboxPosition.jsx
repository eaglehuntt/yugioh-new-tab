import { useState, useEffect } from 'react';

const useSearchBoxPosition = () => {
  const [searchBoxPosition, setSearchBoxPosition] = useState({
    top: '80%',
    left: '50%',
  });

  useEffect(() => {
    const handleResize = () => {
      const top = window.innerHeight * 0.83; // Adjust percentage as needed
      setSearchBoxPosition({ top: `${top}px`, left: '50%' });
    };

    handleResize(); // Call once to set initial position

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return searchBoxPosition;
};

export default useSearchBoxPosition;
