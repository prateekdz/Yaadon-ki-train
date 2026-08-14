"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function splitTime(date: Date) {
  const parts = formatter.formatToParts(date);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "--";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "--";
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
  return { hour, minute, dayPeriod };
}

export default function Clock() {
  const [time, setTime] = useState<{ hour: string; minute: string; dayPeriod: string } | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(splitTime(new Date()));
    const id = setInterval(() => setTime(splitTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="glass-soft flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-sm text-cream font-semibold border border-brass/20">
        <span>--</span>
        <span className="animate-blink text-brass/70" aria-hidden="true">
          :
        </span>
        <span>--</span>
        <span className="ml-2 text-[9px] uppercase tracking-[0.08em] text-brass font-display font-semibold" />
        <span className="sr-only">IST, Kolkata time</span>
      </div>
    );
  }

  return (
    <div className="glass-soft flex items-center gap-1 rounded-full px-3 py-2 font-mono text-[10px] text-cream font-semibold border border-brass/20 sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-sm">
      <span>{time?.hour ?? "--"}</span>
      <span className="animate-blink text-brass/70" aria-hidden="true">
        :
      </span>
      <span>{time?.minute ?? "--"}</span>
      <span className="ml-1 text-[7px] uppercase tracking-[0.08em] text-brass font-display font-semibold sm:ml-2 sm:text-[9px]">{time?.dayPeriod}</span>
      <span className="sr-only">IST, Kolkata time</span>
    </div>
  );
}
