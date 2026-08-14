"use client";

import { useEffect, useState } from "react";

const QUOTES: { line: string; by: string }[] = [
  { line: "Har station pe ek kahani chhoot jaati hai.", by: "a conductor, somewhere on the Frontier Mail" },
  { line: "The window seat remembers more than the diary does.", by: "overheard, sleeper coach S4" },
  { line: "Safar itna yaad rehta hai, manzil bhool jaati hai.", by: "scrawled on a chai-stall wall, 2004" },
  { line: "Every ticket stub is a small, cheap time machine.", by: "a postcard, never sent" },
];

export default function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    const q = QUOTES[0];
    return (
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % QUOTES.length)}
        className="flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-center transition-colors hover:bg-white/5 sm:px-8 sm:py-5"
        aria-label="Show another quote"
      >
        <p className="font-display text-[11px] italic leading-relaxed text-cream sm:text-sm">
          &ldquo;{q.line}&rdquo;
        </p>
        <p className="mt-2 text-[8px] text-brass/80 font-display font-semibold sm:mt-3 sm:text-xs">
          — {q.by}
        </p>
      </button>
    );
  }

  const q = QUOTES[index];

  return (
    <button
      type="button"
      onClick={() => setIndex((i) => (i + 1) % QUOTES.length)}
      className="flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-center transition-colors hover:bg-white/5 sm:px-8 sm:py-5"
      aria-label="Show another quote"
    >
      <p className="font-display text-[11px] italic leading-relaxed text-cream sm:text-sm">
        &ldquo;{q.line}&rdquo;
      </p>
      <p className="mt-2 text-[8px] text-brass/80 font-display font-semibold sm:mt-3 sm:text-xs">
        — {q.by}
      </p>
    </button>
  );
}
