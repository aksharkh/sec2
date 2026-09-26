"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import BookingModal from "@/components/overlays/BookingModal";
import CommandPalette from "@/components/overlays/CommandPalette";
import CookieBanner from "@/components/overlays/CookieBanner";

type UI = {
  openBooking: (preset?: { topic?: string }) => void;
  openSearch: () => void;
};

const Ctx = createContext<UI>({ openBooking: () => {}, openSearch: () => {} });
export const useUI = () => useContext(Ctx);

export default function UIProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<{ open: boolean; topic?: string }>({ open: false });
  const [search, setSearch] = useState(false);

  const openBooking = useCallback((preset?: { topic?: string }) => setBooking({ open: true, topic: preset?.topic }), []);
  const openSearch = useCallback(() => setSearch(true), []);

  // Any element with data-book (works from server components too) opens the booking modal.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-book]");
      if (!el || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setBooking({ open: true, topic: el.dataset.book || undefined });
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    document.addEventListener("click", onClick, true); // capture: runs before Next <Link> navigates
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Freeze smooth scroll while an overlay is open.
  useEffect(() => {
    const locked = booking.open || search;
    if (locked) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, [booking.open, search]);

  return (
    <Ctx.Provider value={{ openBooking, openSearch }}>
      {children}
      <BookingModal open={booking.open} topic={booking.topic} onClose={() => setBooking({ open: false })} />
      <CommandPalette open={search} onClose={() => setSearch(false)} />
      <CookieBanner />
    </Ctx.Provider>
  );
}
