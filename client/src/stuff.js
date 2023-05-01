import React, { useState, useEffect } from 'react';
import { CDBCard, CDBCardBody, CDBSwitch, CDBContainer } from 'cdbreact';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function TestForm() {
  const [alarms, setAlarms] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('https://primal-asset-385412.ue.r.appspot.com/alarmGroups/')
      .then(response => {
        setGroups(response.data);
      });
    axios.get('https://primal-asset-385412.ue.r.appspot.com/alarms/')
      .then(response => {
        setAlarms(response.data);
      });
  }, []);

    const handleAlarmEnabled = (event, id) => {
      event.preventDefault();
      const index = alarms.findIndex(alarm => alarm.id === id);
      const alarm = alarms[index];
      axios.patch(`https://primal-asset-385412.ue.r.appspot.com/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
        .then(response => {
          setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
        });
    };

    const handleGroupEnabled = (event, id) => {
      event.preventDefault();
      const index = groups.findIndex(group => group.id === id);
      const group = groups[index];
      axios.patch(`https://primal-asset-385412.ue.r.appspot.com/alarmGroups/${id}/`, { aGroupIsEnabled: !group.aGroupIsEnabled })
        .then(response => {
          setGroups([...groups.slice(0, index), response.data, ...groups.slice(index + 1)]);
        });
    };

    // axios.patch(`https://primal-asset-385412.ue.r.appspot.com/alarmGroups/${group.id}/`, { alarmGroupIsEnabled: !group.alarmGroupIsEnabled })
    //   .then(response => {
    //     setGroups(groups.map(g => g.id === group.id ? response.data : g));
    //   });
  



  // const handleEdit = (event, id) => {
  //   event.preventDefault();
  //   window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
  // };

  const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

  return (
      <CDBContainer
        className="justify-content-center">
        {groups.map(group => (
          <CDBCard 
            key={`group-${group.id}`}
            style={{ width: "25rem" }} border>
            <CDBCardBody>
              <Card.Title> {group.aGroupName} </Card.Title>
              <div className="d-flex justify-content-end">
                <CDBSwitch
                  label="On/Off"
                  checked={group.aGroupIsEnabled}
                  onChange={event => handleGroupEnabled(event, group.id)}
                />    
              </div>
            </CDBCardBody>
          </CDBCard>))}


        {alarmsWithoutGroup.map(alarm => (
          <CDBCard 
            style={{ width: "25rem" }}
            key={alarm.id} 
            className="mb-4">
            <CDBCardBody>
              <Card.Title> {alarm.alarmName} </Card.Title>
                <div className="d-flex justify-content-end">
                  <CDBSwitch
                    id={`alarm-${alarm.id}`}
                    label="On/Off"
                    checked={alarm.alarmIsEnabled}
                    onChange={event => handleAlarmEnabled(event, alarm.id)}
                  />     
                  {/* <CDBSwitch checked /> */}
                </div>
            </CDBCardBody>
          </CDBCard>))}
      </CDBContainer>
  );
}

export default TestForm;