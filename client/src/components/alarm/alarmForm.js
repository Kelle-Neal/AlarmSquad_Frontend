import React, { useEffect, useState } from "react";
import axios from 'axios';

function AlarmList() {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    axios.get('/api/alarms')
      .then(response => setAlarms(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit

}