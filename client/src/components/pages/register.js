import React from "react";
import Logo from '../img/AlarmSquad.png'
import RegisterForm from "../forms/formRegister";


function Register() {
  return (
    <>
      <div id="home">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
        />  
      </div>

      <RegisterForm />

    </>
  );
}

export default Register;