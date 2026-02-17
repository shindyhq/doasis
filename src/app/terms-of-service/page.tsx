import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="February 9, 2026">
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES.</strong></p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">By accessing our website or using our services, you agree to be bound by these Terms of Service.</p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">1. Acceptance of Terms</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
        These Terms of Service ("Terms") govern your use of the D'Oasis Counseling & Coaching website and services. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
      </p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">If you do not agree to these Terms, please do not use our services.</p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">2. Description of Services</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">D'Oasis provides:</p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li><strong className="font-bold text-primary">Life coaching services</strong> focused on personal growth, transitions, and goal achievement</li>
        <li>Individual sessions (Clarity Sessions)</li>
        <li>Multi-week coaching programs (Becoming: 1:1 Coaching)</li>
        <li>Group sessions (Restoration Circles)</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">All services are provided exclusively online via video conferencing (Zoom).</strong></p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">3. Important Distinctions</h2>
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Coaching is Not Therapy</h3>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
        Life coaching is not psychotherapy, mental health treatment, or medical care. Coaching focuses on future goals, personal development, and accountability. It does not diagnose or treat mental health conditions.
      </p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">If you are experiencing a mental health crisis, please contact:</strong></p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>988 Suicide & Crisis Lifeline</li>
        <li>Your local emergency room (911)</li>
        <li>Your licensed mental health provider</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Coaching Does Not Replace Professional Services</h3>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
        Our services do not substitute for professional medical, psychiatric, legal, or financial advice. If you need such services, please consult the appropriate licensed professional.
      </p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">4. Eligibility</h2>
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Our services are available to:</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Adults 18 years of age or older</li>
        <li>Individuals residing in the United States</li>
        <li>Individuals who can access video conferencing technology</li>
        <li>Individuals fluent in English</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Our services are not appropriate for:</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Individuals in active mental health crisis</li>
        <li>Individuals with severe mental illness requiring specialized treatment</li>
        <li>Individuals unable to participate meaningfully in sessions</li>
        <li>Minors (under 18)</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">5. User Responsibilities</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">As a client, you agree to:</strong></p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Provide accurate and complete information</li>
        <li>Attend scheduled sessions on time</li>
        <li>Pay all fees in accordance with our Payment Policy</li>
        <li>Maintain confidentiality of login credentials</li>
        <li>Use services lawfully and ethically</li>
        <li>Participate actively in your own growth and development</li>
        <li>Notify us of any changes to your contact information</li>
        <li>Have a private, quiet space for sessions</li>
        <li>Ensure stable internet connection for video sessions</li>
        <li>Seek appropriate emergency care if needed (not through our services)</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">6. Fees and Payment</h2>
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Pricing</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Clarity Session (90 min): $120</li>
        <li>6-Week Coaching: $720 (payment plans available)</li>
        <li>12-Week Coaching: $1,320 (payment plans available)</li>
        <li>Restoration Circles: $45 per session</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Payment Terms</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Payment due at time of booking for single sessions</li>
        <li>For packages: first payment due at booking, remaining payments per agreed schedule</li>
        <li>Accepted methods: credit/debit cards, PayPal, HSA/FSA cards (for counseling)</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Late Payment</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Services may be suspended until payment is current</li>
        <li>Late fees may apply</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">See our Cancellation & Refund Policy for details on cancellations and refunds.</p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">7. Cancellation and Refunds</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">See our separate <a href="/cancellation-policy" className="text-accent underline hover:text-primary transition-colors">Cancellation & Refund Policy</a>.</p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">Summary:</strong></p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>48+ hours notice: Full credit toward rescheduling</li>
        <li>24-48 hours: 50% fee</li>
        <li>&lt;24 hours or no-show: Full fee</li>
        <li>Package refunds available under certain conditions</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">8. Confidentiality</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">We maintain confidentiality of all client information</strong> in accordance with professional ethics and applicable laws.</p>
      
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Limits to Confidentiality</h3>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">We must break confidentiality when:</p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>You present imminent danger to yourself or others</li>
        <li>There is suspected abuse or neglect of a child, elderly person, or dependent adult</li>
        <li>Required by court order or law</li>
        <li>You provide written authorization</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">See our <a href="/privacy-policy" className="text-accent underline hover:text-primary transition-colors">Privacy Policy</a> for complete information on data handling.</p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">9. Informed Consent</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">Before beginning services, you will receive and must sign an Informed Consent document that includes:</p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Nature of services</li>
        <li>Your rights and responsibilities</li>
        <li>Confidentiality and its limits</li>
        <li>Risks and benefits</li>
        <li>Emergency procedures</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">By using our services, you acknowledge receipt and understanding of the Informed Consent.</strong></p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">10. Telehealth Services</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">All services are provided via secure video conferencing (Zoom).</strong></p>
      
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Telehealth Requirements</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Stable internet connection</li>
        <li>Private, quiet location</li>
        <li>Device with camera and microphone</li>
        <li>Up-to-date web browser or Zoom app</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Telehealth Limitations</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Technology may fail or disconnect</li>
        <li>Emergency services cannot be provided remotely</li>
        <li>Privacy cannot be guaranteed if you're in a public space</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">See our <a href="/telehealth-consent" className="text-accent underline hover:text-primary transition-colors">Telehealth Consent & Agreement</a> for complete details.</p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">11. Intellectual Property</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">All content on this website is owned by D'Oasis and protected by copyright.</strong></p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">This includes:</p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Website design and layout</li>
        <li>Text, graphics, and images</li>
        <li>Logos and branding</li>
        <li>Videos, audio, and downloadable resources</li>
        <li>Course materials and worksheets</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">You may not:</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Reproduce, distribute, or display our content without written permission</li>
        <li>Use our content for commercial purposes</li>
        <li>Modify or create derivative works</li>
        <li>Remove copyright or proprietary notices</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">Limited License</h3>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
        You may access and use our website for personal, non-commercial purposes. You may download resources provided to you as a client for your personal use only.
      </p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">12. Limitation of Liability</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">TO THE FULLEST EXTENT PERMITTED BY LAW:</strong></p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>We are not liable for outcomes or results from your use of our services</li>
        <li>Coaching does not guarantee specific results</li>
        <li>You are responsible for your own choices and actions</li>
        <li>We are not liable for technical issues, service interruptions, or data loss</li>
        <li>Our total liability shall not exceed the amount you paid for services</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">13. Termination</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">Either party may terminate services at any time.</strong></p>
      
      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">You may terminate by:</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Providing written notice via email</li>
        <li>Not scheduling further sessions</li>
        <li>Requesting account deletion</li>
      </ul>

      <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">We may terminate if:</h3>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>You violate these Terms</li>
        <li>You fail to pay fees</li>
        <li>You engage in abusive or threatening behavior</li>
        <li>You need a higher level of care than we can provide</li>
        <li>There is a conflict of interest or ethical concern</li>
      </ul>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">14. Modifications</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">We reserve the right to modify these Terms at any time.</p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">We will notify you of significant changes via:</strong></p>
      <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
        <li>Email notification</li>
        <li>Website banner</li>
        <li>Notice at your next session</li>
      </ul>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">Continued use of services after changes constitutes acceptance of the modified Terms.</strong></p>

      <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">15. Contact Information</h2>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">For questions about these Terms:</p>
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
        <strong className="font-bold text-primary">Email:</strong> hello@doasis.com<br />
        <strong className="font-bold text-primary">Website:</strong> www.doasiswellness.com
      </p>

      <hr className="border-0 border-t border-primary/10 my-12" />
      
      <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6"><strong className="font-bold text-primary">By using our services, you acknowledge that you have read, understood, and agree to these Terms of Service.</strong></p>
    </LegalPageLayout>
  );
}
