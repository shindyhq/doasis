import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_type_uri, start_time, invitee } = body;

    if (!event_type_uri || !start_time || !invitee) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const apiKey = process.env.CALENDLY_API_KEY;
    if (!apiKey || apiKey === 'mock_token') {
      // Return mock success if no real token is provided
      console.log('Mocking Calendly booking for:', invitee.email);
      return NextResponse.json({
        resource: {
          uri: 'https://api.calendly.com/scheduled_events/MOCK_EVENT_ID',
          status: 'active',
        }
      });
    }

    // According to Calendly V2 Scheduling API documentation for direct scheduling:
    // POST https://api.calendly.com/scheduled_events/invitees
    const res = await fetch('https://api.calendly.com/scheduled_events/invitees', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: event_type_uri,
        start_time: start_time,
        invitee: {
          email: invitee.email,
          name: invitee.name,
          timezone: invitee.timezone || 'UTC',
        }
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Calendly Booking API Error:', errorData);
      return NextResponse.json({ error: 'Failed to create Calendly booking' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Calendly booking proxy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
