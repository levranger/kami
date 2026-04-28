"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { FAQCategory } from "@/data/faq";

const BOOKING_URL = "https://booking.mangomint.com/kami";

export default function FAQPageClient({ categories }: { categories: FAQCategory[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories
      .filter((cat) => !activeCategory || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        questions: q
          ? cat.questions.filter(
              (item) =>
                item.q.toLowerCase().includes(q) ||
                item.a.toLowerCase().includes(q)
            )
          : cat.questions,
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [categories, search, activeCategory]);

  const totalVisible = filtered.reduce((n, c) => n + c.questions.length, 0);

  return (
    <>
      {/* Search + Category Filter */}
      <div className="bg-white border-b border-warm-border sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-4">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search frequently asked questions"
              className="w-full pl-10 pr-10 py-2.5 font-inter text-sm border border-warm-border rounded-sm bg-warm-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors duration-200 placeholder:text-warm-gray/60"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-[#1A1A1A] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter by treatment category">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-inter text-xs tracking-wide px-3.5 py-1.5 rounded-sm border transition-colors duration-150 ${
                activeCategory === null
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-warm-gray border-warm-border hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              }`}
              aria-pressed={activeCategory === null}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`font-inter text-xs tracking-wide px-3.5 py-1.5 rounded-sm border transition-colors duration-150 ${
                  activeCategory === cat.id
                    ? "bg-gold text-white border-gold"
                    : "bg-white text-warm-gray border-warm-border hover:border-gold hover:text-gold"
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-inter text-warm-gray text-sm">No questions found for &quot;{search}&quot;.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory(null); }}
              className="mt-4 font-inter text-sm text-gold hover:text-gold-dark underline underline-offset-2 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-14">
            {filtered.map((cat) => (
              <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-warm-border" aria-hidden="true" />
                  <h2
                    id={`cat-${cat.id}`}
                    className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-gold whitespace-nowrap"
                  >
                    {cat.label}
                  </h2>
                  <div className="h-px flex-1 bg-warm-border" aria-hidden="true" />
                </div>

                {/* Questions */}
                <div className="space-y-2">
                  {cat.questions.map((item, i) => (
                    <details
                      key={i}
                      className="group bg-white border border-warm-border rounded-sm overflow-hidden open:border-gold/40 open:shadow-sm transition-shadow duration-200"
                    >
                      <summary className="list-none cursor-pointer select-none px-6 py-5 flex items-start justify-between gap-4 hover:bg-warm-white/60 transition-colors duration-150 [&::-webkit-details-marker]:hidden">
                        <h3 className="font-inter text-sm font-semibold text-[#1A1A1A] leading-snug group-open:text-gold transition-colors duration-150">
                          {item.q}
                        </h3>
                        <svg
                          className="h-4 w-4 flex-shrink-0 text-gold mt-0.5 transition-transform duration-200 group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-5 pt-0">
                        <p className="font-inter text-sm text-warm-gray leading-relaxed">
                          {item.node}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            {/* Count + CTA */}
            <div className="pt-2 text-center border-t border-warm-border">
              <p className="font-inter text-xs text-warm-gray mb-6">
                Showing {totalVisible} question{totalVisible !== 1 ? "s" : ""}
                {search ? ` matching "${search}"` : ""}
              </p>
              <p className="font-inter text-sm text-warm-gray mb-4">Still have questions?</p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-gold text-white font-inter text-sm font-medium tracking-wide px-8 py-3.5 rounded-sm transition-colors duration-200"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
