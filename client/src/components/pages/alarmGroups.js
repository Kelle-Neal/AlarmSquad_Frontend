import React from "react";
import Logo from '../img/AlarmSquad.png'
import NewAlarmGroup from '../alarm/addAlarmGroup';
import NewAlarm from "../alarm/addAlarm";

function AlarmGroups() {
  return(
    <>
      <div id="alarmGroups">
        <img
          alt="AlarmSquad Logo"
          src={ Logo }
          className= 'img-responsive'
        />
      </div>
      <NewAlarmGroup />
      <NewAlarm />

    </>
  );
}

export default AlarmGroups;

