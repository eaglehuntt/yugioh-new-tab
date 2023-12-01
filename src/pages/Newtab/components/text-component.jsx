import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import Fade from '@material-ui/core/Fade';
import './card.css';
import { infinity } from 'ldrs';

const TextComponent = () => {
  return (
    <div className="tiltComponent card card-active">
      <Fade in={true} style={{ transitionDelay: '300ms' }}>
        <Tilt
          glareEnable={true}
          tiltMaxAngleX={10}
          tiltMaxAngleY={20}
          perspective={2000}
          glareColor={'rgb(255,255,255)'}
        >
          <div>
            <h3>Hello world!</h3>
          </div>
        </Tilt>
      </Fade>
    </div>
  );
};

export default TextComponent;
