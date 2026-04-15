import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import "@/app/prose.css";
import { siteSEO } from "@/data/content";
import { BUSINESS_NAME, ADDRESS, PHONE_HREF, PHONE_NUMBER, MAPS_URL } from "@/data/constants";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Kami Aesthetics Aventura",
  description: "Privacy Policy for Kami Aesthetics. Learn how we collect, use, and protect your personal information.",
  canonical: `${siteSEO.baseUrl}/privacy-policy`,
  noIndex: false,
});

const EFFECTIVE_DATE = "March 25, 2026";
const CONTACT_EMAIL = "info@kamiaesthetics.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#legal-main" className="skip-to-content">Skip to main content</a>
      <Header />
      <main id="legal-main" role="main">
        <section className="bg-[#1A1A1A] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold">Legal</span>
            </div>
            <h1 className="font-playfair text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="font-inter text-sm text-white/70 mt-3">Effective Date: {EFFECTIVE_DATE}</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="prose-legal">

              <p>
                {BUSINESS_NAME} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website{" "}
                <Link href="/" className="text-gold hover:text-gold-dark transition-colors">kamiaesthetics.com</Link>{" "}
                and related booking services. This Privacy Policy explains how we collect, use, and protect information you provide when using our website or contacting us.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Contact information</strong> — name, email address, and phone number when you submit a contact or booking inquiry.</li>
                <li><strong>Booking data</strong> — appointment details collected through our third-party booking provider (Square).</li>
                <li><strong>Usage data</strong> — pages visited, browser type, and referring URLs collected automatically via analytics tools.</li>
                <li><strong>Communications</strong> — messages you send us via email or contact forms.</li>
              </ul>
              <p className="notice">
                <strong>Important:</strong> Please do not submit sensitive medical information, health records, or protected health information (PHI) through this website or any contact form. For medical questions, please call us directly at{" "}
                <a href={PHONE_HREF} className="text-gold hover:text-gold-dark transition-colors">{PHONE_NUMBER}</a>.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to inquiries and schedule appointments</li>
                <li>Send appointment confirmations and reminders</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (only with your consent)</li>
                <li>Comply with applicable legal obligations</li>
              </ul>

              <h2>3. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our website and business (such as our booking platform, email service, and analytics providers), subject to confidentiality obligations. We may also disclose information when required by law.
              </p>

              <h2>4. Third-Party Services</h2>
              <p>
                Our website uses third-party services including Square (appointment booking) and Google Analytics (website analytics). These services have their own privacy policies governing their use of your data. We encourage you to review them.
              </p>

              <h2>5. Cookies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to fulfill the purposes described in this policy or as required by law. You may request deletion of your data by contacting us at the address below.
              </p>

              <h2>7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
              <p>To exercise any of these rights, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:text-gold-dark transition-colors">{CONTACT_EMAIL}</a>.</p>

              <h2>8. Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>9. Children&apos;s Privacy</h2>
              <p>
                Our website is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the revised policy.
              </p>

              <h2>11. Contact Us</h2>
              <address className="not-italic">
                <strong>{BUSINESS_NAME}</strong><br />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">{ADDRESS}</a><br />
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:text-gold-dark transition-colors">{CONTACT_EMAIL}</a><br />
                Phone: <a href={PHONE_HREF} className="text-gold hover:text-gold-dark transition-colors">{PHONE_NUMBER}</a>
              </address>

            </div>

            <div className="mt-12 pt-8 border-t border-warm-border">
              <Link href="/" className="font-inter text-sm text-gold hover:text-gold-dark transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
