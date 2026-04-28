import Link from "next/link";
import type { ReactNode } from "react";

function L({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

export const peptideTherapyBody = (
  <>
    <p>
      If you&apos;ve been searching for peptide therapy near Miami or asking about BPC-157 at your last appointment, the timing is finally working in your favor.
    </p>
    <p>
      In late 2023, the FDA restricted 19 widely used peptides, cutting off licensed compounding pharmacies from preparing them. Providers across South Florida lost access to compounds they&apos;d been using clinically for tissue repair, recovery, and skin rejuvenation. That&apos;s changing now.
    </p>
    <p>
      On February 27, 2026, HHS Secretary Robert F. Kennedy Jr. announced that roughly 14 of those 19 peptides are expected to return to Category 1 — which means licensed compounding pharmacies can prepare them again under a physician&apos;s prescription.
    </p>

    <h2>Which peptides are coming back</h2>
    <p>The compounds expected to return include several relevant to aesthetics, weight loss, and recovery:</p>
    <ul>
      <li><strong>BPC-157</strong> — tissue repair, inflammation, gut healing</li>
      <li><strong>Thymosin Alpha-1</strong> — immune support</li>
      <li><strong>TB-500</strong> — muscle repair and recovery</li>
      <li><strong>CJC-1295 and Ipamorelin</strong> — growth hormone-releasing peptides studied for sleep, metabolism, and body composition</li>
      <li><strong>AOD-9604</strong> — studied for fat metabolism (one of the more searched compounds for weight loss)</li>
      <li><strong>Selank and Semax</strong> — anxiety and cognitive function</li>
    </ul>

    <h2>This is not FDA approval — here&apos;s what that means for you</h2>
    <p>
      Category 1 status lets compounding pharmacies prepare these peptides legally. It does not make them FDA-approved drugs. They&apos;re still off-label therapeutics, which means a physician&apos;s prescription, proper dosing, and monitoring are required. Any clinic in Miami or Aventura offering peptides without that structure is cutting corners you don&apos;t want cut.
    </p>

    <h2>What Kami offers that most clinics don&apos;t</h2>
    <p>
      Kami Aesthetics is a medically supervised practice in Aventura, serving clients from Sunny Isles, Hallandale Beach, Golden Beach, and across Miami. We&apos;re not a spa adding peptides as a trend item. Our treatments are physician-prescribed, sourced through licensed compounding pharmacies, and integrated into a real treatment plan.
    </p>
    <p>As reclassification moves forward, we&apos;re building out peptide protocols for:</p>
    <ul>
      <li>Post-procedure recovery (microneedling, <L href="/services/lasers/ipl-treatments">IPL</L>, <L href="/services/wellness/prp-therapy">PRP</L>)</li>
      <li>Skin rejuvenation and collagen support</li>
      <li>Weight loss and body composition</li>
      <li>General anti-aging and wellness</li>
    </ul>

    <h2>Ready to find out if peptide therapy is right for you?</h2>
    <p>
      We&apos;re taking <L href="https://booking.mangomint.com/757197" external>consultations</L> now. Call us directly at{" "}
      <a href="tel:+19544697153" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">(954) 469-7153</a>{" "}
      — our team will tell you what&apos;s available, what fits your goals, and what the timeline looks like as these compounds come back online.
    </p>
    <p>
      <strong>Kami Aesthetics</strong> | Aventura, FL | Serving Miami, Sunny Isles, Hallandale Beach, and Golden Beach
    </p>
  </>
);
