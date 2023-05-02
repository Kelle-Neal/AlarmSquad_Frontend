import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

function SelectAlarmGroup() {
  const [alarmGroups, setAlarmGroups] = useState([]);

  useEffect(() => {
    fetch('https://primal-asset-385412.ue.r.appspot.com/alarmGroups/')
      .then(response => response.json())
      .then(data => setAlarmGroups(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Form>
      <FormGroup controlId="my-select-field">
        <Form.Label>Add to alarm group</Form.Label>
        <FormControl as="select">
          {alarmGroups.map(alarmGroup => (
            <option key={alarmGroup.id} value={alarmGroup.id}>{alarmGroup.aGroupName}</option>
          ))}
        </FormControl>
      </FormGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SelectAlarmGroup;

