import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <>{dayjs(time).format('YYYY-MM-DD dddd HH:mm')}</>;
}

export default Clock;
