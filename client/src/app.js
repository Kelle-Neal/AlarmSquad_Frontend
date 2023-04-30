
import React from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from './components/navigation/navBar.js';

import Home from './components/pages/home.js';
import AlarmGroups from './components/pages/alarmGroups.js';

import CurrentTime from './components/pieces/currentTime.js';
import CurrentDate from './components/pieces/currentDate.js';

import NewAlarm from './components/alarm/addAlarm.js';
import AlarmList from './components/alarm/alarmList.js';
import AlarmGroupList from './components/alarm/alarmGroupList.js';
import SelectAlarmGroup from './components/selectFields/selectAlarmGroup.js';

import FormNewAlarm from './components/forms/formNewAlarm.js';
import FormEditAlarm from './components/forms/formEditAlarm.js';
import FormRegister from './components/forms/formRegister.js';
import FormLogin from './components/forms/formLogin.js';
import TestForm from './stuff.js';
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
          <Route path="formLogin" element={ <FormLogin /> } />
          <Route path="formRegister" element={ <FormRegister /> } />
          <Route path="newAlarm" element={ <NewAlarm /> } />
          <Route path="alarmList" element={ <AlarmList /> } />
          <Route path="alarmGroups" element={ <AlarmGroups /> } />
          <Route path="alarmGroupList" element={ <AlarmGroupList /> } />
          <Route path="selectAlarmGroup" element={ <SelectAlarmGroup /> } />
          <Route path="formNewAlarm" element={ <FormNewAlarm /> } />
          <Route path="formEditAlarm" element={ <FormEditAlarm /> } />
          <Route path="testForm" element={ <TestForm /> } />



        </Routes>
      </div> 
    </>
  );
}  
export default App;
