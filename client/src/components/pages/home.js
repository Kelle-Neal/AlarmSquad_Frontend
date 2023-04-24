import React from "react";
import Logo from '../img/AlarmSquad.png';


function Home () {
  return (
    <>
      <div id="home">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
          width={'75%'}
        />  
      </div>
    </>
  );
}

export default Home;