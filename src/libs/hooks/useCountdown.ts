import { useEffect, useState } from 'react';

const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;
const MILLISECONDS_PER_SECOND = 1000;

const useCountdown = (targetTimestamp: number, displayDays = true, onEnded?: () => void) => {
  const [countDown, setCountDown] = useState(targetTimestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountDown = targetTimestamp - Date.now();
      if (newCountDown < 0) {
        clearInterval(interval);
        onEnded?.();
      } else {
        setCountDown(newCountDown);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const timeLeft = calculateTimeLeft(countDown, displayDays);

  return {
    ...timeLeft,
    ended: countDown < 0,
    formatted: `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes
      .toString()
      .padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`,
  };
};

const calculateTimeLeft = (countDown: number, displayDays: boolean) => {
  if (countDown < MILLISECONDS_PER_SECOND) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, countDown: 0 };
  }

  const days = Math.floor(countDown / MILLISECONDS_PER_DAY);
  const hours = Math.floor((countDown % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR);
  const minutes = Math.floor((countDown % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);
  const seconds = Math.floor((countDown % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND);

  return displayDays
    ? { days, hours, minutes, seconds, countDown }
    : { hours: hours + days * 24, minutes, seconds, countDown };
};

export default useCountdown;
