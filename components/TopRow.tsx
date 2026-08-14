import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.079 10.561 18.72 12.84c.361.21.599.659.301 1.1zm.12-3.36C15.312 8.501 8.93 8.159 5.359 9.636c-.524.18-1.081-.063-1.261-.599-.182-.521.062-1.078.599-1.261 4.26-1.494 11.161-1.136 15.588 1.81.418.24.696.771.457 1.289-.24.522-.776.8-1.196.557z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function TopRow() {
  return (
    <div className="fixed left-1/2 top-0 z-40 w-[min(100vw,780px)] -translate-x-1/2 px-2 py-2 sm:w-[min(94vw,780px)] sm:px-4 sm:py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 sm:justify-between">
        {/* Row 1 (Mobile) / Left (Desktop): Clock & Online Counter */}
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 sm:justify-start">
          <div className="rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-[8px] font-semibold text-cream whitespace-nowrap sm:px-3 sm:py-2 sm:text-[10px] md:px-4 md:py-2.5 md:text-xs">
            <Clock />
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-[8px] font-semibold text-cream whitespace-nowrap sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[10px] md:gap-2 md:px-4 md:py-2.5 md:text-xs">
            <div className="h-1 w-1 rounded-full bg-green-500 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2" />
            <ListenerCount />
          </div>
        </div>

        {/* Row 2 (Mobile) / Right (Desktop): Nav Pills (About, FAQ, Spotify, YT Music) */}
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 sm:justify-end">
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-[8px] font-semibold text-cream whitespace-nowrap transition-fast hover:text-brass sm:px-3 sm:py-2 sm:text-[10px] md:px-4 md:py-2.5 md:text-xs"
          >
            About
          </a>
          <a
            href="#faq"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-[8px] font-semibold text-cream whitespace-nowrap transition-fast hover:text-brass sm:px-3 sm:py-2 sm:text-[10px] md:px-4 md:py-2.5 md:text-xs"
          >
            FAQ
          </a>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Listen on Spotify"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 text-green-400 transition-fast hover:text-green-300 sm:h-8 sm:w-8 md:h-10 md:w-10"
          >
            <SpotifyIcon />
          </a>
          <a
            href="https://www.youtube.com/@Prateekdz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen on YouTube"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 text-red-400 transition-fast hover:text-red-300 sm:h-8 sm:w-8 md:h-10 md:w-10"
          >
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
