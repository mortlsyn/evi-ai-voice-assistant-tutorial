import { calendar_v3, google } from 'googleapis';

export function initializeGoogleCalendar(): calendar_v3.Calendar {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS as string,
  });

  return google.calendar({ version: 'v3', auth });
}


// Function to get upcoming events
export async function getUpcomingEvents(calendar: calendar_v3.Calendar) {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

// Function to create a new event
export async function createEvent(calendar: calendar_v3.Calendar, eventDetails: calendar_v3.Schema$Event) {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventDetails,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}