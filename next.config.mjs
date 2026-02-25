/** @type {import('next').NextConfig} */

// ─── Security Headers ────────────────────────────────────────────────────────
// Applied globally to all routes via the headers() function.
// Third-party allowlist:
//   - Stripe       : js.stripe.com, api.stripe.com, hooks.stripe.com
//   - Calendly     : calendly.com, assets.calendly.com
//   - Vercel       : va.vercel-scripts.com, vitals.vercel-insights.com
//   - Unsplash     : images.unsplash.com (img-src only)
//   - next/font    : Fonts are self-hosted by Next.js — no external font CDN needed
const ContentSecurityPolicy = `
  default-src 'self';
  script-src  'self' 'unsafe-inline' 'unsafe-eval'
              https://js.stripe.com
              https://assets.calendly.com
              https://va.vercel-scripts.com;
  style-src   'self' 'unsafe-inline'
              https://assets.calendly.com;
  font-src    'self' data:;
  img-src     'self' data: blob:
              https://images.unsplash.com;
  frame-src   https://js.stripe.com
              https://hooks.stripe.com
              https://calendly.com;
  connect-src 'self'
              https://api.stripe.com
              https://hooks.stripe.com
              https://calendly.com
              https://api.calendly.com
              https://vitals.vercel-insights.com
              https://va.vercel-scripts.com;
  object-src  'none';
  base-uri    'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  // Collapse the multi-line string into a single line for the header value
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  // Prevent MIME-type sniffing — forces browsers to honour the declared Content-Type
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information sent with requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Prevent this site from being embedded in iframes on other origins
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Full Content Security Policy — prevents XSS and data-injection attacks
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
];

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

