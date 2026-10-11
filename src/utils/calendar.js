/**
 * Calendar utilities for Google Calendar and downloadable .ics files
 */

// Format date to ISO compact format: YYYYMMDDTHHmmSSZ
function formatDateToIcsString(isoDateStr) {
  const d = new Date(isoDateStr);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generate Google Calendar URL
 */
export function createGoogleCalendarUrl(event, coupleName = 'Yaswanth Sai & Lakshmi Mrudula') {
  const startStr = formatDateToIcsString(event.startIso);
  const endStr = formatDateToIcsString(event.endIso);

  const title = encodeURIComponent(`${event.title} — ${coupleName} Wedding`);
  const details = encodeURIComponent(
    `${event.description}\n\nAttire: ${event.attire || 'Festive Indian Attire'}\n\nRSVP & Details: Yaswanth Sai & Lakshmi Mrudula Wedding Celebrations`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&ctz=America/Chicago`;
}

/**
 * Generate RFC 5545 compliant ICS file and trigger browser download
 */
export function downloadIcsFile(event, coupleName = 'Yaswanth Sai & Lakshmi Mrudula') {
  const startStr = formatDateToIcsString(event.startIso);
  const endStr = formatDateToIcsString(event.endIso);
  const nowStr = formatDateToIcsString(new Date().toISOString());

  const uid = `${event.id}-2026@yash-mrudula-wedding.com`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yaswanth & Mrudula Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title} — ${coupleName} Wedding`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')} (Attire: ${event.attire || 'Festive'})`,
    `LOCATION:${event.venue}, ${event.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}_yash_mrudula_wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
