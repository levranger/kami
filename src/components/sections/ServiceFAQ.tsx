"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = question.replace(/\s+/g, "-").toLowerCase().slice(0, 30);

  return (
    <div className="border border-warm-border rounded-sm overflow-hidden">
      <button
        id={`faq-btn-${id}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-white transition-colors duration-200"
      >
        <span className="font-inter text-sm font-medium text-[#1A1A1A] pr-4">{question}</span>
        <ChevronDown className={`h-4 w-4 text-warm-gray flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <div id={`faq-answer-${id}`} role="region" aria-labelledby={`faq-btn-${id}`} className="px-5 pb-5 -mt-1">
          <p className="font-inter text-sm text-warm-gray leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ServiceFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FAQItem key={item.q} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}
