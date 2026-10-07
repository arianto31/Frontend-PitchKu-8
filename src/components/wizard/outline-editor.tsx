"use client";

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { OutlineItem } from "@/lib/api/ai-engine";

const MIN_SLIDES = 5;
const MAX_SLIDES = 12;

function renumber(items: OutlineItem[]): OutlineItem[] {
  return items.map((item, i) => ({ ...item, slideNumber: i + 1 }));
}

export function OutlineEditor({
  outline,
  onChange,
}: {
  outline: OutlineItem[];
  onChange: (next: OutlineItem[]) => void;
}) {
  function updateField(index: number, field: "title" | "objective", value: string) {
    const next = outline.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(next);
  }

  function remove(index: number) {
    if (outline.length <= MIN_SLIDES) return;
    onChange(renumber(outline.filter((_, i) => i !== index)));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= outline.length) return;
    const next = [...outline];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(renumber(next));
  }

  return (
    <div className="space-y-4">
      {outline.length >= MAX_SLIDES && (
        <p className="text-[13px] text-ink-faint">Maksimal {MAX_SLIDES} slide tercapai.</p>
      )}

      {outline.map((item, index) => (
        <div key={index} className="flex gap-3 border border-line p-4">
          <div className="flex flex-col items-center gap-1 pt-1">
            <span className="font-mono text-xs text-ink-faint">{item.slideNumber}</span>
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="text-ink-faint transition-colors hover:text-ink disabled:opacity-30" title="Naikkan">
              <ChevronUp size={16} />
            </button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === outline.length - 1} className="text-ink-faint transition-colors hover:text-ink disabled:opacity-30" title="Turunkan">
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <Input
              value={item.title}
              maxLength={60}
              onChange={(e) => updateField(index, "title", e.target.value)}
              placeholder="Judul slide"
              className="font-display text-base font-semibold"
            />
            <Textarea
              value={item.objective}
              maxLength={150}
              rows={2}
              onChange={(e) => updateField(index, "objective", e.target.value)}
              placeholder="Tujuan slide ini bagi pembaca"
              className="text-[13px]"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            disabled={outline.length <= MIN_SLIDES}
            title={outline.length <= MIN_SLIDES ? `Minimal ${MIN_SLIDES} slide` : "Hapus slide"}
            className="h-fit text-ink-faint transition-colors hover:text-error disabled:opacity-30"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
