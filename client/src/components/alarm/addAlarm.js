import React, { useState } from 'react';
import axios from 'axios';


function NewAlarm() {
  const [alarmName, setAlarmName] = useState('');
  const [alarmTime, setAlarmTime] = useState({ hour: '', minute: '', ampm: '' });
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

  const handleSave = () => {
    const { hour, minute, ampm } = alarmTime;
    const time = `${ampm === "AM" ? hour : parseInt(hour) + 12}:${minute}`;

    const newAlarm = {
      alarmName: alarmName,
      alarmTime: time,
    };

    axios
      .post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/", newAlarm)
      .then((res) => {
        let data = res.data;
        setSavedAlarms([...savedAlarms, data]);
      })
      .catch((err) => { });


  };
  console.log(savedAlarms);

  const hours = [...Array(12).keys()].map(hour => (hour + 1).toString().padStart(2, '0'));
  const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  return (
    <div>
      <h1>Add new alarm...</h1>
      <input type="text" value={alarmName} onChange={handleNameChange} placeholder="Enter Alarm Name" />
      <select value={alarmTime.hour} onChange={handleHourChange}>
        <option value="">Hour</option>
        {hours.map(hour => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      <select value={alarmTime.minute} onChange={handleMinuteChange}>
        <option value="">Minute</option>
        {minutes.map(minute => (
          <option key={minute} value={minute}>{minute}</option>
        ))}
      </select>
      <select value={alarmTime.ampm} onChange={handleAmPmChange}>
        <option value="">AM/PM</option>
        {ampm.map(ap => (
          <option key={ap} value={ap}>{ap}</option>
        ))}
      </select>
      <button onClick={handleSave}>Save</button>
      <ul>
        {savedAlarms.map(alarm => (
          <li key={alarm.id}>{alarm.alarmName} - {alarm.alarmTime}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewAlarm;



// import React, { useState } from 'react';


// function AlarmClock() {
//   const [alarmName, setAlarmName] = useState('');
//   const [alarmTime, setAlarmTime] = useState({ hour: '', minute: '', ampm: '' });
//   const [savedAlarms, setSavedAlarms] = useState([]);

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

//   const handleSave = () => {
//     const { hour, minute, ampm } = alarmTime;
//     const time = `${hour}:${minute} ${ampm}`;

//     const newAlarm = {
//       name: alarmName,
//       time: time
//     };

//     // Make a POST request to the Django API using fetch()
//     fetch('/api/alarm/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newAlarm)
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Add the new alarm to the savedAlarms state
//       setSavedAlarms([...savedAlarms, data]);
//     });
//   };

//   // Generate dropdown options for hours, minutes, and am/pm
//   const hours = [...Array(12).keys()].map(hour => (hour + 1).toString().padStart(2, '0'));
//   const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, '0'));
//   const ampm = ['AM', 'PM'];

//   return (
//     <div>
//       <h1>Add new alarm...</h1>
//       <input type="text" value={alarmName} onChange={handleNameChange} placeholder="Enter alarm name" />
//       <select value={alarmTime.hour} onChange={handleHourChange}>
//         <option value="">Hour</option>
//         {hours.map(hour => (
//           <option key={hour} value={hour}>{hour}</option>
//         ))}
//       </select>
//       <select value={alarmTime.minute} onChange={handleMinuteChange}>
//         <option value="">Minute</option>
//         {minutes.map(minute => (
//           <option key={minute} value={minute}>{minute}</option>
//         ))}
//       </select>
//       <select value={alarmTime.ampm} onChange={handleAmPmChange}>
//         <option value="">AM/PM</option>
//         {ampm.map(ap => (
//           <option key={ap} value={ap}>{ap}</option>
//         ))}
//       </select>
//       <button onClick={handleSave}>Save</button>
//       <ul>
//         {savedAlarms.map(alarm => (
//           <li key={alarm.id}>{alarm.name} - {alarm.time}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AlarmClock;
