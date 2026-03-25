"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { BOOKING_URL, PHONE_NUMBER, PHONE_HREF, servicePages } from "@/data/content";

const anchorLinks = [
  { label: "Results", href: "#gallery" },
  { label: "About", href: "#why-choose" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServicesKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsServicesOpen(false);
      servicesButtonRef.current?.focus();
    }
  }, []);

  const handleMobileKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsMobileMenuOpen(false);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-border" role="banner">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col items-start" aria-label="Kami Aesthetics — Home">
            <span className="font-playfair text-2xl font-bold tracking-tight text-[#1A1A1A]">KAMI</span>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-warm-gray -mt-1">Aesthetics</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            <div ref={servicesRef} className="relative" onKeyDown={handleServicesKeyDown}>
              <button
                ref={servicesButtonRef}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-dropdown"
                className="flex items-center gap-1 font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide"
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isServicesOpen && (
                <div id="services-dropdown" role="menu" aria-label="Services menu" className="absolute top-full left-0 mt-2 w-64 bg-white border border-warm-border shadow-lg rounded-sm py-2 animate-fade-in">
                  {servicePages.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} role="menuitem" onClick={() => setIsServicesOpen(false)} className="block px-4 py-2.5 font-inter text-sm text-[#1A1A1A] hover:text-gold hover:bg-warm-white transition-colors duration-200">
                      {s.title}
                    </Link>
                  ))}
                  <div className="border-t border-warm-border mt-1 pt-1">
                    <a href="#specials" role="menuitem" onClick={(e) => { setIsServicesOpen(false); handleAnchorClick(e, "#specials"); }} className="block px-4 py-2.5 font-inter text-sm text-gold font-medium hover:bg-warm-white transition-colors duration-200">
                      $149 New Client Package ✦
                    </a>
                  </div>
                </div>
              )}
            </div>

            {anchorLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide">
                {link.label}
              </a>
            ))}

            <Link href="/blog" className="font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide">
              Blog
            </Link>
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#1A1A1A] p-2"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav id="mobile-menu" className="lg:hidden bg-white border-t border-warm-border animate-fade-in" aria-label="Mobile navigation" onKeyDown={handleMobileKeyDown}>
          <div className="container mx-auto px-4 py-6 space-y-1">
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray px-2 pt-2 pb-1" aria-hidden="true">Services</p>
            {servicePages.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-2 font-inter text-sm text-[#1A1A1A] hover:text-gold border-b border-warm-border/30 transition-colors duration-200">
                {s.title}
              </Link>
            ))}
            <div className="h-2" />
            {anchorLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="block py-3 px-2 font-inter text-base text-[#1A1A1A] hover:text-gold border-b border-warm-border/50 transition-colors duration-200">
                {link.label}
              </a>
            ))}
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-2 font-inter text-base text-[#1A1A1A] hover:text-gold border-b border-warm-border/50 transition-colors duration-200">
              Blog
            </Link>
            <div className="pt-4 space-y-3">
              <a href={PHONE_HREF} className="flex items-center gap-2 py-2 px-2 font-inter text-sm text-warm-gray" aria-label={`Call us at ${PHONE_NUMBER}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#1A1A1A] text-white hover:bg-gold font-inter tracking-wide rounded-none py-6">
                  Book Consultation
                </Button>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
