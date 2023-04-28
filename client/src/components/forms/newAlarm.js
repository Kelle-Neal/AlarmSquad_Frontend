import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

function FormNewAlarm() {
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [ringtone, setRingtone] = useState('');
  const [ringtones, setRingtones] = useState([]);
  const [alarmName, setAlarmName] = useState('');
  const [alarmTime, setAlarmTime] = useState({ hour: '', minute: '', ampm: '' });
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(true);
  const [savedAlarms, setSavedAlarms] = useState([]);

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);
  };

  const handleHourChange = (e) => {
    setAlarmTime({ ...alarmTime, hour: e.target.value });
  };

  const handleMinuteChange = (e) => {
    setAlarmTime({ ...alarmTime, minute: e.target.value });
  };

  const handleAmPmChange = (e) => {
    setAlarmTime({ ...alarmTime, ampm: e.target.value });
  };

// ************* GET ALARM GROUP DATA *************

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

// ************* CREATE NEW ALARM *************
const handleSubmit = (event) => {
  event.preventDefault();
  const { hour, minute, ampm } = alarmTime;
  const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
  const newAlarm = {
    alarmName: alarmName,
    alarmDate: moment().format("YYYY-MM-DD"),
    alarmTime: time,
    alarmGroup: alarmGroup,
    ringtone: { name: ringtone, url: '' },
  };

  console.log('newAlarm:', newAlarm);

  axios
    .post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/", newAlarm)
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
    })
    .catch(error => {
      console.error('There was a problem submitting the form:', error);
    });
};

  console.log('savedAlarms:', savedAlarms);

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
          onChange={handleNameChange}
          // onChange={event => setAlarmName(event.target.value)}
        />
      </FormGroup>
  
      <FormGroup>
        <Form.Label>Alarm Time</Form.Label>
        <FormControl
          as="select"
          value={alarmTime.hour}
          onChange={handleHourChange}
        >
          {hours.map(hour => <option key={hour}>{hour}</option>)}
        </FormControl>
        :
        <FormControl
          as="select"
          value={alarmTime.minute}
          onChange={handleMinuteChange}
        >
          {minutes.map(minute => <option key={minute}>{minute}</option>)}
        </FormControl>
        <FormControl
          as="select"
          value={alarmTime.ampm}
          onChange={handleAmPmChange}
        >
          {ampm.map(ampm => <option key={ampm}>{ampm}</option>)}
        </FormControl>
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
          onChange={(event) => setAlarmGroup(event.target.value)}
        >
          <option value="">Select an alarm group</option>
          {alarmGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </FormControl>
      </FormGroup>

      <Button type="submit">Create Alarm</Button>
    </Form>
  );
}

export default FormNewAlarm;






















// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import moment from 'moment';


// function NewAlarmForm() {
//   const [alarmGroup, setAlarmGroup] = useState('');
//   const [alarmGroups, setAlarmGroups] = useState([]);

//   const [ringtone, setRingtone] = useState('');
//   const [ringtones, setRingtones] = useState([]);

//   const [alarmName, setAlarmName] = useState('');
//   const [alarmTime, setAlarmTime] = useState({ hour: '', minute: '', ampm: '' });
//   const [alarmIsEnabled, setAlarmIsEnabled] = useState(true);
//   const [alarmRepeat, setAlarmRepeat] = useState(false);
//   const [alarmDate, setAlarmDate] = useState('');
//   const [alarmDays, setAlarmDays] = useState('');
//   const [alarmSilent, setAlarmSilent] = useState(false);
//   const [alarmVolume, setAlarmVolume] = useState(0);
//   const [savedAlarms, setSavedAlarms] = useState([]);

//   // const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'));

//   const handleNameChange = (e) => {
//     setAlarmName(e.target.value);
//   };

//   const handleHourChange = (e) => {
//     setAlarmTime({ ...alarmTime, hour: e.target.value });
//   };

//   const handleMinuteChange = (e) => {
//     setAlarmTime({ ...alarmTime, minute: e.target.value });
//   };

//   const handleAmPmChange = (e) => {
//     setAlarmTime({ ...alarmTime, ampm: e.target.value });
//   };

// // ************* GET ALARM GROUP DATA *************

// useEffect(() => {
//   axios
//     .get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/")
//     .then((response) => {
//       setAlarmGroups(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching alarm groups:", error);
//     });
// }, []);

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

// // ************* CREATE NEW ALARM *************
// const handleSubmit = (event) => {
//   event.preventDefault();
//   const { hour, minute, ampm } = alarmTime;
//   const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;
//   const newAlarm = {
//     alarmName: alarmName,
//     alarmDate: moment().format("YYYY-MM-DD"),
//     alarmTime: time,
//     alarmGroup: alarmGroup,
//     alarmVolume: alarmVolume,
//     alarmDays: alarmDays,
//     ringtone: { name: ringtone, url: '' },
//   };

//   console.log('newAlarm:', newAlarm);

//   axios
//     .post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/", newAlarm)
//     .then((res) => {
//       let data = res.data;
//       setSavedAlarms([...savedAlarms, data]);

