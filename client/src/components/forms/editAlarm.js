import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

function FormEditAlarm({ alarm, onClose }) {
  const [alarmGroup, setAlarmGroup] = useState(alarm.alarmGroup);
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [ringtone, setRingtone] = useState(alarm.ringtone.name);
  const [ringtones, setRingtones] = useState([]);
  const [alarmName, setAlarmName] = useState(alarm.alarmName);
  const [alarmTime, setAlarmTime] = useState({ hour: '', minute: '', ampm: '' });
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(alarm.isEnabled);
  const [savedAlarms, setSavedAlarms] = useState([]);

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);
  };

  const handleHourChange = (e) => {
    setAlarmTime({ ...alarmTime, hour: parseInt(e.target.value) });
  };

  const handleMinuteChange = (e) => {
    setAlarmTime({ ...alarmTime, minute: e.target.value });
  };

  const handleAmPmChange = (e) => {
    setAlarmTime({ ...alarmTime, ampm: e.target.value });
  };

  useEffect(() => {
    axios
      .get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/")
      .then((response) => {
        setAlarmGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alarm groups:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/ringtones/")
      .then((response) => {
        setRingtones(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ringtones:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { hour, minute, ampm } = alarmTime;
    const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
    const selectedRingtone = ringtones.find((r) => r.name === ringtone);
    const updatedAlarm = {
      ...alarm,
      alarmName: alarmName,
      alarmTime: time,
      alarmGroup: alarmGroup,
      ringtone: { name: ringtone, url: selectedRingtone.url },
      isEnabled: alarmIsEnabled,
    };

    axios
      .put(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${alarm.id}/`, updatedAlarm)
      .then((res) => {
        let data = res.data;
        setSavedAlarms([...savedAlarms, data]);

        // Check if the alarmTime is equal to the currentTime
        const currentTime = moment().format('hh:mm A');
        if (time === currentTime) {
          // Create a popup
          alert('Alarm!');

          // Play a ringtone
          const audio = new Audio(ringtone);
          audio.play();
        }

        onClose();
      })
      .catch((error) => {
        console.error('There was a problem submitting the form:', error);
      });
  };

  const handleCancel = () => {
    setAlarmGroup(alarm.alarmGroup);
    setRingtone(alarm.ringtone.name);
    setAlarmName(alarm.alarmName);
    setAlarmTime({ hour: '', minute: '', ampm: '' });
    setAlarmIsEnabled(alarm.isEnabled);
  };
  
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Name</Form.Label>
        <FormControl type="text" value={alarmName} onChange={handleNameChange} />
      </FormGroup>

      <FormGroup>
        <Form.Label>Time</Form.Label>
        <div>
          <FormControl as="select" value={alarmTime.hour} onChange={handleHourChange}>
            {/* options for hour */}
          </FormControl>
          :
          <FormControl as="select" value={alarmTime.minute} onChange={handleMinuteChange}>
            {/* options for minute */}
          </FormControl>
          <FormControl as="select" value={alarmTime.ampm} onChange={handleAmPmChange}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </FormControl>
        </div>
      </FormGroup>

      <FormControl as="select" value={alarmGroup} onChange={(e) => setAlarmGroup(e.target.value)}>
        {alarmGroups.map((group) => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))}
      </FormControl>


      <FormGroup>
        <Form.Label>Ringtone</Form.Label>
        <FormControl as="select" value={ringtone} onChange={(e) => setRingtone(e.target.value)}>
          {/* options for ringtone */}
        </FormControl>
      </FormGroup>

      <FormGroup>
        <Form.Check type="checkbox" label="Enabled" checked={alarmIsEnabled} onChange={(e) => setAlarmIsEnabled(e.target.checked)} />
      </FormGroup>
      <Button variant="primary" type="submit">Save</Button>
      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
    </Form>
  );
}

export default FormEditAlarm;