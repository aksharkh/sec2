import Button from "@/components/ui/Button";
import { KnotMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <KnotMark className="pointer-events-none absolute -right-[10vw] top-1/2 size-[70vw] -translate-y-1/2 text-white/[0.04]" />
      <div className="container-x relative">
        <p className="eyebrow text-lime">404 · Page in progress</p>
        <h1 className="mt-6 max-w-[14ch] text-[length:var(--text-hero)] font-medium leading-[0.92] tracking-[-0.045em]">
          This thread isn&apos;t <span className="font-serif font-normal italic text-lime">tied</span> yet.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-bone/60">
          We&apos;re rebuilding secureknots.com page by page. This one is coming soon — in the meantime, talk to us directly.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="ghost">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
