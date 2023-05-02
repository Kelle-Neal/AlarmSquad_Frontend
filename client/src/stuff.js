import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, FormGroup, Form, Row, Image } from 'react-bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';
import CurrentTime from './components/pieces/currentTime';
import CurrentDate from './components/pieces/currentDate';
import Logo from './components/img/AlarmSquad.png';

function TestForm() {
  const [alarm, setAlarm] = useState({});
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmGroup, setAlarmGroup] = useState('');
  const [alarmGroups, setAlarmGroups] = useState([]);
  const [alarmName, setAlarmName] = useState('');
  const [alarmIsEnabled, setAlarmIsEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const alarmId = params.get('alarmId');

  const handleNameChange = (e) => {
    setAlarmName(e.target.value);
  };

  useEffect(() => {
    axios.get(`https://primal-asset-385412.ue.r.appspot.com/alarms/${alarmId}/`)
      .then((response) => {
        setAlarm(response.data);
        setAlarmTime(response.data.alarmTime);
        setAlarmName(response.data.alarmName);
        setAlarmGroup(response.data.alarmGroup);
      })
      .catch((error) => {
        console.error(`Error fetching alarm with id ${alarmId}:`, error);
      });
  }, [alarmId]);

  useEffect(() => {
    axios.get("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/")
      .then((response) => {
        setAlarmGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alarm groups:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlarmIsEnabled(true);
    const updatedAlarm = {
      alarmName: alarmName,
      alarmTime: alarmTime,
      alarmGroup: alarmGroup,
    };
    console.log('updatedAlarm:', updatedAlarm);
    axios.put(`https://primal-asset-385412.ue.r.appspot.com/alarms/${alarmId}/`, updatedAlarm)
      .then((res) => {
        let data = res.data;
        setAlarm(data);
        navigate('/AlarmList');
      })
      .catch((error) => {
        console.error(`There was a problem updating the alarm with id ${alarmId}:`, error);
      });
  };

  const checkAlarm = useCallback((currentTime) => {
    if (alarmTime === currentTime && alarmIsEnabled) {
      alert("It's Time!!");
      setAlarmIsEnabled(false);
    }
  }, [alarmTime, alarmIsEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = <CurrentTime />;
      const currentTime = d;
      checkAlarm(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmIsEnabled, checkAlarm]);

  return (
    <>
      <CDBContainer
        className="d-flex justify-content-center">
        <CDBCard style={{ width: '30rem' }}>
          <CDBCardBody className="mx-4">
            <Row className="text-center mt-4 mb-2">
              <Image src={Logo} />              
              <p className="fw-bold h4"> Edit Alarm </p>
              <CurrentTime />
              <CurrentDate />
            </Row>
{/* ************* ALARM NAME ************* */}
            <div key={`alarm-${alarm.id}`}>
              <CDBInput 
                label="Alarm Name" 
                type="text" 
                id={`alarm-${alarm.id}`}
                value={alarmName}
                onChange={handleNameChange} />
            </div>
{/* ************* ALARM TIME ************* */}
            <div>
              <CDBInput
                type="time"
                id={`alarm-${alarm.id}`}
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
              />
            </div>
{/* ************* ADD ALARM TO GROUP ************* */}
            <div>
              <FormGroup>
                <Form.Label>Alarm Group</Form.Label>
                <FormControl
                  as="select"
                  id={`alarm-${alarm.id}`}
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
            <br></br>

{/* ************* SAVE ALARM ************* */}
            <div>
              <CDBBtn
                onClick={handleSubmit}
                color="none"
                style={{
                  width: '30%',
                  background:
                    'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                className="btn-block mx-0">
                Update Alarm
              </CDBBtn>
            </div>
            <br></br>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </>  
  );
} 
 
export default TestForm;
