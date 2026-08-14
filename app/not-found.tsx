export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#14170f] px-6 text-center text-cream">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-cream/70">404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">This page is off the route.</h1>
        <p className="mt-3 text-sm text-cream/70">The station platform you were looking for isn’t on this track.</p>
      </div>
    </main>
  );
}
