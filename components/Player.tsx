"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playlists, defaultPlaylistId, shuffleTracks, type Track } from "@/lib/tracks";

// -----------------------------------------------------------------------------
// Minimal ambient types for the YouTube IFrame Player API (we only use a
// small slice of it, so we hand-roll the bits we need instead of pulling a
// dependency).
// -----------------------------------------------------------------------------
type YTPlayerState = -1 | 0 | 1 | 2 | 3 | 5;

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: { data: number; target: YTPlayer }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: {
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
    __ytResolvers?: Array<{ resolve: (yt: YTNamespace) => void; reject: (err: Error) => void }>;
    __ytCallbackSetup?: boolean;
  }
}

// -----------------------------------------------------------------------------
// Small helpers
// -----------------------------------------------------------------------------
function formatTime(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function loadYouTubeApi(): Promise<YTNamespace> {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    
    // Initialize the callback queue if it doesn't exist
    if (!window.__ytResolvers) {
      window.__ytResolvers = [];
    }
    
    const existing = document.getElementById("yt-iframe-api");
    if (!existing) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => reject(new Error("Failed to load YouTube API"));
      document.head.appendChild(tag);
    }
    
    // Add this resolver to the queue
    window.__ytResolvers!.push({ resolve, reject });
    
    // Set up the global callback only once
    if (!window.__ytCallbackSetup) {
      window.__ytCallbackSetup = true;
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        if (window.YT) {
          // Resolve all pending requests
          const resolvers = window.__ytResolvers || [];
          window.__ytResolvers = [];
          resolvers.forEach(({ resolve }) => resolve(window.YT!));
        }
      };
    }
    
    // Add timeout to prevent indefinite hanging
    const timeoutId = setTimeout(() => {
      const index = window.__ytResolvers?.indexOf({ resolve, reject }) ?? -1;
      if (index > -1) {
        window.__ytResolvers!.splice(index, 1);
        reject(new Error("YouTube API failed to load"));
      }
    }, 10000);
  });
}

