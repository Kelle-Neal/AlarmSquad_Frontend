import React from "react";
import Logo from '../img/AlarmSquad.png'

import NewAlarmGroup from '../alarm/addAlarmGroup';
import AlarmGroupList from "../alarm/alarmGroupList";

function AlarmGroups() {
  return(
    <>
      <div id="alarmGroups">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'/>
      </div>
      
      <NewAlarmGroup />
      <AlarmGroupList />

    </>
  );
}

export default AlarmGroups;

