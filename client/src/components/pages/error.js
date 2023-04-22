import React from "react";
import Logo from '../img/AlarmSquad.png';


const Error = () => {
  return (
    <>
      <div id="home">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
        />  
      </div>
      
      <div>
        <h1>Error: Page Does Not Exist!</h1>
      </div>
    </>
  );
}

export default Error;