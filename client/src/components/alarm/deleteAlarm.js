// Working Time Picker

import React, { useState, useEffect } from "react";
import CurrentTime from "./components/pieces/currentTime";

function TestForm() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmConfirmed, setIsAlarmConfirmed] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  // const alarmConfirm = (time) => `Alarm set for time ${time}`;


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAlarmActive(true);
    setIsAlarmConfirmed(true);
  };

  const checkAlarm = (currentTime) => {
    if (alarmTime === currentTime && isAlarmActive) {
      alert("It's Time!!");
      setIsAlarmActive(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const d = <CurrentTime />
      const currentTime = d
      setCurrentTime(currentTime);
      checkAlarm(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAlarmActive],);

  const formatAlarmTime = (timeString) => {
    const date = new Date(`2022-01-01T${timeString}`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div>
      <h1 id="current-time">{currentTime}</h1>
      {isAlarmConfirmed ? (
        <div>
          <h2 id="active-alarm">Alarm set for {formatAlarmTime(alarmTime)}</h2>
        </div>
      ) : (
        <div id="create-alarm">
          <form id="setAlarm" onSubmit={handleSubmit}>
            <label htmlFor="alarm-time">Set Alarm: </label>
            <input
              type="time"
              id="alarm-time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
            />
            <button type="submit">Set Alarm</button>
          </form>
        </div>
      )}
      {isAlarmConfirmed}
    </div>
  );
}

export default TestForm;





import React, { useState, useEffect } from "react";
import { Div, H1, H2, Form, Label, Input, Button, Alert } from "cdbreact";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isAlarmConfirmed, setIsAlarmConfirmed] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAlarmConfirmed(true);
  };

  const handleSetAlarm = () => {
    setAlarmTime(new Date().toLocaleTimeString());
    setIsAlarmConfirmed(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (alarmTime === new Date().toLocaleTimeString()) {
        setShowAlert(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmTime]);

  return (
    <Div>
      <H1 id="current-time">{currentTime}</H1>
      {isAlarmConfirmed ? (
        <Div>
          <H2 id="active-alarm">Alarm set for {alarmTime}</H2>
        </Div>
      ) : (
        <Div id="create-alarm">
          <Form id="setAlarm" onSubmit={handleSubmit}>
            <Label htmlFor="alarm-time">Set Alarm: </Label>
            <Input
              type="time"
              id="alarm-time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
            />
            <Button type="submit">Set Alarm</Button>
            <Button onClick={handleSetAlarm}>Set Current Time as Alarm</Button>
          </Form>
        </Div>
      )}
      <Alert color="info" isOpen={showAlert} toggle={() => setShowAlert(false)}>
        <h3>Alarm!</h3>
        <p>The alarm set for {alarmTime} has been triggered.</p>
      </Alert>
    </Div>
  );
}

export default App;
