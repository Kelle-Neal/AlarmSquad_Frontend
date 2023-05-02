import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";

function NavBar() {
  const [state] = useGlobalState();

  return (
    <nav>
      <ul style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-evenly", listStyle: 'none' }}>
        <li>
          <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
          to="/">Home</NavLink>
        </li>

        {!state.currentUser && (
          <li>
            <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
            to="/FormLogin">Login</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
            to="/FormRegister">Register</NavLink>
          </li>)}

        {!state.currentUser && (
          <li>
            <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
            to="/AlarmDashboard">Alarms</NavLink>
          </li>)}

          {!state.currentUser && (
          <li>
            <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
            to="/FormNewAlarm">New Alarm</NavLink>
          </li>)}         

          {!state.currentUser && (
          <li>
            <NavLink style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
            to="/FormNewGroup">New Group</NavLink>
          </li>)}   

          {!state.currentUser && (
          <li>
            <NavLink 
              style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
              to="/FormEditAlarm">Edit Alarm</NavLink>
          </li>)}   

          {!state.currentUser && (
          <li>
            <NavLink 
              style={{color: "purple", textDecoration: "none", fontSize: "10px"}} 
              to="/GroupDashboard">Group</NavLink>
          </li>)} 

          {/* {!state.currentUser && (
          <li>
            <NavLink 
            style={{color: "purple", textDecoration: "none", fontSize: "20px"}} 
            to="/TestForm">Test Form</NavLink>
          </li>)}    */}

      </ul>
    </nav>
  );
}

export default NavBar;




// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useGlobalState } from "../../context/GlobalState";

// function NavBar() {
//   //const [ state, dispatch ] = useGlobalState();
//   const [state] = useGlobalState();

//   return (
//     <nav>
//       <ul style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-evenly", listStyle: 'none' }}>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>

//         {!state.currentUser && (
//           <li>
//             <NavLink to="/FormLogin">Login</NavLink>
//           </li>)}

//         {!state.currentUser && (
//           <li>
//             <NavLink to="/FormRegister">Register</NavLink>
//           </li>)}

//         {!state.currentUser && (
//           <li>
//             <NavLink to="/AlarmDashboard">Alarms</NavLink>
//           </li>)}

//           {!state.currentUser && (
//           <li>
//             <NavLink to="/FormNewAlarm">New Alarm Form</NavLink>
//           </li>)}         

//           {!state.currentUser && (
//           <li>
//             <NavLink to="/FormEditAlarm">Edit Alarm</NavLink>
//           </li>)}   

//           {!state.currentUser && (
//           <li>
//             <NavLink to="/TestForm">Test Form</NavLink>
//           </li>)}   

//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
