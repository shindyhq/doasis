import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventTypeUri = searchParams.get('event_type');
    const startTime = searchParams.get('start_time');
    const endTime = searchParams.get('end_time');

    if (!eventTypeUri || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const apiKey = process.env.CALENDLY_API_KEY;
    if (!apiKey || apiKey === 'mock_token') {
      // Return mock data if no real token is provided
      return NextResponse.json({
        collection: [
          {
            start_time: startTime,
            status: 'available',
            invitees_remaining: 1,
          },
          // Add more mock slots if needed
        ]
      });
    }

    const calendlyUrl = new URL('https://api.calendly.com/event_type_available_times');
    calendlyUrl.searchParams.append('event_type', eventTypeUri);
    calendlyUrl.searchParams.append('start_time', startTime);
    calendlyUrl.searchParams.append('end_time', endTime);

    const res = await fetch(calendlyUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Calendly API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch Calendly availability' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Calendly availability proxy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
