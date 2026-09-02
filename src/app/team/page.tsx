import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { BOOKING_URL } from "@/data/constants";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Button } from "@/components/ui/button";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildPageMetadata({
  title: "Meet Our Team | Kami Aesthetics Aventura",
  description:
    "Meet the team behind Kami Aesthetics in Aventura, including our nurse practitioner, laser and electrolysis technician, and operations team.",
  canonical: "https://kamiaesthetics.com/team",
  keywords: [
    "kami aesthetics team",
    "nurse practitioner aventura",
    "laser technician aventura",
    "medical aesthetics team aventura fl",
  ],
});

// ─── JSON-LD Person Schema ─────────────────────────────────────────────────────

const personSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yeva",
    jobTitle: "Operations Manager",
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2999 NE 191st St, Floor 9",
        addressLocality: "Aventura",
        addressRegion: "FL",
        postalCode: "33180",
        addressCountry: "US",
      },
    },
    description:
      "Yeva oversees scheduling, client communication, daily operations, and helps ensure every visit feels organized, welcoming, and personal at Kami Aesthetics in Aventura.",
    image:
      "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295246/yeva-operations_manager_tznwgx.jpg",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Valeria",
    jobTitle: "Laser & Electrolysis Technician",
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2999 NE 191st St, Floor 9",
        addressLocality: "Aventura",
        addressRegion: "FL",
        postalCode: "33180",
        addressCountry: "US",
      },
    },
    description:
      "Valeria specializes in laser hair removal, electrolysis, and energy-based aesthetic treatments at Kami Aesthetics in Aventura.",
    image:
      "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788296325/valeria-laser-tech_ppyn56.jpg",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Valeriia",
    jobTitle: "Nurse Practitioner",
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2999 NE 191st St, Floor 9",
        addressLocality: "Aventura",
        addressRegion: "FL",
        postalCode: "33180",
        addressCountry: "US",
      },
    },
    description:
      "Valeriia is the nurse practitioner and medical provider behind Kami Aesthetics' injectable and advanced aesthetic treatments in Aventura.",
    image:
      "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295180/valeriia_NP_v2d4z1.jpg",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Paul Goldberg",
    jobTitle: "Supervising Physician",
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Kami Aesthetics",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2999 NE 191st St, Floor 9",
        addressLocality: "Aventura",
        addressRegion: "FL",
        postalCode: "33180",
        addressCountry: "US",
      },
    },
    description:
      "Dr. Paul Goldberg is the supervising physician at Kami Aesthetics in Aventura, providing medical oversight for injectable and advanced aesthetic services.",
    image:
      "https://res.cloudinary.com/dnuxtgg11/image/upload/v1788368738/goldberg_MD_-_plastic_surgeon_iseuzj.png",
  },
];

// ─── Treatment Mapping ────────────────────────────────────────────────────────

const treatments = [
  {
    name: "Laser treatments & electrolysis",
    provider: "Valeria Polshkova",
    href: "/services/lasers",
  },
  {
    name: "Aesthetic medical procedures & injectables",
    provider: "Valeriia, NP",
    href: "/services/injectables",
  },
];

// ─── Philosophy Principles ────────────────────────────────────────────────────

