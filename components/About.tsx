const FEATURES = [
  {
    title: "Songs for the Road",
    body:
      "A rotating stream of unhurried, old-fashioned travel music — the kind that used to drift out of a train radio or a roadside dhaba, playing quietly under the sound of wheels on track.",
  },
  {
    title: "Two Playlists, One Journey",
    body:
      "Night Train for the slow overnight legs, Old Postcards for the daylight hours pulling into a new platform. Switch anytime — it always restarts from track one.",
  },
  {
    title: "Always Open",
    body:
      "Yaadon Ki Train is free, streams straight from your browser, and never closes. No sign-up, no app — just press play and look out the window.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-ink px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brass">Welcome to</p>
        <h2 className="mt-3 font-display text-4xl font-medium text-cream sm:text-5xl">
          Yaadon Ki Train — old songs, rebuilt for the road
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-cream-dim">
          Yaadon Ki Train is a free ambient radio built to recreate one specific feeling: the
          window seat on a long, slow journey, with something warm and half-familiar playing
          low in the background. Press play, and it streams a nonstop mix of unhurried,
          copyright-free travel music, styled around the sights, sounds and small rituals of
          getting from one place to another the old way.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 text-left">
            <h3 className="font-display text-lg text-cream">{f.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-cream-dim">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
