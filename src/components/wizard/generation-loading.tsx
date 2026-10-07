"use client";

import { useEffect, useState } from "react";

export function GenerationLoading({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="relative h-14 w-11 border border-line bg-white"
        style={{ borderRadius: "var(--radius-sheet)" }}
      >
        <div className="absolute inset-x-2 top-2 h-1 animate-pulse bg-press-soft" />
        <div className="absolute inset-x-2 top-4 h-1 animate-pulse bg-press-soft [animation-delay:150ms]" />
        <div className="absolute inset-x-2 top-6 h-1 w-2/3 animate-pulse bg-press-soft [animation-delay:300ms]" />
      </div>
      <p className="mt-6 text-[15px] text-ink-soft">{messages[index]}</p>
    </div>
  );
}
