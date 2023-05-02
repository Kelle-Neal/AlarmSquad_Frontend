import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Image } from 'react-bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';
import CurrentTime from '../pieces/currentTime';
import CurrentDate from '../pieces/currentDate';
import Logo from '../img/AlarmSquad.png';

function FormNewGroup() {
  const [alarmGroupName, setAlarmGroupName] = useState('');
  const [savedAlarmGroups, setSavedAlarmGroups] = useState([]);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setAlarmGroupName(e.target.value);
  };

  const handleSave = () => {
    const newAlarmGroup = {
      aGroupName: alarmGroupName,
    };

  axios
  .post("https://primal-asset-385412.ue.r.appspot.com/alarmGroups/", newAlarmGroup)

  .then((res) => {
    let data = res.data;
    setSavedAlarmGroups([...savedAlarmGroups, data]);
    setAlarmGroupName('');
    navigate('/FormNewAlarm');})

  .catch((err) => { });};

  console.log(savedAlarmGroups);


// ************* CREATE FORM *************
  return (
    <>
      <CDBContainer
        className="d-flex justify-content-center">
        <CDBCard style={{ width: '30rem' }}>
          <CDBCardBody className="mx-4">
            <Row className="text-center mt-4 mb-2">
              <Image src={Logo} />              
              <p className="fw-bold h4"> Create New Group </p>
              <CurrentTime />
              <CurrentDate />
            </Row>
{/* ************* GROUP NAME ************* */}
            <div>
              <CDBInput 
                label="Group Name" 
                type="text" 
                placeholder='Enter Alarm Group Name'
                value={alarmGroupName}
                onChange={handleNameChange} />
            </div>
            <br></br>

{/* ************* SAVE GROUP ************* */}
            <div className= "d-flex align-items-center justify-content-center">
              <CDBBtn
                onClick={handleSave}
                color="none"
                style={{
                  width: '30%',
                  background:
                    'linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)',}}
                className="btn-block mx-0">
                Save Group
              </CDBBtn>
            </div>
            <br></br>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </>  
  );
} 
export default FormNewGroup;

