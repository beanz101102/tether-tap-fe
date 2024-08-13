import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend Day.js with the duration plugin
dayjs.extend(duration);

export function formatDuration(seconds: string | number) {
  const normalizedSeconds = Number(seconds);

  const durationObj = dayjs.duration(normalizedSeconds, 'seconds');

  // Calculate total days, hours, minutes, and seconds
  const totalDays = Math.floor(durationObj.asDays());
  const totalHours = Math.floor(durationObj.asHours()) % 24;
  const totalMinutes = Math.floor(durationObj.asMinutes()) % 60;
  const totalSeconds = Math.floor(durationObj.asSeconds()) % 60;

  // Format them with leading zeros
  const days = String(totalDays).padStart(2, '0');
  const hours = String(totalHours).padStart(2, '0');
  const minutes = String(totalMinutes).padStart(2, '0');
  const secondsPart = String(totalSeconds).padStart(2, '0');

  console.log('seconds', normalizedSeconds, days, hours, minutes, secondsPart);
  return `${days}:${hours}:${minutes}:${secondsPart}`;
}