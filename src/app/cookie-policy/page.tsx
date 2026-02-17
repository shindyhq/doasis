import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="February 9, 2026">
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.
      </p>

      <h2>How We Use Cookies</h2>
      <p>D'Oasis uses cookies to:</p>
      <ul>
        <li>Remember your preferences and settings</li>
        <li>Understand how you use our website</li>
        <li>Improve website functionality and user experience</li>
        <li>Analyze website traffic and performance</li>
        <li>Deliver relevant content and marketing</li>
      </ul>

      <h2>Types of Cookies We Use</h2>

      <h3>Essential Cookies (Required)</h3>
      <p>These cookies are necessary for the website to function and cannot be disabled.</p>
      <p>Examples:</p>
      <ul>
        <li>Session cookies (keep you logged in)</li>
        <li>Security cookies (prevent fraud)</li>
        <li>Load balancing cookies (distribute traffic)</li>
      </ul>

      <h3>Analytics Cookies (Optional)</h3>
      <p>These cookies help us understand how visitors use our website.</p>
      <p>We use:</p>
      <ul>
        <li><strong>Google Analytics</strong> - Website traffic and behavior analysis</li>
      </ul>
      <p>Information collected:</p>
      <ul>
        <li>Pages visited</li>
        <li>Time spent on site</li>
        <li>Navigation paths</li>
        <li>Device and browser type</li>
        <li>Geographic location (city/country level)</li>
      </ul>

      <h3>Marketing Cookies (Optional)</h3>
      <p>These cookies track your browsing to deliver relevant content.</p>
      <p>We may use:</p>
      <ul>
        <li><strong>Facebook Pixel</strong> - Track conversions and deliver targeted ads</li>
        <li><strong>Email tracking</strong> - See if you opened our emails</li>
      </ul>

      <h2>Your Cookie Choices</h2>
      <p><strong>You can control cookies through:</strong></p>

      <h3>Browser Settings</h3>
      <ul>
        <li>Most browsers allow you to refuse or delete cookies</li>
        <li>Check your browser's Help menu for instructions</li>
      </ul>

      <h3>Opt-Out Tools</h3>
      <ul>
        <li>Google Analytics Opt-Out: https://tools.google.com/dlpage/gaoptout</li>
        <li>Network Advertising Initiative: https://optout.networkadvertising.org</li>
      </ul>

      <h3>Our Cookie Banner</h3>
      <ul>
        <li>When you first visit our site, you can accept or decline optional cookies</li>
      </ul>

      <h2>Effect of Disabling Cookies</h2>
      <p><strong>If you disable cookies:</strong></p>
      <ul>
        <li>Essential website functions will still work</li>
        <li>We won't remember your preferences</li>
        <li>Analytics won't track your visit</li>
        <li>Some features may not work properly</li>
      </ul>

      <h2>Third-Party Cookies</h2>
      <p>Third-party services may set their own cookies:</p>
      <ul>
        <li>Google (Analytics, Ads)</li>
        <li>Facebook (Pixel)</li>
        <li>Payment processors (Stripe, PayPal)</li>
        <li>Scheduling platforms (Calendly)</li>
      </ul>
      <p>We do not control third-party cookies. Please review their privacy policies.</p>

      <h2>Cookie Retention</h2>
      <ul>
        <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
        <li><strong>Persistent cookies:</strong> Stored for up to 2 years</li>
        <li>You can delete cookies manually through your browser settings</li>
      </ul>

      <h2>Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy periodically. Changes will be posted with a new "Last Updated" date.
      </p>

      <h2>Contact Us</h2>
      <p>Questions about cookies?</p>
      <p><strong>Email:</strong> hello@doasis.com</p>
    </LegalPageLayout>
  );
}
