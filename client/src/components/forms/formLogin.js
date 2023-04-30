import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function FormLogin() {
  // const myModal = document.getElementById('myModal')
  // const myInput = document.getElementById('myInput')

  // myModal.addEventListener('shown.bs.modal', () => {
  //   myInput.focus()
  // })



  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Login
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter Email Address' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' />
                </Form.Group>
              </Form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </>  
  );
}

export default FormLogin;