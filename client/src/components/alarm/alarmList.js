import React, { useState, useEffect } from 'react';
import { Button, Table, Form, } from 'react-bootstrap';
import axios from 'axios';

function AlarmList() {
  const [alarms, setAlarms] = useState([]);
  const [groups, setGroups] = useState([]);
  
  useEffect(() => {
    axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
      .then(response => {
        setGroups(response.data);});
    axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/')
      .then(response => {
        setAlarms(response.data);});}, []);
  const handleToggle = (event, id) => {
    event.preventDefault();
    const index = alarms.findIndex(alarm => alarm.id === id);
    const alarm = alarms[index];
    axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled }).then(response => {
      setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);});};
  const handleEdit = (event, id) => {
    event.preventDefault();
    window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;};
  const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

  return (
    <>
    <div>
      <h1>Alarm Groups</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Group</th>
            <th>Name</th>
            <th>Time</th>
            <th>Enabled</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <React.Fragment key={group.id}>
              <tr>
                <td colSpan={5}><strong>{group.aGroupName}</strong></td>
              </tr>
              {alarms.filter(alarm => alarm.alarmGroup === group.id).map(alarm => (
                <tr key={alarm.id}>
                  <td>{group.aGroupName}</td>
                  <td>{alarm.alarmName}</td>
                  <td>{alarm.alarmTime}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`toggle-${alarm.id}`}
                      label=""
                      checked={alarm.alarmIsEnabled}
                      onChange={event => handleToggle(event, alarm.id)}
                    />
                  </td>
                  <td>
                    <Button variant="primary" size="sm" onClick={event => handleEdit(event, alarm.id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>  
    </div>

    <br></br>

    <div>
      <h1>Individual Alarms</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Enabled</th>
            <th>Edit</th>
          </tr>
        </thead>
          <tbody>
            {alarmsWithoutGroup.map(alarm => (
              <tr key={alarm.id}>
                <td></td>
                <td>{alarm.alarmName}</td>
                <td>{alarm.alarmTime}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id={`toggle-${alarm.id}`}
                    label=""
                    checked={alarm.alarmIsEnabled}
                    onChange={event => handleToggle(event, alarm.id)}
                  />
                  </td>
                  <td>
                    <Button variant="primary" size="sm" onClick={event => handleEdit(event, alarm.id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>  
      </div>
    </>  
  );
}
export default AlarmList;     


// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/'

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         url: '/alarms/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();
//   }, [])




// ************* TEST THIS ONE ******************
// import React, { useState, useEffect } from 'react';
// import { CDBCard, CDBCardBody, CDBSwitch, CDBContainer } from 'cdbreact';
// import axios from 'axios';
// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/api'

// function TestForm() {
//   const [alarms, setAlarms] = useState([]);
//   const [groups, setGroups] = useState([]);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         url: '/alarms/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();

//     const getAlarmGroups = async () => {
//       let config = {
//         url: '/alarmGroups/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarmGroups(response.data);
//     }
//     getAlarms();

//   // const handleToggle = (event, id) => {
//   //   event.preventDefault();
//   //   const index = alarms.findIndex(alarm => alarm.id === id);
//   //   const alarm = alarms[index];
//   //   axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
//   //     .then(response => {
//   //       setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
//   //     });
//   // };

//   // const handleEdit = (event, id) => {
//   //   event.preventDefault();
//   //   window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
//   // };

//   const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

//   return (
//     <>
//       <CDBContainer>
//         {groups.map(group => (
//           <CDBCard 
//             style={{ width: "25rem" }}
//             key={group.id} 
//             className="mb-4">
//             <CDBCardBody>
//               title={group.alarmGroupName}
//                 <div className="d-flex justify-content-center">
//                   <CDBSwitch />
//                     id={`group-${group.id}`}
//                     label="On/Off"
//                     checked={group.alarmGroupIsEnabled}
//                     onChange={() => {
//                       axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/${group.id}/`, { alarmGroupIsEnabled: !group.alarmGroupIsEnabled })
//                         .then(response => {
//                           setGroups(groups.map(g => g.id === group.id ? response.data : g));
//                         });
//                       }}
//                   <CDBSwitch checked />  
//                 </div>
//             </CDBCardBody>
//           </CDBCard>))}

//         {alarmsWithoutGroup.map(alarm => (
//           <CDBCard 
//             style={{ width: "25rem" }}
//             key={alarm.id} 
//             className="mb-4">
//             <CDBCardBody>
//               title={alarm.alarmName}
//                 <div className="d-flex justify-content-center">
//                   <CDBSwitch
//                     id={`alarm-${alarm.id}`}
//                     label="On/Off"
//                     checked={alarm.alarmIsEnabled}
//                     onChange={() => {
//                       axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/${alarm.id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
//                         .then(response => {
//                           setAlarms(alarms.map(a => a.id === alarm.id ? response.data : a));
//                         });
//                       }}
//                     />     
//                   <CDBSwitch checked />
//                 </div>
//             </CDBCardBody>
//           </CDBCard>))}
//       </CDBContainer>
//     </>  
//   );
// }

// export default TestForm;

// ****************** END OF TEST FORM TO TRY **************


// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/api'

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         url: '/alarms/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();
//   }, [])





// import React, { useState, useEffect } from 'react';
// import { Button, Table, Form } from 'react-bootstrap';
// import axios from 'axios';

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
// 		.then(response => {
//       setGroups(response.data);
//     });
//     axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/')
// 		.then(response => {
//       setAlarms(response.data);
//     });
//   }, []);

//   const handleToggle = (event, id) => {
//     event.preventDefault();
//     const index = alarms.findIndex(alarm => alarm.id === id);
//     const alarm = alarms[index];
//     axios.patch(`/api/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled }).then(response => {
//       setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
//     });
//   };

//   const handleEdit = (event, id) => {
//     event.preventDefault();
//     window.location.href = `'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/'${id}/edit/`;
//   };

//   return (
//     <div>
//       <h1>Alarm List</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Group</th>
//             <th>Name</th>
//             <th>Time</th>
//             <th>Enabled</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {groups.map(group => (
//             <React.Fragment key={group.id}>
//               <tr>
//                 <td colSpan={5}><strong>{group.aGroupName}</strong></td>
//               </tr>
//               {alarms.filter(alarm => alarm.alarmGroup === group.id).map(alarm => (
//                 <tr key={alarm.id}>
//                   <td>{group.aGroupName}</td>
//                   <td>{alarm.alarmName}</td>
//                   <td>{alarm.alarmTime}</td>
//                   <td>
//                     <Form.Check
//                       type="switch"
//                       id={`toggle-${alarm.id}`}
//                       label=""
//                       checked={alarm.alarmIsEnabled}
//                       onChange={event => handleToggle(event, alarm.id)}
//                     />
//                   </td>
//                   <td>
//                     <Button variant="primary" size="sm" onClick={event => handleEdit(event, alarm.id)}>Edit</Button>
//                   </td>
//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AlarmList;










// import React from 'react';
// import axios from 'axios';

// class AlarmList extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			alarms : [],
// 		}

// 	}

// 	async componentDidMount() {
// 		axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/')
// 		.then(res => {
// 			let data = res.data.results;
// 			this.setState({
// 				alarms : data	
// 			});
// 		})
// 		.catch(err => console.log(err));
// 	};

// render() {
// 	console.log(this.state);
// 	return(
// 		<>
// 			{this.state.alarms.map((alarm, id) => (
// 			<div key={id}>
// 			<div >
// 				<div >
// 						<h1>{alarm.alarmName}" - "{alarm.alarmTime}</h1>
//             <button
//               onClick={() => {
//                 this.setState({ editing: true });
//               }}
//             >
//               Edit
//             </button>			
// 				</div>
// 			</div>
// 			</div>
// 			)
// 		)}
// 	</>
// 	);
// }
// }

// export default AlarmList;





// import { useState, useEffect } from 'react'
// import axios from 'axios';

// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/api'

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         url: '/alarms/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();
//   }, [])

//   return (
//     <>
//       <div>
//       {alarms.map((a) => <h3>(a.label)" - "(a.whatTime)</h3>)}
//       </div>
//     </>
//   )

// }

// export default AlarmList;