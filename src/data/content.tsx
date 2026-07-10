import type {
  ServicePageContent,
  Promotion,
  BlogPost,
  FAQEntry,
} from "@/types";
import { treatments } from "./treatments";
import { BOOKING_URL, SPLENDOR_X_IMAGE, DEFAULT_OG_IMAGE, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from "./constants";
import { laserVsWaxingBody } from "./blog/laser-vs-waxing";
import { splendorXAllSkinTypesBody } from "./blog/splendor-x-skin-types";
import { iplSunDamageBody } from "./blog/ipl-sun-damage";
import { peptideTherapyBody } from "./blog/peptide-therapy-fda-2026";
import { laserHairRemovalCostBody } from "./blog/laser-hair-removal-cost";
import { botoxCostBody } from "./blog/botox-cost";
import { botoxHowLongBody } from "./blog/botox-how-long-does-it-last";
import { doesLaserHurtBody } from "./blog/does-laser-hair-removal-hurt";
import { isLaserPermanentBody } from "./blog/is-laser-hair-removal-permanent";
import { lipFillerCostBody } from "./blog/lip-filler-cost";
import { whatIsBotoxBody } from "./blog/what-is-botox";
import { brazilianLaserGuideBody } from "./blog/brazilian-laser-hair-removal";
import { botoxHowLongToWorkBody } from "./blog/botox-how-long-to-work";
import { bikiniLaserBody } from "./blog/bikini-laser-hair-removal";
import { isBotoxSafeBody } from "./blog/is-botox-safe";
import { underarmLaserBody } from "./blog/underarm-laser-hair-removal";
import { botoxLipFlipBody } from "./blog/botox-lip-flip";
import { laserHairRemovalPCOSBody } from "./blog/laser-hair-removal-pcos";
import { botoxForeheadLinesBody } from "./blog/botox-forehead-lines";
import { whatNotToDoAfterBotoxBody } from "./blog/what-not-to-do-after-botox";
import { laserVsWaxing2Body } from "./blog/laser-hair-removal-vs-waxing-2";
import { lipFillerSwellingBody } from "./blog/lip-filler-swelling";
import { botoxForeheadBeforeAfterBody } from "./blog/botox-forehead-before-and-after";
import { facialLaserHairRemovalWomenBody } from "./blog/facial-laser-hair-removal-women";
import { fullBodyLaserHairRemovalBody } from "./blog/full-body-laser-hair-removal";
import { laserHairRemovalForMenBody } from "./blog/laser-hair-removal-for-men";
import { preventativeBotoxBody } from "./blog/preventative-botox";
import { botoxVsFillerBody } from "./blog/botox-vs-filler";
import { underEyeFillerBody } from "./blog/under-eye-filler";
import { jawlineFillerBody } from "./blog/jawline-filler";
import { howLongLipFillerBody } from "./blog/how-long-does-lip-filler-last";
import { cheekFillerBody } from "./blog/cheek-filler-before-and-after";
import { getServiceUrl } from "./categories";


export * from "./constants";
export { treatments };
export type { ServicePageContent, Promotion, BlogPost, FAQEntry };

const BASE_URL = "https://kamiaesthetics.com";

// ─── Service Pages with SEO ───
const seoMap: Record<string, { title: string; description: string; keywords: string[] }> = {
  "laser-hair-removal": {
    title: "Laser Hair Removal in Aventura, FL | Kami Aesthetics",
    description:
      "Permanent laser hair removal in Aventura, FL with the Lumenis Splendor X. Safe for all skin types. Bikini, legs, underarms & more. Book your $149 new-client session.",
    keywords: ["laser hair removal aventura", "laser hair removal aventura fl", "splendor x laser", "permanent hair removal miami", "laser hair removal all skin types"],
  },
  "arm-hair-removal": {
    title: "Arm Laser Hair Removal in Aventura, FL",
    description:
      "Get smooth, hair-free arms with arm laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["arm laser hair removal aventura", "arm hair removal aventura fl", "laser hair removal arms miami", "smooth arms laser"],
  },
  "back-hair-removal": {
    title: "Back Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, hair-free back with laser hair removal at Kami Aesthetics in Aventura, FL. Confidence, shirt off or on. Book today.",
    keywords: ["back laser hair removal aventura", "back hair removal aventura fl", "laser hair removal back miami", "back hair removal men aventura"],
  },
  "bikini-hair-removal": {
    title: "Bikini Laser Hair Removal in Aventura, FL",
    description:
      "Swimsuit-ready, year-round. Bikini laser hair removal at Kami Aesthetics in Aventura, FL. Comfortable, discreet, effective. Book now.",
    keywords: ["bikini laser hair removal aventura", "brazilian laser hair removal aventura fl", "bikini hair removal miami", "laser bikini aventura"],
  },
  "chest-hair-removal": {
    title: "Chest Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, low-maintenance results with chest laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["chest laser hair removal aventura", "chest hair removal aventura fl", "laser hair removal chest miami", "men chest hair removal"],
  },
  "ear-hair-removal": {
    title: "Laser Ear Hair Removal in Aventura, FL",
    description:
      "Skip the trimmer. Laser ear hair removal at Kami Aesthetics in Aventura, FL offers lasting results. Book your consult today.",
    keywords: ["laser ear hair removal aventura", "ear hair removal aventura fl", "ear hair laser miami", "permanent ear hair removal"],
  },
  "eyebrow-hair-removal": {
    title: "Eyebrow Laser Hair Removal in Aventura, FL",
    description:
      "Precise, lasting results with eyebrow laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["eyebrow laser hair removal aventura", "unibrow laser removal aventura fl", "brow shaping laser miami", "eyebrow hair removal aventura"],
  },
  "facial-hair-removal": {
    title: "Facial Laser Hair Removal in Aventura, FL",
    description:
      "Smoother, hair-free skin with facial laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["facial laser hair removal aventura", "upper lip laser hair removal aventura fl", "chin hair removal laser miami", "face laser hair removal aventura"],
  },
  "leg-hair-removal": {
    title: "Leg Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, hair-free legs year-round with laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["leg laser hair removal aventura", "leg hair removal aventura fl", "laser hair removal legs miami", "strawberry legs laser treatment aventura"],
  },
  "upper-lip-hair-removal": {
    title: "Upper Lip Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, hair-free results with upper lip laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["upper lip laser hair removal aventura", "lip hair removal aventura fl", "laser upper lip miami", "upper lip hair removal aventura"],
  },
  "neck-hair-removal": {
    title: "Neck Laser Hair Removal in Aventura, FL",
    description:
      "Cleaner lines and smoother skin with neck laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["neck laser hair removal aventura", "neck hair removal aventura fl", "beard line laser miami", "neck hair removal aventura"],
  },
  "stomach-hair-removal": {
    title: "Stomach Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, confident skin with stomach laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["stomach laser hair removal aventura", "abdomen hair removal aventura fl", "happy trail laser removal miami", "stomach hair removal aventura"],
  },
  "underarm-hair-removal": {
    title: "Underarm Laser Hair Removal in Aventura, FL",
    description:
      "Smooth, brighter underarms with underarm laser hair removal at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["underarm laser hair removal aventura", "underarm hair removal aventura fl", "armpit laser hair removal miami", "underarm hair removal aventura"],
  },
  "laser-hair-removal-dark-skin": {
    title: "Laser Hair Removal for Dark Skin in Aventura, FL",
    description:
      "Safe, effective laser hair removal for dark and brown skin at Kami Aesthetics in Aventura, FL. Book your consult today.",
    keywords: ["laser hair removal dark skin aventura", "laser hair removal brown skin aventura fl", "laser hair removal fitzpatrick iv v vi miami", "dark skin laser hair removal aventura"],
  },
  "ipl-treatments": {
    title: "IPL Treatments in Aventura FL | Kami Aesthetics",
    description:
      "IPL photofacial treatments in Aventura FL for sun damage, rosacea, and uneven skin tone. Book at Kami Aesthetics today.",
    keywords: ["ipl photofacial aventura", "stellar m22", "sun damage treatment miami", "rosacea treatment aventura"],
  },
  resurfx: {
    title: "ResurFX Laser Aventura | Skin Resurfacing",
    description:
      "Non-ablative fractional laser resurfacing in Aventura, FL. ResurFX treats acne scars, stretch marks, and fine lines with minimal downtime.",
    keywords: ["resurfx aventura", "fractional laser miami", "acne scar treatment aventura", "skin resurfacing miami"],
  },
  botox: {
    title: "Botox Aventura | Natural-Looking Results",
    description:
      "Expert Botox injections in Aventura, FL. Natural-looking results that smooth wrinkles while preserving your expressions. No downtime, 15-minute treatment.",
    keywords: ["botox aventura", "botox near me", "natural botox miami", "wrinkle treatment aventura"],
  },
  "dermal-fillers": {
    title: "Dermal Fillers Aventura | Lip & Cheek Filler",
    description:
      "Premium dermal fillers in Aventura, FL. Restore volume, enhance contours, and rejuvenate your look with hyaluronic acid fillers. Immediate results.",
    keywords: ["dermal fillers aventura", "lip filler miami", "cheek filler aventura", "juvederm aventura"],
  },
  "prp-therapy": {
    title: "PRP Therapy Aventura | Vampire Facial",
    description:
      "PRP therapy and Vampire Facial in Aventura, FL. Natural growth factors for skin rejuvenation and hair restoration. 100% natural, minimal downtime.",
    keywords: ["prp therapy aventura", "vampire facial miami", "prp hair restoration aventura", "platelet rich plasma miami"],
  },
  "iv-therapy": {
    title: "IV Therapy in Aventura FL | Kami Aesthetics",
    description:
      "Customized IV vitamin drip therapy in Aventura FL. Boost energy, immunity, and skin radiance with 100% bioavailable nutrients. Book at Kami Aesthetics.",
    keywords: ["iv therapy aventura", "iv drip aventura fl", "vitamin infusion miami", "iv wellness aventura"],
  },
  "weight-loss": {
    title: "Medical Weight Loss in Aventura FL | Kami Aesthetics",
    description:
      "Medically supervised weight loss in Aventura FL. Personalized protocols, GLP-1 support, and ongoing guidance. Book your consultation at Kami Aesthetics.",
    keywords: ["medical weight loss aventura", "glp-1 aventura fl", "weight management miami", "medically supervised weight loss aventura"],
  },
};

const relatedMap: Record<string, string[]> = {
  "laser-hair-removal": ["arm-hair-removal", "leg-hair-removal", "bikini-hair-removal"],
  "arm-hair-removal": ["laser-hair-removal", "leg-hair-removal", "back-hair-removal"],
  "back-hair-removal": ["laser-hair-removal", "chest-hair-removal", "arm-hair-removal"],
  "bikini-hair-removal": ["laser-hair-removal", "leg-hair-removal", "underarm-hair-removal"],
  "chest-hair-removal": ["back-hair-removal", "stomach-hair-removal", "laser-hair-removal"],
  "ear-hair-removal": ["eyebrow-hair-removal", "facial-hair-removal", "neck-hair-removal"],
  "eyebrow-hair-removal": ["ear-hair-removal", "facial-hair-removal", "upper-lip-hair-removal"],
  "facial-hair-removal": ["upper-lip-hair-removal", "neck-hair-removal", "eyebrow-hair-removal"],
  "leg-hair-removal": ["laser-hair-removal", "bikini-hair-removal", "underarm-hair-removal"],
  "upper-lip-hair-removal": ["facial-hair-removal", "eyebrow-hair-removal", "neck-hair-removal"],
  "neck-hair-removal": ["facial-hair-removal", "upper-lip-hair-removal", "ear-hair-removal"],
  "stomach-hair-removal": ["chest-hair-removal", "back-hair-removal", "laser-hair-removal"],
  "underarm-hair-removal": ["laser-hair-removal", "bikini-hair-removal", "arm-hair-removal"],
  "laser-hair-removal-dark-skin": ["laser-hair-removal", "bikini-hair-removal", "leg-hair-removal"],
  "ipl-treatments": ["resurfx", "laser-hair-removal"],
  resurfx: ["ipl-treatments", "prp-therapy"],
  botox: ["dermal-fillers", "prp-therapy"],
  "dermal-fillers": ["botox", "prp-therapy"],
  "prp-therapy": ["botox", "iv-therapy"],
  "iv-therapy": ["prp-therapy", "weight-loss"],
  "weight-loss": ["iv-therapy", "prp-therapy"],
};

const ctaMap: Record<string, { headline: string; subtext: string }> = {
  "laser-hair-removal": {
    headline: "Ready for Smooth, Hair-Free Skin?",
    subtext: "Join hundreds of Aventura clients who trust Kami Aesthetics for permanent laser hair removal with the Splendor X.",
  },
  "arm-hair-removal": {
    headline: "Ready for Smooth, Hair-Free Arms?",
    subtext: "Say goodbye to razors and hello to effortlessly smooth skin — made for South Florida living.",
  },
  "back-hair-removal": {
    headline: "Ready to Ditch the Razor for Good?",
    subtext: "Get a smoother back, made for boat days, beach days, and South Florida heat.",
  },
  "bikini-hair-removal": {
    headline: "Ready for Swimsuit-Ready Confidence?",
    subtext: "Smoother, low-maintenance skin — made for South Florida's year-round beach season.",
  },
  "chest-hair-removal": {
    headline: "Ready for Smoother, Lower-Maintenance Skin?",
    subtext: "Skip the razor and the redness, and let laser do the work instead.",
  },
  "ear-hair-removal": {
    headline: "Ready to Skip the Trimmer for Good?",
    subtext: "Get a cleaner, longer-lasting solution to unwanted ear hair.",
  },
  "eyebrow-hair-removal": {
    headline: "Ready for Cleaner, More Defined Brows?",
    subtext: "Spend less time tweezing and more time enjoying a brow shape that holds.",
  },
  "facial-hair-removal": {
    headline: "Ready for Smoother, More Confident Skin?",
    subtext: "Less upkeep, longer-lasting results, and a face that's ready for anything South Florida throws at it.",
  },
  "leg-hair-removal": {
    headline: "Ready for Smooth, Confident Legs?",
    subtext: "Skip the razor and step into swimsuit season with skin that's ready year-round.",
  },
  "upper-lip-hair-removal": {
    headline: "Ready for a Smoother Upper Lip?",
    subtext: "Skip the daily plucking and get results that actually last.",
  },
  "neck-hair-removal": {
    headline: "Ready for a Cleaner, More Defined Neckline?",
    subtext: "Less daily upkeep, sharper lines, and skin that feels smoother every day.",
  },
  "stomach-hair-removal": {
    headline: "Ready for Smoother, More Confident Skin?",
    subtext: "Less upkeep for the stomach and chest, with results that actually last.",
  },
  "underarm-hair-removal": {
    headline: "Ready for Smoother, Brighter Underarms?",
    subtext: "One of our quickest treatments, with results you'll notice fast.",
  },
  "laser-hair-removal-dark-skin": {
    headline: "Ready for Safe, Effective Results, Built for Your Skin?",
    subtext: "Experience laser hair removal designed with every skin tone in mind.",
  },
  "ipl-treatments": {
    headline: "Reveal Your Clearest, Most Radiant Skin",
    subtext: "Book your IPL Stellar M22 consultation and discover how we can transform sun-damaged, uneven skin.",
  },
  resurfx: {
    headline: "Transform Your Skin From Within",
    subtext: "Schedule your ResurFX consultation and start your journey to smoother, more youthful skin.",
  },
  botox: {
    headline: "Look Refreshed, Never Frozen",
    subtext: "Our expert injectors deliver natural Botox results that enhance your beauty without changing who you are.",
  },
  "dermal-fillers": {
    headline: "Restore Volume, Enhance Your Natural Beauty",
    subtext: "Discover how premium dermal fillers can rejuvenate your appearance with immediate, natural-looking results.",
  },
  "prp-therapy": {
    headline: "Rejuvenate Naturally With Your Own Growth Factors",
    subtext: "Experience the power of PRP therapy — the safest, most natural approach to skin and hair rejuvenation.",
  },
  "iv-therapy": {
    headline: "Recharge From the Inside Out",
    subtext: "Book your IV therapy session and feel the difference that 100% bioavailable nutrients can make.",
  },
  "weight-loss": {
    headline: "Start Your Medical Weight Loss Journey",
    subtext: "Book a consultation and get a personalized protocol designed around your body and your goals.",
  },
};

export const servicePages: ServicePageContent[] = treatments.map((t) => {
  const seo = seoMap[t.slug];
  const canonicalPath = getServiceUrl(t.slug);
  return {
    ...t,
    seo: {
      title: seo?.title ?? `${t.title} Aventura | Kami Aesthetics`,
      description: seo?.description ?? t.shortDescription,
      canonical: `${BASE_URL}${canonicalPath}`,
      keywords: seo?.keywords,
    },
    locationTag: "Aventura, FL",
    relatedSlugs: relatedMap[t.slug] ?? [],
    ctaHeadline: ctaMap[t.slug]?.headline ?? `Ready for ${t.title}?`,
    ctaSubtext: ctaMap[t.slug]?.subtext ?? `Book your ${t.title.toLowerCase()} consultation today.`,
  };
});

// ─── $149 New Client Offer ───
export const newClientOffer: Promotion = {
  id: "new-client-laser-149",
  tag: "New Client Exclusive",
  title: "$149 Must-Have Laser Package",
  headline: "Your First Laser Session — Just $149",
  description:
    "Experience the Lumenis Splendor X difference with our introductory laser hair removal package. Choose any combination of three popular areas and discover why our clients never go back to waxing.",
  price: "$149",
  priceNote: "Regular value $350+",
  areas: ["Bikini Line", "Underarms", "Half Legs"],
  cta: "Claim Your $149 Package",
  ctaUrl: BOOKING_URL,
  highlight: true,
  badge: "Most Popular",
};

// ─── Homepage FAQs ───
export const homepageFAQs: FAQEntry[] = [
  { question: "What treatments does Kami Aesthetics offer?", answer: "Kami Aesthetics is a medical aesthetics studio in Aventura, FL offering laser and light treatments (laser hair removal, IPL photofacial, ResurFX skin resurfacing), injectables (Botox and dermal fillers), PRP therapy, IV therapy, and medical weight loss. Every treatment is performed with medical-grade technology in a boutique spa environment.", category: "General" },
  { question: "Where is Kami Aesthetics located?", answer: "We are located at 2999 NE 191st St, Floor 9, Aventura, FL 33180. We serve clients from Aventura, Hallandale Beach, Sunny Isles Beach, North Miami Beach, Bal Harbour, and the surrounding Miami-Dade and Broward County areas.", category: "General" },
  { question: "What is Botox and what does it treat?", answer: "Botox is a purified protein that temporarily relaxes targeted facial muscles to smooth dynamic wrinkles. It is most commonly used for forehead lines, frown lines (the 11s), and crow's feet. Treatments take about 15 minutes with no downtime, and results typically last 3–4 months.", category: "Injectables" },
  { question: "How do dermal fillers work?", answer: "Dermal fillers use hyaluronic acid to restore lost volume, enhance facial contours, and smooth deep folds. Common treatment areas include the lips, cheeks, jawline, and under-eyes. Results are visible immediately and last 6–18 months depending on the area and product used.", category: "Injectables" },
  { question: "What is IPL photofacial and what does it help with?", answer: "IPL (Intense Pulsed Light) photofacial uses broad-spectrum light to target pigmentation, sun damage, rosacea, and broken capillaries. We use the Lumenis Stellar M22, one of the most advanced IPL platforms available. A series of 3–5 treatments produces clear, more even-toned skin with minimal downtime.", category: "Skin" },
  { question: "Do you offer laser hair removal?", answer: "Yes. Laser hair removal is one of our signature services, performed with the Lumenis Splendor X — safe for all skin types including darker complexions. Visit our laser hair removal page for full details on areas treated, sessions needed, and pricing.", category: "Laser Hair Removal" },
];

// ─── Blog Posts ───
export const blogPosts: BlogPost[] = [
  {
    slug: "preventative-botox",
    title: "Preventative Botox in Your 20s and 30s: Smart Strategy or Marketing Hype?",
    excerpt: "Preventative Botox in your 20s and 30s is increasingly popular, but is it smart or oversold? Here's the honest case for and against starting early.",
    category: "Injectables",
    date: "2026-05-27",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1780000913/botox-12_xacfux.jpg",
    body: preventativeBotoxBody,
    seo: {
      title: "Preventative Botox: Is It Worth It?",
      description: "Preventative Botox in your 20s and 30s is increasingly popular, but is it smart or oversold? Here's the honest case for and against starting early.",
      canonical: `${BASE_URL}/blog/preventative-botox`,
      keywords: ["preventative botox", "baby botox", "botox in your 20s", "when to start botox", "preventative botox aventura"],
    },
  },
  {
    slug: "botox-vs-filler",
    title: "Botox vs. Filler: Which One Do You Actually Need?",
    excerpt: "Botox vs. filler — confused about the difference? Learn how each works, what they treat, and how to know which one is right for your goals.",
    category: "Injectables",
    date: "2026-05-29",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1781297632/julia-koblitz-6u8SbtZ0q1c-unsplash_fzzoba.jpg",
    body: botoxVsFillerBody,
    seo: {
      title: "Botox vs. Filler: Which One Do You Need?",
      description: "Botox vs. filler — confused about the difference? Learn how each works, what they treat, and how to know which one is right for your goals.",
      canonical: `${BASE_URL}/blog/botox-vs-filler`,
      keywords: ["botox vs filler", "botox or filler", "difference between botox and filler", "filler vs botox aventura", "which injectable is right for me"],
    },
  },
  {
    slug: "under-eye-filler",
    title: "Under Eye Filler: Is It Right for You?",
    excerpt: "Under eye filler can reduce hollows and dark shadows, but it's one of the most technique-sensitive treatments. Here's what you need to know first.",
    category: "Injectables",
    date: "2026-05-31",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1781297408/amanda-dalbjorn-fvInY-Gh7sc-unsplash_ocjopc.jpg",
    body: underEyeFillerBody,
    seo: {
      title: "Under Eye Filler: Is It Right for You?",
      description: "Under eye filler can reduce hollows and dark shadows, but it's one of the most technique-sensitive treatments. Here's what you need to know first.",
      canonical: `${BASE_URL}/blog/under-eye-filler`,
      keywords: ["under eye filler", "tear trough filler", "dark circles filler", "under eye filler aventura", "tear trough treatment"],
    },
  },
  {
    slug: "jawline-filler",
    title: "Jawline Filler: What to Expect Before and After",
    excerpt: "Jawline filler can sharpen and define your profile without surgery. Here's what it involves, what results look like, and how long it lasts.",
    category: "Injectables",
    date: "2026-06-02",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1781297484/alexander-krivitskiy-ks7b752oXhw-unsplash_rgm8e0.jpg",
    body: jawlineFillerBody,
    seo: {
      title: "Jawline Filler: What to Expect",
      description: "Jawline filler can sharpen and define your profile without surgery. Here's what it involves, what results look like, and how long it lasts.",
      canonical: `${BASE_URL}/blog/jawline-filler`,
      keywords: ["jawline filler", "jawline filler aventura", "jaw filler before and after", "jaw contouring filler", "non surgical jawline"],
    },
  },
  {
    slug: "how-long-does-lip-filler-last",
    title: "How Long Does Lip Filler Last?",
    excerpt: "Lip filler doesn't last forever. Learn how long results typically hold, what affects longevity, and how to maintain your look over time.",
    category: "Injectables",
    date: "2026-06-04",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1781297514/michal-binkiewicz-LrXd_-dgwbk-unsplash_f0qlb9.jpg",
    body: howLongLipFillerBody,
    seo: {
      title: "How Long Does Lip Filler Last?",
      description: "Lip filler doesn't last forever. Learn how long results typically hold, what affects longevity, and how to maintain your look over time.",
      canonical: `${BASE_URL}/blog/how-long-does-lip-filler-last`,
      keywords: ["how long does lip filler last", "lip filler longevity", "lip filler duration", "lip filler maintenance aventura", "how often to get lip filler"],
    },
  },
  {
    slug: "cheek-filler-before-and-after",
    title: "Cheek Filler Before and After: What Realistic Results Look Like",
    excerpt: "Curious about cheek filler results? Here's an honest look at before and after outcomes, what changes, and what realistic expectations look like.",
    category: "Injectables",
    date: "2026-06-06",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1781297564/ehsan-ahmadi-SotFdA_TAIA-unsplash_xksa3m.jpg",
    body: cheekFillerBody,
    seo: {
      title: "Cheek Filler Before and After: Real Results",
      description: "Curious about cheek filler results? Here's an honest look at before and after outcomes, what changes, and what realistic expectations look like.",
      canonical: `${BASE_URL}/blog/cheek-filler-before-and-after`,
      keywords: ["cheek filler before and after", "cheek filler aventura", "cheek filler results", "midface filler", "cheekbone filler"],
    },
  },
  {
    slug: "laser-hair-removal-for-men",
    title: "Laser Hair Removal for Men: The Grooming Upgrade Worth Considering",
    excerpt: "More men are choosing laser hair removal than ever. Learn which areas work best, what to expect, and why it's worth considering for your routine.",
    category: "Laser Hair Removal",
    date: "2026-05-25",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1780001146/mika-ruusunen-M6z4XBIcUSk-unsplash_n9y5zu.jpg",
    body: laserHairRemovalForMenBody,
    seo: {
      title: "Laser Hair Removal for Men",
      description: "More men are choosing laser hair removal than ever. Learn which areas work best, what to expect, and why it's worth considering for your routine.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-for-men`,
      keywords: ["laser hair removal for men", "men's laser hair removal", "back laser hair removal men", "male laser hair removal aventura", "beard line laser hair removal"],
    },
  },
  {
    slug: "full-body-laser-hair-removal",
    title: "Full Body Laser Hair Removal: Is It Really Worth the Investment?",
    excerpt: "Thinking about full body laser hair removal? Here's what it actually includes, how long it takes, what it costs, and whether it's worth the investment.",
    category: "Laser Hair Removal",
    date: "2026-05-23",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1780001652/dynamic-wang-cu4i3YN3Y-4-unsplash_1_rjsp5k.jpg",
    body: fullBodyLaserHairRemovalBody,
    seo: {
      title: "Full Body Laser Hair Removal",
      description: "Thinking about full body laser hair removal? Here's what it actually includes, how long it takes, what it costs, and whether it's worth the investment.",
      canonical: `${BASE_URL}/blog/full-body-laser-hair-removal`,
      keywords: ["full body laser hair removal", "full body laser hair removal cost", "laser hair removal package", "full body laser aventura", "is full body laser worth it"],
    },
  },
  {
    slug: "facial-laser-hair-removal-women",
    title: "Facial Laser Hair Removal for Women: A Permanent Solution to Unwanted Hair",
    excerpt: "Facial laser hair removal for women is one of the most confidence-restoring treatments available. Learn which areas it treats and what to realistically expect.",
    category: "Laser Hair Removal",
    date: "2026-05-21",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1780001550/look-studio-HtXyytr9304-unsplash_bxogp0.jpg",
    body: facialLaserHairRemovalWomenBody,
    seo: {
      title: "Laser Hair Removal for Women's Faces",
      description: "Facial laser hair removal for women is one of the most confidence-restoring treatments available. Learn which areas it treats and what to realistically expect.",
      canonical: `${BASE_URL}/blog/facial-laser-hair-removal-women`,
      keywords: ["facial laser hair removal women", "female facial hair laser", "upper lip laser hair removal", "chin laser hair removal women", "facial laser hair removal aventura"],
    },
  },
  {
    slug: "botox-forehead-before-and-after",
    title: "Botox Forehead Before and After: What Realistic Results Actually Look Like",
    excerpt: "What do real Botox forehead results look like? Learn what changes, what stays the same, and how to set honest expectations before your appointment.",
    category: "Injectables",
    date: "2026-05-19",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1780000950/botox-forehead_u2xrky.jpg",
    body: botoxForeheadBeforeAfterBody,
    seo: {
      title: "Botox Before and After: Forehead",
      description: "What do real Botox forehead results look like? Learn what changes, what stays the same, and how to set honest expectations before your appointment.",
      canonical: `${BASE_URL}/blog/botox-forehead-before-and-after`,
      keywords: ["botox forehead before and after", "forehead botox results", "botox before and after forehead", "forehead botox aventura", "natural forehead botox"],
    },
  },
  {
    slug: "laser-hair-removal-pcos",
    title: "Laser Hair Removal for PCOS: An Honest Guide to What Actually Works",
    excerpt: "Laser hair removal can help manage PCOS hair growth, but expectations matter. Learn what works, what doesn't, and how to plan realistic treatment.",
    category: "Laser Hair Removal",
    date: "2026-05-08",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778872166/alexander-krivitskiy-Cdw0oTj90_8-unsplash_zspb79.jpg",
    body: laserHairRemovalPCOSBody,
    faq: [
      {
        question: "Does laser hair removal work for PCOS?",
        answer: "Yes, laser hair removal significantly reduces hair density and coarseness in PCOS patients. However, because PCOS is hormonally driven, more sessions are needed and ongoing maintenance is typical. Most patients see meaningful improvement even if complete permanent removal is less likely than in non-PCOS patients.",
      },
      {
        question: "How many laser sessions does a PCOS patient need?",
        answer: "PCOS patients typically need 10 to 12 initial sessions rather than the standard 6 to 8, followed by maintenance sessions every 3 to 6 months depending on how well the underlying hormonal condition is managed.",
      },
      {
        question: "What areas does PCOS hair growth affect most?",
        answer: "The most commonly affected areas include the chin, upper lip, jawline, neck, chest, lower abdomen, and inner thighs — all androgen-sensitive zones that respond to elevated testosterone levels.",
      },
      {
        question: "Should I treat my PCOS before starting laser hair removal?",
        answer: "Ideally yes. Patients with well-managed PCOS see significantly better laser results. Working with a medical provider on hormonal management alongside laser treatment produces the best long-term outcomes.",
      },
    ],
    seo: {
      title: "Laser Hair Removal for PCOS",
      description: "Laser hair removal can help manage PCOS hair growth, but expectations matter. Learn what works, what doesn't, and how to plan realistic treatment.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-pcos`,
      keywords: ["laser hair removal pcos", "pcos hair removal", "hirsutism laser treatment", "laser hair removal hormonal hair growth", "pcos facial hair laser aventura"],
    },
  },
  {
    slug: "botox-forehead-lines",
    title: "Botox for Forehead Lines: How to Get Natural Results That Last",
    excerpt: "Botox for forehead lines is one of the most popular treatments worldwide. Learn how it works, how many units you need, and what natural results look like.",
    category: "Injectables",
    date: "2026-05-11",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778872477/ehsan-ahmadi-7oM0L9yqcds-unsplash_vuebi1.jpg",
    body: botoxForeheadLinesBody,
    faq: [
      {
        question: "How many units of Botox do I need for forehead lines?",
        answer: "Forehead Botox typically requires 10 to 20 units depending on your muscle size, strength, and aesthetic goals. Men generally need more than women. An experienced injector will assess your facial movement before recommending a unit count.",
      },
      {
        question: "Will forehead Botox make me look frozen?",
        answer: "Not with proper dosing and placement. A skilled injector relaxes the frontalis muscle enough to soften lines while preserving natural movement. The goal is a refreshed appearance, not an expressionless one.",
      },
      {
        question: "Should I treat my forehead and glabella together?",
        answer: "Usually yes. Treating the forehead alone without the glabella can cause the brows to drop or feel heavy, as the frown muscles pull downward unopposed. Most experienced injectors treat both areas together as a coordinated upper face protocol.",
      },
      {
        question: "How long does forehead Botox last?",
        answer: "Forehead Botox typically lasts 3 to 4 months. Patients with stronger, more expressive foreheads may see movement return closer to 2.5 months, while those with smaller muscle groups may enjoy results up to 5 months.",
      },
    ],
    seo: {
      title: "Botox for Forehead Lines",
      description: "Botox for forehead lines is one of the most popular treatments worldwide. Learn how it works, how many units you need, and what natural results look like.",
      canonical: `${BASE_URL}/blog/botox-forehead-lines`,
      keywords: ["botox forehead lines", "botox for forehead", "forehead botox units", "botox forehead aventura", "how many units botox forehead"],
    },
  },
  {
    slug: "what-not-to-do-after-botox",
    title: "What Not to Do After Botox: 7 Mistakes That Ruin Your Results",
    excerpt: "Want the best Botox results? Avoid these common mistakes in the first 24 hours and beyond that can affect how your treatment settles.",
    category: "Injectables",
    date: "2026-05-13",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778872596/look-studio-KUjVATctN1I-unsplash_eomi50.jpg",
    body: whatNotToDoAfterBotoxBody,
    faq: [
      {
        question: "Can I lie down after Botox?",
        answer: "Avoid lying flat for at least four hours after your appointment. After that, normal activity resumes, though sleeping face-down is best avoided the first night.",
      },
      {
        question: "Can I exercise after Botox?",
        answer: "Skip intense exercise for the rest of the day after your appointment. Light walking is fine. You can resume normal workouts the following day.",
      },
      {
        question: "Can I drink alcohol after Botox?",
        answer: "Avoid alcohol for 24 hours before and after your appointment. Alcohol thins the blood and increases the likelihood of bruising at injection sites.",
      },
      {
        question: "When will I see my Botox results?",
        answer: "Most patients begin noticing changes between days 3 and 5. Full results are visible around days 10 to 14. Do not assess your outcome before the two-week mark.",
      },
      {
        question: "Can I touch my face after Botox?",
        answer: "Avoid pressing, rubbing, or massaging the treated area for the first 24 hours. Gentle skincare is fine after a few hours, applied with light pressure.",
      },
    ],
    seo: {
      title: "What Not to Do After Botox",
      description: "Want the best Botox results? Avoid these common mistakes in the first 24 hours and beyond that can affect how your treatment settles.",
      canonical: `${BASE_URL}/blog/what-not-to-do-after-botox`,
      keywords: ["what not to do after botox", "botox aftercare", "after botox instructions", "botox recovery tips", "botox dos and don'ts"],
    },
  },
  {
    slug: "laser-hair-removal-vs-waxing-guide",
    title: "Laser Hair Removal vs. Waxing: Which One Is Actually Worth It?",
    excerpt: "Laser hair removal vs. waxing: which is actually worth it? Compare cost, pain, results, and convenience to decide what's right for you.",
    category: "Laser Hair Removal",
    date: "2026-05-15",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778873043/womanizer-toys-1mqYa4ajqtU-unsplash_hradn6.jpg",
    body: laserVsWaxing2Body,
    faq: [
      {
        question: "Is laser hair removal better than waxing?",
        answer: "For most patients, yes. Laser permanently reduces hair growth after a complete course, while waxing only removes hair temporarily and must be repeated indefinitely. Laser is also less painful and more cost-effective over time.",
      },
      {
        question: "How much does laser hair removal cost compared to waxing?",
        answer: "A complete laser package for one area typically costs $800–$1,500 upfront. Waxing the same area costs $400–$640 per year indefinitely. Laser becomes the more economical choice within 2–3 years.",
      },
      {
        question: "Does laser hair removal hurt more than waxing?",
        answer: "Most patients find laser significantly less painful than waxing, particularly for the Brazilian area. Laser delivers brief pulses with integrated cooling, while waxing pulls hair from the root across the entire area at once.",
      },
      {
        question: "Who should choose waxing over laser?",
        answer: "Patients with very light, blonde, grey, or red hair may find laser less effective since it targets pigment. Those who are pregnant, want only temporary removal, or prefer not to commit to multiple sessions may also prefer waxing.",
      },
    ],
    seo: {
      title: "Laser Hair Removal vs. Waxing",
      description: "Laser hair removal vs. waxing: which is actually worth it? Compare cost, pain, results, and convenience to decide what's right for you.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-vs-waxing-guide`,
      keywords: ["laser hair removal vs waxing", "laser vs waxing cost", "is laser better than waxing", "laser hair removal worth it", "waxing vs laser aventura"],
    },
  },
  {
    slug: "lip-filler-swelling",
    title: "Lip Filler Swelling: Your Day-by-Day Recovery Timeline",
    excerpt: "Lip filler swelling can be alarming if you don't know what's normal. Here's a day-by-day breakdown of what to expect and when results settle.",
    category: "Injectables",
    date: "2026-05-17",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778873290/trew-v40lRmz-fNQ-unsplash_hu4elw.jpg",
    body: lipFillerSwellingBody,
    faq: [
      {
        question: "How long does lip filler swelling last?",
        answer: "Swelling peaks around day one and subsides significantly by the end of the first week. Your true result is visible at the two-week mark when all residual swelling has resolved.",
      },
      {
        question: "Is it normal for lips to look uneven after filler?",
        answer: "Yes. Asymmetry in the first few days is very common and almost always resolves on its own as the filler integrates and swelling subsides. Assess your result at two weeks, not two days.",
      },
      {
        question: "How do I reduce lip filler swelling?",
        answer: "Apply cold compresses gently for the first 24 hours, sleep with your head elevated, avoid heat, alcohol, and intense exercise for 24–48 hours, and do not press or massage the lips during the first week.",
      },
      {
        question: "When should I be concerned about lip filler swelling?",
        answer: "Contact your provider if swelling is severe, asymmetric, and worsening after day three, if you have persistent or increasing pain, or if you notice white, blue, or mottled skin discoloration — these can indicate a vascular complication requiring immediate attention.",
      },
      {
        question: "When will I see my real lip filler results?",
        answer: "Your true result is visible at the two-week mark, once the filler has fully integrated and all swelling has resolved. Do not assess your outcome before then.",
      },
    ],
    seo: {
      title: "Lip Filler Swelling: Day-by-Day Timeline",
      description: "Lip filler swelling can be alarming if you don't know what's normal. Here's a day-by-day breakdown of what to expect and when results settle.",
      canonical: `${BASE_URL}/blog/lip-filler-swelling`,
      keywords: ["lip filler swelling", "lip filler recovery", "lip filler swelling timeline", "how long does lip filler swelling last", "lip filler aftercare"],
    },
  },
  {
    slug: "botox-how-long-to-work",
    title: "How Long Does Botox Take to Work? Your Day-by-Day Breakdown",
    excerpt: "Botox results don't appear overnight. Learn exactly when to expect changes, what influences the timeline, and how to get the best outcome.",
    category: "Injectables",
    date: "2026-05-01",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778263433/botox_pic_AdobeStock_225081708_ub9flf.jpg",
    body: botoxHowLongToWorkBody,
    faq: [
      {
        question: "How long does Botox take to work?",
        answer: "Most patients begin noticing early changes between days 3 and 5. Full results are typically visible by days 10 to 14 after treatment.",
      },
      {
        question: "Why is my Botox not working after 3 days?",
        answer: "This is completely normal. Botox takes time to bind to nerve terminals and inhibit muscle contractions. Visible results usually begin around day 3–5 and reach their peak at 10–14 days.",
      },
      {
        question: "What factors affect how fast Botox kicks in?",
        answer: "Metabolism, muscle mass, injection technique, and dosage all influence onset speed. People with faster metabolisms or stronger facial muscles may take slightly longer to see full results.",
      },
      {
        question: "How long do Botox results last?",
        answer: "Results typically last 3 to 4 months, though this varies by individual. Consistent treatment over time can extend the interval between appointments.",
      },
      {
        question: "When should I book Botox before an event?",
        answer: "Book at least 3 weeks before a significant event. This allows full results to appear and any minor bruising to resolve before your date.",
      },
    ],
    seo: {
      title: "How Long Does Botox Take to Work?",
      description: "Botox results don't appear overnight. Learn exactly when to expect changes, what influences the timeline, and how to get the best outcome.",
      canonical: `${BASE_URL}/blog/botox-how-long-to-work`,
      keywords: ["how long does botox take to work", "botox timeline", "when does botox kick in", "botox results days", "botox aventura"],
    },
  },
  {
    slug: "bikini-laser-hair-removal",
    title: "Bikini Laser Hair Removal: What to Know",
    excerpt: "Considering bikini laser hair removal? Learn what it covers, how it differs from a Brazilian, and what to expect from your sessions.",
    category: "Laser Hair Removal",
    date: "2026-05-02",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778275072/bikini_Adobe_315338719_pneqcq.jpg",
    body: bikiniLaserBody,
    faq: [
      {
        question: "What is the difference between bikini and Brazilian laser hair removal?",
        answer: "A bikini laser targets hair visible outside a swimsuit — the front bikini line and upper inner thighs. A Brazilian removes all hair in the intimate area, front to back. An extended bikini falls between the two.",
      },
      {
        question: "How many sessions does bikini laser hair removal take?",
        answer: "Most patients need six to eight sessions spaced four to six weeks apart to achieve permanent hair reduction in the bikini area.",
      },
      {
        question: "Does bikini laser hair removal hurt?",
        answer: "The bikini line is more sensitive than the legs or arms, but modern devices with integrated cooling keep the experience manageable. Most patients describe it as a brief warm snap with each pulse.",
      },
      {
        question: "How much does bikini laser hair removal cost?",
        answer: "A complete six-to-eight session bikini package at a quality clinic typically ranges from $400 to $700. Single sessions run between $75 and $200 depending on the clinic.",
      },
      {
        question: "Who is a good candidate for bikini laser hair removal?",
        answer: "Bikini laser works best for patients with darker hair and lighter to medium skin tones, though modern Nd:YAG lasers make it safe for darker skin tones too. It is not suitable during pregnancy.",
      },
    ],
    seo: {
      title: "Bikini Laser Hair Removal: What to Know",
      description: "Considering bikini laser hair removal? Learn what it covers, how it differs from a Brazilian, and what to expect from your sessions.",
      canonical: `${BASE_URL}/blog/bikini-laser-hair-removal`,
      keywords: ["bikini laser hair removal", "bikini laser aventura", "bikini vs brazilian laser", "bikini line laser hair removal", "laser hair removal bikini miami"],
    },
  },
  {
    slug: "is-botox-safe",
    title: "Is Botox Safe? Here's What the Science Actually Says",
    excerpt: "Is Botox really safe? Get a clear, science-based answer about how it works, what the research shows, and how to choose the right provider.",
    category: "Injectables",
    date: "2026-05-03",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778275217/AdobeStock_402181304_gzvurk.jpg",
    body: isBotoxSafeBody,
    faq: [
      {
        question: "Is Botox safe?",
        answer: "Yes, when administered by a qualified provider using authentic product. Botox has over four decades of clinical research behind it and one of the most extensive safety profiles of any aesthetic treatment.",
      },
      {
        question: "What are the risks of Botox?",
        answer: "Common side effects include minor bruising, brief redness, and occasional mild headache. Less common effects like temporary asymmetry or eyelid drooping are almost always linked to injector technique and resolve as the Botox wears off.",
      },
      {
        question: "Who should not get Botox?",
        answer: "Botox is not appropriate for pregnant or breastfeeding patients, those with neuromuscular disorders like myasthenia gravis, patients with active skin infections at the injection site, or those with known allergies to the formulation.",
      },
      {
        question: "How do I choose a safe Botox provider?",
        answer: "Look for board-certified physicians or highly trained nurse practitioners, ask about their experience and product sourcing, and ensure a thorough consultation is conducted before any injection. Avoid pop-up clinics and deeply discounted offers.",
      },
    ],
    seo: {
      title: "Is Botox Safe? What You Should Know",
      description: "Is Botox really safe? Get a clear, science-based answer about how it works, what the research shows, and how to choose the right provider.",
      canonical: `${BASE_URL}/blog/is-botox-safe`,
      keywords: ["is botox safe", "botox safety", "botox side effects", "botox risks", "is botox safe aventura"],
    },
  },
  {
    slug: "underarm-laser-hair-removal",
    title: "Underarm Laser Hair Removal: The Five-Minute Treatment That Changes Your Routine",
    excerpt: "Underarm laser hair removal is one of the easiest treatments to start with. Learn what to expect, how many sessions, and what it actually costs.",
    category: "Laser Hair Removal",
    date: "2026-05-04",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778275332/AdobeStock_504029612_oh8lve.jpg",
    body: underarmLaserBody,
    faq: [
      {
        question: "How many sessions does underarm laser hair removal take?",
        answer: "Most patients need six to eight sessions spaced four to six weeks apart. The underarms are one of the most responsive areas, and many patients see significant reduction by the third or fourth session.",
      },
      {
        question: "How much does underarm laser hair removal cost?",
        answer: "A complete six-to-eight session package typically costs between $300 and $600 at a quality clinic. Single sessions run between $75 and $150.",
      },
      {
        question: "Does underarm laser hair removal hurt?",
        answer: "The underarm area is sensitive, but sessions are only five to ten minutes long. Most patients describe the sensation as a brief warm snap with each pulse. Modern lasers with integrated cooling make the experience very manageable.",
      },
      {
        question: "Is underarm laser hair removal permanent?",
        answer: "Laser hair removal delivers permanent hair reduction, not guaranteed permanent removal. Most patients achieve 80–95% reduction after a full course and require only occasional maintenance sessions.",
      },
      {
        question: "Can I use deodorant after underarm laser hair removal?",
        answer: "Avoid deodorant or antiperspirant for the first 24 hours after each session to prevent irritation. After that, normal use can resume.",
      },
    ],
    seo: {
      title: "Underarm Laser Hair Removal Guide",
      description: "Underarm laser hair removal is one of the easiest treatments to start with. Learn what to expect, how many sessions, and what it actually costs.",
      canonical: `${BASE_URL}/blog/underarm-laser-hair-removal`,
      keywords: ["underarm laser hair removal", "armpit laser hair removal", "underarm laser aventura", "laser hair removal underarms cost", "underarm laser hair removal sessions"],
    },
  },
  {
    slug: "botox-lip-flip",
    title: "The Botox Lip Flip: A Subtle Way to Enhance Your Lips Without Filler",
    excerpt: "Curious about the Botox lip flip? Learn what it does, how it differs from filler, how long it lasts, and whether it's right for you.",
    category: "Injectables",
    date: "2026-05-05",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1778275427/AdobeStock_362873263_b4wxtu.jpg",
    body: botoxLipFlipBody,
    faq: [
      {
        question: "What is a Botox lip flip?",
        answer: "A Botox lip flip uses 4–6 units of Botox injected into the upper lip muscle to relax it slightly, causing the upper lip to roll outward. The result is a more visible, subtly fuller-looking upper lip without adding volume.",
      },
      {
        question: "How long does a lip flip last?",
        answer: "A lip flip typically lasts two to three months. The lip area is highly mobile and metabolizes Botox more quickly than less active facial muscles.",
      },
      {
        question: "How much does a Botox lip flip cost?",
        answer: "A lip flip typically costs between $80 and $150, depending on the clinic's unit price. It is significantly less expensive than lip filler.",
      },
      {
        question: "What is the difference between a lip flip and lip filler?",
        answer: "A lip flip relaxes the upper lip muscle to make the lip appear more visible — it does not add volume. Lip filler physically adds volume and shape using hyaluronic acid. Filler lasts 6–12 months; a lip flip lasts 2–3 months.",
      },
      {
        question: "Does a lip flip affect speech or eating?",
        answer: "With proper dosing and placement, no. Overdosing or improper placement can cause temporary mild difficulty with certain sounds or drinking from a straw, which is why choosing an experienced injector matters.",
      },
    ],
    seo: {
      title: "Botox Lip Flip: What to Expect",
      description: "Curious about the Botox lip flip? Learn what it does, how it differs from filler, how long it lasts, and whether it's right for you.",
      canonical: `${BASE_URL}/blog/botox-lip-flip`,
      keywords: ["botox lip flip", "lip flip vs lip filler", "botox lip flip aventura", "lip flip cost", "what is a lip flip"],
    },
  },
  {
    slug: "peptide-therapy-fda-2026",
    title: "Peptides Are Coming Back: What the 2026 FDA Reclassification Means for Aesthetic Clients",
    excerpt: "The FDA is expected to restore access to 14 previously restricted peptides in 2026. Here's what it means for aesthetic treatments and what Kami Aesthetics in Aventura FL is preparing to offer.",
    category: "Wellness",
    date: "2026-04-12",
    readTime: "4 min read",
    image: "/images/service-prp-therapy.png",
    body: peptideTherapyBody,
    faq: [
      {
        question: "What is the 2026 FDA peptide reclassification?",
        answer: "On February 27, 2026, HHS Secretary RFK Jr. announced that approximately 14 of the 19 peptides previously placed on the FDA Category 2 restricted list are expected to move back to Category 1, restoring legal access through licensed compounding pharmacies with a physician's prescription.",
      },
      {
        question: "Is peptide reclassification the same as FDA approval?",
        answer: "No. Reclassification to Category 1 means licensed compounding pharmacies can legally prepare these peptides under a physician's prescription. It does not mean they are FDA-approved drugs. They remain off-label therapeutics requiring physician supervision.",
      },
      {
        question: "Which peptides are expected to return to legal compounding in 2026?",
        answer: "Peptides expected to return include BPC-157, Thymosin Alpha-1, TB-500, CJC-1295, Ipamorelin, AOD-9604, Selank, and Semax among others.",
      },
      {
        question: "Will Kami Aesthetics offer peptide therapy?",
        answer: "Yes. Kami Aesthetics is actively preparing to incorporate peptide-based wellness treatments as reclassification moves forward. All treatments will be properly supervised and sourced from licensed compounding pharmacies.",
      },
      {
        question: "Where can I get peptide therapy in Aventura FL?",
        answer: "Kami Aesthetics, located at 2999 NE 191st St Floor 9 Aventura FL 33180, is preparing to offer peptide therapy as the FDA reclassification is finalized. Book a consultation to learn more.",
      },
    ],
    seo: {
      title: "Peptides Are Coming Back: What the 2026 FDA Reclassification Means for Aesthetic Clients | Kami Aesthetics",
      description: "The FDA is expected to restore access to 14 previously restricted peptides in 2026. Here's what it means for aesthetic treatments and what Kami Aesthetics in Aventura FL is preparing to offer.",
      canonical: `${BASE_URL}/blog/peptide-therapy-fda-2026`,
      keywords: ["peptide therapy aventura", "bpc-157 miami", "fda peptide reclassification 2026", "peptide therapy near me", "compounding pharmacy peptides florida"],
    },
  },
  {
    slug: "does-laser-hair-removal-hurt",
    title: "Does Laser Hair Removal Hurt? Here's What Nobody Tells You",
    excerpt: "Worried laser hair removal will hurt? Here's what it really feels like, what affects pain levels, and how to make every session more comfortable.",
    category: "Laser Hair Removal",
    date: "2026-04-27",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1777310666/farhad-ibrahimzade-szpFxaqS658-unsplash_zwf1md.jpg",
    body: doesLaserHurtBody,
    seo: {
      title: "Does Laser Hair Removal Hurt?",
      description: "Worried laser hair removal will hurt? Here's what it really feels like, what affects pain levels, and how to make every session more comfortable.",
      canonical: `${BASE_URL}/blog/does-laser-hair-removal-hurt`,
      keywords: ["does laser hair removal hurt", "laser hair removal pain", "laser hair removal uncomfortable", "laser hair removal vs waxing pain", "laser hair removal aventura"],
    },
  },
  {
    slug: "is-laser-hair-removal-permanent",
    title: "Is Laser Hair Removal Permanent? Let's Set the Record Straight",
    excerpt: "Is laser hair removal really permanent, or is the marketing oversold? Get the honest answer about long-term results and what to actually expect.",
    category: "Laser Hair Removal",
    date: "2026-04-25",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1777310763/dynamic-wang-cu4i3YN3Y-4-unsplash_rb4dhb.jpg",
    body: isLaserPermanentBody,
    seo: {
      title: "Is Laser Hair Removal Permanent?",
      description: "Is laser hair removal really permanent, or is the marketing oversold? Get the honest answer about long-term results and what to actually expect.",
      canonical: `${BASE_URL}/blog/is-laser-hair-removal-permanent`,
      keywords: ["is laser hair removal permanent", "laser hair removal permanent reduction", "laser hair removal long term results", "does laser hair removal last", "laser hair removal aventura"],
    },
  },
  {
    slug: "lip-filler-cost",
    title: "Lip Filler Cost: What You're Actually Paying For",
    excerpt: "Lip filler prices vary more than people realize. Learn what affects the cost, what's included, and how to get natural results without overpaying.",
    category: "Injectables",
    date: "2026-04-24",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1777311047/IMG_7820_dolalp.jpg",
    body: lipFillerCostBody,
    seo: {
      title: "Lip Filler Cost: What to Expect",
      description: "Lip filler prices vary more than people realize. Learn what affects the cost, what's included, and how to get natural results without overpaying.",
      canonical: `${BASE_URL}/blog/lip-filler-cost`,
      keywords: ["lip filler cost", "how much does lip filler cost", "lip filler price aventura", "lip filler miami", "lip filler worth it"],
    },
  },
  {
    slug: "what-is-botox",
    title: "What Is Botox, Really? The Beginner's Guide Worth Reading",
    excerpt: "New to Botox? Learn exactly what it is, how it works, what it treats, and what to expect before booking your first appointment.",
    category: "Injectables",
    date: "2026-04-23",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1777311073/IMG_5848_xebot5.jpg",
    body: whatIsBotoxBody,
    seo: {
      title: "What Is Botox? A Beginner's Guide",
      description: "New to Botox? Learn exactly what it is, how it works, what it treats, and what to expect before booking your first appointment.",
      canonical: `${BASE_URL}/blog/what-is-botox`,
      keywords: ["what is botox", "how does botox work", "botox for beginners", "first time botox", "botox aventura"],
    },
  },
  {
    slug: "brazilian-laser-hair-removal",
    title: "Brazilian Laser Hair Removal: Everything You Were Too Afraid to Ask",
    excerpt: "Considering a Brazilian laser hair removal? Get an honest look at what it involves, how many sessions you need, and what to expect from start to finish.",
    category: "Laser Hair Removal",
    date: "2026-04-20",
    readTime: "7 min read",
    image: "https://res.cloudinary.com/dnuxtgg11/image/upload/q_auto/f_auto/v1777311540/farhad-ibrahimzade-_A0jYQvTm9M-unsplash_azlayf.jpg",
    body: brazilianLaserGuideBody,
    seo: {
      title: "Brazilian Laser Hair Removal Guide",
      description: "Considering a Brazilian laser hair removal? Get an honest look at what it involves, how many sessions you need, and what to expect from start to finish.",
      canonical: `${BASE_URL}/blog/brazilian-laser-hair-removal`,
      keywords: ["brazilian laser hair removal", "brazilian laser aventura", "full brazilian laser", "bikini laser hair removal miami", "brazilian laser hair removal guide"],
    },
  },
  {
    slug: "laser-hair-removal-cost",
    title: "The Real Cost of Laser Hair Removal (And Why It's Less Than You Think)",
    excerpt: "Wondering what laser hair removal costs and whether it's worth it? Get a clear breakdown of pricing, sessions, and long-term value before you book.",
    category: "Laser Hair Removal",
    date: "2026-04-10",
    readTime: "6 min read",
    image: "/images/service-laser-hair-removal.png",
    body: laserHairRemovalCostBody,
    seo: {
      title: "Laser Hair Removal Cost: Is It Worth It?",
      description: "Wondering what laser hair removal costs and whether it's worth it? Get a clear breakdown of pricing, sessions, and long-term value before you book.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-cost`,
      keywords: ["laser hair removal cost", "how much does laser hair removal cost", "laser hair removal price aventura", "laser hair removal worth it", "laser hair removal vs waxing cost"],
    },
  },
  {
    slug: "botox-cost",
    title: "So, How Much Does Botox Actually Cost?",
    excerpt: "Botox pricing varies more than most people expect. Learn what drives the cost, how many units you need, and what a fair price actually looks like.",
    category: "Injectables",
    date: "2026-04-15",
    readTime: "6 min read",
    image: "/images/service-botox.png",
    body: botoxCostBody,
    seo: {
      title: "How Much Does Botox Cost?",
      description: "Botox pricing varies more than most people expect. Learn what drives the cost, how many units you need, and what a fair price actually looks like.",
      canonical: `${BASE_URL}/blog/botox-cost`,
      keywords: ["how much does botox cost", "botox price per unit", "botox cost aventura", "botox units by area", "botox worth it"],
    },
  },
  {
    slug: "how-long-does-botox-last",
    title: "How Long Does Botox Really Last? The Honest Answer",
    excerpt: "Botox results don't last forever, but how long exactly? Learn what affects your timeline, which areas fade fastest, and when to rebook.",
    category: "Injectables",
    date: "2026-04-20",
    readTime: "6 min read",
    image: "/images/service-botox.png",
    body: botoxHowLongBody,
    seo: {
      title: "How Long Does Botox Last?",
      description: "Botox results don't last forever, but how long exactly? Learn what affects your timeline, which areas fade fastest, and when to rebook.",
      canonical: `${BASE_URL}/blog/how-long-does-botox-last`,
      keywords: ["how long does botox last", "botox duration", "botox wear off", "botox timeline", "how often do you need botox"],
    },
  },
  {
    slug: "laser-hair-removal-vs-waxing",
    title: "Laser Hair Removal vs. Waxing: Why Aventura Clients Are Making the Switch",
    excerpt: "Tired of the endless waxing cycle? Discover why laser hair removal with the Splendor X delivers permanent results that save you time, money, and discomfort.",
    category: "Laser Hair Removal",
    date: "2026-03-15",
    readTime: "5 min read",
    image: "/images/service-laser-hair-removal.png",
    body: laserVsWaxingBody,
    seo: {
      title: "Laser Hair Removal vs Waxing in Aventura",
      description: "Compare laser hair removal and waxing. Learn why Aventura clients choose the Splendor X for permanent, painless hair removal.",
      canonical: `${BASE_URL}/blog/laser-hair-removal-vs-waxing`,
      keywords: ["laser hair removal vs waxing", "laser hair removal aventura", "permanent hair removal miami", "splendor x aventura"],
    },
  },
  {
    slug: "splendor-x-all-skin-types",
    title: "Why the Splendor X Is the Safest Laser for All Skin Types",
    excerpt: "Not all lasers are created equal. Learn how the Lumenis Splendor X's BLEND X™ technology makes it the gold standard for safe, effective treatment on every skin tone.",
    category: "Technology",
    date: "2026-03-01",
    readTime: "4 min read",
    image: "/images/splendor-x-laser.png",
    body: splendorXAllSkinTypesBody,
    seo: {
      title: "Splendor X: Safe Laser for All Skin Types",
      description: "Learn why the Lumenis Splendor X is the safest laser for all skin types, including dark skin tones. BLEND X™ technology explained.",
      canonical: `${BASE_URL}/blog/splendor-x-all-skin-types`,
      keywords: ["splendor x all skin types", "laser hair removal dark skin", "fitzpatrick skin type laser", "blend x technology"],
    },
  },
  {
    slug: "ipl-photofacial-sun-damage",
    title: "How IPL Photofacial Reverses Sun Damage: What to Expect",
    excerpt: "Living in South Florida means sun exposure. Discover how the Stellar M22 IPL can reverse years of sun damage and restore your skin's natural radiance.",
    category: "IPL / Skin",
    date: "2026-02-15",
    readTime: "6 min read",
    image: "/images/service-ipl-photofacial.png",
    body: iplSunDamageBody,
    seo: {
      title: "IPL Photofacial for Sun Damage in Aventura",
      description: "Learn how IPL photofacial with the Stellar M22 reverses sun damage, age spots, and rosacea. Aventura's premier skin rejuvenation clinic.",
      canonical: `${BASE_URL}/blog/ipl-photofacial-sun-damage`,
      keywords: ["ipl photofacial sun damage", "stellar m22 aventura", "sun spots treatment miami", "rosacea treatment aventura"],
    },
  },
];

// ─── Site-wide SEO Config ───
export const siteSEO = {
  siteName: "Kami Aesthetics",
  baseUrl: BASE_URL,
  defaultOgImage: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
  homeSEO: {
    title: "Kami Aesthetics | Med Spa in Aventura, FL",
    description:
      "Medical aesthetics & med spa in Aventura, FL. Laser treatments, skin rejuvenation, Botox, fillers, IPL & more. Powered by Lumenis Splendor X. Free consult.",
    canonical: BASE_URL,
    keywords: ["med spa aventura", "medical aesthetics aventura", "botox aventura", "dermal fillers aventura", "skin rejuvenation aventura", "kami aesthetics"],
  },
};

// ─── LocalBusiness Schema ───
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Kami Aesthetics",
  description: siteSEO.homeSEO.description,
  url: BASE_URL,
  telephone: "+19544697153",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2999 NE 191st St 906 Floor 9",
    addressLocality: "Aventura",
    addressRegion: "FL",
    postalCode: "33180",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.956, longitude: -80.1426 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  image: SPLENDOR_X_IMAGE,
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Aventura" },
  sameAs: [
    INSTAGRAM_URL,
    FACEBOOK_URL,
    TIKTOK_URL,
  ],
};
