import Image from "next/image";
import {
  GraduationCap,
  ShieldCheck,
  ExternalLink,
  Linkedin,
  Instagram,
  Award,
  Sparkles,
  Link2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/data/constants";
import type { TeamMember, AuthorityLinkType, TeamMemberBadgeIcon } from "@/data/team/shared";

const AUTHORITY_ICONS: Record<AuthorityLinkType, LucideIcon> = {
  academic: GraduationCap,
  license: ShieldCheck,
  linkedin: Linkedin,
  instagram: Instagram,
  patent: Award,
  other: Link2,
};

const BADGE_ICONS: Record<TeamMemberBadgeIcon, LucideIcon> = {
  shield: ShieldCheck,
  award: Award,
  sparkles: Sparkles,
};

interface TeamMemberBioProps {
  member: TeamMember;
}

/**
 * Full bio section for one team member's dedicated /team/<slug> page.
 * Renders their photo, credentials badge, full bio, focus areas / services,
 * and outbound authority links (academic, license, LinkedIn, patents, etc.)
 * that back the page's Person JSON-LD (emitted by the page, not here — see
 * buildTeamMemberProfilePageSchema in data/team/shared.ts).
 *
 * Owns the page's <h1> — mount this once per page, as the primary heading.
 */
export default function TeamMemberBio({ member }: TeamMemberBioProps) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="team-member-bio-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-16">
          {/* ── Photo + credentials ─────────────────────────────────────── */}
          <div>
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={member.photoUrl}
                alt={`${member.name}, ${member.role} at Kami Aesthetics in Aventura, FL`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 340px"
                priority
              />
            </div>

            {/* Credentials / status badge */}
            {member.badge && (
              <div className="mt-5 border border-warm-border bg-warm-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  {(() => {
                    const BadgeIcon = BADGE_ICONS[member.badge.icon];
                    return <BadgeIcon className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />;
                  })()}
                  <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-warm-gray font-semibold">
                    {member.badge.eyebrow}
                  </span>
                </div>
                <p className="font-inter text-sm text-[#1A1A1A] font-medium">
                  {member.badge.label}
                </p>
              </div>
            )}

            {/* Outbound authority links — EEAT */}
            {member.authorityLinks.length > 0 && (
              <ul className="mt-4 space-y-1">
                {member.authorityLinks.map((link) => {
                  const Icon = AUTHORITY_ICONS[link.type];
                  return (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 py-2.5 font-inter text-sm text-[#1A1A1A] hover:text-gold transition-colors duration-200 group"
                      >
                        <Icon className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />
                        <span className="flex-1">{link.label}</span>
                        <ExternalLink
                          className="h-3.5 w-3.5 text-warm-gray/60 group-hover:text-gold flex-shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ── Bio copy ────────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">
                {member.category}
              </span>
            </div>

            <h1
              id="team-member-bio-heading"
              className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1"
            >
              {member.name}
            </h1>
            <p className="font-inter text-xs text-warm-gray tracking-widest uppercase mb-6">
              {member.role}
            </p>

            <div className="space-y-4 mb-8">
              {member.fullBio.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-inter text-sm md:text-base text-warm-gray leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Services / focus areas */}
            <div className="mb-8">
              <h2 className="font-inter text-[10px] tracking-[0.2em] uppercase text-warm-gray font-semibold mb-3">
                {member.servicesLabel}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {member.services.map((service) => (
                  <li
                    key={service}
                    className="font-inter text-xs text-[#1A1A1A] border border-warm-border bg-warm-white px-3 py-1.5"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="booking_click"
              data-track-location={`team_bio_${member.slug}`}
              data-track-service={member.bookingTrackService}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gold hover:bg-[#B8944F] text-white font-inter text-sm tracking-wider px-8 py-6 rounded-none transition-all duration-300 group"
              >
                {member.ctaLabel ?? `Book a Consultation with ${member.firstName}`}
                <ArrowRight
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