const principles = [
  {
    label: "Thoughtful recommendations",
    body: "We focus on what fits your goals rather than pushing unnecessary treatments.",
  },
  {
    label: "Natural-looking results",
    body: "Enhancement should look refined, balanced, and intentional.",
  },
  {
    label: "Continuity of care",
    body: "You work with a small team that knows your treatment history and follows your progress.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={personSchemas} />

      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" role="main">

        {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
        <section
          className="relative flex items-end overflow-hidden min-h-[560px] md:min-h-[680px] lg:min-h-[75vh]"
          aria-labelledby="team-hero-heading"
        >
          {/* Background photo — anchored to top so faces are always visible */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295110/valeria-yeva-valeriiaNP_under10MB_y0ensg.jpg"
              alt="The Kami Aesthetics team — Yeva, Valeria, and Valeriia — at their Aventura, Florida clinic"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              sizes="100vw"
              priority
              fetchPriority="high"
            />
            {/* Stronger gradient at bottom for text legibility, lighter at top to show faces */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-[#1A1A1A]/10" />
          </div>

          {/* Copy — pinned to bottom */}
          <div className="relative z-10 w-full pb-10 md:pb-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <div className="h-px w-8 bg-gold" aria-hidden="true" />
                  <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">
                    Meet the Team
                  </span>
                </div>

                <h1
                  id="team-hero-heading"
                  className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  The people behind
                  <br />
                  <span className="text-gold">your care</span>
                </h1>

                <p className="font-inter text-sm md:text-base text-white/80 leading-relaxed mb-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  A small team focused on thoughtful treatments, natural-looking
                  results, and making every visit feel personal.
                </p>
                <p className="font-inter text-sm text-white/60 leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: "0.35s" }}>
                  From your first message to your treatment and follow-up,
                  you&apos;ll know exactly who is taking care of you.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="booking_click"
                    data-track-location="team_hero"
                    data-track-service="general"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gold hover:bg-[#B8944F] text-white font-inter text-sm tracking-wider px-7 py-5 rounded-none transition-all duration-300 group"
                    >
                      Book an Appointment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                    </Button>
                  </a>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto !bg-transparent border-white/40 text-white hover:border-gold hover:text-gold font-inter text-sm tracking-wider px-7 py-5 rounded-none transition-all duration-300"
                    >
                      Explore Treatments
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Team Profiles ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" aria-labelledby="team-profiles-heading">
          <h2 id="team-profiles-heading" className="sr-only">Our Team Members</h2>
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="space-y-16 md:space-y-24">

              {/* Yeva */}
              <article className="grid md:grid-cols-2 gap-8 md:gap-14 items-center" aria-labelledby="yeva-heading">
                {/* Photo — always first on mobile */}
                <div className="relative overflow-hidden group">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295246/yeva-operations_manager_tznwgx.jpg"
                      alt="Yeva, Operations Manager at Kami Aesthetics in Aventura"
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/5" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-warm-border px-3 py-2" aria-hidden="true">
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-gold font-medium">
                      CLIENT EXPERIENCE · OPERATIONS
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-gold" aria-hidden="true" />
                    <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Operations</span>
                  </div>
                  <h3 id="yeva-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    Yeva
                  </h3>
                  <p className="font-inter text-xs text-warm-gray tracking-widest uppercase mb-5">
                    Operations Manager
                  </p>
                  <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed mb-5">
                    Yeva keeps the Kami Aesthetics experience running smoothly
                    from the moment a client reaches out. She oversees
                    scheduling, client communication, daily operations, and
                    helps make sure every visit feels organized, welcoming, and
                    personal.
                  </p>
                  <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-warm-gray/60">
                    Your first point of contact
                  </span>
                </div>
              </article>

              {/* Valeria */}
              <article className="grid md:grid-cols-2 gap-8 md:gap-14 items-center" aria-labelledby="valeria-heading">
                {/* Copy — second on mobile (below photo), first on md+ */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-gold" aria-hidden="true" />
                    <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Laser &amp; Skin</span>
                  </div>
                  <h3 id="valeria-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    Valeria
                  </h3>
                  <p className="font-inter text-xs text-warm-gray tracking-widest uppercase mb-5">
                    Laser &amp; Electrolysis Technician
                  </p>
                  <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed mb-6">
                    Valeria specializes in laser hair removal, electrolysis, and
                    energy-based aesthetic treatments. Her approach is precise,
                    practical, and focused on helping clients achieve visible
                    results while keeping treatments comfortable and tailored to
                    their skin and goals.
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="booking_click"
                    data-track-location="team_valeria"
                    data-track-service="laser-hair-removal"
                    className="inline-flex items-center gap-2 font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 group"
                  >
                    Book a laser treatment
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </a>
                </div>

                {/* Photo — first on mobile */}
                <div className="relative overflow-hidden group order-1 md:order-2">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dnuxtgg11/image/upload/v1788296325/valeria-laser-tech_ppyn56.jpg"
                      alt="Valeria, Laser and Electrolysis Technician at Kami Aesthetics"
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/5" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-warm-border px-3 py-2" aria-hidden="true">
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-gold font-medium">
                      LASER · ELECTROLYSIS · SKIN
                    </span>
                  </div>
                </div>
              </article>

              {/* Valeriia */}
              <article className="grid md:grid-cols-2 gap-8 md:gap-14 items-center" aria-labelledby="valeriia-heading">
                {/* Photo — always first on mobile */}
                <div className="relative overflow-hidden group">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dnuxtgg11/image/upload/v1788295180/valeriia_NP_v2d4z1.jpg"
                      alt="Valeriia, Nurse Practitioner at Kami Aesthetics"
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/5" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-warm-border px-3 py-2" aria-hidden="true">
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-gold font-medium">
                      INJECTABLES · AESTHETICS · MEDICAL
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-gold" aria-hidden="true" />
                    <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Injectables &amp; Medical</span>
                  </div>
                  <h3 id="valeriia-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    Valeriia
                  </h3>
                  <p className="font-inter text-xs text-warm-gray tracking-widest uppercase mb-5">
                    Nurse Practitioner
                  </p>
                  <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed mb-6">
                    Valeriia is the medical provider behind Kami Aesthetics&apos;
                    injectable and advanced aesthetic treatments. She focuses on
                    thoughtful treatment planning, facial balance, skin quality,
                    and natural-looking results rather than an overdone
                    appearance.
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="booking_click"
                    data-track-location="team_valeriia"
                    data-track-service="botox"
                    className="inline-flex items-center gap-2 font-inter text-sm font-medium text-[#1A1A1A] hover:text-gold transition-colors duration-200 group"
                  >
                    Book a consultation
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </a>
                </div>
              </article>

              {/* Dr. Goldberg */}
              <article className="grid md:grid-cols-2 gap-8 md:gap-14 items-center" aria-labelledby="goldberg-heading">
                {/* Copy — second on mobile, first on md+ */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-gold" aria-hidden="true" />
                    <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Medical Oversight</span>
                  </div>
                  <h3 id="goldberg-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    Dr. Paul Goldberg
                  </h3>
                  <p className="font-inter text-xs text-warm-gray tracking-widest uppercase mb-5">
                    Supervising Physician · Plastic Surgeon
                  </p>
                  <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed">
                    Dr. Goldberg serves as the supervising physician at Kami
                    Aesthetics, providing medical oversight for our injectable
                    and advanced aesthetic services. His background in plastic
                    surgery brings an additional layer of clinical expertise to
                    our treatment protocols and ensures the highest standard of
                    patient safety.
                  </p>
                </div>

                {/* Photo — first on mobile */}
                <div className="relative overflow-hidden group order-1 md:order-2">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dnuxtgg11/image/upload/v1788368738/goldberg_MD_-_plastic_surgeon_iseuzj.png"
                      alt="Dr. Paul Goldberg, Supervising Physician and Plastic Surgeon at Kami Aesthetics"
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/5" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-warm-border px-3 py-2" aria-hidden="true">
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-gold font-medium">
                      MEDICAL OVERSIGHT · PLASTIC SURGERY
                    </span>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* ── 3. Philosophy ─────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-warm-white" aria-labelledby="philosophy-heading">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">

            {/* Header */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold" aria-hidden="true" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Our Approach</span>
              </div>
              <h2 id="philosophy-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-[1.2] mb-4 max-w-xl">
                Personal care, without the assembly-line feel.
              </h2>
              <p className="font-inter text-sm md:text-base text-warm-gray leading-relaxed max-w-lg">
                Kami Aesthetics was built around a simple idea: aesthetic
                treatments should feel personal. We take time to understand
                what you want, recommend only what makes sense, and aim for
                results that still look like you.
              </p>
            </div>

            {/* Principles */}
            <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
              {principles.map((p, i) => (
                <div key={p.label} className="flex flex-col">
                  <span className="font-playfair text-2xl font-bold text-gold/50 mb-3" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-2">
                    {p.label}
                  </h3>
                  <p className="font-inter text-sm text-warm-gray leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 4. Who You'll See ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-24" aria-labelledby="who-youll-see-heading">
          <div className="container mx-auto px-4 md:px-8 max-w-2xl">

            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold" aria-hidden="true" />
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Treatment Guide</span>
                <div className="h-px w-8 bg-gold" aria-hidden="true" />
              </div>
              <h2 id="who-youll-see-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                Who you&apos;ll see
              </h2>
            </div>

            <div className="divide-y divide-warm-border border-y border-warm-border mb-10">
              {treatments.map((t) => (
                <div key={t.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6 py-5">
                  {t.href ? (
                    <Link
                      href={t.href}
                      className="font-inter text-sm md:text-base text-[#1A1A1A] hover:text-gold transition-colors duration-200"
                    >
                      {t.name}
                    </Link>
                  ) : (
                    <span className="font-inter text-sm md:text-base text-[#1A1A1A]">{t.name}</span>
                  )}
                  <span className="font-inter text-sm text-gold font-medium flex-shrink-0">
                    {t.provider}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="booking_click"
                data-track-location="who_youll_see"
                data-track-service="general"
              >
                <Button className="bg-[#1A1A1A] text-white hover:bg-gold hover:text-white font-inter text-sm tracking-wide px-8 rounded-none transition-all duration-300">
                  Book an Appointment
                </Button>
              </a>
            </div>

          </div>
        </section>

        {/* ── 5. Final CTA ──────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-warm-white border-t border-warm-border" aria-labelledby="team-cta-heading">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-lg">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Get Started</span>
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
            </div>
            <h2 id="team-cta-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Not sure where to start?
            </h2>
            <p className="font-inter text-sm text-warm-gray leading-relaxed mb-8 max-w-sm mx-auto">
              Tell us what you&apos;d like to improve and our team will help you
              choose the right next step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="booking_click"
                data-track-location="team_page_cta"
                data-track-service="general"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gold hover:bg-[#B8944F] text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group"
                >
                  Request an Appointment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Button>
              </a>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#1A1A1A]/25 text-[#1A1A1A] hover:border-gold hover:text-gold font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300"
                >
                  View All Treatments
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
