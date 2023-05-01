// import React, { useState, useEffect } from 'react';
// import { Button, Card, Form, Table } from 'react-bootstrap';
// import {
//   CDBInput,
//   CDBCard,
//   CDBCardBody,
//   CDBBtn,
//   CDBContainer,
//   CDBDropDown,
//   CDBDropDownMenu,
//   CDBDropDownToggle,
// } from 'cdbreact';
// import axios from 'axios';
// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/'


// function FormEditAlarm() {
//   const [alarmName, setAlarmName] = useState('');
//   const [alarmTime, setAlarmTime] = useState("");
//   const [alarmGroup, setAlarmGroup] = useState('');
//   const [alarmGroups, setAlarmGroups] = useState([]);
//   const [alarms, setAlarms] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [savedAlarms, setSavedAlarms] = useState([]);
//   const [isAlarmActive, setIsAlarmActive] = useState(false);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         baseURL: BASE_URL,
//         url: '/alarms/',
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();

//     const getAlarmGroups = async () => {
//       let config = {
//         baseURL: BASE_URL,
//         url: '/alarmGroups/',
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarmGroups(response.data);
//     }
//     getAlarms();
//   }, [])

//   useEffect(() => {
//     axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
//       .then(response => {
//         setGroups(response.data);
//       });
//     axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/')
//       .then(response => {
//         setAlarms(response.data);
//       });
//   }, []);

//   const handleToggle = (event, id) => {
//     event.preventDefault();
//     const index = alarms.findIndex(alarm => alarm.id === id);
//     const alarm = alarms[index];
//     axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
//       .then(response => {
//         setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
//       });
//   };

//   const handleEdit = (event, id) => {
//     event.preventDefault();
//     window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
//   };

//   const handleAlarmUpdate = (id, updatedFields) => {
//     axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/`, updatedFields)
//       .then(response => {
//         const updatedAlarm = response.data;
//         setAlarms(alarms.map(alarm => alarm.id === updatedAlarm.id ? updatedAlarm : alarm));
//       });
//   };

//   const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

//   return (
//     <>
//       {groups.map(group => (
//         <Card key={group.id} className="mb-4">
//           <Card.Body>
//             <Card.Title>{group.alarmGroupName}</Card.Title>
//             <Form.Check
//               type="switch"
//               id={`group-${group.id}`}
//               label="On/Off"
//               checked={group.alarmGroupIsEnabled}
//               onChange={() => {
//                 axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/${group.id}/`, { alarmGroupIsEnabled: !group.alarmGroupIsEnabled })
//                   .then(response => {
//                     setGroups(groups.map(g => g.id === group.id ? response.data : g));
//                   });
//               }}
//             />
//           </Card.Body>
//         </Card>
//       ))}
//       {alarmsWithoutGroup.map(alarm => (
//         <Card key={alarm.id} className="mb-4">
//           <Card.Body>
//             <Card.Title>{alarm.alarmName}</Card.Title>
//             <Table responsive>
//               <tbody>
//                 <tr>
//                   <td>Time:</td>
//                   <td>{alarm.alarmTime}</td>
//                 </tr>
//                 <tr>
//                   <td>Enabled:</td>
//                   <td>
//                     <Form.Check
//                       type

















import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';


function FormEditAlarm({ alarm, onClose }) {
  const [alarmGroup, setAlarmGroup] = useState(alarm.alarmGroup || '');
  const [alarmGroups, setAlarmGroups] = useState(alarm.alarmGroups || []);
  const [ringtone, setRingtone] = useState(alarm.ringtone || '');
  const [ringtones, setRingtones] = useState(alarm.ringtones || []);
  const [alarmName, setAlarmName] = useState(alarm.alarmName || '');
  const [alarmTime, setAlarmTime] = useState(alarm.alarmTime || { hour: '01', minute: '00', ampm: 'AM' });
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(alarm.alarmIsEnabled || true);
  const [savedAlarms, setSavedAlarms] = useState([]);

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);};

  const handleHourChange = (e) => {
    setAlarmTime({ ...alarmTime, hour: parseInt(e.target.value) });};

  const handleMinuteChange = (e) => {
    setAlarmTime({ ...alarmTime, minute: e.target.value });};

  const handleAmPmChange = (e) => {
    setAlarmTime({ ...alarmTime, ampm: e.target.value });};

// ************* GET ALARM GROUP DATA *************
useEffect(() => {
  axios.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/")
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
  axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/ringtones/')
    .then(response => {
      setRingtones(response.data);
    })
    .catch(error => {
      console.error('Error fetching ringtones:', error);
    });
}, []);
console.log('ringtones:', ringtones);

// ************* EDIT ALARM *************
const handleEdit = (event, id) => {
  event.preventDefault();
  window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
  const { hour, minute, ampm } = alarmTime;
  const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
  const updatedAlarm = {
    alarmName: alarmName,
    alarmDate: moment().format("YYYY-MM-DD"),
    alarmTime: time,
    alarmIsEnabled: alarmIsEnabled,
    alarmGroup: alarmGroup,
    ringtone: ringtone,
  };
  console.log('updatedAlarm:', updatedAlarm)

  const currentTime = moment().format('hh:mm A');
  if (time === currentTime) {
    alert('Alarm!');
    const selectedRingtone = ringtones.find((r) => r.name === ringtone);
    const audio = new Audio(selectedRingtone.url);
    audio.play();
  }

  axios.put(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${alarm.id}`, updatedAlarm)
  .then((res) => {
    let data = res.data;
    setSavedAlarms([...savedAlarms, data]);
    console.log('updatedAlarm:', updatedAlarm);
  })
  .catch((error) => {
    console.error("Error editing alarm:", error);
  });
  onClose();
};


const handleSubmit = (e) => {
  e.preventDefault();
  // const updatedAlarm = {
  //   alarmName: alarmName,
  //   alarmDate: moment().format("YYYY-MM-DD"),
  //   alarmTime: time,
  //   alarmIsEnabled: alarmIsEnabled,
  //   alarmGroup: alarmGroup,
  //   ringtone: { name: ringtone, url: '' },
  // };
  handleEdit([]);
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
          onChange={(e) => setAlarmIsEnabled(e.target.checked)} 
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
            <option key={ringtone.id} value={ringtone.url}>
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
              {group.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>


      <Button type="submit">Save</Button>
    </Form>
  );
}

export default FormEditAlarm;