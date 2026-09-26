"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/ui/Logo";
import Button, { Arrow } from "@/components/ui/Button";
import { useUI } from "@/components/providers/UIProvider";
import { navigation, site, type NavItem } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { openSearch } = useUI();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open || mobile) return;
    setHidden(y > 160 && y > prev);
  });

  // Close menus on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    if (mobile) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = navigation.find((n) => n.label === open && n.groups);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={leave}
      >
        <div
          className={clsx(
            "absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled || open ? "border-white/[0.07] bg-ink/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent",
          )}
        />
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => {
                const current = item.href !== "/" && pathname.startsWith(item.href);
                return (
                  <li key={item.label} onMouseEnter={() => enter(item.groups ? item.label : null)}>
                    <Link
                      href={item.href}
                      aria-expanded={item.groups ? open === item.label : undefined}
                      onFocus={() => enter(item.groups ? item.label : null)}
                      className={clsx(
                        "relative inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.88rem] tracking-tight transition-colors xl:px-4",
                        open === item.label || current ? "text-bone" : "text-bone/65 hover:text-bone",
                      )}
                    >
                      {item.label}
                      {item.groups && (
                        <svg viewBox="0 0 10 10" className={clsx("size-2.5 transition-transform duration-300", open === item.label && "rotate-180")} aria-hidden>
                          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
                        </svg>
                      )}
                      {current && !open && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />}
                      {open === item.label && (
                        <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl K)"
              className="hidden h-10 items-center gap-2.5 rounded-full border border-white/10 pl-3.5 pr-2 text-[0.82rem] text-bone/55 transition hover:border-white/25 hover:text-bone md:inline-flex"
            >
              <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" /></svg>
              Search
              <kbd className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.62rem]">⌘K</kbd>
            </button>
            <div className="hidden sm:block">
              <Button href="/contact" book size="sm">Book a consultation</Button>
            </div>
            <button
              type="button"
              onClick={() => setMobile((m) => !m)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              className="relative grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span className={clsx("absolute h-px w-4 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]", mobile ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={clsx("absolute h-px w-4 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]", mobile ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.3, ease: EASE } }}
              transition={{ duration: 0.55, ease: EASE }}
              onMouseEnter={() => enter(active.label)}
              className="absolute inset-x-0 top-full hidden border-b border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:block"
            >
              <AnimatePresence mode="wait">
                <MegaPanel key={active.label} item={active} onNavigate={() => setOpen(null)} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* dim the page under an open mega menu */}
      <AnimatePresence>
        {active && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40 hidden bg-ink/50 backdrop-blur-[2px] lg:block"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </>
  );
}

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const groups = item.groups!;
  const dense = groups.length >= 3;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="container-x grid grid-cols-12 gap-8 py-10"
    >
      <div className={clsx("col-span-9 grid gap-8", dense ? (groups.length === 4 ? "grid-cols-4" : "grid-cols-3") : groups.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
        {groups.map((g, gi) => (
          <div key={g.title}>
            <p className="eyebrow mb-4 text-fog">{g.title}</p>
            <ul className={clsx("grid gap-x-8", !dense && groups.length === 1 && "grid-cols-2")}>
              {g.items.map((it, i) => (
                <motion.li
                  key={it.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + gi * 0.05, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className={clsx(
                      "group flex items-center justify-between gap-4 border-b border-white/[0.06] text-bone/80 transition-colors hover:text-bone",
                      it.desc ? "py-3.5" : "py-2.5 text-[0.93rem]",
                    )}
                  >
                    <span>
                      <span className={clsx("block", it.desc && "font-medium")}>{it.name}</span>
                      {it.desc && <span className="mt-0.5 block text-sm text-bone/45">{it.desc}</span>}
                    </span>
                    <Arrow className="-translate-x-2 shrink-0 text-ice opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {item.feature && (
        <Link
          href={item.feature.href}
          onClick={onNavigate}
          className="group relative col-span-3 flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-accent p-7 text-white"
        >
          <span aria-hidden className="absolute inset-0 grid-lines opacity-30" />
          <span className="eyebrow relative">{item.feature.eyebrow}</span>
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-10 -top-10 size-56 opacity-30 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:scale-110" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <ellipse key={i} cx="100" cy="100" rx={90 - i * 2} ry={34 + i * 1.5} transform={`rotate(${i * 13} 100 100)`} fill="none" stroke="currentColor" strokeWidth="0.8" />
            ))}
          </svg>
          <span className="relative">
            <span className="block max-w-[18ch] text-2xl font-medium leading-tight tracking-tight">{item.feature.title}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
              {item.feature.cta}
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      )}
    </motion.div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { openSearch } = useUI();
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] lg:hidden"
      data-lenis-prevent
    >
      <div className="container-x flex-1 overflow-y-auto pb-8 pt-4">
        <button
          type="button"
          onClick={() => {
            onClose();
            openSearch();
          }}
          className="mb-4 flex h-12 w-full items-center gap-3 rounded-full border border-white/10 px-5 text-bone/50"
        >
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" /></svg>
          Search frameworks, services…
        </button>
        <ul>
          {navigation.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}
              className="border-b border-white/[0.08]"
            >
              {item.groups ? (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    aria-expanded={expanded === item.label}
                    className="flex w-full items-center justify-between py-5 text-left text-3xl font-medium tracking-tight"
                  >
                    {item.label}
                    <span className={clsx("grid size-8 place-items-center rounded-full border border-white/15 text-lg transition-transform duration-500", expanded === item.label && "rotate-45")}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                        <Link href={item.href} onClick={onClose} className="mb-4 inline-flex items-center gap-2 text-sm text-ice">
                          View all <Arrow />
                        </Link>
                        {item.groups.map((g) => (
                          <div key={g.title} className="pb-5">
                            <p className="eyebrow mb-2 text-fog">{g.title}</p>
                            <div className="flex flex-wrap gap-2">
                              {g.items.map((it) => (
                                <Link key={it.href} href={it.href} onClick={onClose} className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-bone/80">
                                  {it.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="block py-5 text-3xl font-medium tracking-tight">
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 space-y-6">
          <Button href="/contact" book size="lg" className="w-full">Book a consultation</Button>
          <div className="grid grid-cols-2 gap-4 text-sm text-fog">
            {site.offices.map((o) => (
              <a key={o.id} href={`tel:${o.tel}`} className="space-y-1">
                <span className="eyebrow block text-bone/50">{o.city}</span>
                <span className="block text-bone">{o.phone}</span>
              </a>
            ))}
          </div>
          <a href={`mailto:${site.email}`} className="block text-lg text-bone">{site.email}</a>
        </motion.div>
      </div>
    </motion.div>
  );
}
