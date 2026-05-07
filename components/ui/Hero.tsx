import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Database,
  GraduationCap,
  PenTool,
  Send,
  Trophy,
} from "lucide-react";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
  compact?: boolean;
};

const signals = [
  { label: "Data systems", icon: Database, value: "structured" },
  { label: "Onboarding", icon: Activity, value: "operational" },
  { label: "Education", icon: GraduationCap, value: "clear" },
  { label: "Performance", icon: Trophy, value: "disciplined" },
  { label: "Experiments", icon: PenTool, value: "creative" },
];

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  compact = false,
}: HeroProps) {
  return (
    <section className="overflow-hidden border-b border-black/10">
      <div
        className={`signal-grid mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] ${
          compact ? "py-16 sm:py-20" : "min-h-[calc(100vh-73px)] py-16 sm:py-20"
        }`}
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-teal-700 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal text-neutral-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl">
            {description}
          </p>
          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                >
                  {primaryCta.label}
                  <ArrowRight size={17} />
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-black/25 hover:bg-neutral-50"
                >
                  <Send size={16} />
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="fine-noise relative overflow-hidden rounded-lg border border-black/10 bg-white/78 p-4 shadow-xl shadow-neutral-950/5">
          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-md bg-neutral-950 px-4 py-3 text-white">
              <span className="text-sm font-semibold">Operator OS</span>
              <span className="rounded-sm bg-teal-300 px-2 py-1 text-xs font-semibold text-neutral-950">
                live map
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {signals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <div
                    key={signal.label}
                    className="rounded-md border border-black/10 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-9 place-items-center rounded-md bg-teal-50 text-teal-700">
                        <Icon size={18} />
                      </span>
                      <span className="h-2 w-16 rounded-full bg-neutral-100">
                        <span className="block h-2 w-10 rounded-full bg-rose-600" />
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-neutral-950">
                      {signal.label}
                    </p>
                    <p className="mt-1 text-xs font-medium tracking-[0.08em] text-neutral-500 uppercase">
                      {signal.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-md border border-black/10 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-neutral-950">
                Positioning
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                I build systems that make complex technical work easier to
                understand, operate, and scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
