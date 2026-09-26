"use client";

import { useEffect } from "react";

/**
 * Page transition: two panels (cobalt, then ink) sweep off the screen and the page rises in
 * every time a route mounts. Pure CSS, so server and client markup always match.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, []);

  return (
    <>
      <div aria-hidden className="page-curtain page-curtain--a" />
      <div aria-hidden className="page-curtain page-curtain--b" />
      <div className="page-enter">{children}</div>
    </>
  );
}
