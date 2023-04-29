import React, {useState} from 'react';
import TimeKeeper from 'react-timekeeper';

function PickTime(){
  const [time, setTime] = useState('12:34pm')

  return (
    <div>
      <TimeKeeper
        time={time}
        onChange={(data) => setTime(data.formatted12)}
      />
      <span>Time is {time}</span>
    </div>
  )
}
export default PickTime;