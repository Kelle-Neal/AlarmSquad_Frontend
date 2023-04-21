import Logo from '../img/AlarmSquad.png';
import Form from "react-bootstrap/Form";
import LoginButton from "../buttons/loginButton";

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
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email Address' />
          <Form.Text className='text-muted'>
            We will never share your information with anyone.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' />
        </Form.Group>

        <LoginButton />

      </Form>
    </>
  );
}

export default Login;