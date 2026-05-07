import { BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";

export type ExperienceItem = {
  period: string;
  title: string;
  context: string;
  description: string;
  mode: "work" | "education" | "performance";
};

const icons = {
  work: BriefcaseBusiness,
  education: GraduationCap,
  performance: Trophy,
};

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-black/10 md:block" />
      <div className="grid gap-5">
        {items.map((item) => {
          const Icon = icons[item.mode];

          return (
            <article
              key={`${item.period}-${item.title}`}
              className="relative rounded-lg border border-black/10 bg-white p-5 shadow-sm md:ml-14"
            >
              <span className="absolute -left-[3.35rem] top-5 hidden size-10 place-items-center rounded-md border border-black/10 bg-white text-teal-700 shadow-sm md:grid">
                <Icon size={18} />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold tracking-[0.12em] text-teal-700 uppercase">
                  {item.period}
                </p>
                <span className="rounded-sm bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600">
                  {item.context}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
