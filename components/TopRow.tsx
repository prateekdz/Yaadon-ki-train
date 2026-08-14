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
    <div className="fixed inset-x-0 top-0 z-40 flex flex-col items-center justify-center px-3 py-3 sm:flex-row sm:justify-between sm:px-6 sm:py-4">
      {/* Row 1 (Mobile) / Left (Desktop): Clock & Online Counter */}
      <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:gap-3">
        <div className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-cream sm:px-4 sm:py-2.5 sm:text-xs">
          <Clock />
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-cream sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2" />
          <ListenerCount />
        </div>
      </div>

      {/* Row 2 (Mobile) / Right (Desktop): Nav Pills (About, FAQ, Spotify, YT Music) */}
      <div className="mt-2 flex w-full items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:gap-3">
        <a
          href="#about"
          className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-cream transition-fast hover:text-brass sm:px-4 sm:py-2.5 sm:text-xs"
        >
          About
        </a>
        <a
          href="#faq"
          className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-cream transition-fast hover:text-brass sm:px-4 sm:py-2.5 sm:text-xs"
        >
          FAQ
        </a>
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Listen on Spotify"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-green-400 transition-fast hover:text-green-300 sm:h-10 sm:w-10"
        >
          <SpotifyIcon />
        </a>
        <a
          href="https://www.youtube.com/@Prateekdz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on YouTube"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-red-400 transition-fast hover:text-red-300 sm:h-10 sm:w-10"
        >
          <YouTubeIcon />
        </a>
      </div>
    </div>
  );
}
