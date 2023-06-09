import { useState, useEffect } from 'react';

function CurrentTime(){
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <span>
      <h1>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </h1>
      
    </span>
  );
}
export default CurrentTime;
