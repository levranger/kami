export default function ServiceFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.q} className="border border-warm-border rounded-sm overflow-hidden group">
          <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none hover:bg-warm-white transition-colors duration-200">
            <span className="font-inter text-sm font-medium text-[#1A1A1A] pr-4">{item.q}</span>
            <svg className="h-4 w-4 text-warm-gray flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-5 pb-5 -mt-1">
            <p className="font-inter text-sm text-warm-gray leading-relaxed">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
