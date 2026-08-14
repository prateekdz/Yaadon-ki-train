"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is Yaadon Ki Train?",
    a: "Yaadon Ki Train is a free ambient radio website that recreates the mood of a long, old-fashioned journey — slow instrumental travel music playing under the sound of a train, styled around nostalgia for the road rather than the destination.",
  },
  {
    q: "Is it free to use?",
    a: "Yes. There's no sign-up, no app, and nothing to pay for — it streams straight from your browser for as long as you want to listen.",
  },
  {
    q: "What kind of music plays here?",
    a: "Everything on Yaadon Ki Train is instrumental, Creative-Commons or public-domain library music — not copyrighted film songs. That's a deliberate choice so the station can stay online without takedown risk.",
  },
  {
    q: "Can I add my own songs?",
    a: "The player is built so adding a track is a one-line change in the playlist file. Just make sure you actually have the right to use it — your own recording, a licensed library track, or the rights holder's own YouTube upload with embedding left on.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      suppressHydrationWarning
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const isOpen = open === index;
      setOpen(isOpen ? -1 : index);
    }
  };

  return (
    <section id="faq" className="relative w-full bg-ink-soft px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-brass">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-medium text-cream">
            Yaadon Ki Train, Explained
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="glass overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-cream">{item.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-cream-dim">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-2xl text-center">
        <p className="font-display text-xl text-brass">यादों की ट्रेन</p>
        <p className="mt-2 text-xs text-cream-dim">
          Yaadon Ki Train · nostalgia radio for old journeys and older songs
        </p>
      </footer>
    </section>
  );
}
