import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";

function NavBar() {
  //const [ state, dispatch ] = useGlobalState();
  const [state] = useGlobalState();

  return (
    <nav>
      <ul style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-evenly", listStyle: 'none' }}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!state.currentUser && (
          <li>
            <NavLink to="/FormLogin">Login</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink to="/formRegister">Register</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink to="/NewAlarm">New Alarm</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink to="/AlarmList">Alarm List</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink to="/AlarmGroups">Alarm Groups</NavLink>
          </li>)}

          {!state.currentUser && (
          <li>
            <NavLink to="/AlarmGroupList">Alarm Group List</NavLink>
          </li>)}

          {!state.currentUser && (
          <li>
            <NavLink to="/SelectAlarmGroup">Select Group</NavLink>
          </li>)}          

          {!state.currentUser && (
          <li>
            <NavLink to="/FormNewAlarm">New Alarm Form</NavLink>
          </li>)}         

          {!state.currentUser && (
          <li>
            <NavLink to="/FormEditAlarm">Edit Alarm</NavLink>
          </li>)}   

          {!state.currentUser && (
          <li>
            <NavLink to="/TestForm">Test Form</NavLink>
          </li>)}   

      </ul>
    </nav>
  );
}

export default NavBar;
