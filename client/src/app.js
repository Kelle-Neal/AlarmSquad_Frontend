
import React from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from './components/navigation/navBar.js';

import Home from './components/pages/home.js';
import Login from './components/pages/login.js';
import Register from './components/pages/register.js';
import AlarmGroups from './components/pages/alarmGroups.js';

import CurrentTime from './components/pieces/currentTime.js';
import CurrentDate from './components/pieces/currentDate.js';

import NewAlarm from './components/alarm/addAlarm.js';
import AlarmList from './components/alarm/alarmList.js';
import AlarmGroupList from './components/alarm/alarmGroupList.js';
import SelectAlarmGroup from './components/selectFields/selectAlarmGroup.js';
import FormNewAlarm from './components/forms/newAlarm.js';
import FormEditAlarm from './components/forms/editAlarm.js';
// import NewAlarmForm from './components/forms/newAlarm.js';

function App() {
  return(
    <>
      <div className="App">
        <NavBar />
        <CurrentTime />
        <br />
        <CurrentDate />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="newAlarm" element={ <NewAlarm /> } />
          <Route path="alarmList" element={ <AlarmList /> } />
          <Route path="alarmGroups" element={ <AlarmGroups /> } />
          <Route path="alarmGroupList" element={ <AlarmGroupList /> } />
          <Route path="selectAlarmGroup" element={ <SelectAlarmGroup /> } />
          <Route path="formNewAlarm" element={ <FormNewAlarm /> } />
          <Route path="formEditAlarm" element={ <FormEditAlarm /> } />



        </Routes>
      </div> 
    </>
  );
}  
export default App;
