import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBSwitch, CDBCard } from 'cdbreact';
import { Stack, Button, Row, Container, Image, FormGroup, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import CurrentTime from '../pieces/currentTime';
import CurrentDate from '../pieces/currentDate';
import Logo from '../img/AlarmSquad.png';
import FormatTime from '../pieces/formatTime'

// import { useNavigate } from 'react-router-dom';

function GroupDashboard() {
  const [alarms, setAlarms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [filteredAlarms, setFilteredAlarms] = useState([]);
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/")
      .then((response) => {
        setAlarmGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alarm groups:", error);
      });
    }, []);
    console.log('alarmGroups:', alarmGroups)

  useEffect(() => {
    if (selectedGroupId) {
      setFilteredAlarms(
        alarms.filter(alarm => alarm.groupId === selectedGroupId)
      );
    } else {
      setFilteredAlarms(alarms);
    }
  }, [alarms, selectedGroupId]);

  const handleAlarmEnabled = (event, id) => {
    event.preventDefault();
    const index = alarms.findIndex(alarm => alarm.id === id);
    const alarm = alarms[index];
    axios.patch(`https://primal-asset-385412.ue.r.appspot.com/alarms/${id}/`, { alarmIsEnabled: !alarm.alarmIsEnabled })
      .then(response => {
        setAlarms([...alarms.slice(0, index), response.data, ...alarms.slice(index + 1)]);
      });
  }

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
    setSelectedGroupId(group.id);
    navigate(`/FormEditGroup/${group.id}`);
  }

  const handleEditAlarm = (alarm) => {
    navigate(`/FormEditAlarm/${alarm.id}?alarmId=${alarm.id}`);
  }


  const handleEdit = (event, id) => {
    event.preventDefault();
    window.location.href = `https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${id}/edit/`;
  };

  useEffect(() => {
    setFilteredAlarms(
      alarms.filter(alarm => alarm.groupId === selectedGroupId)
    );
  }, [alarms, selectedGroupId]);
  

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
            <div>
              <FormGroup>
                <Form.Label>Alarm Group</Form.Label>
                <FormControl
                  as="select"
                  value={alarmGroup}
                  onChange={(event) => setAlarmGroup(event.target.value)}>
                  <option value="">Select an alarm group</option>
                  {alarmGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.aGroupName}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
            </div>  
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
            
            <div>
              {filteredAlarms.map(alarm => (
                <div key={`alarm-${alarm.id}`} style={{ borderTop: "1px solid purple"}}>
                  <Stack direction="horizontal">
                    <Button style={{ width: '25rem' }} 
                      className="fs-4 d-flex justify-content-between align-items-center" 
                      variant="light"
                      id={`alarm-${alarm.id}`}
                      onClick={() => handleEditAlarm(alarm)}
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
                </div>
              ))} 
            </div> 
          </Row>
        </CDBCard>  
      </Container> 
    </>  
  );
}

export default GroupDashboard;