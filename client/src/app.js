
import React from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from './components/navigation/navBar.js';

import Home from './components/pages/home.js';
import FormLogin from './components/forms/formLogin.js';
import FormRegister from './components/forms/formRegister.js';
import AlarmDashboard from './components/dashboards/alarmDashboard.js';
import FormNewAlarm from './components/forms/formNewAlarm.js';
// import TestForm from './stuff.js';
import FormNewGroup from './components/forms/formNewGroup.js';
import FormEditAlarm from './components/forms/formEditAlarm.js';
import GroupDashboard from './components/dashboards/groupDashboard.js';


function App() {
  return(
    <>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="FormLogin" element={ <FormLogin /> } />
          <Route path="FormRegister" element={ <FormRegister /> } />
          <Route path="AlarmDashboard" element={ <AlarmDashboard /> } />
          <Route path="FormNewAlarm" element={ <FormNewAlarm /> } />
          <Route path="FormNewGroup" element={ <FormNewGroup /> } />
          <Route path="FormEditAlarm" element={ <FormEditAlarm /> } />
          <Route path="GroupDashboard" element={ <GroupDashboard /> } />


          {/* <Route path="TestForm" element={ <TestForm /> } /> */}



        </Routes>
      </div> 
    </>
  );
}  
export default App;
