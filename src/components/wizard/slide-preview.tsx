import type { Slide } from "@/lib/api/ai-engine";

const LAYOUT_LABEL: Record<Slide["layout"], string> = {
  title_slide: "Sampul",
  title_bullets: "Judul & poin",
  two_column: "Dua kolom",
  metrics_grid: "Angka kunci",
  card_grid: "Daftar item",
  contact_closing: "Penutup",
};

export function SlidePreview({ slide }: { slide: Slide }) {
  return (
    <div className="border border-line p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-xs text-ink-faint">{slide.slideNumber}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          {LAYOUT_LABEL[slide.layout]}
        </span>
      </div>
      <SlideBody slide={slide} />
    </div>
  );
}

function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.layout) {
    case "title_slide":
    case "contact_closing":
      return (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{slide.title}</h3>
          {slide.subtitle && <p className="mt-1 text-sm text-ink-soft">{slide.subtitle}</p>}
        </div>
      );

    case "title_bullets":
    case "two_column":
      return (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{slide.title}</h3>
          <ul className="mt-2 space-y-1 text-sm text-ink-soft">
            {slide.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-ink-faint">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "metrics_grid":
    case "card_grid":
      return (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{slide.title}</h3>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {slide.cards.map((card, i) => (
              <div key={i} className="border border-line/70 p-2.5">
                <p className="text-[13px] font-semibold text-ink">{card.header}</p>
                <p className="mt-0.5 text-xs text-ink-faint">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}
