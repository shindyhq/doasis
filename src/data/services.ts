export interface ServicePrice {
  id: string;
  name: string;
  price: number;
  calendlyUrl?: string;
  calendlyEventUri?: string;
}

export const SERVICES: Record<string, ServicePrice> = {
  'clarity-session': {
    id: 'clarity-session',
    name: 'The Clarity Session',
    price: 120,
    calendlyUrl: 'clarity-session',
    calendlyEventUri: 'https://api.calendly.com/event_types/EVENT_TYPE_ID_CLARITY',
  },
  'becoming-coaching': {
    id: 'becoming-coaching',
    name: 'Becoming: 1:1 Coaching',
    price: 720,
    calendlyUrl: 'becoming-coaching',
    calendlyEventUri: 'https://api.calendly.com/event_types/EVENT_TYPE_ID_COACHING',
  },
  'restoration-circles': {
    id: 'restoration-circles',
    name: 'Restoration Circles',
    price: 45,
    calendlyUrl: 'restoration-circles',
    calendlyEventUri: 'https://api.calendly.com/event_types/EVENT_TYPE_ID_CIRCLES',
  },
  'consultation': {
    id: 'consultation',
    name: 'Free 15-Minute Consultation',
    price: 0,
    calendlyUrl: 'consultation',
    calendlyEventUri: 'https://api.calendly.com/event_types/EVENT_TYPE_ID_CONSULTATION',
  },
  // Legacy mappings for backward compatibility if any
  'coaching-6-week': {
    id: 'coaching-6-week',
    name: 'Becoming: 6-Week Container',
    price: 720,
  },
  'circle-drop-in': {
    id: 'circle-drop-in',
    name: 'Circle: Drop-In',
    price: 45,
  },
};

export const getPriceByServiceId = (id: string): number | null => {
  return SERVICES[id]?.price || null;
};
