import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

function NewAlarmForm() {
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);

  const [ringtone, setRingtone] = useState('');
  const [ringtones, setRingtones] = useState([]);

  const [alarmName, setAlarmName] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(true);


  useEffect(() => {
    fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
      .then(response => response.json())
      .then(data => setAlarmGroups(data))
      .catch(error => console.error("Error fetching alarm groups:", error));
  }, []);
  
  useEffect(() => {
    fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/ringtones/')
      .then(response => response.json())
      .then(data => setRingtones(data))
      .catch(error => console.error("Error fetching ringtones:", error));
  }, []);
  
  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      alarmGroup: alarmGroup,
      ringtone: ringtone,
      alarmName: alarmName,
      alarmTime: alarmTime,
      alarmIsEnabled: alarmIsEnabled,
    };

    fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // reset form or redirect to success page
    })
    .catch(error => {
      console.error('There was a problem submitting the form:', error);
      // display error message to user
    });
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Alarm Name</Form.Label>
        <FormControl
          type="text"
          value={alarmName}
          onChange={event => setAlarmName(event.target.value)}
        />
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Alarm Time</Form.Label>
        <FormControl
          type="time"
          value={alarmTime}
          onChange={event => setAlarmTime(event.target.value)}
        />
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Enable Alarm</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enabled"
          checked={alarmIsEnabled}
          onChange={event => setAlarmIsEnabled(event.target.checked)}
        />
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Ringtone</Form.Label>
        <FormControl
          as="select"
          value={ringtone}
          onChange={event => setRingtone(event.target.value)}
        >
          <option value="">
            Select a ringtone
          </option>
          {ringtones.map(ringtone => (
            <option key={ringtone.id} value={ringtone.url}>
              {ringtone.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Alarm Group</Form.Label>
        <FormControl 
          as="select" 
          value={alarmGroup}
          onChange={event => setAlarmGroup(event.target.value)}
        >
          <option value="">
            Select a group
          </option>
          {alarmGroups.map(alarmGroup => (
            <option key={alarmGroup.id} value={alarmGroup.url}>
              {alarmGroup.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <Button type="submit">Create Alarm</Button>
    </Form>
  );
}

export default NewAlarmForm;
