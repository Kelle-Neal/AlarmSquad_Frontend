import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

function FormNewAlarm({ alarm }) {
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [ringtone, setRingtone] = useState('');
  const [ringtones, setRingtones] = useState([]);
  const [alarmName, setAlarmName] = useState('');
  const [alarmTime, setAlarmTime] = useState({ hour: '01', minute: '00', ampm: 'AM' });
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(true);
  const [savedAlarms, setSavedAlarms] = useState([]);

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);};

  const handleHourChange = (e) => {
    setAlarmTime({ ...alarmTime, hour: e.target.value });};

  const handleMinuteChange = (e) => {
    setAlarmTime({ ...alarmTime, minute: e.target.value });};

  const handleAmPmChange = (e) => {
    setAlarmTime({ ...alarmTime, ampm: e.target.value });};

// ************* GET ALARM GROUP DATA *************
useEffect(() => {
  axios.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96b.gitpod.io/alarmGroups/")
    .then((response) => {
      setAlarmGroups(response.data);
    })
    .catch((error) => {
      console.error("Error fetching alarm groups:", error);
    });
}, []);
console.log('alarmGroups:', alarmGroups)

// ************* GET RINGTONE DATA *************
useEffect(() => {
  axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96b.gitpod.io/ringtones/')
    .then(response => {
      setRingtones(response.data);
    })
    .catch(error => {
      console.error('Error fetching ringtones:', error);
    });
}, []);
console.log('ringtones:', ringtones);

// ************* CREATE NEW ALARM *************
const handleSubmit = (event) => {
  event.preventDefault();
  const { hour, minute, ampm } = alarmTime;
  const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
  const newAlarm = {
    alarmName: alarmName,
    alarmDate: moment().format("YYYY-MM-DD"),
    alarmTime: time,
    alarmIsEnabled: alarmIsEnabled,
    alarmGroup: alarmGroup,
    ringtone: ringtone,
  };
  console.log('newAlarm:', newAlarm);

  const currentTime = moment().format('hh:mm A');
  if (time === currentTime) {
    alert('Alarm!');
    const selectedRingtone = ringtones.find((r) => r.name === ringtone);
    const audio = new Audio(selectedRingtone.url);
    audio.play();
  }

  axios.post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96b.gitpod.io/alarms/", newAlarm)
  .then((res) => {
    let data = res.data;
    setSavedAlarms([...savedAlarms, data]);
    console.log('savedAlarms:', savedAlarms);
  })
  .catch((error) => {
    console.error('There was a problem submitting the form:', error);
  });
  };    

  const hours = [...Array(12).keys()].map(hour => (hour + 1).toString().padStart(2, '0'));
  const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Alarm Name</Form.Label>
        <FormControl
          type="text"
          value={alarmName}
          onChange={handleNameChange} />
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Alarm Time</Form.Label>
        <FormControl
          as="select"
          value={alarmTime.hour}
          onChange={handleHourChange}>
          {hours.map(hour => <option key={hour}>{hour}</option>)}
        </FormControl>
        :
        <FormControl
          as="select"
          value={alarmTime.minute}
          onChange={handleMinuteChange}>
          {minutes.map(minute => <option key={minute}>{minute}</option>)}
        </FormControl>

        <FormControl
          as="select"
          value={alarmTime.ampm}
          onChange={handleAmPmChange}>
          {ampm.map(ampm => <option key={ampm}>{ampm}</option>)}
        </FormControl>
      </FormGroup>

      <FormGroup>
        <Form.Label>Enable Alarm</Form.Label>
        <Form.Check
          type="checkbox"
          checked={alarmIsEnabled}
          onChange={event => setAlarmIsEnabled(event.target.checked)}
        />
        <span style={{ marginLeft: "8px" }}>Enabled</span>
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Ringtone</Form.Label>
        <FormControl
          as="select"
          value={ringtone}
          onChange={event => setRingtone(event.target.value)}>
          <option value="">
            Select a ringtone
          </option>
          {ringtones.map(ringtone => (
            <option key={ringtone.id} value={ringtone.id}>
              {ringtone.name.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Alarm Group</Form.Label>
        <FormControl
          as="select"
          value={alarmGroup}
          onChange={(event) => setAlarmGroup(event.target.value)}>
          <option value="">Select an alarm group</option>
          {alarmGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.aGroupName}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <Button type="submit">Create Alarm</Button>
    </Form>
  );
}

export default FormNewAlarm;















