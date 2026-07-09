import type { Treatment } from "@/types";
import { BA_IMAGES } from "./constants";

export const treatments: Treatment[] = [
  {
    slug: "laser-hair-removal",
    title: "Laser Hair Removal",
    shortDescription:
      "Permanent hair reduction with the Splendor X — fast, comfortable, and effective for all skin types.",
    fullDescription:
      "Experience the gold standard in laser hair removal with the Lumenis Splendor X. Our advanced BLEND X™ technology combines Alexandrite (755nm) and Nd:YAG (1064nm) wavelengths simultaneously, delivering superior results on all skin types — from light to dark. The unique square spot shape ensures uniform coverage with no missed spots, while the dual cooling system keeps you comfortable throughout treatment.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "15–60 min",
    downtime: "None",
    resultsTimeline: "After 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Safe for all skin types (Fitzpatrick I–VI)",
      "Fastest treatment times in the industry",
      "Virtually painless with dual cooling system",
      "Permanent hair reduction in 6–8 sessions",
      "Large treatment areas covered quickly",
      "No downtime — return to activities immediately",
    ],
    areas: ["Full Face", "Underarms", "Bikini / Brazilian", "Full Legs", "Arms", "Back & Chest", "Upper Lip & Chin"],
    faq: [
      {
        q: "How many sessions do I need?",
        a: "Most clients see optimal results in 6–8 sessions, spaced 4–6 weeks apart. Hair grows in cycles, so multiple sessions ensure all follicles are treated during their active growth phase.",
      },
      {
        q: "Is it painful?",
        a: "The Splendor X features a dual cooling system (Cryo-Touch and Cryo-Air) that keeps the skin cool and comfortable. Most clients describe the sensation as a warm snap — far more comfortable than traditional lasers.",
      },
      {
        q: "How should I prepare for my session?",
        a: "Shave the treatment area 24 hours before your appointment. Avoid sun exposure, tanning, and waxing for 2 weeks prior. Arrive with clean skin free of lotions or deodorant.",
      },
      {
        q: "Can laser hair removal be done on dark skin tones?",
        a: "Yes. The Splendor X is safe and effective for all skin types including deeper complexions (Fitzpatrick I–VI). During your consultation we'll select the safest and most effective settings for your skin tone.",
      },
      {
        q: "How long does a session take?",
        a: "Small areas like the upper lip take about 5–10 minutes. Larger areas like the back or full legs can take 45–60 minutes.",
      },
      {
        q: "Is there downtime after laser hair removal?",
        a: "Minimal. You may experience some redness or mild swelling for a few hours, similar to a mild sunburn. You can return to normal activities the same day. Avoid sun exposure and hot showers for 24–48 hours.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Splendor X",
        subtitle: "The World's Most Advanced Laser Hair Removal System",
        content:
          "The Lumenis Splendor X is the first and only laser to combine Alexandrite (755nm) and Nd:YAG (1064nm) wavelengths simultaneously with BLEND X™ technology. Its unique square-shaped beam ensures uniform coverage with zero overlap, while the dual cooling system (Cryo-Touch + Cryo-Air) keeps treatments virtually painless.",
        items: [
          { label: "BLEND X™ Technology", description: "Dual wavelengths fire simultaneously for faster, more effective treatments on all skin tones." },
          { label: "Square Spot Shape", description: "Eliminates gaps and overlap for uniform coverage — no missed spots." },
          { label: "Dual Cooling System", description: "Cryo-Touch and Cryo-Air keep skin cool and comfortable throughout treatment." },
          { label: "Speed & Efficiency", description: "Treat a full back in under 15 minutes — the fastest laser on the market." },
        ],
      },
    ],
  },
  {
    slug: "ipl-treatments",
    title: "IPL Stellar M22",
    shortDescription:
      "The gold standard in IPL technology — target sun damage, redness, vascular lesions, and uneven skin tone with the Lumenis Stellar M22.",
    fullDescription:
      "The Lumenis Stellar M22 is the most powerful and versatile IPL (Intense Pulsed Light) platform available. With multiple applicators and customizable filters, it treats over 30 skin conditions including sun damage, age spots, rosacea, broken capillaries, acne, and uneven pigmentation. The Stellar M22's OPT™ (Optimal Pulse Technology) delivers consistent energy throughout each pulse for safer, more effective treatments with less discomfort.",
    heroImage: "/images/service-ipl-photofacial.png",
    heroGradient: "from-[#2C1810]/85 via-[#2C1810]/60 to-[#2C1810]/30",
    duration: "20–45 min",
    downtime: "1–3 days mild redness",
    resultsTimeline: "7–14 days",
    sessionsNeeded: "3–5 sessions",
    benefits: [
      "Treats 30+ skin conditions with one platform",
      "Reduces sun spots and age spots dramatically",
      "Minimizes redness, rosacea, and broken capillaries",
      "Improves overall skin tone and texture",
      "Stimulates collagen production for long-term improvement",
      "OPT™ technology for safer, more comfortable treatments",
    ],
    areas: ["Full Face", "Neck", "Chest / Décolletage", "Hands", "Arms"],
    faq: [
      {
        q: "What does IPL treat?",
        a: "IPL treats sun damage, age spots, redness, rosacea, broken capillaries, and uneven skin tone. The Stellar M22 can address all of these in the same treatment series.",
      },
      {
        q: "How many treatments will I need?",
        a: "A series of 3–5 treatments spaced 3–4 weeks apart is typically recommended for optimal results. Maintenance sessions every 6–12 months help preserve your results.",
      },
      {
        q: "What can I expect after treatment?",
        a: "You may experience mild redness and warmth for a few hours. Dark spots may temporarily darken before flaking off within 7–10 days, revealing clearer skin underneath.",
      },
      {
        q: "How is the Stellar M22 different from other IPL devices?",
        a: "The Stellar M22 features OPT™ (Optimal Pulse Technology) which delivers uniform energy throughout each pulse, unlike older IPL systems that spike at the beginning. This means safer treatments, less discomfort, and more consistent results.",
      },
    ],
    uniqueSections: [
      {
        type: "before-after",
        title: "Real Before & After Results",
        subtitle: "See the dramatic improvements our clients experience with IPL Stellar M22 treatments",
        beforeAfterPairs: [
          { area: "Sun Damage — Full Face", before: "Visible sun spots, uneven pigmentation, dull complexion", after: "Clear, even skin tone with dramatically reduced dark spots after 3 sessions", image: BA_IMAGES.iplSunspots },
          { area: "Rosacea — Cheeks & Nose", before: "Persistent redness, visible blood vessels, flushing episodes", after: "Significantly reduced redness and vascular lesions after 4 sessions", image: BA_IMAGES.iplRosacea },
          { area: "Age Spots — Hands", before: "Multiple brown spots and uneven pigmentation on hands", after: "Clearer, more youthful-looking hands with minimal pigmentation", image: BA_IMAGES.iplHands },
        ],
      },
      {
        type: "technology",
        title: "Stellar M22 Technology",
        subtitle: "The Most Advanced IPL Platform in the World",
        content:
          "The Lumenis Stellar M22 combines multiple technologies in one platform — IPL with OPT™, ResurFX fractional laser, and specialized applicators for acne, vascular lesions, and pigmentation.",
        items: [
          { label: "OPT™ Pulse Technology", description: "Delivers uniform energy for safer, more consistent results than traditional IPL." },
          { label: "Multiple Filters", description: "515nm–755nm filters target specific chromophores for precision treatment of different conditions." },
          { label: "ExpertFilter™", description: "Advanced filtering system maximizes efficacy while protecting surrounding tissue." },
        ],
      },
    ],
  },
  {
    slug: "resurfx",
    title: "ResurFX",
    shortDescription:
      "Non-ablative fractional laser for skin resurfacing, scars, stretch marks, and texture improvement.",
    fullDescription:
      "ResurFX is a revolutionary non-ablative fractional laser that stimulates your skin's natural healing process to rebuild collagen from within. Unlike ablative lasers, ResurFX treats the deeper layers of skin while leaving the surface intact, resulting in faster healing and less downtime. It's the ideal solution for acne scars, surgical scars, stretch marks, fine lines, and overall skin texture improvement.",
    heroImage: "/images/service-resurfx.png",
    heroGradient: "from-[#1A2A1A]/85 via-[#1A2A1A]/60 to-[#1A2A1A]/30",
    duration: "30–45 min",
    downtime: "1–3 days redness",
    resultsTimeline: "2–4 weeks progressive",
    sessionsNeeded: "3–5 sessions",
    benefits: [
      "Reduces acne scars and surgical scars",
      "Improves stretch marks",
      "Smooths fine lines and wrinkles",
      "Refines skin texture and pore size",
      "Minimal downtime (1–3 days redness)",
      "Safe for most skin types",
    ],
    areas: ["Full Face", "Neck", "Abdomen", "Thighs", "Arms"],
    faq: [
      { q: "How is ResurFX different from other lasers?", a: "ResurFX is non-ablative, meaning it doesn't remove the top layer of skin. This results in faster recovery while still delivering powerful collagen remodeling deep within the skin." },
      { q: "When will I see results?", a: "Initial improvements are visible within 2–4 weeks as collagen rebuilds. Full results develop over 3–6 months, with continued improvement after each session." },
      { q: "How many sessions are recommended?", a: "Most clients benefit from 3–5 sessions spaced 4–6 weeks apart, depending on the concern being treated and desired results." },
    ],
    uniqueSections: [
      {
        type: "before-after",
        title: "Real Before & After Results",
        subtitle: "See the transformative results our clients achieve with ResurFX fractional laser treatments",
        beforeAfterPairs: [
          { area: "Acne Scars — Cheeks", before: "Visible pitted acne scars, rough texture, uneven skin surface", after: "Significantly smoother skin with reduced scarring after 4 sessions", image: BA_IMAGES.resurfxAcneScars },
          { area: "Stretch Marks — Abdomen", before: "Visible white and red stretch marks from pregnancy or weight changes", after: "Dramatically faded stretch marks with improved skin texture after 5 sessions", image: BA_IMAGES.resurfxStretchMarks },
          { area: "Fine Lines — Eyes & Forehead", before: "Visible fine lines, uneven texture, early signs of aging around eyes", after: "Smoother, more refined skin with reduced wrinkles and improved elasticity", image: BA_IMAGES.resurfxFineLines },
        ],
      },
      {
        type: "process-steps",
        title: "Your ResurFX Journey",
        subtitle: "What to expect during your skin resurfacing treatment",
        items: [
          { label: "1. Consultation", description: "We assess your skin concerns, discuss goals, and create a customized treatment plan tailored to your needs." },
          { label: "2. Preparation", description: "Topical numbing cream is applied 30 minutes before treatment for maximum comfort during the procedure." },
          { label: "3. Treatment", description: "The ResurFX handpiece delivers precise fractional laser energy to stimulate deep collagen remodeling." },
          { label: "4. Recovery", description: "Mild redness for 1–3 days. You can return to normal activities immediately with mineral sunscreen." },
          { label: "5. Results", description: "Collagen rebuilds over 2–6 months. Each session builds on the last for progressive, dramatic improvement." },
        ],
      },
    ],
  },
  {
    slug: "botox",
    title: "Botox",
    shortDescription:
      "Smooth fine lines and wrinkles with precision injections for a refreshed, natural appearance.",
    fullDescription:
      "Botox is the world's most popular non-surgical cosmetic treatment for a reason — it works. Our expert injectors use precise micro-dosing techniques to relax targeted facial muscles, smoothing dynamic wrinkles while preserving your natural expressions. Whether you're looking to soften forehead lines, crow's feet, or frown lines, our approach ensures results that look refreshed, never frozen.",
    heroImage: "/images/service-botox.png",
    heroGradient: "from-[#1A1A2A]/85 via-[#1A1A2A]/60 to-[#1A1A2A]/30",
    duration: "15–20 min",
    downtime: "None",
    resultsTimeline: "3–7 days",
    sessionsNeeded: "Every 3–4 months",
    benefits: [
      "Smooths forehead lines and frown lines",
      "Reduces crow's feet around the eyes",
      "Prevents new wrinkles from forming",
      "Quick 15-minute treatment",
      "No downtime required",
      "Natural-looking results in 3–7 days",
    ],
    areas: ["Forehead Lines", "Frown Lines (11s)", "Crow's Feet", "Bunny Lines", "Lip Flip", "Jawline Slimming"],
    faq: [
      { q: "How long do results last?", a: "Botox results typically last 3–4 months. With regular treatments, many clients find their results last longer over time as the muscles become trained to relax." },
      { q: "Will I look frozen?", a: "Absolutely not. Our approach focuses on natural-looking results. We use conservative dosing and precise placement to soften lines while maintaining your natural facial expressions." },
      { q: "Is there any downtime?", a: "There's virtually no downtime. You may have slight redness at injection sites for 30 minutes. We recommend avoiding strenuous exercise for 24 hours and not lying flat for 4 hours after treatment." },
      { q: "What areas can be treated with Botox?", a: "We treat forehead lines, frown lines (between the brows), crow's feet, bunny lines, lip lines, chin dimpling, neck bands, and we also offer Botox for excessive sweating (hyperhidrosis)." },
      { q: "Who is a good candidate for Botox?", a: "Most healthy adults over 18 who want to reduce the appearance of dynamic wrinkles are good candidates. Botox is not recommended during pregnancy or breastfeeding." },
      { q: "What should I avoid after Botox?", a: "For 24 hours after treatment avoid touching or rubbing the treated area, lying flat, strenuous exercise, and excessive heat. Do not take blood thinners like aspirin or ibuprofen unless medically necessary." },
    ],
    uniqueSections: [
      {
        type: "results-gallery",
        title: "Natural-Looking Results",
        subtitle: "Our approach focuses on subtle enhancement — refreshed, never frozen",
        items: [
          { label: "Forehead Lines", description: "Smooth, relaxed forehead while maintaining natural movement and expression. Clients report looking 5–10 years younger." },
          { label: "Crow's Feet", description: "Softened lines around the eyes that appear when smiling. Eyes look brighter and more youthful without affecting your smile." },
          { label: "Frown Lines (11s)", description: "Those deep vertical lines between the brows that make you look tired or angry — smoothed for a more approachable, relaxed appearance." },
          { label: "Lip Flip", description: "A subtle enhancement that relaxes the upper lip muscle, creating a fuller-looking upper lip without filler. Perfect for a natural pout." },
        ],
      },
      {
        type: "process-steps",
        title: "Your Botox Experience",
        subtitle: "Quick, comfortable, and expertly administered",
        items: [
          { label: "1. Consultation", description: "We analyze your facial anatomy, discuss your goals, and determine the ideal injection points and dosage." },
          { label: "2. Treatment", description: "Using ultra-fine needles, we administer precise micro-doses to targeted muscles. The entire process takes just 15 minutes." },
          { label: "3. Results", description: "You'll start seeing results in 3–5 days, with full effect at 14 days. Results last 3–4 months." },
        ],
      },
    ],
  },
  {
    slug: "dermal-fillers",
    title: "Dermal Fillers",
    shortDescription:
      "Restore volume, enhance contours, and rejuvenate your look with premium hyaluronic acid fillers.",
    fullDescription:
      "Dermal fillers are the ultimate tool for facial rejuvenation and enhancement. Using premium hyaluronic acid-based fillers, we restore lost volume, enhance facial contours, and smooth deep lines and folds. From plumping lips to sculpting cheekbones to softening nasolabial folds, our skilled injectors create harmonious, natural-looking results that enhance your unique beauty.",
    heroImage: "/images/service-dermal-fillers.png",
    heroGradient: "from-[#2A1A1A]/85 via-[#2A1A1A]/60 to-[#2A1A1A]/30",
    duration: "30–60 min",
    downtime: "2–5 days mild swelling",
    resultsTimeline: "Immediate",
    sessionsNeeded: "Every 6–18 months",
    benefits: [
      "Restores youthful facial volume",
      "Enhances lips and cheekbones",
      "Smooths nasolabial folds and marionette lines",
      "Immediate visible results",
      "Long-lasting (6–18 months)",
      "Reversible with hyaluronidase if needed",
    ],
    areas: ["Lips", "Cheeks", "Jawline", "Nasolabial Folds", "Under Eyes (Tear Troughs)", "Chin", "Temples"],
    faq: [
      { q: "How long do fillers last?", a: "Depending on the area treated and the product used, results typically last 6–18 months. Lip fillers tend to last 6–9 months, while cheek and jawline fillers can last 12–18 months." },
      { q: "Is the procedure painful?", a: "We use topical numbing cream and most fillers contain lidocaine for comfort. Most clients describe the sensation as mild pressure with minimal discomfort." },
      { q: "What's the recovery like?", a: "You may experience mild swelling and bruising for 2–5 days. Most clients return to normal activities immediately. We recommend avoiding strenuous exercise for 24 hours." },
      { q: "What is the difference between Botox and fillers?", a: "Botox relaxes the muscles that cause wrinkles from facial expressions. Fillers add volume to areas that have lost fullness — such as lips, cheeks, and under-eye hollows. They can be used together for a more complete result." },
      { q: "Are dermal fillers safe?", a: "Yes, when administered by a trained professional. We use FDA-approved hyaluronic acid fillers which are biocompatible and reversible with hyaluronidase if needed." },
    ],
    uniqueSections: [
      {
        type: "results-gallery",
        title: "Filler Treatment Areas",
        subtitle: "Each area requires a different technique and product for optimal results",
        items: [
          { label: "Lip Enhancement", description: "From subtle volume to defined borders, we customize lip filler to your desired look — always natural, never overdone. Results last 6–9 months." },
          { label: "Cheek Sculpting", description: "Restore youthful volume to the midface and create beautiful cheekbone definition. This also helps lift nasolabial folds. Results last 12–18 months." },
          { label: "Jawline Contouring", description: "Create a sharper, more defined jawline for a sculpted profile. Popular with both men and women. Results last 12–18 months." },
          { label: "Under-Eye Rejuvenation", description: "Smooth hollow tear troughs that cause dark circles and a tired appearance. Delicate technique for a refreshed, well-rested look." },
        ],
      },
    ],
  },
  {
    slug: "arm-hair-removal",
    title: "Arm Laser Hair Removal",
    shortDescription:
      "Smooth, hair-free arms all year — no more razors, no more stubble. Fast, comfortable sessions with the Lumenis Splendor X.",
    fullDescription:
      "In South Florida's warm, humid climate, bare arms aren't seasonal — they're a year-round reality. Arm laser hair removal at Kami Aesthetics uses the Lumenis Splendor X to target hair at the follicle, delivering smoother, softer skin with far less upkeep than shaving or waxing. Sessions are quick and comfortable, with dual cooling technology keeping you at ease throughout. Clients throughout Aventura, Miami Beach, and the surrounding South Florida area typically notice visibly finer, sparser regrowth within just a few visits, with full arm and half arm options available.",
    heroImage: "/images/gallery-laser-arms.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "20–30 min",
    downtime: "None",
    resultsTimeline: "After 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "No more daily shaving",
      "Smoother skin, longer-lasting results",
      "Reduces ingrown hairs and irritation",
      "Comfortable, quick in-office visits",
      "Safe for all skin tones",
      "Confidence in sleeveless, South Florida heat",
    ],
    areas: ["Full Arms", "Half Arms (Upper Arm)", "Forearms", "Underarm add-on available"],
    faq: [
      {
        q: "How much does arm laser hair removal cost?",
        a: "Pricing depends on the area treated (full arm vs. half arm) and the number of sessions in your package. We will give you an exact quote at your complimentary consultation based on your hair density and goals.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients need 6–8 sessions spaced about 4–6 weeks apart to see full results, since hair grows in cycles and laser only targets active follicles. You will notice visibly less hair after just 2–3 visits.",
      },
      {
        q: "Does laser hair removal on the arms hurt?",
        a: "Most clients describe it as a quick, warm snapping sensation, well tolerated thanks to the Splendor X's built-in cooling. Discomfort is minimal, especially compared to waxing.",
      },
      {
        q: "What kind of before and after results can I expect?",
        a: "By the end of a full session package, most clients see a significant, lasting reduction in arm hair density and thickness. Individual results vary with hair color, thickness, and hormonal factors, and we will review realistic expectations at your consult.",
      },
      {
        q: "How should I prepare for my appointment?",
        a: "Shave the treatment area 24 hours before your visit and skip sun exposure, self-tanner, and lotion the day of. Avoid tweezing or waxing the arms between sessions so the follicle stays intact for treatment.",
      },
      {
        q: "What should I expect after treatment?",
        a: "Mild redness or warmth is normal and typically fades within a few hours. There is no downtime, so you can return to your normal routine right away. We recommend avoiding direct sun on the treated area and using SPF while it settles.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Advanced Dual-Wavelength Technology for Arm Hair Removal",
        content:
          "The Lumenis Splendor X uses BLEND X™ technology to combine Alexandrite (755nm) and Nd:YAG (1064nm) wavelengths in a single pass, delivering thorough follicle targeting across all arm hair types and skin tones.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG target hair at different depths for more complete results." },
          { label: "BLEND X™ Technology", description: "Combines both wavelengths for optimal energy delivery in a single pass." },
          { label: "Square Spot Design", description: "Covers more surface area per pulse for faster, more even treatment on larger areas like the arms." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps skin comfortable throughout, even during Florida's warmer months." },
        ],
      },
    ],
  },
  {
    slug: "back-hair-removal",
    title: "Back Laser Hair Removal",
    shortDescription:
      "A smoother back for beach days, boat days, and everywhere in between. Effective on coarse, dense hair with zero downtime.",
    fullDescription:
      "Between beach afternoons, boat trips, and Aventura's warm climate, back hair is one of the hardest things to manage on your own. Back laser hair removal targets the follicle directly, using the Lumenis Splendor X's dual wavelengths to treat coarse, dense hair effectively — including on tanned or deeper skin tones. With no downtime, you can walk out and go straight back to your day. Clients across Aventura, Miami, and South Florida typically see a meaningful reduction in density and regrowth within the first few sessions, whether treating the full back, lower back, or back and shoulders together.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "30–45 min",
    downtime: "None",
    resultsTimeline: "Noticeable after 3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "No more waxing appointments",
      "Handles coarse, dense hair well",
      "Comfortable for larger treatment areas",
      "Reduces itching and ingrown hairs",
      "Long-lasting smoothness",
      "Confidence shirt off at the beach",
    ],
    areas: ["Full Back", "Lower Back", "Back & Shoulders combo", "Neckline touch-up available"],
    faq: [
      {
        q: "Does hair grow back after laser hair removal?",
        a: "Laser hair removal is designed to significantly reduce hair over time, not just remove it temporarily. This is often called \"permanent hair reduction,\" meaning most clients enjoy long-term, dramatically thinner regrowth after a full package, though a small percentage of finer, lighter hairs may eventually return.",
      },
      {
        q: "Does laser hair removal make hair grow back thicker?",
        a: "No. This is a common myth. Laser hair removal targets and weakens the follicle over repeated sessions, so hair typically grows back finer and sparser, not thicker.",
      },
      {
        q: "How much does back laser hair removal cost?",
        a: "Cost depends on the area (full back, lower back, or back and shoulders) and your package size. We will walk you through exact pricing at your consultation once we have assessed your hair density and goals.",
      },
      {
        q: "How many sessions are needed for back hair?",
        a: "Back hair tends to be coarser and denser, so most clients need the full 6–8 session series for best results, spaced 4–6 weeks apart to catch hair across its full growth cycle.",
      },
      {
        q: "Is back laser hair removal only for men?",
        a: "Not at all. While back hair removal is especially popular with men, we treat all genders and hair types on the back, tailoring the approach to your specific hair and skin.",
      },
      {
        q: "What should I do to prepare?",
        a: "Shave the back the day before your appointment and avoid sun exposure, tanning, or self-tanner beforehand. Skip waxing or plucking between sessions so we can target the follicle at each visit.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Built for Large Areas and Coarse Hair",
        content:
          "The Splendor X's square spot design covers more surface area per pulse, making it ideal for the back — one of the largest and most hair-dense treatment zones. BLEND X™ technology ensures consistent energy delivery across coarse, thick follicles on any skin tone.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG effectively treat coarse, dense back hair." },
          { label: "BLEND X™ Technology", description: "Delivers both wavelengths together for consistent results across a large treatment area." },
          { label: "Square Spot Design", description: "Larger coverage per pulse means faster sessions on bigger areas like the back." },
          { label: "Safe for All Skin Types", description: "Including sun-kissed, tanned skin common in South Florida, across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "bikini-hair-removal",
    title: "Bikini Laser Hair Removal",
    shortDescription:
      "Swimsuit-ready confidence, every day of Florida's endless summer. Quick, discreet sessions with the Lumenis Splendor X.",
    fullDescription:
      "With beach days a year-round habit in Aventura, staying swimsuit-ready shouldn't mean constant upkeep. Bikini laser hair removal uses the Lumenis Splendor X to target hair at the follicle for smoother, longer-lasting results than shaving or waxing — with far less irritation. South Florida's heat and humidity make this a common trouble spot for ingrown hairs and sweat-related irritation, and laser treatment helps reduce that over time. Clients from Aventura to Miami Beach choose from bikini line, full bikini, or Brazilian coverage, with sessions that are quick, discreet, and comfortable.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "10–20 min",
    downtime: "None",
    resultsTimeline: "After 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Fewer ingrown hairs and bumps",
      "No more mid-summer waxing appointments",
      "Smoother skin, less irritation",
      "Quick, discreet in-office visits",
      "Customizable to your coverage preference",
      "Swimsuit confidence, year-round",
    ],
    areas: ["Bikini Line", "Full Bikini", "Brazilian"],
    faq: [
      {
        q: "How much is bikini laser hair removal?",
        a: "Pricing varies by coverage (bikini line, full bikini, or Brazilian) and by your session package. We will confirm exact pricing at your consultation based on the area and your hair and skin type.",
      },
      {
        q: "Does bikini laser hair removal hurt?",
        a: "Most clients describe mild discomfort, often compared to a quick warm snap, and it is generally more tolerable than waxing. The Splendor X's dual cooling technology helps keep the area comfortable, and topical numbing is available on request for sensitive clients.",
      },
      {
        q: "What's the difference between bikini line, full bikini, and Brazilian?",
        a: "Bikini line treats just the edges visible in a swimsuit, full bikini covers the front and sides more completely, and Brazilian removes hair from front to back, including everything in between. We will help you choose the right coverage at your consult.",
      },
      {
        q: "How many sessions will I need, and how long does each one take?",
        a: "Most clients need the full 6–8 session series, spaced 4–6 weeks apart, since laser only targets hair in its active growth phase. Sessions themselves are quick — typically 10 to 20 minutes depending on coverage — and many clients notice visibly reduced hair after the first 2–3 visits.",
      },
      {
        q: "Is bikini laser hair removal safe for sensitive skin?",
        a: "Yes. The Splendor X is designed to safely treat sensitive areas across all skin types, Fitzpatrick I through VI, with cooling technology that minimizes irritation during and after treatment.",
      },
      {
        q: "What should I do to prepare?",
        a: "Shave the area the day before your appointment and avoid sun exposure or tanning beforehand. Skip waxing or plucking between sessions so we can target the follicle directly at each visit.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Gentle, Effective Technology for Sensitive Areas",
        content:
          "The Splendor X's dual cooling system makes it one of the most comfortable options for bikini laser hair removal. BLEND X™ technology delivers thorough results across all skin tones without sacrificing comfort in this sensitive zone.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG for thorough, effective treatment." },
          { label: "BLEND X™ Technology", description: "Combines both wavelengths in a single pass for consistent results." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps this sensitive area comfortable throughout." },
          { label: "Safe for All Skin Types", description: "Effective and gentle across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "chest-hair-removal",
    title: "Chest Laser Hair Removal",
    shortDescription:
      "Smoother, more confident, with a lot less upkeep. Fast, comfortable sessions with the Lumenis Splendor X.",
    fullDescription:
      "Chest laser hair removal is one of the most requested grooming treatments among men in Aventura, and it delivers results that trimming and waxing simply can't match. Using the Lumenis Splendor X, we target hair at the follicle to reduce density and thickness over a series of sessions, leaving skin smoother with far less irritation than waxing. Whether you're treating the chest alone or combining it with the stomach or back, most clients notice visibly softer, sparser regrowth within just a few visits.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "15–20 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "No more razor burn or ingrown hairs",
      "Softer, less noticeable regrowth",
      "Comfortable for larger treatment areas",
      "Combine with stomach or back for full coverage",
      "Safe for all skin tones",
      "Low-maintenance grooming, year-round",
    ],
    areas: ["Chest Only", "Chest & Stomach combo", "Chest & Back combo"],
    faq: [
      {
        q: "Does laser hair removal actually work on chest hair?",
        a: "Yes. Chest hair tends to be thick and coarse, which actually responds very well to laser treatment since the follicle has plenty of pigment for the laser to target. Most clients see a significant reduction in density after their first few sessions.",
      },
      {
        q: "How much is chest laser hair removal?",
        a: "Pricing depends on whether you're treating the chest alone or adding the stomach or back, along with your session package size. We'll confirm exact pricing at your consultation based on your hair density and goals.",
      },
      {
        q: "How many sessions will I need for chest hair?",
        a: "Because chest hair is often coarse and dense, most clients need the full 6–8 session series, spaced 4–6 weeks apart, to catch hair across its full growth cycle.",
      },
      {
        q: "Will I have any skin reactions or downtime?",
        a: "Mild redness or warmth right after treatment is normal and usually fades within a few hours. There's no real downtime, so you can go straight back to your day.",
      },
      {
        q: "How should I prepare for treatment?",
        a: "Shave the chest the day before your appointment and avoid sun exposure or self-tanner beforehand. Skip waxing or plucking between sessions so the follicle stays intact for the laser to target.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Advanced Technology for Chest Hair Removal",
        content:
          "The Lumenis Splendor X combines Alexandrite (755nm) and Nd:YAG (1064nm) wavelengths with BLEND X™ technology to effectively treat coarse, dense chest hair. The square spot design covers more surface area per pulse for faster sessions.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG effectively treat coarse, dense chest hair." },
          { label: "BLEND X™ Technology", description: "Delivers both wavelengths together for consistent, even results." },
          { label: "Square Spot Design", description: "Larger coverage per pulse for faster sessions on a bigger area." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI, including tanned skin." },
        ],
      },
    ],
  },
  {
    slug: "ear-hair-removal",
    title: "Laser Ear Hair Removal",
    shortDescription:
      "A cleaner, more permanent solution than tweezers or trimmers. Quick, precise sessions with the Lumenis Splendor X.",
    fullDescription:
      "Ear hair is a stubborn, ongoing grooming concern for many men, and trimming only offers a temporary fix. Laser ear hair removal at Kami Aesthetics uses the Lumenis Splendor X to target hair at the follicle along the outer ear, reducing regrowth over a series of quick, precise sessions. Because the treatment is fast and highly targeted, it fits easily into a busy Aventura schedule, with most clients noticing visibly less hair after just a few visits.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "5–10 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Longer-lasting than trimming or tweezing",
      "Quick, precise sessions",
      "Reduces stray, unwanted regrowth",
      "Comfortable, low-irritation treatment",
      "Safe, targeted approach near the ear",
      "One less grooming task to think about",
    ],
    areas: ["Outer Ear", "Ear Canal Opening (external hair only)"],
    faq: [
      {
        q: "Why is laser better than trimming or waxing for ear hair?",
        a: "Trimming and waxing only address hair that's already visible, so it grows back quickly and often coarser. Laser targets the follicle itself, leading to a lasting reduction in regrowth rather than a temporary fix.",
      },
      {
        q: "How much does laser ear hair removal cost?",
        a: "Cost depends on your session package. Since this is a smaller, quicker treatment area, we'll walk you through pricing at your consultation.",
      },
      {
        q: "Is laser hair removal safe around the ear canal?",
        a: "Yes. We only treat external, visible hair and take care to protect the delicate skin and canal opening throughout the session, using precise, controlled technique.",
      },
      {
        q: "Is the result permanent?",
        a: "Laser hair removal provides long-term hair reduction rather than complete permanent removal. Most clients maintain their results with occasional touch-up sessions after completing the initial series.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients complete 6–8 sessions, spaced 4–6 weeks apart, to see full results, since laser only targets hair that's actively growing at the time of treatment.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Precise, Controlled Technology for Ear Hair Removal",
        content:
          "The Splendor X's square spot design allows for controlled, accurate targeting in a smaller area like the ear. Dual cooling keeps the sensitive ear area comfortable throughout.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG for precise, effective treatment." },
          { label: "Square Spot Design", description: "Allows for controlled, accurate targeting in a smaller area." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps the sensitive ear area comfortable." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "eyebrow-hair-removal",
    title: "Eyebrow Laser Hair Removal",
    shortDescription:
      "Defined brows, with far less tweezing and touch-up work. Fast, precise sessions with the Lumenis Splendor X.",
    fullDescription:
      "Maintaining sharp, defined brows usually means constant tweezing, especially in the space between the brows. Eyebrow laser hair removal at Kami Aesthetics uses the Lumenis Splendor X to precisely target unwanted hair along the brow border and between the brows, reducing regrowth so your shape holds longer between touch-ups. Treatment is fast, closely controlled, and performed with protective eyewear throughout, making it a safe option for defining your natural brow shape over time.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "5–10 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Cleaner, more defined brow shape",
      "Less frequent tweezing between visits",
      "Fast, precise, targeted sessions",
      "Reduces stray hairs between the brows",
      "Performed with full eye protection",
      "Long-lasting shape maintenance",
    ],
    areas: ["Between the Brows (unibrow area)", "Brow Border Shaping"],
    faq: [
      {
        q: "Can you get laser hair removal on your eyebrows?",
        a: "Yes, though treatment is limited to defining the brow border and clearing hair between the brows. We avoid removing hair from within the brow itself so your natural shape stays intact.",
      },
      {
        q: "How much does eyebrow laser hair removal cost?",
        a: "Pricing is based on your session package. Since this is a small, quick treatment area, we'll confirm exact cost at your consultation.",
      },
      {
        q: "Is laser hair removal safe near the eyes?",
        a: "Yes. We use protective eyewear throughout every session and closely control the treatment area to keep the skin around your eyes safe and comfortable.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients see the best long-term shaping results after 6–8 sessions, spaced 4–6 weeks apart, since laser targets hair only while it's in an active growth phase.",
      },
      {
        q: "Am I a good candidate for eyebrow laser hair removal?",
        a: "This treatment works well for anyone looking to maintain a defined brow border or clear the space between the brows with less ongoing upkeep. We'll assess your hair and skin type at your consultation to confirm candidacy.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Precision Technology for Eyebrow Shaping",
        content:
          "The Splendor X's square spot design enables accurate targeting along a small, defined brow border. Dual cooling keeps this delicate area comfortable throughout the session.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Alexandrite and Nd:YAG for precise, controlled treatment." },
          { label: "Square Spot Design", description: "Enables accurate targeting along a small, defined border." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps this delicate area comfortable." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "facial-hair-removal",
    title: "Facial Laser Hair Removal",
    shortDescription:
      "Smoother skin and fewer touch-ups, for a face that's ready for anything. Comfortable sessions with the Lumenis Splendor X.",
    fullDescription:
      "Facial hair removal is one of our most popular treatments, and for good reason: it addresses everything from upper lip and chin hair to beard line shaping, without the daily upkeep of plucking or shaving. Using the Lumenis Splendor X, we target hair at the follicle across the upper lip, chin, cheeks, and sideburns, with results that hold up far better than shaving or waxing in Aventura's humidity. Because facial hair is often influenced by hormones, some clients, including those managing PCOS, may need a slightly longer session series to see their best results.",
    heroImage: "/images/gallery-laser-upper-lip.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "15–20 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "8–10 sessions",
    benefits: [
      "Smoother skin across lip, chin, and cheeks",
      "Fewer ingrown hairs and less irritation",
      "Defined beard line for men",
      "Comfortable for daily makeup wearers",
      "Safe, precise treatment near the face",
      "Long-term reduction, not a quick fix",
    ],
    areas: ["Upper Lip", "Chin", "Cheeks", "Sideburns", "Beard Line Shaping (men)"],
    faq: [
      {
        q: "How much is facial laser hair removal?",
        a: "Pricing depends on which areas you're treating (upper lip, chin, cheeks, sideburns, or a combination) and your session package. We'll confirm exact pricing at your consultation.",
      },
      {
        q: "Is facial laser hair removal safe, and does it hurt?",
        a: "Yes, it's safe when performed by trained providers, and most clients describe only mild, brief discomfort thanks to the Splendor X's built-in cooling. This is generally far more comfortable than repeated waxing.",
      },
      {
        q: "Is laser better than electrolysis for facial hair?",
        a: "Laser treats larger areas faster and is generally more comfortable, making it a great option for coarser, darker facial hair. Electrolysis can be more effective on very fine, light, or gray hairs that don't respond as well to laser, and we're happy to talk through which approach fits your hair type.",
      },
      {
        q: "Does laser hair removal work on blonde or gray facial hair?",
        a: "Laser targets pigment in the hair follicle, so it works best on darker, coarser hair. Very light blonde, gray, or red hair may respond less predictably, and we'll be upfront about expected results for your hair type at your consultation.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients need 8–10 sessions for the face, since facial hair growth cycles and hormonal factors, including PCOS, can mean a longer series is needed to see lasting results.",
      },
      {
        q: "How should I prepare for treatment?",
        a: "Shave the treatment area the day before your appointment and avoid sun exposure, self-tanner, and retinol products beforehand. We'll go over full prep instructions specific to your skin at your consult.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Effective Technology for All Facial Hair Types",
        content:
          "The Lumenis Splendor X combines Alexandrite (755nm) and Nd:YAG (1064nm) wavelengths with BLEND X™ technology for consistent results on delicate facial skin. Dual cooling keeps the face comfortable throughout every session.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Effective treatment across a range of facial hair types." },
          { label: "BLEND X™ Technology", description: "Combines both wavelengths for consistent results on delicate facial skin." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps the face comfortable throughout." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI, including deeper skin tones." },
        ],
      },
    ],
  },
  {
    slug: "leg-hair-removal",
    title: "Leg Laser Hair Removal",
    shortDescription:
      "Smooth, ready-for-anything legs, without the daily razor routine. Fast sessions with the Lumenis Splendor X.",
    fullDescription:
      "Between beach days, boat days, and South Florida's year-round warm weather, shaved legs are a daily habit for a lot of Aventura clients — and it doesn't have to be. Leg laser hair removal uses the Lumenis Splendor X to target hair at the follicle across the full leg, half leg, or lower legs, reducing density and thickness over a series of sessions. Many clients also come to us for strawberry legs, the dark follicle dots left behind by shaving, since laser treatment addresses the root cause rather than masking it.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "30–45 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "8–10 sessions",
    benefits: [
      "No more daily or weekly shaving",
      "Helps reduce strawberry legs",
      "Smoother skin with less irritation",
      "Options for full, half, or lower legs",
      "Safe for all skin tones",
      "Confidence in shorts and swimwear, year-round",
    ],
    areas: ["Full Legs", "Half Legs (Upper or Lower)", "Lower Legs Only"],
    faq: [
      {
        q: "How much does leg laser hair removal cost?",
        a: "Pricing depends on the area you choose (full leg, half leg, or lower leg) and your session package size. We'll confirm exact pricing at your consultation based on your hair density and goals.",
      },
      {
        q: "Does laser hair removal help with strawberry legs?",
        a: "Yes. Strawberry legs are often caused by hair follicles that appear as dark dots after shaving, and laser hair removal reduces the hair at the follicle itself, which can significantly improve their appearance over a full session series.",
      },
      {
        q: "How many sessions will I need for legs?",
        a: "Legs are a larger treatment area, so most clients need 8–10 sessions, spaced 4–6 weeks apart, to see full results across the entire growth cycle.",
      },
      {
        q: "How long does a leg treatment take?",
        a: "A full leg session typically takes 30 to 45 minutes, while half leg or lower leg treatments are quicker. We'll give you a specific time estimate based on your chosen area.",
      },
      {
        q: "What is half leg laser hair removal?",
        a: "Half leg treatments cover either the upper leg (thigh) or lower leg (knee to ankle), giving you a more targeted option if you don't need the full leg treated.",
      },
      {
        q: "How should I prepare, and what's aftercare like?",
        a: "Shave your legs the day before your appointment and avoid sun exposure or self-tanner beforehand. Afterward, apply sunscreen diligently, since South Florida sun exposure on freshly treated skin can increase sensitivity.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Built for Large Areas Like the Legs",
        content:
          "The Splendor X's square spot design covers more surface area per pulse, making it ideal for larger treatment zones like full legs. BLEND X™ technology delivers consistent, even results across all skin tones.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Thorough treatment across a large area." },
          { label: "BLEND X™ Technology", description: "Delivers both wavelengths together for consistent, even results." },
          { label: "Square Spot Design", description: "Covers more surface area per pulse, ideal for a larger treatment zone like the legs." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "upper-lip-hair-removal",
    title: "Upper Lip Laser Hair Removal",
    shortDescription:
      "Smoother, more defined, with far less plucking and touch-up. Quick, precise sessions with the Lumenis Splendor X.",
    fullDescription:
      "The upper lip is one of the most requested areas for laser hair removal, and one of the most sensitive — so precision matters. Using the Lumenis Splendor X, we target hair at the follicle to reduce fine or coarse upper lip hair over a series of quick, closely controlled sessions. Many clients pair this treatment with the chin for a complete lip and chin combo. Because upper lip hair growth is often influenced by hormones, we take extra care to set realistic expectations for clients managing PCOS or similar conditions.",
    heroImage: "/images/gallery-laser-upper-lip.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "5–10 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Smoother skin, less noticeable regrowth",
      "Fewer touch-ups between waxing appointments",
      "Fast, precise sessions",
      "Combine with chin for full coverage",
      "Careful approach for sensitive, delicate skin",
      "Reduces irritation from frequent shaving or waxing",
    ],
    areas: ["Upper Lip Only", "Upper Lip & Chin combo"],
    faq: [
      {
        q: "How much does upper lip laser hair removal cost?",
        a: "Pricing depends on whether you're treating the upper lip alone or adding the chin, along with your session package. We'll confirm exact pricing at your consultation.",
      },
      {
        q: "Does upper lip laser hair removal hurt?",
        a: "The upper lip is a sensitive area, so most clients feel a brief warm or stinging sensation during treatment, but it's short-lived thanks to the Splendor X's cooling technology. Many describe it as more comfortable than repeated waxing.",
      },
      {
        q: "Should I shave my upper lip before my appointment?",
        a: "Yes. Shave the area about 24 hours before your session so the follicle is accessible without excess surface hair. Avoid waxing, plucking, or threading between sessions, since laser needs the follicle intact to work effectively.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients need 6–8 sessions, spaced 4–6 weeks apart, to see full results, since hair grows in cycles and laser only targets follicles that are actively growing.",
      },
      {
        q: "Are there risks of dark spots or discoloration?",
        a: "When performed with the right technology and settings, laser hair removal is generally safe for a range of skin tones. We tailor treatment settings to your specific skin type to minimize any risk of hyperpigmentation, especially on deeper skin tones.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Precise Technology for Delicate Areas",
        content:
          "The Splendor X's square spot design allows accurate targeting on a small, delicate area like the upper lip. Dual cooling keeps this sensitive zone comfortable throughout.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Precise, effective treatment on fine or coarse upper lip hair." },
          { label: "Square Spot Design", description: "Allows accurate targeting on a small, delicate area." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps this sensitive area comfortable throughout." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "neck-hair-removal",
    title: "Neck Laser Hair Removal",
    shortDescription:
      "A cleaner neckline and beard line, with far less daily upkeep. Fast, precise sessions with the Lumenis Splendor X.",
    fullDescription:
      "Neck hair removal serves two very different needs: women looking to clean up fine hair along the hairline or nape, and men wanting a sharper, more defined beard line. Using the Lumenis Splendor X, we target hair at the follicle to reduce regrowth across the neck, with settings tailored to your hair type and skin tone. Many clients combine this treatment with the face for a complete face and neck package, cutting down on daily grooming and touch-ups.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "10–15 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Cleaner, more defined beard line",
      "Smoother nape and hairline",
      "Combine with face for full coverage",
      "Reduces daily shaving or trimming",
      "Safe for a range of skin tones",
      "Fast, precise sessions",
    ],
    areas: ["Neckline / Hairline (women)", "Beard Line & Neck Beard Cleanup (men)", "Face & Neck combo"],
    faq: [
      {
        q: "How much is neck laser hair removal?",
        a: "Pricing depends on the specific area (neckline, beard line, or a face and neck combo) and your session package. We'll confirm exact pricing at your consultation.",
      },
      {
        q: "Is this treatment different for women versus men?",
        a: "Yes. For women, we typically focus on fine hair along the hairline or nape, while for men, treatment often centers on shaping and cleaning up the beard line and neck beard. We tailor the approach to your specific goals either way.",
      },
      {
        q: "Can I combine neck treatment with facial hair removal?",
        a: "Absolutely. Face and neck combo packages are one of our most popular options, since many clients want a consistent, defined line from the jaw down through the neck.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients need 6–8 sessions, spaced 4–6 weeks apart, to see full results across the neck's growth cycle.",
      },
      {
        q: "Is laser hair removal safe on the neck for darker skin tones?",
        a: "Yes. The Splendor X's Nd:YAG wavelength is specifically effective and safe for deeper skin tones, which makes the neck — a common trouble spot for irritation from shaving — a great candidate area regardless of your skin type.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Effective for All Hair and Skin Types on the Neck",
        content:
          "The Splendor X's BLEND X™ technology combines both wavelengths for consistent results across the neck, regardless of skin tone. Dual cooling keeps every session comfortable.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Effective treatment across hair and skin types on the neck." },
          { label: "BLEND X™ Technology", description: "Combines both wavelengths for consistent results." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps the neck comfortable throughout." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "stomach-hair-removal",
    title: "Stomach Laser Hair Removal",
    shortDescription:
      "Smoother skin, from the happy trail to the full abdomen. Comfortable sessions with the Lumenis Splendor X.",
    fullDescription:
      "Stomach hair removal is a popular treatment for both women looking to address the stomach line — sometimes called the happy trail — and men who want a smoother, low-maintenance abdomen. Using the Lumenis Splendor X, we target hair at the follicle to reduce density over a series of sessions, with gentle, comfortable settings suited to the sensitive skin of the abdomen. Many clients choose to combine stomach treatment with the chest for complete, consistent results.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "15–20 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Smoother abdomen with less upkeep",
      "Addresses the stomach line comfortably",
      "Combine with chest for full coverage",
      "Gentle approach for sensitive abdominal skin",
      "Reduces irritation from shaving or waxing",
      "Safe for all skin tones",
    ],
    areas: ["Stomach Only", "Stomach & Chest combo"],
    faq: [
      {
        q: "Can you get laser hair removal on your stomach?",
        a: "Yes. The stomach responds well to laser treatment, and we adjust settings for the more sensitive skin in this area to keep sessions comfortable.",
      },
      {
        q: "How much is stomach laser hair removal?",
        a: "Pricing depends on whether you're treating the stomach alone or combining it with the chest, along with your session package. We'll confirm exact pricing at your consultation.",
      },
      {
        q: "Is the stomach a sensitive area to treat?",
        a: "The abdomen can be more sensitive than areas like the arms or legs, so we use the Splendor X's cooling technology to keep sessions comfortable throughout.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most clients need 6–8 sessions, spaced 4–6 weeks apart, to see full results, since laser only targets hair that's actively growing at the time of treatment.",
      },
      {
        q: "How should I prepare for treatment?",
        a: "Shave the stomach the day before your appointment and avoid sun exposure or self-tanner beforehand. Skip waxing or plucking between sessions so the follicle stays intact for the laser to target.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Comfortable Technology for Sensitive Abdominal Skin",
        content:
          "The Splendor X's BLEND X™ technology and dual cooling system make it well-suited for the abdomen, where skin sensitivity is higher. Consistent results across all skin tones.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Effective, comfortable treatment on the stomach." },
          { label: "BLEND X™ Technology", description: "Combines both wavelengths for consistent results." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps sensitive abdominal skin comfortable." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "underarm-hair-removal",
    title: "Underarm Laser Hair Removal",
    shortDescription:
      "Smoother, brighter underarms, with one of our fastest treatment areas. Quick, comfortable sessions with the Lumenis Splendor X.",
    fullDescription:
      "Underarm laser hair removal is one of the fastest and most requested treatments at Kami Aesthetics, and it's easy to see why in South Florida's warm, humid climate. Using the Lumenis Splendor X, we target hair at the follicle to reduce regrowth and ingrown hairs, while also helping to brighten skin that's become darkened from years of shaving or waxing. Sessions are quick and comfortable, and most clients notice visibly smoother, softer underarms after just a few visits.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "10–15 min",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "One of our fastest treatment areas",
      "Helps brighten darkened underarm skin",
      "Reduces ingrown hairs and razor bumps",
      "No more daily or weekly shaving",
      "Comfortable, quick sessions",
      "Confidence in tank tops and sleeveless styles",
    ],
    areas: ["Full Underarms"],
    faq: [
      {
        q: "How much does underarm laser hair removal cost?",
        a: "Pricing is based on your session package size. Since underarms are typically one of our fastest treatment areas, we'll confirm exact pricing at your consultation.",
      },
      {
        q: "Does laser hair removal whiten or brighten the underarms?",
        a: "Many clients notice their underarms appear brighter over time, since laser hair removal reduces the shadowing effect of dark hair follicles and cuts down on skin irritation from shaving. It's not a whitening treatment on its own, but skin tone often looks more even as hair reduction progresses.",
      },
      {
        q: "Does underarm laser hair removal hurt?",
        a: "Most clients describe only mild, brief discomfort, and this is typically one of the more tolerable areas to treat thanks to the Splendor X's built-in cooling. Numbing options are available on request for sensitive clients.",
      },
      {
        q: "How many sessions will I need?",
        a: "Underarms tend to respond quickly, and most clients complete their series in 6–8 sessions spaced 4–6 weeks apart, since laser only targets hair that's actively growing.",
      },
      {
        q: "How should I prepare for my appointment?",
        a: "Shave the underarms the day before your visit and skip deodorant or antiperspirant on the day of treatment, since these can irritate freshly treated skin. Avoid waxing or plucking between sessions so the follicle stays intact.",
      },
      {
        q: "Is underarm laser hair removal permanent?",
        a: "It provides long-term hair reduction rather than complete permanent removal. Most clients maintain smooth results with occasional touch-up sessions after finishing their initial series.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "Fast, Effective Technology for the Underarms",
        content:
          "The Splendor X's square spot design covers the underarm efficiently in a shorter session. Dual cooling keeps this sensitive area comfortable throughout.",
        items: [
          { label: "Dual Wavelength (755nm + 1064nm)", description: "Fast, effective treatment for underarm hair." },
          { label: "Square Spot Design", description: "Covers the underarm efficiently in a shorter session." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Keeps this sensitive area comfortable." },
          { label: "Safe for All Skin Types", description: "Across Fitzpatrick I–VI." },
        ],
      },
    ],
  },
  {
    slug: "laser-hair-removal-dark-skin",
    title: "Laser Hair Removal for Brown & Dark Skin",
    shortDescription:
      "Safe, effective hair removal, built for every skin tone. The Lumenis Splendor X — the gold standard for Fitzpatrick IV–VI.",
    fullDescription:
      "Laser hair removal for dark skin has long been misunderstood, and outdated technology is usually the reason why. At Kami Aesthetics, we use the Lumenis Splendor X, which includes an Nd:YAG (1064nm) wavelength — considered the gold standard for treating Fitzpatrick skin types IV through VI safely and effectively. In a South Florida community as diverse as Aventura and Miami, having technology built for every skin tone isn't optional, it's essential. Clients with brown and dark skin can safely treat nearly any area of the body with dramatically reduced risk of burns or discoloration.",
    heroImage: "/images/service-laser-hair-removal.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "Varies by area (5–45 min)",
    downtime: "None",
    resultsTimeline: "Visible after 2–3 sessions",
    sessionsNeeded: "6–8 sessions",
    benefits: [
      "Technology built for deeper skin tones",
      "Reduced risk of burns or hyperpigmentation",
      "Effective on all Fitzpatrick skin types, I–VI",
      "Safe treatment across nearly any body area",
      "Dual cooling for added comfort",
      "Backed by trained, experienced providers",
    ],
    areas: ["Available for all body areas, including face, legs, arms, bikini, underarms, and back"],
    faq: [
      {
        q: "Does laser hair removal actually work on dark skin?",
        a: "Yes, when the right technology is used. Older laser systems struggled to distinguish between hair pigment and skin pigment on darker tones, but Nd:YAG technology like the Splendor X targets hair follicles more safely and effectively on deeper skin.",
      },
      {
        q: "Is laser hair removal safe for dark or brown skin?",
        a: "Yes, with the right equipment and settings. The Nd:YAG wavelength bypasses much of the surface melanin in the skin, reducing the risk of burns or dark spots that can occur with lasers not designed for deeper skin tones.",
      },
      {
        q: "Why does laser hair removal sometimes not work on dark skin?",
        a: "This usually comes down to outdated technology rather than skin tone itself. Older lasers can struggle to tell the difference between the hair follicle and surrounding skin, leading to inconsistent results or an increased risk of burns.",
      },
      {
        q: "What is the Fitzpatrick skin type scale?",
        a: "It's a classification system providers use to describe skin tone and its relationship to sun sensitivity, ranging from Type I (very fair) to Type VI (deeply pigmented). It helps us select the safest, most effective laser settings for your specific skin.",
      },
      {
        q: "Can I get laser hair removal on any part of my body?",
        a: "Yes. With the right technology, brown and dark-skinned clients can safely treat the same range of areas as anyone else, from the face and underarms to the legs, bikini area, and back.",
      },
    ],
    uniqueSections: [
      {
        type: "technology",
        title: "Powered by Lumenis Splendor X",
        subtitle: "The Gold Standard for Dark Skin Laser Hair Removal",
        content:
          "The Splendor X's Nd:YAG (1064nm) wavelength is widely regarded as the gold standard for safely treating Fitzpatrick skin types IV through VI. BLEND X™ combines Alexandrite and Nd:YAG wavelengths for effective treatment across the full range of skin tones.",
        items: [
          { label: "Nd:YAG Wavelength (1064nm)", description: "The gold standard for safely treating Fitzpatrick skin types IV through VI." },
          { label: "BLEND X™ Technology", description: "Combines Alexandrite and Nd:YAG wavelengths for effective treatment across a range of skin tones." },
          { label: "Dual Cooling (Cryo-Touch + Cryo-Air)", description: "Adds comfort and helps protect the skin during treatment." },
          { label: "Trained, Experienced Providers", description: "Settings are customized to your specific skin tone and hair type, not a one-size-fits-all approach." },
        ],
      },
    ],
  },
  {
    slug: "iv-therapy",
    title: "IV Therapy",
    shortDescription:
      "Replenish vitamins, boost energy, and support recovery with customized IV vitamin drip infusions.",
    fullDescription:
      "IV therapy delivers vitamins, minerals, and hydration directly into your bloodstream for 100% absorption — far more effective than oral supplements. Our customized drip formulas are designed to boost energy, support immunity, accelerate recovery, improve skin radiance, and promote overall wellness. Each session is administered by trained medical professionals in a relaxing, spa-like environment.",
    heroImage: "/images/service-prp-therapy.png",
    heroGradient: "from-[#1A2A1A]/85 via-[#1A2A1A]/60 to-[#1A2A1A]/30",
    duration: "45–60 min",
    downtime: "None",
    resultsTimeline: "During & after session",
    sessionsNeeded: "As needed / monthly",
    benefits: [
      "100% bioavailability — bypasses digestive system",
      "Immediate energy boost and mental clarity",
      "Supports immune function and recovery",
      "Improves skin hydration and radiance",
      "Customized formulas for your specific goals",
      "Administered by trained medical professionals",
    ],
    areas: ["Full Body Wellness", "Energy & Immunity", "Skin Radiance", "Athletic Recovery", "Hangover Relief"],
    faq: [
      {
        q: "How is IV therapy different from taking supplements?",
        a: "Oral supplements are absorbed at 20–50% efficiency due to digestion. IV therapy delivers nutrients directly into your bloodstream at 100% absorption, producing faster and more noticeable results.",
      },
      {
        q: "How long does an IV session take?",
        a: "Most IV drip sessions take 45–60 minutes. You can relax, read, or use your phone during the infusion.",
      },
      {
        q: "How often should I get IV therapy?",
        a: "This depends on your goals. Some clients come monthly for maintenance, while others schedule sessions before or after travel, illness, or athletic events. We'll recommend a frequency based on your health goals.",
      },
    ],
    uniqueSections: [],
  },
  {
    slug: "weight-loss",
    title: "Medical Weight Loss",
    shortDescription:
      "Medically supervised weight management with personalized protocols, GLP-1 support, and ongoing guidance.",
    fullDescription:
      "Our medical weight loss program combines clinical assessment, personalized nutrition guidance, and evidence-based treatments — including GLP-1 receptor agonist support where appropriate — to help you achieve sustainable results. Unlike fad diets, our approach is supervised by medical professionals who monitor your progress and adjust your protocol as your body changes. We treat the root causes of weight gain, not just the symptoms.",
    heroImage: "/images/service-prp-therapy.png",
    heroGradient: "from-[#2A1A2A]/85 via-[#2A1A2A]/60 to-[#2A1A2A]/30",
    duration: "Initial consult 45 min",
    downtime: "None",
    resultsTimeline: "4–8 weeks",
    sessionsNeeded: "Ongoing program",
    benefits: [
      "Medically supervised for safety and efficacy",
      "Personalized protocol based on your health profile",
      "GLP-1 support available where appropriate",
      "Ongoing monitoring and adjustments",
      "Addresses root causes, not just symptoms",
      "Sustainable, long-term results",
    ],
    areas: ["Full Body Composition", "Metabolic Health", "Hormonal Balance"],
    faq: [
      {
        q: "What is GLP-1 therapy?",
        a: "GLP-1 receptor agonists are FDA-approved medications that regulate appetite and blood sugar. They work by mimicking a natural hormone that signals fullness, reducing hunger and supporting sustainable weight loss.",
      },
      {
        q: "Am I a candidate for medical weight loss?",
        a: "Most adults with a BMI over 25 who have struggled with traditional diet and exercise may be candidates. We conduct a thorough health assessment during your initial consultation to determine the best approach for you.",
      },
      {
        q: "How quickly will I see results?",
        a: "Most clients begin seeing measurable results within 4–8 weeks. The pace depends on your starting point, adherence to the protocol, and individual metabolic factors.",
      },
    ],
    uniqueSections: [],
  },
  {
    slug: "prp-therapy",
    title: "PRP Therapy",
    shortDescription:
      "Harness your body's natural healing power for skin rejuvenation, hair restoration, and collagen boost.",
    fullDescription:
      "Platelet-Rich Plasma (PRP) therapy uses your body's own growth factors to stimulate healing and regeneration. We draw a small amount of your blood, process it to concentrate the platelets, and then apply the PRP to target areas. This natural approach stimulates collagen production, accelerates healing, and promotes cellular renewal — making it ideal for facial rejuvenation, hair restoration, and enhancing other treatments.",
    heroImage: "/images/service-prp-therapy.png",
    heroGradient: "from-[#1A1A1A]/85 via-[#1A1A1A]/60 to-[#1A1A1A]/30",
    duration: "45–60 min",
    downtime: "1–2 days redness",
    resultsTimeline: "4–6 weeks progressive",
    sessionsNeeded: "3–4 sessions",
    benefits: [
      "100% natural — uses your own blood",
      "Stimulates collagen and elastin production",
      "Improves skin texture and tone",
      "Promotes hair regrowth",
      "Enhances results of other treatments",
      "Minimal risk of allergic reaction",
    ],
    areas: ["Full Face (Vampire Facial)", "Scalp (Hair Restoration)", "Under Eyes", "Neck & Décolletage", "Hands"],
    faq: [
      { q: "How does PRP work?", a: "PRP contains concentrated growth factors that signal your body to repair and regenerate tissue. When applied to the skin or scalp, these growth factors stimulate new collagen, blood vessels, and cellular renewal." },
      { q: "How many sessions do I need?", a: "For facial rejuvenation, 3 sessions spaced 4–6 weeks apart is recommended. For hair restoration, 3–4 sessions with monthly maintenance. Results improve progressively over several months." },
      { q: "Is PRP safe?", a: "PRP is one of the safest aesthetic treatments available since it uses your own blood. There's virtually no risk of allergic reaction or rejection. Mild redness and swelling are normal for 1–2 days." },
      { q: "What is PRP used for at Kami Aesthetics?", a: "We offer PRP for facial rejuvenation (the Vampire Facial), under-eye treatment, and hair loss restoration." },
      { q: "Is PRP painful?", a: "A topical numbing cream is applied before the procedure to minimize discomfort. Most clients find it very tolerable." },
    ],
    uniqueSections: [
      {
        type: "process-steps",
        title: "The PRP Process",
        subtitle: "A natural approach to rejuvenation using your body's own healing power",
        items: [
          { label: "1. Blood Draw", description: "A small amount of blood is drawn from your arm — similar to a routine blood test." },
          { label: "2. Centrifuge Processing", description: "Your blood is placed in a centrifuge that separates the platelet-rich plasma from other blood components." },
          { label: "3. PRP Activation", description: "The concentrated PRP — rich in growth factors — is prepared for application to your treatment area." },
          { label: "4. Application", description: "PRP is applied via micro-needling (Vampire Facial) or injected directly into the scalp for hair restoration." },
          { label: "5. Regeneration", description: "Growth factors stimulate collagen production and cellular renewal over the following weeks and months." },
        ],
      },
    ],
  },
];
