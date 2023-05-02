import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, FormGroup, Form, Row, Image } from 'react-bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';
import CurrentTime from '../pieces/currentTime';
import CurrentDate from '../pieces/currentDate';
import Logo from '../img/AlarmSquad.png';

function FormEditAlarm() {
  const [alarm, setAlarm] = useState({});
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [alarmName, setAlarmName] = useState('');
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const alarmId = new URLSearchParams(location.search).get("alarmId");

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);
  };

  useEffect(() => {
    axios.get(`https://primal-asset-385412.ue.r.appspot.com/alarms/${alarmId}/`)
      .then((response) => {
        setAlarm(response.data);
        setAlarmTime(response.data.alarmTime);
        setAlarmName(response.data.alarmName);
        setAlarmGroup(response.data.alarmGroup);
      })
      .catch((error) => {
        console.error(`Error fetching alarm with id ${alarmId}:`, error);
      });
  }, [alarmId]);

  useEffect(() => {
    axios.get("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/")
      .then((response) => {
        setAlarmGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alarm groups:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlarmIsEnabled(true);
    const updatedAlarm = {
      alarmName: alarmName,
      alarmTime: alarmTime,
      alarmGroup: alarmGroup,
    };
    console.log('updatedAlarm:', updatedAlarm);
    axios.put(`https://primal-asset-385412.ue.r.appspot.com/alarms/${alarmId}/`, updatedAlarm)
      .then((res) => {
        let data = res.data;
        setAlarm(data);
        navigate('/AlarmList');
      })
      .catch((error) => {
        console.error(`There was a problem updating the alarm with id ${alarmId}:`, error);
      });
  };

  const checkAlarm = useCallback((currentTime) => {
    if (alarmTime === currentTime && alarmIsEnabled) {
      alert("It's Time!!");
      setAlarmIsEnabled(false);
    }
  }, [alarmTime, alarmIsEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = <CurrentTime />;
      const currentTime = d;
      checkAlarm(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmIsEnabled, checkAlarm]);

  return (
    <>
      <CDBContainer
        className="d-flex justify-content-center">
        <CDBCard style={{ width: '30rem' }}>
          <CDBCardBody className="mx-4">
            <Row className="text-center mt-4 mb-2">
              <Image src={Logo} />              
              <p className="fw-bold h4"> Edit Alarm </p>
              <CurrentTime />
              <CurrentDate />
            </Row>
{/* ************* ALARM NAME ************* */}
            <div key={`alarm-${alarm.id}`}>
              <CDBInput 
                label="Alarm Name" 
                type="text" 
                id={`alarm-${alarm.id}`}
                value={alarmName}
                onChange={handleNameChange} />
            </div>
{/* ************* ALARM TIME ************* */}
            <div>
              <CDBInput
                type="time"
                id={`alarm-${alarm.id}`}
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
              />
            </div>
{/* ************* ADD ALARM TO GROUP ************* */}
            <div>
              <FormGroup>
                <Form.Label>Alarm Group</Form.Label>
                <FormControl
                  as="select"
                  id={`alarm-${alarm.id}`}
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
            </div>
            <br></br>

{/* ************* SAVE ALARM ************* */}
            <div className="d-flex align-items-center justify-content-center">
              <CDBBtn
                onClick={handleSubmit}
                color="none"
                style={{
                  width: '30%',
                  background:
                    'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                className="btn-block mx-0">
                Update Alarm
              </CDBBtn>
            </div>
            <br></br>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </>  
  );
} 
 
export default FormEditAlarm;



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import moment from 'moment';


// function FormEditAlarm({ alarm, onClose }) {
//   const [alarmGroup, setAlarmGroup] = useState(alarm.alarmGroup || '');
//   const [alarmGroups, setAlarmGroups] = useState(alarm.alarmGroups || []);
//   const [ringtone, setRingtone] = useState(alarm.ringtone || '');
//   const [ringtones, setRingtones] = useState(alarm.ringtones || []);
//   const [alarmName, setAlarmName] = useState(alarm.alarmName || '');
//   const [alarmTime, setAlarmTime] = useState(alarm.alarmTime || { hour: '01', minute: '00', ampm: 'AM' });
//   const [alarmIsEnabled, setAlarmIsEnabled] = useState(alarm.alarmIsEnabled || true);
//   const [savedAlarms, setSavedAlarms] = useState([]);

//   const handleNameChange = (e) => {
//     setAlarmName(e.target.value);};

//   const handleHourChange = (e) => {
//     setAlarmTime({ ...alarmTime, hour: parseInt(e.target.value) });};

//   const handleMinuteChange = (e) => {
//     setAlarmTime({ ...alarmTime, minute: e.target.value });};

//   const handleAmPmChange = (e) => {
//     setAlarmTime({ ...alarmTime, ampm: e.target.value });};

// // ************* GET ALARM GROUP DATA *************
// useEffect(() => {
//   axios.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/")
//     .then((response) => {
//       setAlarmGroups(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching alarm groups:", error);
//     });
// }, []);
// console.log('alarmGroups:', alarmGroups)

// // ************* GET RINGTONE DATA *************
// useEffect(() => {
//   axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/ringtones/')
//     .then(response => {
//       setRingtones(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching ringtones:', error);
//     });
// }, []);
// console.log('ringtones:', ringtones);

// // ************* EDIT ALARM *************
// const handleEdit = (event, id) => {
//   event.preventDefault();
//   window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
//   const { hour, minute, ampm } = alarmTime;
//   const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
//   const updatedAlarm = {
//     alarmName: alarmName,
//     alarmDate: moment().format("YYYY-MM-DD"),
//     alarmTime: time,
//     alarmIsEnabled: alarmIsEnabled,
//     alarmGroup: alarmGroup,
//     ringtone: ringtone,
//   };
//   console.log('updatedAlarm:', updatedAlarm)

//   const currentTime = moment().format('hh:mm A');
//   if (time === currentTime) {
//     alert('Alarm!');
//     const selectedRingtone = ringtones.find((r) => r.name === ringtone);
//     const audio = new Audio(selectedRingtone.url);
//     audio.play();
//   }

//   axios.put(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${alarm.id}`, updatedAlarm)
//   .then((res) => {
//     let data = res.data;
//     setSavedAlarms([...savedAlarms, data]);
//     console.log('updatedAlarm:', updatedAlarm);
//   })
//   .catch((error) => {
//     console.error("Error editing alarm:", error);
//   });
//   onClose();
// };


// const handleSubmit = (e) => {
//   e.preventDefault();
//   // const updatedAlarm = {
//   //   alarmName: alarmName,
//   //   alarmDate: moment().format("YYYY-MM-DD"),
//   //   alarmTime: time,
//   //   alarmIsEnabled: alarmIsEnabled,
//   //   alarmGroup: alarmGroup,
//   //   ringtone: { name: ringtone, url: '' },
//   // };
//   handleEdit([]);
// };

//   const hours = [...Array(12).keys()].map(hour => (hour + 1).toString().padStart(2, '0'));
//   const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, '0'));
//   const ampm = ['AM', 'PM'];

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Form.Label>Alarm Name</Form.Label>
//         <FormControl 
//           type="text"
//           value={alarmName} 
//           onChange={handleNameChange} />
//       </FormGroup>

//       <FormGroup>
//         <Form.Label>Alarm Time</Form.Label>
//         <FormControl 
//           as="select"
//           value={alarmTime.hour} 
//           onChange={handleHourChange}>
//           {hours.map(hour => <option key={hour}>{hour}</option>)}
//         </FormControl>
//         :
//         <FormControl
//           as="select"
//           value={alarmTime.minute}
//           onChange={handleMinuteChange}>
//           {minutes.map(minute => <option key={minute}>{minute}</option>)}
//         </FormControl>

//         <FormControl 
//           as="select" 
//           value={alarmTime.ampm} 
//           onChange={handleAmPmChange}>
//           {ampm.map(ampm => <option key={ampm}>{ampm}</option>)}
//         </FormControl>
//       </FormGroup>

//       <FormGroup>
//         <Form.Label>Enable Alarm</Form.Label>
//         <Form.Check
//           type="checkbox" 
//           checked={alarmIsEnabled} 
//           onChange={(e) => setAlarmIsEnabled(e.target.checked)} 
//           />
//           <span style={{ marginLeft: "8px" }}>Enabled</span>
//         </FormGroup>
//         <FormGroup>
//         <Form.Label>Ringtone</Form.Label>
//         <FormControl
//           as="select"
//           value={ringtone}
//           onChange={event => setRingtone(event.target.value)}>
//           <option value="">
//             Select a ringtone
//           </option>
//           {ringtones.map(ringtone => (
//             <option key={ringtone.id} value={ringtone.url}>
//               {ringtone.name.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>
          
//       <FormGroup>
//         <Form.Label>Alarm Group</Form.Label>
//         <FormControl
//           as="select"
//           value={alarmGroup}
//           onChange={(event) => setAlarmGroup(event.target.value)}>
//           <option value="">Select an alarm group</option>
//           {alarmGroups.map((group) => (
//             <option key={group.id} value={group.id}>
//               {group.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>


//       <Button type="submit">Save</Button>
//     </Form>
//   );
// }

// export default FormEditAlarm;