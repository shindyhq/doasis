export interface Slot {
  start: string;
  end: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface BookingDetails {
  serviceType: string;
  durationMinutes: number;
  price: number;
}

export const BookingService = {
  async getAvailability(startDate: Date, endDate: Date) {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    const res = await fetch(`/api/bookings/availability?${params}`);
    if (!res.ok) throw new Error('Failed to fetch availability');
    return res.json();
  },

  async getCalendlyAvailability(eventUri: string, startDate: Date, endDate: Date) {
    const params = new URLSearchParams({
      event_type: eventUri,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
    });
    const res = await fetch(`/api/calendly/availability?${params}`);
    if (!res.ok) throw new Error('Failed to fetch Calendly availability');
    return res.json();
  },

  async createPaymentIntent(amount: number, serviceType: string) {
    const res = await fetch('/api/bookings/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, serviceType }),
    });
    if (!res.ok) throw new Error('Failed to create payment intent');
    return res.json();
  },

  async completeCalendlyBooking(
    eventUri: string,
    startTime: string,
    userDetails: UserDetails
  ) {
    const res = await fetch('/api/calendly/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type_uri: eventUri,
        start_time: startTime,
        invitee: {
          email: userDetails.email,
          name: `${userDetails.firstName} ${userDetails.lastName}`,
        },
      }),
    });
    if (!res.ok) throw new Error('Failed to complete Calendly booking');
    return res.json();
  },

  async createBooking(
    userDetails: UserDetails,
    slotDetails: BookingDetails & { start: string },
    paymentIntentId: string
  ) {
    const res = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userDetails,
        slotDetails,
        paymentIntentId,
      }),
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json();
  },
};
