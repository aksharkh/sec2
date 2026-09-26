import { KnotMark } from "@/components/ui/Logo";
import { Eyebrow, RevealLines } from "@/components/ui/Reveal";

// Live SVG "data flow": pulses of light travel along each line from a framework into the knot.
// Pure CSS animation (see .flow-pulse in globals.css) — no JS per frame.
const LEFT = ["SOC 2", "ISO 27001", "PCI DSS", "HIPAA", "GDPR"];
const RIGHT = ["FedRAMP", "CMMC", "DPDPA", "ISO 42001", "DORA"];
const YS = [70, 160, 250, 340, 430];
const CX = 600;
const CY = 250;

function Side({ labels, left }: { labels: string[]; left: boolean }) {
  return (
    <>
      {labels.map((l, i) => {
        const x = left ? 190 : 1010;
        const y = YS[i];
        const d = left
          ? `M ${x} ${y} C ${x + 170} ${y}, ${CX - 200} ${CY}, ${CX - 58} ${CY}`
          : `M ${x} ${y} C ${x - 170} ${y}, ${CX + 200} ${CY}, ${CX + 58} ${CY}`;
        const dur = 2.6 + ((i * 7) % 5) * 0.35;
        const delay = -((i * 0.73 + (left ? 0 : 0.4)) % dur);
        return (
          <g key={l}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="flow-pulse"
              style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s`, filter: "drop-shadow(0 0 6px var(--color-accent))" }}
            />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--color-ice)"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="flow-pulse"
              style={{ animationDuration: `${dur}s`, animationDelay: `${delay - dur / 2}s`, opacity: 0.7 }}
            />
            <circle cx={x} cy={y} r="4" fill="var(--color-ice)" className="flow-node" style={{ animationDelay: `${i * 0.3}s` }} />
            <text
              x={left ? x - 16 : x + 16}
              y={y + 5}
              textAnchor={left ? "end" : "start"}
              fill="rgba(241,239,232,0.8)"
              style={{ font: "500 17px var(--font-geist-sans)", letterSpacing: "-0.01em" }}
            >
              {l}
            </text>
          </g>
        );
      })}
    </>
  );
}

export default function FlowNetwork() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36" aria-labelledby="flow-title">
      <div className="container-x">
        <div className="text-center">
          <Eyebrow className="justify-center">Live programme</Eyebrow>
          <h2 id="flow-title" className="mx-auto mt-6 max-w-[18ch] text-[length:var(--text-section)] font-medium leading-[0.95] tracking-[-0.045em]">
            <RevealLines lines={["Every framework", <>flows into <span className="font-serif font-normal italic text-ice">one.</span></>]} />
          </h2>
        </div>
        <div className="relative mx-auto mt-14 max-w-6xl">
          <svg viewBox="0 0 1200 500" className="h-auto w-full" role="img" aria-label="Frameworks flowing into one unified programme">
            <defs>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.55" />
                <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={CX} cy={CY} r="150" fill="url(#core)" className="flow-core" />
            <Side labels={LEFT} left />
            <Side labels={RIGHT} left={false} />
            <circle cx={CX} cy={CY} r="58" fill="#0f1114" stroke="var(--color-accent)" strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r="72" fill="none" stroke="var(--color-ice)" strokeOpacity="0.35" strokeDasharray="3 7" className="flow-spin" />
          </svg>
          <div className="pointer-events-none absolute left-1/2 top-1/2 grid size-[7.5%] -translate-x-1/2 -translate-y-1/2 place-items-center text-ice">
            <KnotMark className="size-full" />
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-[52ch] text-center text-lg text-bone/55">
          Evidence collected once streams into a single control set — and back out to every audit that needs it.
        </p>
      </div>
    </section>
  );
}
