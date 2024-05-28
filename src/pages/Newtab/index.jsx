import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Newtab from './Newtab';
import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Newtab />
    </DndProvider>
  </Provider>
);
