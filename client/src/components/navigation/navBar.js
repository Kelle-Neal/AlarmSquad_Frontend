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
            <NavLink to="/Login">Login</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink to="/Register">Register</NavLink>
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


      </ul>
    </nav>
  );
}

export default NavBar;
