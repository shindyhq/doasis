import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { parseISO, addMinutes, format } from 'date-fns';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia' as any,
    })
  : null;

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
});

const calendar = google.calendar({ version: 'v3', auth });
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userDetails, slotDetails, paymentIntentId } = body;

    if (!userDetails || !slotDetails || !paymentIntentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!stripe) {
      console.error('Stripe Secret Key is missing');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Verify Payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 402 });
    }

    // Optional: Cross-verify metadata
    if (paymentIntent.metadata.serviceType !== slotDetails.serviceType) {
       console.error('Payment metadata mismatch');
       return NextResponse.json({ error: 'Payment mismatch' }, { status: 400 });
    }

    const startTime = parseISO(slotDetails.start);
    const endTime = addMinutes(startTime, slotDetails.durationMinutes || 60);

    // 1. Create Google Calendar Event
    const event: any = {
      summary: `D'Oasis Session: ${userDetails.firstName} ${userDetails.lastName}`,
      description: `Session Type: ${slotDetails.serviceType}\nClient Email: ${userDetails.email}\nNotes: ${userDetails.notes || 'None'}`,
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() },
      attendees: [{ email: userDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const calendarResponse = await (calendar.events as any).insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });

    // 2. Send Confirmation Email to Client
    await (transporter as any).sendMail({
      from: `"D'Oasis Sanctuary" <${process.env.GMAIL_USER}>`,
      to: userDetails.email,
      subject: "Your Session is Confirmed - D'Oasis Sanctuary",
      text: `Dear ${userDetails.firstName},\n\nYour ${slotDetails.serviceType} session is confirmed for ${format(startTime, 'PPP p')}.\n\nWe look forward to seeing you.\n\nWarmly,\nOluyemisi`,
      html: `
        <div style="font-family: serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Session Confirmed</h1>
          <p>Dear ${userDetails.firstName},</p>
          <p>Your <strong>${slotDetails.serviceType}</strong> session has been successfully booked.</p>
          <div style="background: #f8f6f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${format(startTime, 'PPPP')}</p>
            <p style="margin: 10px 0 0;"><strong>Time:</strong> ${format(startTime, 'p')}</p>
          </div>
          <p>A calendar invitation has been sent to your email.</p>
          <p>Warmly,<br/>Oluyemisi</p>
        </div>
      `,
    });

    // 3. Send Notification to Admin
    if (process.env.ADMIN_EMAIL_RECIPIENT) {
        await transporter.sendMail({
            from: `"D'Oasis Bot" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL_RECIPIENT,
            subject: `New Booking: ${userDetails.firstName} ${userDetails.lastName}`,
            text: `New booking for ${slotDetails.serviceType} at ${format(startTime, 'PPP p')}. Client: ${userDetails.email}`,
        });
    }

    return NextResponse.json({ success: true, eventId: calendarResponse.data.id });

  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
