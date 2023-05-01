import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewAlarmGroup() {
  const [alarmGroupName, setAlarmGroupName] = useState('');
  const [savedAlarmGroups, setSavedAlarmGroups] = useState([]);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setAlarmGroupName(e.target.value);
  };

  const handleSave = () => {
    const newAlarmGroup = {
      aGroupName: alarmGroupName,
    };

  axios
  .post("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/", newAlarmGroup)

  .then((res) => {
    let data = res.data;
    setSavedAlarmGroups([...savedAlarmGroups, data]);
    setAlarmGroupName('');
    navigate('/AlarmList');})

  .catch((err) => { });};

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


