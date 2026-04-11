import Link from "next/link";
import type { ReactNode } from "react";

export type FAQItem = {
  q: string;
  a: string; // plain text — used for JSON-LD schema
  node: ReactNode; // rich JSX with internal links — used for rendering
};

export type FAQCategory = {
  id: string;
  label: string;
  questions: FAQItem[];
};

function L({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">
      {children}
    </Link>
  );
}

export const faqCategories: FAQCategory[] = [
  {
    id: "laser-hair-removal",
    label: "Laser Hair Removal",
    questions: [
      {
        q: "How many laser hair removal sessions do I need?",
        a: "Most clients need between 6 to 8 sessions to achieve permanent hair reduction. The exact number depends on your hair color, skin tone, and the area being treated. Sessions are spaced 4 to 6 weeks apart to target hair in its active growth phase.",
        node: <>Most clients need between 6 to 8 sessions to achieve permanent hair reduction. The exact number depends on your hair color, skin tone, and the area being treated. Sessions are spaced 4 to 6 weeks apart to target hair in its active growth phase.</>,
      },
      {
        q: "Does laser hair removal hurt?",
        a: "Most clients describe the sensation as a mild rubber band snap. We use advanced laser technology that includes a built-in cooling system to minimize discomfort. Pain tolerance varies by person and body area — sensitive areas like the bikini line may feel more intense than the legs.",
        node: <>Most clients describe the sensation as a mild rubber band snap. We use advanced laser technology that includes a built-in cooling system to minimize discomfort. Pain tolerance varies by person and body area — sensitive areas like the bikini line may feel more intense than the legs.</>,
      },
      {
        q: "How long does a laser hair removal session take?",
        a: "It depends on the treatment area. Small areas like the upper lip take about 5–10 minutes, while larger areas like the back or full legs can take 45–60 minutes.",
        node: <>It depends on the treatment area. Small areas like the upper lip take about 5–10 minutes, while larger areas like the back or full legs can take 45–60 minutes.</>,
      },
      {
        q: "Can laser hair removal be done on dark skin tones?",
        a: "Yes. We use lasers specifically suited for all skin tones including deeper complexions. During your consultation we'll assess your skin and hair type to select the safest and most effective settings for you.",
        node: <>Yes. We use lasers specifically suited for all skin tones including deeper complexions. During your consultation we&apos;ll assess your skin and hair type to select the safest and most effective settings for you.</>,
      },
      {
        q: "What should I do before a laser hair removal session?",
        a: "Shave the area 24 hours before your appointment. Avoid waxing or plucking for at least 4 weeks prior. Do not tan or use self-tanner for 2 weeks before treatment. Come with clean skin — no lotions, deodorant, or makeup on the treatment area.",
        node: <>Shave the area 24 hours before your appointment. Avoid waxing or plucking for at least 4 weeks prior. Do not tan or use self-tanner for 2 weeks before treatment. Come with clean skin — no lotions, deodorant, or makeup on the treatment area.</>,
      },
      {
        q: "Is there downtime after laser hair removal?",
        a: "Minimal. You may experience some redness or mild swelling for a few hours after treatment, similar to a mild sunburn. You can return to normal activities the same day. Avoid sun exposure and hot showers for 24–48 hours.",
        node: <>Minimal. You may experience some redness or mild swelling for a few hours after treatment, similar to a mild sunburn. You can return to normal activities the same day. Avoid sun exposure and hot showers for 24–48 hours.</>,
      },
    ],
  },
  {
    id: "botox",
    label: "Botox",
    questions: [
      {
        q: "How long does Botox last?",
        a: "Botox results typically last 3 to 4 months. With consistent treatments over time, many clients find that results last longer as the muscles gradually weaken.",
        node: <><L href="/services/botox">Botox</L> results typically last 3 to 4 months. With consistent treatments over time, many clients find that results last longer as the muscles gradually weaken.</>,
      },
      {
        q: "Does Botox hurt?",
        a: "The needles used for Botox are very fine and most clients describe the injections as a minor pinch. The procedure takes only 10–15 minutes and requires no anesthesia.",
        node: <>The needles used for <L href="/services/botox">Botox</L> are very fine and most clients describe the injections as a minor pinch. The procedure takes only 10–15 minutes and requires no anesthesia.</>,
      },
      {
        q: "How quickly does Botox work?",
        a: "You'll start seeing results within 3 to 5 days, with full results visible at the 2-week mark.",
        node: <>You&apos;ll start seeing results within 3 to 5 days, with full results visible at the 2-week mark.</>,
      },
      {
        q: "What areas can be treated with Botox?",
        a: "We treat forehead lines, frown lines (between the brows), crow's feet, bunny lines, lip lines, chin dimpling, neck bands, and we also offer Botox for excessive sweating (hyperhidrosis).",
        node: <>We treat forehead lines, frown lines (between the brows), crow&apos;s feet, bunny lines, lip lines, chin dimpling, neck bands, and we also offer <L href="/services/botox">Botox for excessive sweating</L> (hyperhidrosis).</>,
      },
      {
        q: "What should I avoid after Botox?",
        a: "For 24 hours after treatment avoid touching or rubbing the treated area, lying flat, strenuous exercise, and excessive heat. Do not take blood thinners like aspirin or ibuprofen unless medically necessary.",
        node: <>For 24 hours after treatment avoid touching or rubbing the treated area, lying flat, strenuous exercise, and excessive heat. Do not take blood thinners like aspirin or ibuprofen unless medically necessary.</>,
      },
      {
        q: "Who is a good candidate for Botox?",
        a: "Most healthy adults over 18 who want to reduce the appearance of dynamic wrinkles (wrinkles caused by facial movement) are good candidates. Botox is not recommended during pregnancy or breastfeeding.",
        node: <>Most healthy adults over 18 who want to reduce the appearance of dynamic wrinkles (wrinkles caused by facial movement) are good candidates. <L href="/services/botox">Botox</L> is not recommended during pregnancy or breastfeeding.</>,
      },
    ],
  },
  {
    id: "dermal-fillers",
    label: "Dermal Fillers",
    questions: [
      {
        q: "How long do dermal fillers last?",
        a: "Depending on the type of filler and area treated, results typically last 6 to 18 months. Lip fillers tend to last 6 to 12 months, while cheek or jawline fillers can last up to 18 months.",
        node: <>Depending on the type of filler and area treated, results typically last 6 to 18 months. Lip fillers tend to last 6 to 12 months, while cheek or jawline fillers can last up to 18 months.</>,
      },
      {
        q: "What is the difference between Botox and fillers?",
        a: "Botox relaxes the muscles that cause wrinkles from facial expressions. Fillers add volume to areas that have lost fullness — such as lips, cheeks, and under-eye hollows. They can be used together for a more complete result.",
        node: <><L href="/services/botox">Botox</L> relaxes the muscles that cause wrinkles from facial expressions. <L href="/services/dermal-fillers">Fillers</L> add volume to areas that have lost fullness — such as lips, cheeks, and under-eye hollows. They can be used together for a more complete result.</>,
      },
      {
        q: "Is there downtime after fillers?",
        a: "You may experience mild swelling, bruising, or tenderness at the injection sites for a few days. Most clients return to normal activities immediately, though we recommend avoiding strenuous exercise and alcohol for 24 hours.",
        node: <>You may experience mild swelling, bruising, or tenderness at the injection sites for a few days. Most clients return to normal activities immediately, though we recommend avoiding strenuous exercise and alcohol for 24 hours.</>,
      },
      {
        q: "Are dermal fillers safe?",
        a: "Yes, when administered by a trained professional. We use FDA-approved hyaluronic acid fillers which are biocompatible and reversible if needed.",
        node: <>Yes, when administered by a trained professional. We use FDA-approved hyaluronic acid <L href="/services/dermal-fillers">fillers</L> which are biocompatible and reversible if needed.</>,
      },
    ],
  },
  {
    id: "prp-therapy",
    label: "PRP Therapy",
    questions: [
      {
        q: "What is PRP therapy?",
        a: "PRP (Platelet-Rich Plasma) therapy uses your own blood — drawn, processed, and re-injected — to stimulate collagen production and accelerate healing. It is used for skin rejuvenation, hair restoration, and joint or tissue repair.",
        node: <><L href="/services/prp-therapy">PRP (Platelet-Rich Plasma) therapy</L> uses your own blood — drawn, processed, and re-injected — to stimulate collagen production and accelerate healing. It is used for skin rejuvenation, hair restoration, and joint or tissue repair.</>,
      },
      {
        q: "How many PRP sessions are needed?",
        a: "For skin rejuvenation, most clients need 3 sessions spaced 4 to 6 weeks apart, followed by maintenance treatments every 6 to 12 months.",
        node: <>For skin rejuvenation, most clients need 3 sessions spaced 4 to 6 weeks apart, followed by maintenance treatments every 6 to 12 months.</>,
      },
      {
        q: "Is PRP painful?",
        a: "A topical numbing cream is applied before the procedure to minimize discomfort. Most clients find it very tolerable.",
        node: <>A topical numbing cream is applied before the procedure to minimize discomfort. Most clients find it very tolerable.</>,
      },
      {
        q: "What is PRP used for at Kami Aesthetics?",
        a: "We offer PRP for facial rejuvenation (sometimes called the Vampire Facial), under-eye treatment, and hair loss restoration.",
        node: <>We offer <L href="/services/prp-therapy">PRP</L> for facial rejuvenation (sometimes called the &quot;Vampire Facial&quot;), under-eye treatment, and hair loss restoration.</>,
      },
    ],
  },
  {
    id: "ipl",
    label: "IPL Treatments",
    questions: [
      {
        q: "What does IPL treat?",
        a: "IPL (Intense Pulsed Light) treats sun damage, age spots, redness, rosacea, broken capillaries, and uneven skin tone. It can also be used for hair removal on lighter skin tones.",
        node: <><L href="/services/ipl-photofacial">IPL (Intense Pulsed Light)</L> treats sun damage, age spots, redness, rosacea, broken capillaries, and uneven skin tone. It can also be used for hair removal on lighter skin tones.</>,
      },
      {
        q: "How many IPL sessions will I need?",
        a: "Most clients see significant improvement after 3 to 5 sessions spaced 3 to 4 weeks apart.",
        node: <>Most clients see significant improvement after 3 to 5 sessions spaced 3 to 4 weeks apart.</>,
      },
      {
        q: "Is there downtime after IPL?",
        a: "You may experience mild redness and darkening of pigmented spots immediately after treatment — this is normal and fades within 7 to 14 days as the skin sheds. Wear SPF daily after treatment.",
        node: <>You may experience mild redness and darkening of pigmented spots immediately after treatment — this is normal and fades within 7 to 14 days as the skin sheds. Wear SPF daily after treatment.</>,
      },
    ],
  },
  {
    id: "general",
    label: "General & Booking",
    questions: [
      {
        q: "Where is Kami Aesthetics located?",
        a: "We are located at 2999 NE 191st St, Floor 9, Aventura, FL 33180. We serve clients from Aventura, Hallandale Beach, Sunny Isles Beach, North Miami, and the greater Miami area.",
        node: <>We are located at 2999 NE 191st St, Floor 9, Aventura, FL 33180. We serve clients from Aventura, Hallandale Beach, Sunny Isles Beach, North Miami, and the greater Miami area.</>,
      },
      {
        q: "How do I book an appointment?",
        a: "You can book online at https://kami.myaestheticrecord.com/online-booking or call us at (954) 469-7153.",
        node: <>You can <a href="https://kami.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">book online</a> or call us at <a href="tel:+19544697153" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">(954) 469-7153</a>.</>,
      },
      {
        q: "Do you offer consultations?",
        a: "Yes, we offer consultations for all treatments. We recommend booking a consultation before your first laser hair removal or filler appointment so we can assess your skin type, discuss your goals, and create a personalized treatment plan.",
        node: <>Yes, we offer consultations for all treatments. We recommend booking a consultation before your first <L href="/services/laser-hair-removal">laser hair removal</L> or <L href="/services/dermal-fillers">filler</L> appointment so we can assess your skin type, discuss your goals, and create a personalized treatment plan.</>,
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards. Please contact us directly for information about payment plans or package pricing.",
        node: <>We accept all major credit cards. Please contact us directly for information about payment plans or package pricing.</>,
      },
      {
        q: "Do you offer treatment packages?",
        a: "Yes, we offer discounted packages for laser hair removal sessions. Contact us or ask during your consultation for current pricing.",
        node: <>Yes, we offer discounted packages for <L href="/services/laser-hair-removal">laser hair removal</L> sessions. Contact us or ask during your consultation for current pricing.</>,
      },
    ],
  },
];

// Flat list of all FAQs for JSON-LD schema
export const allFAQsForSchema = faqCategories.flatMap((cat) =>
  cat.questions.map((q) => ({ question: q.q, answer: q.a }))
);
