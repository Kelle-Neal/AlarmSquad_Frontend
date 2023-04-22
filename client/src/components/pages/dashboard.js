import React from "react";
import Logo from '../img/AlarmSquad.png';


function Dashboard () {
  return (
    <>
      <div id="dashboard">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
        />  
      </div>
    </>
  );
}

export default Dashboard;