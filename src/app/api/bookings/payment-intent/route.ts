import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPriceByServiceId } from '@/data/services';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia' as any,
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceType } = body;

    if (!stripe) {
      console.error('Stripe Secret Key is missing');
      return NextResponse.json({ error: 'Server misconfiguration: Missing Stripe Key' }, { status: 500 });
    }

    const price = getPriceByServiceId(serviceType);

    if (price === null) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe expects amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        serviceType,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
