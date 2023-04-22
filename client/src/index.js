import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './context/GlobalState';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './app'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </GlobalProvider>
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
