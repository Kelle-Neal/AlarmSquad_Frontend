import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormLogin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Alarm
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Alarm</Modal.Title>
        </Modal.Header>

        <Modal.Body>


        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateAlarm}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

render(<Example />);