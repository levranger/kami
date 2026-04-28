import type { ReactNode } from "react";

export type FAQItem = {
  q: string;
  a: string;
  node: ReactNode;
};

export type FAQCategory = {
  id: string;
  label: string;
  questions: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "location",
    label: "Location & Parking",
    questions: [
      {
        q: "Where is Kami Aesthetics located?",
        a: "We are located at 2999 NE 191st St, Floor 9, Aventura, FL 33180 — inside the Aventura Corporate Center.",
        node: <>We are located at <a href="https://maps.app.goo.gl/DDRGkNyiJhX6JPuZ6" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">2999 NE 191st St, Floor 9, Aventura, FL 33180</a> — inside the Aventura Corporate Center.</>,
      },
      {
        q: "Is parking available?",
        a: "Yes. Free parking is available in the building garage. Enter from NE 191st St and take the elevator to Floor 9.",
        node: <>Yes. Free parking is available in the building garage. Enter from NE 191st St and take the elevator to Floor 9.</>,
      },
      {
        q: "What areas do you serve?",
        a: "We serve clients from Aventura, Hallandale Beach, Sunny Isles Beach, North Miami, Golden Beach, and the greater Miami area.",
        node: <>We serve clients from Aventura, Hallandale Beach, Sunny Isles Beach, North Miami, Golden Beach, and the greater Miami area.</>,
      },
    ],
  },
  {
    id: "booking",
    label: "Booking & Hours",
    questions: [
      {
        q: "How do I book an appointment?",
        a: "You can book online at https://booking.mangomint.com/kami or call us at (954) 469-7153.",
        node: <>You can <a href="https://booking.mangomint.com/kami" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">book online</a> or call us at <a href="tel:+19544697153" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors duration-150">(954) 469-7153</a>.</>,
      },
      {
        q: "What are your hours?",
        a: "We are open Monday through Saturday, 9am to 7pm. Sunday appointments are available by request.",
        node: <>We are open Monday through Saturday, 9am to 7pm. Sunday appointments are available by request.</>,
      },
      {
        q: "Do you offer consultations?",
        a: "Yes, we offer consultations for all treatments. We recommend booking a consultation before your first appointment so we can assess your skin, discuss your goals, and create a personalized treatment plan.",
        node: <>Yes, we offer consultations for all treatments. We recommend booking a consultation before your first appointment so we can assess your skin, discuss your goals, and create a personalized treatment plan.</>,
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards. Please contact us directly for information about payment plans or package pricing.",
        node: <>We accept all major credit cards. Please contact us directly for information about payment plans or package pricing.</>,
      },
      {
        q: "Do you offer treatment packages?",
        a: "Yes, we offer discounted packages for laser hair removal sessions and other treatments. Ask during your consultation for current pricing.",
        node: <>Yes, we offer discounted packages for laser hair removal sessions and other treatments. Ask during your consultation for current pricing.</>,
      },
      {
        q: "Do you have a new client special?",
        a: "Yes — new clients can get our $149 introductory laser package covering three popular areas. Ask about it when you book.",
        node: <>Yes — new clients can get our $149 introductory laser package covering three popular areas. Ask about it when you book.</>,
      },
    ],
  },
];

// Flat list for JSON-LD schema
export const allFAQsForSchema = faqCategories.flatMap((cat) =>
  cat.questions.map((q) => ({ question: q.q, answer: q.a }))
);