// -----------------------------------------------------------------------------
// Icons — module scope, purely presentational
// -----------------------------------------------------------------------------
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.86-6.86a1 1 0 0 0 0-1.7L9.53 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm13.71.29a1 1 0 0 1 .29.7v12a1 1 0 0 1-1.6.8L9.4 12.8a1 1 0 0 1 0-1.6l9-6.99a1 1 0 0 1 1.31.08Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18 5a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1ZM4.29 5.29A1 1 0 0 0 4 6v12a1 1 0 0 0 1.6.8l9-6.99a1 1 0 0 0 0-1.6l-9-6.99a1 1 0 0 0-1.31.08Z" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Seek bar — module scope. Uses onPointerDown (not onClick) and touch-none so
// dragging the bar never scrolls the page underneath it.
// -----------------------------------------------------------------------------
function SeekBar({
  progress,
  onSeek,
  full = false,
}: {
  progress: number; // 0..1
  onSeek: (ratio: number) => void;
  full?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
      onSeek(ratioFromClientX(e.clientX));
    },
    [onSeek, ratioFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const ratio = ratioFromClientX(e.clientX);
      setHoverRatio(ratio);
      if (dragging) onSeek(ratio);
    },
    [dragging, onSeek, ratioFromClientX]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }, []);

  const knobRatio = dragging ? hoverRatio ?? progress : progress;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="group relative flex h-6 w-full touch-none items-center"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => !dragging && setHoverRatio(null)}
    >
      <div className={`relative w-full ${full ? "h-1.5" : "h-1"} rounded-full bg-white/12`}>
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brass via-brass-soft to-brass shadow-[0_0_12px_rgba(217,165,68,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]"
          style={{ width: `${knobRatio * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-brass-soft to-brass opacity-0 shadow-lg shadow-brass/40 transition-all group-hover:opacity-100"
          style={{ left: `${knobRatio * 100}%` }}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Transport controls — module scope
// -----------------------------------------------------------------------------
function Transport({
  isPlaying,
  onPrev,
  onToggle,
  onNext,
  size = "sm",
}: {
  isPlaying: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  size?: "sm" | "lg";
}) {
  const playBtn = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  
  return (
    <div className="flex items-center gap-3 text-cream">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="flex h-10 w-10 items-center justify-center rounded-full text-cream/60 transition-fast hover:text-cream hover:bg-white/15 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brass/50"
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={`flex ${playBtn} items-center justify-center rounded-full bg-gradient-to-b from-brass-soft via-brass to-brass/95 text-ink ring-2 ring-brass/70 shadow-[0_12px_32px_-6px_rgba(217,165,68,0.5)] transition-premium hover-lift active:scale-95 focus:outline-none`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="flex h-10 w-10 items-center justify-center rounded-full text-cream/60 transition-fast hover:text-cream hover:bg-white/15 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brass/50"
      >
        <NextIcon />
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Player
// -----------------------------------------------------------------------------
export default function Player() {
  const [playlistId, setPlaylistId] = useState(defaultPlaylistId);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const [shuffledTracks, setShuffledTracks] = useState(() => playlists[0].tracks);

  const ytRef = useRef<YTPlayer | null>(null);
  const ytApiRef = useRef<YTNamespace | null>(null);
  const mountElRef = useRef<HTMLDivElement | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingVideoRef = useRef<string | null>(null);

  const playlist = playlists.find((p) => p.id === playlistId) ?? playlists[0];
  const activeTracks = playlistId === defaultPlaylistId ? shuffledTracks : playlist.tracks;
  const track: Track = activeTracks[trackIndex] ?? activeTracks[0];

  // ---- keep the single floating artwork/iframe container glued on top of
  // whichever placeholder (desktop pill or mobile card) is visible right now.
  // YouTube iframe is hidden in a zero-size container for audio-only playback
  // No position syncing needed - fixes jitter on scroll

  // ---- create the YT player once, on the persistent mount div.
  useEffect(() => {
    setShuffledTracks(shuffleTracks(playlists[0].tracks));
    setTrackIndex(0);
  }, [playlistId]);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountElRef.current) return;
      ytApiRef.current = YT;
      const innerId = "yt-inner-mount";
      mountElRef.current.innerHTML = `<div id="${innerId}" class="h-full w-full"></div>`;
      const player = new YT.Player(innerId, {
        videoId: track.videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          fs: 0,
        },
        events: {
          onReady: () => {
            setReady(true);
            if (pendingVideoRef.current) {
              pendingVideoRef.current = null;
            }
          },
          onStateChange: (e) => {
            const YTS = YT.PlayerState;
            if (e.data === YTS.PLAYING) setIsPlaying(true);
            if (e.data === YTS.PAUSED) setIsPlaying(false);
            if (e.data === YTS.ENDED) {
              setTrackIndex((i) => (i + 1) % activeTracks.length);
            }
          },
          onError: (e) => {
            // Track went private/deleted/embedding disabled after we shipped.
            // Log it and move on without leaving the player stuck on the failed ID.
            console.warn("[player] video error", { code: e.data, videoId: track.videoId });
            pendingVideoRef.current = null;
            setTrackIndex((i) => {
              const next = (i + 1) % activeTracks.length;
              return next === i ? 0 : next;
            });
          },
        },
      });
      ytRef.current = player;
    });
    return () => {
      cancelled = true;
      ytRef.current?.destroy();
      ytRef.current = null;
    };
    // Only ever created once — track/playlist switches use loadVideoById-style
    // methods below rather than recreating the player (that's what keeps the
    // vinyl spin state and iframe from restarting).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- when the selected track changes, load it into the existing player.
  const trackVideoId = track.videoId;
  useEffect(() => {
    if (!ready || !ytRef.current) {
      pendingVideoRef.current = trackVideoId;
      return;
    }
    const player = ytRef.current as unknown as {
      loadVideoById?: (id: string) => void;
      cueVideoById?: (id: string) => void;
      playVideo?: () => void;
    };
    if (!player || typeof player.loadVideoById !== "function" || typeof player.cueVideoById !== "function") {
      return;
    }
    
    if (isPlaying) {
      player.loadVideoById(trackVideoId);
      if (typeof player.playVideo === "function") {
        player.playVideo();
      }
    } else {
      player.cueVideoById(trackVideoId);
    }
    
    setCurrentTime(0);
    setDuration(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackVideoId, ready, isPlaying]);

  // ---- progress polling (only when playing for efficiency)
  useEffect(() => {
    if (!isPlaying) return;
    
    progressTimer.current = setInterval(() => {
      const p = ytRef.current;
      if (!p) return;
      const d = p.getDuration();
      const t = p.getCurrentTime();
      if (Number.isFinite(d) && d > 0) setDuration(d);
      if (Number.isFinite(t)) setCurrentTime(t);
    }, 250);
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const p = ytRef.current;
    if (!p || typeof p.playVideo !== "function" || typeof p.pauseVideo !== "function") return;
    if (isPlaying) p.pauseVideo();
    else p.playVideo();
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setIsPlaying(true);
    setTrackIndex((i) => (i + 1) % activeTracks.length);
  }, []);

  const prevTrack = useCallback(() => {
    setIsPlaying(true);
    setTrackIndex((i) => (i - 1 + activeTracks.length) % activeTracks.length);
  }, []);

  const onSeek = useCallback(
    (ratio: number) => {
      const p = ytRef.current;
      if (!p) return;
      p.seekTo(ratio * duration, true);
      setCurrentTime(ratio * duration);
    },
    [duration]
  );

  const switchPlaylist = useCallback((id: string) => {
    setPlaylistId(id);
    setTrackIndex(0);
  }, []);

  const progress = duration > 0 ? currentTime / duration : 0;
  const displayDuration = duration > 0 ? formatTime(duration) : track.duration;

  // fallback fallback: if playback stalls immediately as autoplay-blocked, we
  // never gate the play button on a "canplay"-style event — it's always
  // clickable and just calls playVideo()/pauseVideo() directly.

  return (
    <>
      {/* Hidden YouTube iframe for audio-only playback */}
      <div ref={mountElRef} className="hidden h-0 w-0" />

      {/* Mini-Player Bar */}
      <div suppressHydrationWarning className="fixed bottom-0 left-0 right-0 z-40 flex w-full justify-center bg-gradient-to-t from-ink via-ink/95 to-ink/20 px-2 py-3 pb-safe sm:px-4 sm:py-4">
        <div className="w-full max-w-[min(94vw,42rem)] rounded-2xl border border-white/10 bg-black/70 p-2 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Album Thumbnail */}
            <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-soft ring-1 ring-brass/40 sm:flex">
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brass/40 to-brass-soft/20" />
              </div>
            </div>

            {/* Song Info */}
            <div className="w-full min-w-0 flex-1">
              <p className="line-clamp-2 text-[11px] font-bold text-cream sm:line-clamp-1 sm:text-sm">{track.title}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <SeekBar progress={progress} onSeek={onSeek} />
                </div>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-cream/60 sm:text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>{displayDuration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex w-full items-center justify-center gap-2 shrink-0 sm:w-auto sm:justify-end">
              <button
                type="button"
                onClick={prevTrack}
                aria-label="Previous"
                className="flex h-7 w-7 items-center justify-center rounded-full text-cream/70 transition-fast hover:text-cream active:scale-95 sm:h-8 sm:w-8"
              >
                <PrevIcon />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brass text-ink shadow-lg transition-fast hover:scale-105 active:scale-95 sm:h-10 sm:w-10"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                onClick={nextTrack}
                aria-label="Next"
                className="flex h-7 w-7 items-center justify-center rounded-full text-cream/70 transition-fast hover:text-cream active:scale-95 sm:h-8 sm:w-8"
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
