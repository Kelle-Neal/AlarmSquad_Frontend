import React from 'react';


import NavBar from './components/navBar.js';
// import Home from './components/pages/home.js';
import Login from './components/pages/login.js';
import RegisterForm from './components/pages/registerForm.js';

function App() {
  return (
    <>
      <div className='container-fluid fixed-top pt-5' id="navBars">
        <NavBar />
      </div>
      <div className = 'container-fluid'>
        {/* <Home /> */}
        <Login />
        <RegisterForm />

      </div>
    </>
  );
}

export default App;
