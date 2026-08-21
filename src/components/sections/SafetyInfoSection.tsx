import { AlertTriangle, ExternalLink } from "lucide-react";

export default function SafetyInfoSection({
  title,
  content,
  points,
  points2,
  points2Label,
  note,
  link,
}: {
  title: string;
  content?: string;
  points: string[];
  points2?: string[];
  points2Label?: string;
  note?: string;
  link?: { label: string; href: string };
}) {
  return (
    <section className="section-padding bg-[#1A1A1A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Candidacy &amp; Safety</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">{title}</h2>
          {content && <p className="font-inter text-white/70 text-sm leading-relaxed mb-8 max-w-2xl">{content}</p>}

          <ul className="space-y-3 mb-8">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 border border-white/10 rounded-sm p-4">
                <span className="font-inter text-sm text-white/70 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {points2 && points2.length > 0 && (
            <div className="mb-8">
              {points2Label && <h3 className="font-inter text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-4">{points2Label}</h3>}
              <div className="flex flex-wrap gap-2">
                {points2.map((point) => (
                  <span key={point} className="font-inter text-sm text-white/70 border border-white/10 rounded-sm px-3 py-1.5">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          )}

          {note && (
            <div className="flex items-start gap-3 bg-white/5 border border-gold/30 rounded-sm p-5 mb-8">
              <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-inter text-sm text-white leading-relaxed">{note}</p>
            </div>
          )}

          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-xs tracking-wider uppercase text-gold flex items-center gap-1.5 hover:text-gold-light transition-colors duration-200 w-fit"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
