import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBLink,
  CDBBtn,
  CDBContainer,
} from 'cdbreact';

function FormLogin() {
  const [, dispatch ] = useGlobalState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // const BASE_URL = 'https://primal-asset-385412.ue.r.appspot.com/'
  const handleLogin = (e) => {
    e.preventDefault();
  };

  AuthService
    .login(username, password)
    .then(async (resp) => {
      let data = jwtDecode(resp.access)
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data
      })
      navigate('/AlarmList')
    });
  

  return (
    <CDBContainer
      className="d-flex justify-content-center">
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4"> Login </p>
          </div>

          <CDBInput 
            label="E-mail" 
            type="email"
            htmlFor="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <CDBInput 
            label="Password" 
            type="password" 
            htmlFor="pass"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="d-flex mt-4 align-items-center">
            <CDBBtn
              onClick={handleLogin}
              color="none"
              style={{
                width: '30%',
                background:
                  'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',
              }}
              className="btn-block mx-0"
            >
              Login
            </CDBBtn>
            <p className="ms-auto mb-0">
              Don't have an account?{' '}
              <CDBLink className="d-inline p-0" to="https://3000-kelleneal-alarmsquadfro-sw7uxmgazln.ws-us96b.gitpod.io/FormRegister">
                Register
              </CDBLink>
            </p>
          </div>
          
          <br></br>

        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
export default FormLogin;
