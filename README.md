# यादों की ट्रेन — Yaadon Ki Train

A single-page nostalgia radio: old-fashioned travel music, driven by the YouTube
IFrame Player API, wrapped in a train-window UI.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## About the music — please read

Every track shipped in `lib/tracks.ts` is **instrumental, Creative-Commons or
public-domain library music** (Kevin MacLeod / incompetech, CC BY), not real
old Bollywood or film songs. That's on purpose:

- Real old film songs are copyrighted. Streaming them legally means using the
  **rights holder's own YouTube upload with embedding left on** — and that has
  to be verified per song, by you, because it changes over time and I can't
  safely guess it on your behalf.
- I picked five vintage-styled instrumental tracks that fit the "old journey"
  mood instead, so the site works end-to-end right now without infringement
  risk.
- I found these video IDs via search rather than by playing the audio myself,
  so **preview every track once before you launch** — if YouTube has since
  disabled embedding or removed an upload, the player will just auto-skip it
  (see `onError` in `components/Player.tsx`), but you'll want to know before a
  listener hits it.

To add or swap a song, add one object to a playlist array in `lib/tracks.ts`:

```ts
{
  id: "your-id",
  title: "Track title",
  artist: "Artist name",
  film: "Mood / collection tag",
  year: 2020,
  duration: "2:30",
  videoId: "xxxxxxxxxxx", // the 11-char id from youtube.com/watch?v=THIS
}
```

Only add a `videoId` you've confirmed you have the right to use.

## Assets

- `public/bg/scene-wide.png` — your uploaded train-compartment painting, used
  as-is for landscape orientation.
- `public/bg/scene-tall.png` — I generated this as a **center-weighted crop**
  of the same image, not a separately composed portrait scene (I don't have
  image-generation tools here). It works, but if you want a true portrait
  composition of the same scene, swap this file for one and nothing else needs
  to change.

## Structure

- `app/page.tsx` — server component, assembles the page
- `components/Player.tsx` — the whole player: YouTube API loading, transport,
  seek bar, playlist switching, vinyl-spin artwork
- `components/Clock.tsx`, `ListenerCount.tsx`, `TopRow.tsx`, `RotatingQuote.tsx`
- `components/About.tsx`, `Faq.tsx` — content sections below the fold
- `lib/tracks.ts` — playlist data (edit here to add songs)

## Notes on a couple of engineering choices

- The player keeps **exactly one** live YouTube iframe at all times (never
  duplicated, never hidden at 1px/opacity-0) per YouTube's developer policies.
  It's floated in a fixed-position container that repositions itself over
  whichever layout — the desktop pill or the mobile card — is currently on
  screen, so you still get two genuinely distinct layouts with no reflow bugs.
- All sub-components (`Transport`, `SeekBar`, icons) are defined at module
  scope, not inside `Player`, so they don't remount (and restart the vinyl
  spin) on every progress tick.
