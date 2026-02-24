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
      const start = new URLSearchParams(req.url.split('?')[1]).get('start_time');
      const end = new URLSearchParams(req.url.split('?')[1]).get('end_time');
      
      const startTimeDate = new Date(start || '');
      const endTimeDate = new Date(end || '');
      
      const mockSlots = [];
      let currentDate = new Date(startTimeDate);
      
      // Generate slots for each day in the range
      while (currentDate <= endTimeDate) {
        // Only generate slots for weekdays (optional, but realistic)
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
          // Generate slots between 9 AM and 5 PM
          for (let hour = 9; hour <= 16; hour++) {
            const slotDate = new Date(currentDate);
            slotDate.setHours(hour, 0, 0, 0);
            
            // Only add if it's within the requested range and in the future
            if (slotDate >= startTimeDate && slotDate <= endTimeDate && slotDate > new Date()) {
              mockSlots.push({
                start_time: slotDate.toISOString(),
                status: 'available',
                invitees_remaining: 1,
              });
            }
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return NextResponse.json({
        collection: mockSlots
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