//       // Check if the alarmTime is equal to the currentTime
//       const currentTime = moment().format('hh:mm A');
//       if (time === currentTime) {
//         // Create a popup
//         alert('Alarm!');

//         // Play a ringtone
//         const audio = new Audio(ringtone);
//         audio.play();
//       }
//     })
//     .catch(error => {
//       console.error('There was a problem submitting the form:', error);
//     });
// };


//   console.log('savedAlarms:', savedAlarms);

//   const hours = [...Array(12).keys()].map(hour => (hour + 1).toString().padStart(2, '0'));
//   const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, '0'));
//   const ampm = ['AM', 'PM'];


//   const handleDaysChange = event => {
//     const { value } = event.target;
//     let daysString = '';
//     if (value.includes('monday')) daysString += 'Monday,';
//     if (value.includes('tuesday')) daysString += 'Tuesday,';
//     if (value.includes('wednesday')) daysString += 'Wednesday,';
//     if (value.includes('thursday')) daysString += 'Thursday,';
//     if (value.includes('friday')) daysString += 'Friday,';
//     if (value.includes('saturday')) daysString += 'Saturday,';
//     if (value.includes('sunday')) daysString += 'Sunday,';
//     setAlarmDays(daysString.slice(0, -1));
//   };
  
//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Form.Label>Alarm Name</Form.Label>
//         <FormControl
//           type="text"
//           value={alarmName}
//           onChange={handleNameChange}
//           // onChange={event => setAlarmName(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Time</Form.Label>
//         <FormControl
//           as="select"
//           value={alarmTime.hour}
//           onChange={handleHourChange}
//         >
//           {hours.map(hour => <option key={hour}>{hour}</option>)}
//         </FormControl>
//         :
//         <FormControl
//           as="select"
//           value={alarmTime.minute}
//           onChange={handleMinuteChange}
//         >
//           {minutes.map(minute => <option key={minute}>{minute}</option>)}
//         </FormControl>
//         <FormControl
//           as="select"
//           value={alarmTime.ampm}
//           onChange={handleAmPmChange}
//         >
//           {ampm.map(ampm => <option key={ampm}>{ampm}</option>)}
//         </FormControl>
//       </FormGroup>

  
//       <FormGroup>
//         <Form.Label>Enable Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Enabled"
//           checked={alarmIsEnabled}
//           onChange={event => setAlarmIsEnabled(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Repeat Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Repeat"
//           checked={alarmRepeat}
//           onChange={event => setAlarmRepeat(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Date</Form.Label>
//         <FormControl
//           type="date"
//           value={alarmDate}
//           onChange={event => setAlarmDate(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Days</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Monday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Tuesday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Wednesday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Thursday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Friday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Saturday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Sunday"
//           onChange={handleDaysChange}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Silent Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Silent"
//           checked={alarmSilent}
//           onChange={event => setAlarmSilent(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Ringtone</Form.Label>
//         <FormControl
//           as="select"
//           value={ringtone}
//           onChange={event => setRingtone(event.target.value)}
//         >
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
//         <Form.Label>Volume</Form.Label>
//         <FormControl
//           type="range"
//           min="0"
//           max="100"
//           value={alarmVolume}
//           onChange={event => setAlarmVolume(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Group</Form.Label>
//         <FormControl
//           as="select"
//           value={alarmGroup}
//           onChange={(event) => setAlarmGroup(event.target.value)}
//         >
//           <option value="">Select an alarm group</option>
//           {alarmGroups.map((group) => (
//             <option key={group.id} value={group.id}>
//               {group.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>


//       <Button type="submit">Create Alarm</Button>
//     </Form>
//   );
// }

// export default NewAlarmForm;











// import React, { useState, useEffect } from 'react';
// import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// function NewAlarmForm() {
//   const [alarmGroup, setAlarmGroup] = useState('');
//   const [alarmGroups, setAlarmGroups] = useState([]);

//   const [ringtone, setRingtone] = useState('');
//   const [ringtones, setRingtones] = useState([]);

//   const [alarmName, setAlarmName] = useState('');
//   const [alarmTime, setAlarmTime] = useState('');
//   const [alarmIsEnabled, setAlarmIsEnabled] = useState(true);
//   const [alarmRepeat, setAlarmRepeat] = useState(false);
//   const [alarmDate, setAlarmDate] = useState('');
//   const [alarmDays, setAlarmDays] = useState('');
//   const [alarmSilent, setAlarmSilent] = useState(false);

//   const [alarmVolume, setAlarmVolume] = useState('');

//   useEffect(() => {
//     fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
//       .then(response => response.json())
//       .then(data => setAlarmGroups(data))
//       .catch(error => console.error("Error fetching alarm groups:", error));
//   }, []);
//   console.log('alarmGroups:', alarmGroups);


  
//   useEffect(() => {
//     fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/ringtones/')
//       .then(response => response.json())
//       .then(data => setRingtones(data))
//       .catch(error => console.error("Error fetching ringtones:", error));
//   }, []);
//   console.log('ringtones:', ringtones);


