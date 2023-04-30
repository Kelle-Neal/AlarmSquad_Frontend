import React from 'react';
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBLink,
  CDBBtn,
  CDBContainer,
} from 'cdbreact';

function FormLogin() {

  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4"> Login </p>
          </div>
          <CDBInput label="E-mail" type="email" />
          <CDBInput label="Password" type="password" />

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
              <CDBLink className="d-inline p-0" to="https://3000-kelleneal-alarmsquadfro-sw7uxmgazln.ws-us96b.gitpod.io/formRegister">
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
