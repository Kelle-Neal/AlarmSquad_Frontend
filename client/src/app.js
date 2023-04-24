import React from 'react';
import { Routes, Route } from "react-router-dom"

import NavBar from './components/navigation/navBar.js';
import Home from './components/pages/home.js';
import Login from './components/pages/login.js';
import Register from './components/pages/register.js';
import Clock from './components/pieces/currentTime.js';
// import Error from './components/pages/error.js';


function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Clock />
        <Date />
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="login" element={ <Login/> } />
          <Route path="register" element={ <Register/> } />
          {/* <Route element={<Error/>}/> */}
        </Routes>
      </div> 
    </>
  );
}  
export default App;
