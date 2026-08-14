import Player from "@/components/Player";
import TopRow from "@/components/TopRow";
import RotatingQuote from "@/components/RotatingQuote";
import About from "@/components/About";
import Faq from "@/components/Faq";

const GRAIN_SVG = `url(/grain.svg)`;

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-1.5 text-cream/60 animate-bounce sm:gap-2">
      <span className="text-[9px] sm:text-xs uppercase tracking-widest font-semibold">Scroll</span>
      <svg
        suppressHydrationWarning
        className="h-4 w-4 sm:h-5 sm:w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
    <main suppressHydrationWarning className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden">
      {/* Background */}
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/88" />
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: GRAIN_SVG,
          mixBlendMode: "overlay",
          opacity: 0.25,
        }}
        aria-hidden="true"
      />

      {/* Top nav */}
      <TopRow />

      {/* Main content area - single flex column with consistent gaps */}
      <div className="flex w-full flex-col items-center gap-4 px-4 pb-4 pt-20 sm:gap-6 sm:px-6 sm:pt-16 md:gap-7">
        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-cream drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)] leading-tight text-center max-w-4xl">
          यादों की<br />ट्रेन
        </h1>

        {/* Subtitle */}
        <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.18em] text-cream/80 text-center">
          Powered by <span className="font-bold text-cream underline">Yaadon Ki Train</span>
        </p>

        {/* Quote */}
        <RotatingQuote />

        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Player - now in document flow, not fixed */}
        <Player />
      </div>
    </main>

    {/* Sections */}
    <About />
    <Faq />
    </>
  );
}
