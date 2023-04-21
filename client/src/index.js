import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './context/GlobalState';
import App from './app'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>  
  </GlobalProvider>
);
