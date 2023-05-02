import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBSwitch, CDBCard, CDBBtn } from 'cdbreact';
import { Stack, Button, Row, Container, Image, Col } from 'react-bootstrap';

import axios from 'axios';
import CurrentTime from '../pieces/currentTime';
import CurrentDate from '../pieces/currentDate';
import Logo from '../img/AlarmSquad.png';
import FormatTime from '../pieces/formatTime'

// import { useNavigate } from 'react-router-dom';

function AlarmDashboard() {
  const [alarms, setAlarms] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

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

    const handleEditGroup = (group) => {
      navigate(`/GroupDashboard/${group.id}`);
    }

    const handleEditAlarm = (alarm) => {
      navigate(`/FormEditAlarm/${alarm.id}?alarmId=${alarm.id}`);
    }

    // axios.patch(`https://primal-asset-385412.ue.r.appspot.com/alarmGroups/${group.id}/`, { alarmGroupIsEnabled: !group.alarmGroupIsEnabled })
    //   .then(response => {
    //     setGroups(groups.map(g => g.id === group.id ? response.data : g));
    //   });

    const handleAddAlarm = () => {
      navigate("/FormNewAlarm");
    }

    const handleAddGroup = () => {
      navigate("/FormNewGroup");
    }


  // const handleEdit = (event, id) => {
  //   event.preventDefault();
  //   window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
  // };

  const alarmsWithoutGroup = alarms.filter(alarm => !alarm.alarmGroup);

  return (
    <>
      <Container
        className="d-flex justify-content-center">
        <CDBCard style={{ width: '30rem' }} className= "p-4">
          <Row className="text-center mt-4 mb-2">
            <Image src={Logo} />
            <CurrentTime />
            <CurrentDate />
          </Row>

          <Row>
            <div >
              {groups.map(group => (
                <div key={`group-${group.id}`} style={{ borderTop: "5px solid purple"}}>
                  <Stack direction="horizontal">
                    <Button 
                      style={{ width: '25rem' }} 
                      className="fs-4 text-start" 
                      variant="light"
                      id={`group-${group.id}`}
                      onClick={handleEditGroup}
                      > {group.aGroupName} </Button>
                      <div className="d-flex justify-content-end">
                        <CDBSwitch
                          label="On/Off"
                          checked={group.aGroupIsEnabled}
                          onChange={event => handleGroupEnabled(event, group.id)}
                          id={`group-${group.id}`}
                          className="d-flex align-items-end mt-3"
                        /> 
                      </div>     
                  </Stack>
                </div>))}  
            </div>
          </Row>
          <Row>  
            <div>
              {alarmsWithoutGroup.map(alarm => (
                <div key={`alarm-${alarm.id}`} style={{ borderTop: "1px solid purple"}}>
                  <Stack direction="horizontal">
                    <Button style={{ width: '25rem' }} 
                      className="fs-4 d-flex justify-content-between align-items-center" 
                      variant="light"
                      id={`alarm-${alarm.id}`}
                      onClick={handleEditAlarm}
                      > 
                        <span>{alarm.alarmName}</span>
                        <span>{FormatTime(alarm.alarmTime)}</span>                      
                      </Button>
                      <div className="d-flex justify-content-end">
                        <CDBSwitch
                          label="On/Off"
                          checked={alarm.alarmIsEnabled}
                          onChange={event => handleAlarmEnabled(event, alarm.id)}
                          id={`alarm-${alarm.id}`}
                          className="d-flex align-items-end mt-3"
                        />    
                      </div>          
                  </Stack>
                </div>))}  
            </div> 
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
                <CDBBtn
                  onClick={handleAddAlarm}
                  color="none"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                  className="btn-block mx-0">
                  Add Alarm
                </CDBBtn>
              </Col>
              <Col className="text-end">
                <CDBBtn
                  onClick={handleAddGroup}
                  color="none"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                  className="btn-block mx-0">
                  Add Group
                </CDBBtn>
              </Col>
          </Row>  
        </CDBCard>  
      </Container> 
    </>  
  );
}

export default AlarmDashboard;