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
