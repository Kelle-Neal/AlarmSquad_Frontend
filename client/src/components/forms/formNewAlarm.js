// ************* IMPORT TOOLS *************
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, FormGroup, Form, Row, Image } from 'react-bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';
import CurrentTime from '../pieces/currentTime';
import CurrentDate from '../pieces/currentDate';
import Logo from '../img/AlarmSquad.png';

// ************* CREATE FORM FUNCTION *************
function FormNewAlarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmGroup, setAlarmGroup] = useState(undefined);
  const [alarmGroups, setAlarmGroups] = useState([]);
  // const [ringtone, setRingtone] = useState('');
  // const [ringtones, setRingtones] = useState([]);
  const [alarmName, setAlarmName] = useState('');
  const [savedAlarms, setSavedAlarms] = useState([]);
  // const [alarmAlert, setAlarmAlert] = useState([]);
  // const [isAlarmConfirmed, setIsAlarmConfirmed] = useState(false);
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(false);
  const navigate = useNavigate();


  const handleNameChange = (e) => {
    setAlarmName(e.target.value);};
  
  // const formatAlarmTime = (timeString) => {
  //   const date = new Date(`2022-01-01T${timeString}`);
  //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  // };  

// ************* GET ALARM GROUP DATA *************
  useEffect(() => {
    axios.get("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/")
      .then((response) => {
        setAlarmGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alarm groups:", error);
      });
    }, []);
    console.log('alarmGroups:', alarmGroups)

// // ************* GET RINGTONE DATA *************
// useEffect(() => {
//   axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96b.gitpod.io/ringtones/')
//     .then(response => {
//       setRingtones(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching ringtones:', error);
//     });
// }, []);
// console.log('ringtones:', ringtones);

// ************* CREATE NEW ALARM *************
  const handleSave = (event) => {
    event.preventDefault();
    setAlarmIsEnabled(true);
    // setIsAlarmConfirmed(true);
    const time = alarmTime;
    const newAlarm = {
      alarmName: alarmName,
      alarmTime: time,
      // ringtone: ringtone,
      alarmGroup: alarmGroup,
    };
    console.log('newAlarm:', newAlarm);

  axios.post("https://primal-asset-385412.ue.r.appspot.com/alarms/", newAlarm)
  .then((res) => {
    let data = res.data;
    setSavedAlarms([...savedAlarms, data]);
    console.log('savedAlarms:', savedAlarms);
    navigate('/AlarmDashboard');
  })

  .catch((error) => {
    console.error('There was a problem submitting the form:', error);
  });
  };
 
// ************* CREATE NEW ALARM & ADD ANOTHER *************
// const handleAddAnother = (e) => {
//   setAlarmIsEnabled(true);
//   // setIsAlarmConfirmed(true);
//   const time = alarmTime;
//   const newAlarm = {
//     alarmName: alarmName,
//     alarmTime: time,
//     // ringtone: ringtone,
//     alarmGroup: alarmGroup,
//   };
//   console.log('newAlarm:', newAlarm);

//   axios.post("https://primal-asset-385412.ue.r.appspot.com/alarms/", newAlarm)
//   .then((res) => {
//     e.preventDefault();
//     let data = res.data;
//     setSavedAlarms([...savedAlarms, data]);
//   })

//   .catch((error) => {
//     console.error('There was a problem submitting the form:', error);});
// };