//   const handleSubmit = event => {
//     event.preventDefault();
//     const data = {
//       alarmName: alarmName,
//       alarmTime: alarmTime,
//       alarmIsEnabled: alarmIsEnabled,
//       alarmRepeat: alarmRepeat,
//       alarmDate: alarmDate,
//       alarmDays: alarmDays,
//       alarmSilent: alarmSilent,
//       ringtone: ringtone,
//       alarmVolume: alarmVolume,
//       alarmGroup: alarmGroup,
//     };

//     fetch('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       // reset form or redirect to success page
//     })
//     .catch(error => {
//       console.error('There was a problem submitting the form:', error);
//       // display error message to user
//     });
//   };

//   const handleDaysChange = event => {
//     const { value } = event.target;
//     let daysString = '';
//     if (value.includes('monday')) daysString += 'Monday,';
//     if (value.includes('tuesday')) daysString += 'Tuesday,';
//     if (value.includes('wednesday')) daysString += 'Wednesday,';
//     if (value.includes('thursday')) daysString += 'Thursday,';
//     if (value.includes('friday')) daysString += 'Friday,';
//     if (value.includes('saturday')) daysString += 'Saturday,';
//     if (value.includes('sunday')) daysString += 'Sunday,';
//     setAlarmDays(daysString.slice(0, -1));
//   };
  
//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Form.Label>Alarm Name</Form.Label>
//         <FormControl
//           type="text"
//           value={alarmName}
//           onChange={event => setAlarmName(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Time</Form.Label>
//         <FormControl
//           type="time"
//           value={alarmTime}
//           onChange={event => setAlarmTime(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Enable Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Enabled"
//           checked={alarmIsEnabled}
//           onChange={event => setAlarmIsEnabled(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Repeat Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Repeat"
//           checked={alarmRepeat}
//           onChange={event => setAlarmRepeat(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Date</Form.Label>
//         <FormControl
//           type="date"
//           value={alarmDate}
//           onChange={event => setAlarmDate(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Days</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Monday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Tuesday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Wednesday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Thursday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Friday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Saturday"
//           onChange={handleDaysChange}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Sunday"
//           onChange={handleDaysChange}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Silent Alarm</Form.Label>
//         <Form.Check
//           type="checkbox"
//           label="Silent"
//           checked={alarmSilent}
//           onChange={event => setAlarmSilent(event.target.checked)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Ringtone</Form.Label>
//         <FormControl
//           as="select"
//           value={ringtone}
//           onChange={event => setRingtone(event.target.value)}
//         >
//           <option value="">
//             Select a ringtone
//           </option>
//           {ringtones.map(ringtone => (
//             <option key={ringtone.id} value={ringtone.url}>
//               {ringtone.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Volume</Form.Label>
//         <FormControl
//           type="range"
//           min="0"
//           max="100"
//           value={alarmVolume}
//           onChange={event => setAlarmVolume(event.target.value)}
//         />
//       </FormGroup>
  
//       <FormGroup>
//         <Form.Label>Alarm Group</Form.Label>
//         <FormControl 
//           as="select" 
//           value={alarmGroup}
//           onChange={event => {
//             console.log(event.target.value);
//             setAlarmGroup(event.target.value);
//           }}>
//           <option value="">
//             Select a group
//           </option>
//           {alarmGroups.map(alarmGroup => (
//             <option key={alarmGroup.id} value={alarmGroup.url}>
//               {alarmGroup.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>

//       <Button type="submit">Create Alarm</Button>
//     </Form>
//   );
// }

// export default NewAlarmForm;










// update handleFormSubmit function
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   try {
//     const alarmData = {
//       alarmGroup: alarmGroup,
//       alarmDate: alarmDate.toISOString(), // convert to ISO string
//       alarmDays: alarmDays,
//       alarmTime: alarmTime,
//       alarmVolume: alarmVolume,
//       ringtone: ringtone,
//     };
//     const response = await axios.post('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/', alarmData);
//     console.log(response.data);
//     setAlarmGroup("");
//     setAlarmDate("");
//     setAlarmTime("");
//     setAlarmVolume("");
//     setRingtone("");
//   } catch (error) {
//     console.error(error);
//   }
// };


  // // ************* SAVE ALARM *************
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const data = {
  //     alarmName: alarmName,
  //     alarmTime: alarmTime,
  //     alarmIsEnabled: alarmIsEnabled,
  //     alarmRepeat: alarmRepeat,
  //     alarmDate: alarmDate,
  //     alarmDays: alarmDays,
  //     alarmSilent: alarmSilent,
  //     ringtone: ringtone,
  //     alarmVolume: alarmVolume,
  //     alarmGroup: alarmGroup,
  //   };
  
  //   // ************* SEND ALARM DATA *************    
  //   axios.post('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/', data, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     // reset form or redirect to success page
  //   })
  //   .catch(error => {
  //     console.error('There was a problem submitting the form:', error);
  //     // display error message to user
  //   });
  // };