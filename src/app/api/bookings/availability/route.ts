import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { startOfDay, endOfDay, addDays, parseISO } from 'date-fns';

// Initialize Google Auth
const auth = (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY)
  ? new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'],
    })
  : null;

const calendar = auth ? google.calendar({ version: 'v3', auth }) : null;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!startDateParam || !endDateParam) {
      return NextResponse.json({ error: 'Missing date parameters' }, { status: 400 });
    }

    const timeMin = startOfDay(parseISO(startDateParam)).toISOString();
    const timeMax = endOfDay(parseISO(endDateParam)).toISOString();

    if (!calendar) {
         console.error('Google Calendar credentials missing');
         return NextResponse.json({ busySlots: [] }); // Return empty slots so UI doesn't break, maybe log error
    }

    // Fetch busy times from Google Calendar
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: 'UTC', // Or adjustable based on user's timezone if needed
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busySlots = response.data.calendars?.[CALENDAR_ID || '']?.busy || [];

    return NextResponse.json({ busySlots });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
