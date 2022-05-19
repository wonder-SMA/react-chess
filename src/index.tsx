import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';

import App from './App';
import './index.scss';
import ChessStore from './stores';

export const StoreContext = createContext(new ChessStore());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={new ChessStore()}>
    <App />
  </StoreContext.Provider>
);