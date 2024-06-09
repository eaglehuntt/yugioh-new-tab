import React from 'react';
import './builder.css';

import Deck from '../Deck';
import Search from '../Search';
import Lister from '../Lister';
import Options from '../Options';

function Builder() {
  return (
    <div className="Home">
      <Search />
      <Lister />
      <Deck />
      <Options />
    </div>
  );
}

export default Builder;
