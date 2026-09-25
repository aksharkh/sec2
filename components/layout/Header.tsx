"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/ui/Logo";
import Button, { Arrow } from "@/components/ui/Button";
import { navigation, site } from "@/lib/site";

type NavItem = {
  label: string;
  href: string;
  groups?: readonly { title: string; base: string; items: readonly { slug: string; name: string }[] }[];
  feature?: { eyebrow: string; title: string; href: string; cta: string };
};
const NAV = navigation as unknown as NavItem[];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open || mobile) return;
    setHidden(y > 160 && y > prev);
  });

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

  const active = NAV.find((n) => n.label === open && n.groups);

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
            scrolled || open
              ? "border-white/[0.07] bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.label} onMouseEnter={() => enter(item.groups ? item.label : null)}>
                  <Link
                    href={item.href}
                    aria-expanded={item.groups ? open === item.label : undefined}
                    onFocus={() => enter(item.groups ? item.label : null)}
                    className={clsx(
                      "relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.9rem] tracking-tight transition-colors",
                      open === item.label ? "text-bone" : "text-bone/70 hover:text-bone",
                    )}
                  >
                    {item.label}
                    {item.groups && (
                      <svg
                        viewBox="0 0 10 10"
                        className={clsx("size-2.5 transition-transform duration-300", open === item.label && "rotate-180")}
                        aria-hidden
                      >
                        <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
                      </svg>
                    )}
                    {open === item.label && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-10 items-center px-3 text-[0.9rem] text-bone/70 transition-colors hover:text-bone md:inline-flex"
            >
              Contact
            </Link>
            <div className="hidden sm:block">
              <Button href="/contact" size="sm">
                Book a consultation
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobile((m) => !m)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              className="relative grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-px w-4 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  mobile ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={clsx(
                  "absolute h-px w-4 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  mobile ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: EASE }}
              onMouseEnter={() => enter(active.label)}
              className="absolute inset-x-0 top-full hidden border-b border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:block"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="container-x grid grid-cols-12 gap-8 py-10"
                >
                  <div
                    className={clsx(
                      "col-span-8 grid gap-8",
                      active.groups!.length === 3 ? "grid-cols-3" : "grid-cols-1",
                    )}
                  >
                    {active.groups!.map((g) => (
                      <div key={g.title}>
                        <p className="eyebrow mb-4 text-fog">{g.title}</p>
                        <ul
                          className={clsx(
                            "grid gap-x-8",
                            active.groups!.length === 1 ? "grid-cols-2" : "grid-cols-1",
                          )}
                        >
                          {g.items.map((it) => (
                            <li key={it.slug}>
                              <Link
                                href={`${g.base}/${it.slug}`}
                                onClick={() => setOpen(null)}
                                className="group flex items-center justify-between border-b border-white/[0.06] py-2.5 text-[0.95rem] text-bone/80 transition-colors hover:text-bone"
                              >
                                {it.name}
                                <Arrow className="-translate-x-2 text-lime opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {active.feature && (
                    <Link
                      href={active.feature.href}
                      onClick={() => setOpen(null)}
                      className="group relative col-span-4 flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-lime p-7 text-ink"
                    >
                      <span className="eyebrow">{active.feature.eyebrow}</span>
                      <MegaKnot />
                      <span>
                        <span className="block max-w-[18ch] text-2xl font-medium leading-tight tracking-tight">
                          {active.feature.title}
                        </span>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                          {active.feature.cta}
                          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </span>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && <MobileMenu onClose={() => setMobile(false)} />}
      </AnimatePresence>
    </>
  );
}

function MegaKnot() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -right-10 -top-10 size-56 opacity-20 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-45"
      aria-hidden
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="100"
          rx={90 - i * 2}
          ry={34 + i * 1.5}
          transform={`rotate(${i * 13} 100 100)`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] lg:hidden"
      data-lenis-prevent
    >
      <div className="container-x flex-1 overflow-y-auto pb-8 pt-6">
        <ul>
          {NAV.map((item, i) => (
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
                    <span
                      className={clsx(
                        "grid size-8 place-items-center rounded-full border border-white/15 text-lg transition-transform duration-500",
                        expanded === item.label && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        {item.groups.map((g) => (
                          <div key={g.title} className="pb-5">
                            <p className="eyebrow mb-2 text-fog">{g.title}</p>
                            <div className="flex flex-wrap gap-2">
                              {g.items.map((it) => (
                                <Link
                                  key={it.slug}
                                  href={`${g.base}/${it.slug}`}
                                  onClick={onClose}
                                  className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-bone/80"
                                >
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 space-y-6"
        >
          <Button href="/contact" size="lg" className="w-full">
            Book a consultation
          </Button>
          <div className="grid grid-cols-2 gap-4 text-sm text-fog">
            {site.offices.map((o) => (
              <a key={o.id} href={`tel:${o.tel}`} className="space-y-1">
                <span className="eyebrow block text-bone/50">{o.city}</span>
                <span className="block text-bone">{o.phone}</span>
              </a>
            ))}
          </div>
          <a href={`mailto:${site.email}`} className="block text-lg text-bone">
            {site.email}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
