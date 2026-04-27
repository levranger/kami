import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MapPin, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ADDRESS, PHONE_NUMBER, PHONE_HREF, MAPS_URL } from "@/data/constants";

export const metadata: Metadata = {
  title: "Booking Confirmed | Kami Aesthetics",
  description: "Your appointment at Kami Aesthetics has been confirmed. We look forward to seeing you.",
  robots: "noindex, nofollow",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="section-padding bg-warm-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-lg mx-auto text-center py-16">
              <CheckCircle className="h-16 w-16 text-gold mx-auto mb-6" aria-hidden="true" />
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                You&apos;re All Booked!
              </h1>
              <p className="font-inter text-base text-warm-gray leading-relaxed mb-10">
                Thank you for booking with Kami Aesthetics. We&apos;ll see you soon.
              </p>

              <div className="bg-white border border-warm-border rounded-sm p-6 text-left space-y-4 mb-10">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="font-inter text-sm text-warm-gray group-hover:text-gold transition-colors">
                    {ADDRESS}
                  </span>
                </a>
                <a href={PHONE_HREF} className="flex items-center gap-3 group">
                  <Phone className="h-5 w-5 text-gold shrink-0" aria-hidden="true" />
                  <span className="font-inter text-sm text-warm-gray group-hover:text-gold transition-colors">
                    {PHONE_NUMBER}
                  </span>
                </a>
              </div>

              <Link href="/">
                <Button className="bg-[#1A1A1A] hover:bg-gold text-white font-inter text-sm tracking-wider px-8 rounded-none transition-all duration-300">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
