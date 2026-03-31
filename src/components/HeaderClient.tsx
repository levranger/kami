"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

type NavService = { slug: string; title: string };
type AnchorLink = { label: string; href: string };

export function HeaderNav({
  navServices,
  anchorLinks,
}: {
  navServices: readonly NavService[];
  anchorLinks: readonly AnchorLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="relative"
        onKeyDown={(e) => e.key === "Escape" && (setIsOpen(false), btnRef.current?.focus())}
      >
        <button
          ref={btnRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="services-dropdown"
          className="flex items-center gap-1 font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide"
        >
          Services
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {isOpen && (
          <div id="services-dropdown" role="navigation" aria-label="Services menu" className="absolute top-full left-0 mt-2 w-64 bg-white border border-warm-border shadow-lg rounded-sm py-2 animate-fade-in">
            {navServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setIsOpen(false)} className="block px-4 py-2.5 font-inter text-sm text-[#1A1A1A] hover:text-gold hover:bg-warm-white transition-colors duration-200">
                {s.title}
              </Link>
            ))}
            <div className="border-t border-warm-border mt-1 pt-1">
              <a href="#specials" onClick={(e) => { setIsOpen(false); handleAnchor(e, "#specials"); }} className="block px-4 py-2.5 font-inter text-sm text-gold font-medium hover:bg-warm-white transition-colors duration-200">
                $149 New Client Package ✦
              </a>
            </div>
          </div>
        )}
      </div>

      {anchorLinks.map((link) => (
        <a key={link.label} href={link.href} onClick={(e) => handleAnchor(e, link.href)} className="font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide">
          {link.label}
        </a>
      ))}

      <Link href="/blog" className="font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 tracking-wide">
        Blog
      </Link>
    </>
  );
}

export function HeaderMobile({
  navServices,
  anchorLinks,
  bookingUrl,
  phoneHref,
  phoneNumber,
}: {
  navServices: readonly NavService[];
  anchorLinks: readonly AnchorLink[];
  bookingUrl: string;
  phoneHref: string;
  phoneNumber: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-[#1A1A1A] p-2"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-warm-border animate-fade-in absolute top-full left-0 right-0"
          aria-label="Mobile navigation"
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
        >
          <div className="container mx-auto px-4 py-6 space-y-1">
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray px-2 pt-2 pb-1" aria-hidden="true">Services</p>
            {navServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setIsOpen(false)} className="block py-2.5 px-2 font-inter text-sm text-[#1A1A1A] hover:text-gold border-b border-warm-border/30 transition-colors duration-200">
                {s.title}
              </Link>
            ))}
            <div className="h-2" />
            {anchorLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleAnchor(e, link.href)} className="block py-3 px-2 font-inter text-base text-[#1A1A1A] hover:text-gold border-b border-warm-border/50 transition-colors duration-200">
                {link.label}
              </a>
            ))}
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block py-3 px-2 font-inter text-base text-[#1A1A1A] hover:text-gold border-b border-warm-border/50 transition-colors duration-200">
              Blog
            </Link>
            <div className="pt-4 space-y-3">
              <a href={phoneHref} className="flex items-center gap-2 py-2 px-2 font-inter text-sm text-warm-gray" aria-label={`Call us at ${phoneNumber}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phoneNumber}
              </a>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#1A1A1A] text-white hover:bg-gold font-inter tracking-wide rounded-none py-6">
                  Book Consultation
                </Button>
              </a>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
