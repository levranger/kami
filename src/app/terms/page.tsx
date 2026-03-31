import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { siteSEO } from "@/data/content";
import { BUSINESS_NAME, ADDRESS, PHONE_HREF, PHONE_NUMBER } from "@/data/constants";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | Kami Aesthetics Aventura, FL",
  description: "Terms of Service for Kami Aesthetics. Please read these terms before using our website or booking services.",
  canonical: `${siteSEO.baseUrl}/terms`,
  noIndex: false,
});

const EFFECTIVE_DATE = "March 25, 2026";
const CONTACT_EMAIL = "info@kamiaesthetics.com";

export default function TermsPage() {
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
            <h1 className="font-playfair text-4xl font-bold text-white">Terms of Service</h1>
            <p className="font-inter text-sm text-white/70 mt-3">Effective Date: {EFFECTIVE_DATE}</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="prose-legal">

              <p>
                Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the {BUSINESS_NAME} website at{" "}
                <Link href="/" className="text-gold hover:text-gold-dark transition-colors">kamiaesthetics.com</Link>{" "}
                or booking any of our services. By accessing our website or scheduling an appointment, you agree to be bound by these Terms.
              </p>

              <h2>1. Services</h2>
              <p>
                {BUSINESS_NAME} provides aesthetic and cosmetic treatments including laser hair removal, IPL photofacial, skin resurfacing, Botox, dermal fillers, and PRP therapy at our Aventura, Florida location. All treatments are performed by licensed professionals.
              </p>
              <p>
                The information on this website is for general informational purposes only and does not constitute medical advice. Individual results vary. Please consult with our team during your consultation to determine whether a treatment is appropriate for you.
              </p>

              <h2>2. Appointments &amp; Cancellations</h2>
              <p>
                Appointments are booked through our online scheduling system. We ask that you provide at least 24 hours&apos; notice if you need to cancel or reschedule. Late cancellations or no-shows may be subject to a cancellation fee as communicated at the time of booking.
              </p>

              <h2>3. Website Use</h2>
              <p>You agree to use this website only for lawful purposes. You may not:</p>
              <ul>
                <li>Use the site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
                <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
                <li>Submit false, misleading, or fraudulent information</li>
              </ul>
              <p className="notice">
                <strong>Important:</strong> Do not submit sensitive medical information, health records, or protected health information through any form on this website. For medical questions, please call us at{" "}
                <a href={PHONE_HREF} className="text-gold hover:text-gold-dark transition-colors">{PHONE_NUMBER}</a>.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content on this website — including text, images, graphics, logos, and design — is the property of {BUSINESS_NAME} or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2>5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites (such as our booking platform or social media profiles). We are not responsible for the content or privacy practices of those sites and encourage you to review their terms and policies.
              </p>

              <h2>6. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Treatment results described on this website are not guaranteed and individual outcomes may vary.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, {BUSINESS_NAME} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services. Our total liability for any claim shall not exceed the amount you paid for the specific service giving rise to the claim.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Miami-Dade County, Florida.
              </p>

              <h2>9. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes your acceptance of the revised Terms.
              </p>

              <h2>10. Contact Us</h2>
              <address className="not-italic">
                <strong>{BUSINESS_NAME}</strong><br />
                {ADDRESS}<br />
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
