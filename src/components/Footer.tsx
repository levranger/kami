import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from "@/data/content";
import { BUSINESS_NAME, PHONE_NUMBER, PHONE_HREF, ADDRESS_SHORT, CITY_STATE, MAPS_URL } from "@/data/constants";
import { navServices } from "@/data/nav-services";

const companyLinks = [
  { label: "About Us", href: "#why-choose" },
  { label: "Specials", href: "#specials" },
  { label: "Results", href: "#gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white" role="contentinfo">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="font-playfair text-2xl font-bold tracking-tight">KAMI</span>
              <br />
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/50">Aesthetics</span>
            </div>
            <p className="font-inter text-sm text-white/60 leading-relaxed mb-6">
              Premium laser hair removal and aesthetic treatments in Aventura, Florida. Featuring the Lumenis Splendor X — advanced technology safe for all skin types.
            </p>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-200" aria-label="Follow us on Instagram" role="listitem">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-200" aria-label="Follow us on Facebook" role="listitem">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-200" aria-label="Follow us on TikTok" role="listitem">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Footer services navigation">
            <p className="font-inter text-sm font-semibold tracking-wider uppercase mb-6">Services</p>
            <ul className="space-y-3">
              {navServices.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company navigation">
            <p className="font-inter text-sm font-semibold tracking-wider uppercase mb-6">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/blog" className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">Blog</Link>
              </li>
              <li>
                <Link href="/site-map" className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">Site Map</Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-inter text-sm font-semibold tracking-wider uppercase mb-6">Contact</p>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" data-track="directions_click" data-track-location="footer" className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">
                  <span className="text-white/80 font-medium">{BUSINESS_NAME}</span><br />{ADDRESS_SHORT}<br />{CITY_STATE}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />
                <a href={PHONE_HREF} data-track="phone_click" data-track-location="footer" className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200" aria-label={`Call us at ${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@kamiaesthetics.com" data-track="email_click" data-track-location="footer" className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-200">info@kamiaesthetics.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-inter text-sm text-white/60">Mon–Sat: 9am – 7pm<br />Sun: By Appointment</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/60">© {new Date().getFullYear()} Kami Aesthetics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="font-inter text-xs text-white/60 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="font-inter text-xs text-white/60 hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link href="/llm-info" className="font-inter text-xs text-white/60 hover:text-white transition-colors duration-200">AI Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
