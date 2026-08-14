"use client";

import { useEffect, useState } from "react";

// There is no real listener backend behind this — it's an ambient touch, like
// a station departure board. It starts from a stable seed and drifts gently
// so it never visibly "resets" on refresh in a way that reads as fake.
function seedFromDate() {
  const day = Math.floor(Date.now() / 86_400_000);
  return 240 + (day % 37) * 11;
}

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCount(seedFromDate());
    const id = setInterval(() => {
      setCount((c) => {
        const base = c ?? seedFromDate();
        const drift = Math.round((Math.random() - 0.5) * 6);
        return Math.max(180, base + drift);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="glass-soft flex items-center gap-1.5 rounded-full border border-brass/20 px-2 py-1.5 text-[9px] font-semibold text-cream sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm">
        <span className="relative flex h-1.5 w-1.5 items-center justify-center sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brass opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brass/80 sm:h-2 sm:w-2" />
        </span>
        <span className="font-mono tabular-nums">{count ?? "—"}</span>
        <span className="text-cream/80 hidden sm:inline">on the platform</span>
        <span className="text-cream/80 sm:hidden">online</span>
      </div>
    );
  }

  return (
    <div className="glass-soft flex items-center gap-1.5 rounded-full border border-brass/20 px-2 py-1.5 text-[9px] font-semibold text-cream sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm">
      <span className="relative flex h-1.5 w-1.5 items-center justify-center sm:h-2 sm:w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brass opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brass/80 sm:h-2 sm:w-2" />
      </span>
      <span className="font-mono tabular-nums">{count ?? "—"}</span>
      <span className="text-cream/80 hidden sm:inline">on the platform</span>
      <span className="text-cream/80 sm:hidden">online</span>
    </div>
  );
}
