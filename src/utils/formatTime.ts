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

  // Build the formatted duration string
  let formattedDuration = [];

  // Add components to formattedDuration until it has two elements
  if (totalDays > 0) {
    formattedDuration.push(`${totalDays} day${totalDays > 1 ? 's' : ''}`);
  }
  if (totalHours > 0 && formattedDuration.length < 2) {
    formattedDuration.push(`${totalHours} hour${totalHours > 1 ? 's' : ''}`);
  }
  if (totalMinutes > 0 && formattedDuration.length < 2) {
    formattedDuration.push(`${totalMinutes} minute${totalMinutes > 1 ? 's' : ''}`);
  }
  if (totalSeconds > 0 && formattedDuration.length < 2) {
    formattedDuration.push(`${totalSeconds} second${totalSeconds > 1 ? 's' : ''}`);
  }

  // If no time units are greater than zero, default to "0 seconds"
  if (formattedDuration.length === 0) {
    formattedDuration.push('0 seconds');
  }

  // Join the parts with a space
  return formattedDuration.join(' ');
}