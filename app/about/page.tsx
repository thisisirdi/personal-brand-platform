import type { Metadata } from "next";
import { Activity, BookOpen, Boxes, Sparkles, Trophy } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story and operating principles behind Irdi Duka's personal brand platform.",
};

const principles = [
  {
    title: "Make technical work legible",
    body: "Good systems are easier to trust when people can understand what they do, where they fail, and how to operate them.",
    icon: Boxes,
  },
  {
    title: "Teach through useful structure",
    body: "Education should reduce friction. Strong examples, clear language, and repeatable frameworks matter.",
    icon: BookOpen,
  },
  {
    title: "Build with feedback loops",
    body: "Projects improve when there is a rhythm for observing, deciding, shipping, and reviewing.",
    icon: Activity,
  },
  {
    title: "Keep the creative edge",
    body: "The platform leaves room for experiments, media, and ideas that make technical work feel less dry.",
    icon: Sparkles,
  },
  {
    title: "Borrow from sport",
    body: "Training, focus, recovery, and pressure management carry directly into product and engineering work.",
    icon: Trophy,
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="About"
        title="A builder profile shaped by systems, teaching, and performance."
        description="Irdi's work sits between technical implementation and human adoption: APIs, onboarding, data models, documentation, education, and the habits needed to keep improving."
      />

      <section className="border-b border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Story"
            title="Technical, but not dry."
            description="The platform is designed to show how technical credibility, business sense, and creative identity can reinforce each other."
          />

          <div className="grid gap-5 text-base leading-8 text-neutral-700">
            <p>
              Irdi is interested in the spaces where systems meet people:
              onboarding flows, API behavior, product education, operations,
              and the data that makes decisions clearer.
            </p>
            <p>
              The personal brand is intentionally hybrid. It should feel
              rigorous enough for technical teams, practical enough for
              operators, and creative enough to leave room for experimentation.
            </p>
            <p>
              V1 focuses on the foundation: a clean site, database-managed
              projects, contact capture, and documented integration points for
              analytics and future product maturity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Operating principles"
            title="The working style behind the site."
            description="The same principles that guide the platform also shape the work it presents."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-teal-50 text-teal-700">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {principle.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
