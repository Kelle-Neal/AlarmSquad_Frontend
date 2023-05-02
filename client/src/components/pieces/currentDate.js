import { useState, useEffect } from 'react';

function CurrentDate() {
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
      <h4>{date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
    </span>
  );
}

export default CurrentDate;

