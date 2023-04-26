import React, { useState } from 'react';
import axios from 'axios';

function NewAlarmGroup() {
  const [alarmGroupName, setAlarmGroupName] = useState('');
  const [savedAlarmGroups, setSavedAlarmGroups] = useState([]);

  const handleNameChange = (e) => {
    setAlarmGroupName(e.target.value);
  };

  const handleSave = () => {
    const newAlarmGroup = {
      aGroupName: alarmGroupName,
    };

  axios
  .post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarmGroups/", newAlarmGroup)
  .then((res) => {
    let data = res.data;
    setSavedAlarmGroups([...savedAlarmGroups, data]);
  })
  .catch((err) => { });

  };
  console.log(savedAlarmGroups);



  return (
    <>
      <h1>Add New Alarm Group...</h1>
      <input type="text" value={alarmGroupName} onChange={handleNameChange} 
      placeholder='Enter Alarm Group Name'/>
      <button onClick={handleSave}>Save</button>
    </>
  );




}

export default NewAlarmGroup;


