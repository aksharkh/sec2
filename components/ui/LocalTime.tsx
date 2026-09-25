"use client";

import { useSyncExternalStore } from "react";

// One shared 1-second clock for every time display on the page.
let now = typeof window !== "undefined" ? Date.now() : 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}
const getSnapshot = () => now;
const getServerSnapshot = () => 0;

/** Live wall-clock time for an office. Renders a stable placeholder on the server. */
export default function LocalTime({
  timeZone,
  seconds = false,
  className,
}: {
  timeZone: string;
  seconds?: boolean;
  className?: string;
}) {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const text = t
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: seconds ? "2-digit" : undefined,
        hour12: false,
      }).format(t)
    : seconds
      ? "--:--:--"
      : "--:--";
  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}

const noop = () => () => {};

/** Short zone name that respects daylight saving (EDT vs EST). */
export function ZoneLabel({ timeZone, fallback, className }: { timeZone: string; fallback: string; className?: string }) {
  const label = useSyncExternalStore(
    noop,
    () => {
      if (timeZone === "Asia/Kolkata") return fallback; // en-US renders this as GMT+5:30
      return (
        new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
          .formatToParts(new Date())
          .find((p) => p.type === "timeZoneName")?.value ?? fallback
      );
    },
    () => fallback,
  );
  return <span className={className}>{label}</span>;
}