// ************* CHECK FOR ALARM ALERT *************

  const checkAlarm = useCallback((currentTime) => {
    if (alarmTime === currentTime && alarmIsEnabled) {
      alert("It's Time!!");
      setAlarmIsEnabled(false);
    }
  }, [alarmTime, alarmIsEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = <CurrentTime />
      const currentTime = d    
      checkAlarm(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmIsEnabled, checkAlarm],);


// ************* CREATE FORM *************
  return (
    <>
      <CDBContainer
        className="d-flex justify-content-center">
        <CDBCard style={{ width: '30rem' }}>
          <CDBCardBody className="mx-4">
            <Row className="text-center mt-4 mb-2">
              <Image src={Logo} />              
              <p className="fw-bold h4"> Create New Alarm </p>
              <CurrentTime />
              <CurrentDate />
            </Row>
{/* ************* ALARM NAME ************* */}
            <div>
              <CDBInput 
                label="Alarm Name" 
                type="text" 
                value={alarmName}
                onChange={handleNameChange} />
            </div>

{/* ************* ALARM TIME ************* */}
            <div>
              <CDBInput
                type="time"
                id="alarm-time"
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
            <div>
              <Row className= "d-flex align-items-center justify-content-center">
                <CDBBtn
                  onClick={handleSave}
                  color="none"
                  style={{
                    width: '30%',
                    background:
                      'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                  className="btn-block mx-0">
                  Save Alarm
                </CDBBtn>
                {/* <CDBBtn
                  onClick={handleAddAnother}
                  color="none"
                  style={{
                    width: '60%',
                    background:
                      'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                  className="btn-block mx-0">
                  Save & Add Another
                </CDBBtn> */}
              </Row>  
            </div>
            <br></br>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </>  
  );
} 
export default FormNewAlarm;







// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import moment from 'moment';

// function FormNewAlarm({ alarm }) {
//   const [alarmGroup, setAlarmGroup] = useState('');
//   const [alarmGroups, setAlarmGroups] = useState([]);
//   const [ringtone, setRingtone] = useState('');
//   const [ringtones, setRingtones] = useState([]);
//   const [alarmName, setAlarmName] = useState('');
//   const [alarmTime, setAlarmTime] = useState({ hour: '01', minute: '00', ampm: 'AM' });
//   const [savedAlarms, setSavedAlarms] = useState([]);

//   const handleNameChange = (e) => {
//     setAlarmName(e.target.value);};

//   const handleHourChange = (e) => {
//     setAlarmTime({ ...alarmTime, hour: e.target.value });};

//   const handleMinuteChange = (e) => {
//     setAlarmTime({ ...alarmTime, minute: e.target.value });};

//   const handleAmPmChange = (e) => {
//     setAlarmTime({ ...alarmTime, ampm: e.target.value });};

// // ************* GET ALARM GROUP DATA *************
// useEffect(() => {
//   axios.get("https://https://primal-asset-385412.ue.r.appspot.com/alarmGroups/")
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
//   axios.get('https://primal-asset-385412.ue.r.appspot.com/ringtones/')
//     .then(response => {
//       setRingtones(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching ringtones:', error);
//     });
// }, []);
// console.log('ringtones:', ringtones);

// // ************* CREATE NEW ALARM *************
// const handleSubmit = (event) => {
//   event.preventDefault();
//   const { hour, minute, ampm } = alarmTime;
//   const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
//   const newAlarm = {
//     alarmName: alarmName,
//     alarmTime: time,
//     ringtone: ringtone,
//     alarmGroup: alarmGroup,
//   };
//   console.log('newAlarm:', newAlarm);

//   const currentTime = moment().format('hh:mm A');
//   if (time === currentTime) {
//     alert('Alarm!');
//     const selectedRingtone = ringtones.find((r) => r.name === ringtone);
//     const audio = new Audio(selectedRingtone.url);
//     audio.play();
//   }

//   axios.post("https://primal-asset-385412.ue.r.appspot.com/alarms/", newAlarm)
//   .then((res) => {
//     let data = res.data;
//     setSavedAlarms([...savedAlarms, data]);
//     console.log('savedAlarms:', savedAlarms);
//   })
//   .catch((error) => {
//     console.error('There was a problem submitting the form:', error);
//   });
//   };    

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
//         <Form.Label>Ringtone</Form.Label>
//         <FormControl
//           as="select"
//           value={ringtone}
//           onChange={event => setRingtone(event.target.value)}>
//           <option value="">
//             Select a ringtone
//           </option>
//           {ringtones.map(ringtone => (
//             <option key={ringtone.id} value={ringtone.id}>
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
//               {group.aGroupName}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>

//       <Button type="submit">Create Alarm</Button>
//     </Form>
//   );
// }

// export default FormNewAlarm;
