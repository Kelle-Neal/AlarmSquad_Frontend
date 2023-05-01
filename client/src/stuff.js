import React, { useState, useEffect } from 'react';
import { CDBCard, CDBCardBody, CDBSwitch, CDBContainer } from 'cdbreact';
import axios from 'axios';

function TestForm() {
  const [alarms, setAlarms] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
      .then(response => {
        setGroups(response.data);
      });
    axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/')
      .then(response => {
        setAlarms(response.data);
      });
  }, []);

  // const handleToggle = (event, id) => {
  //   event.preventDefault();
  //   const index = alarms.findIndex(alarm => alarm.id === id);
  //   const alarm = alarms[index];
  //   axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
  //     .then(response => {
  //       setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
  //     });
  // };

  // const handleEdit = (event, id) => {
  //   event.preventDefault();
  //   window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
  // };

  const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

  return (
    <>
      <CDBContainer>
        {groups.map(group => (
          <CDBCard 
            style={{ width: "25rem" }}
            key={group.id} 
            className="mb-4">
            <CDBCardBody>
              title={group.alarmGroupName}
                <div className="d-flex justify-content-center">
                  <CDBSwitch />
                    id={`group-${group.id}`}
                    label="On/Off"
                    checked={group.alarmGroupIsEnabled}
                    onChange={() => {
                      axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/${group.id}/`, { alarmGroupIsEnabled: !group.alarmGroupIsEnabled })
                        .then(response => {
                          setGroups(groups.map(g => g.id === group.id ? response.data : g));
                        });
                      }}
                  <CDBSwitch checked />  
                </div>
            </CDBCardBody>
          </CDBCard>))}

        {alarmsWithoutGroup.map(alarm => (
          <CDBCard 
            style={{ width: "25rem" }}
            key={alarm.id} 
            className="mb-4">
            <CDBCardBody>
              title={alarm.alarmName}
                <div className="d-flex justify-content-center">
                  <CDBSwitch
                    id={`alarm-${alarm.id}`}
                    label="On/Off"
                    checked={alarm.alarmIsEnabled}
                    onChange={() => {
                      axios.patch(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/${alarm.id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
                        .then(response => {
                          setAlarms(alarms.map(a => a.id === alarm.id ? response.data : a));
                        });
                      }}
                    />     
                  <CDBSwitch checked />
                </div>
            </CDBCardBody>
          </CDBCard>))}
      </CDBContainer>
    </>  
  );
}

export default TestForm;