import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, PHONE_NUMBER, PHONE_HREF } from "@/data/content";
import { navCategories, navServices } from "@/data/nav-services";
import { HeaderNav, HeaderMobile } from "./HeaderClient";

const anchorLinks = [
  { label: "Results", href: "#gallery" },
  { label: "About", href: "#why-choose" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-border" role="banner">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col items-start" aria-label="Kami Aesthetics — Home">
            <span className="font-playfair text-2xl font-bold tracking-tight text-[#1A1A1A]">KAMI</span>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-warm-gray -mt-1">Aesthetics</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            <HeaderNav navCategories={navCategories} navServices={navServices} anchorLinks={anchorLinks} />
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 text-sm font-inter text-warm-gray hover:text-gold transition-colors duration-200" aria-label={`Call us at ${PHONE_NUMBER}`}>
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1A1A1A] text-white hover:bg-gold hover:text-white font-inter text-sm tracking-wide px-6 rounded-none transition-all duration-300">
                Book Consultation
              </Button>
            </a>
          </div>

          <HeaderMobile
            navCategories={navCategories}
            navServices={navServices}
            anchorLinks={anchorLinks}
            bookingUrl={BOOKING_URL}
            phoneHref={PHONE_HREF}
            phoneNumber={PHONE_NUMBER}
          />
        </div>
      </div>
    </header>
  );
}
