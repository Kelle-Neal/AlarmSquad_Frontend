import React from "react";
import Logo from '../img/AlarmSquad.png'
import LoginForm from "../forms/formLogin";


function Login() {
  return (
    <>
      <div id="home">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
        />  
      </div>

      <LoginForm />

    </>
  );
}

export default Login;