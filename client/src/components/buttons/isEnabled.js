import Form from 'react-bootstrap/Form';

function IsEnabled() {
  return (
    <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="On"
      />
      <Form.Check 
        disabled
        type="switch"
        label="Off"
        id="disabled-custom-switch"
      />
    </Form>
  );
}

export default IsEnabled;