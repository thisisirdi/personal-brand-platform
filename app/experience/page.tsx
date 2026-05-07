import type { Metadata } from "next";
import {
  ExperienceTimeline,
  type ExperienceItem,
} from "@/components/experience/ExperienceTimeline";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience themes for Irdi Duka across technical operations, education, systems thinking, and performance.",
};

const experienceItems: ExperienceItem[] = [
  {
    period: "Current",
    title: "Creative technical operator",
    context: "Systems and product thinking",
    mode: "work",
    description:
      "Building a personal platform around practical technical systems, onboarding, documentation, APIs, analytics readiness, and creative publishing.",
  },
  {
    period: "Foundation",
    title: "API and data systems practice",
    context: "Technical credibility",
    mode: "work",
    description:
      "Developing fluency around structured data, API behavior, edge cases, documentation, and the operational details teams need to ship reliable tools.",
  },
  {
    period: "Education layer",
    title: "Explaining complex systems clearly",
    context: "Teaching and enablement",
    mode: "education",
    description:
      "Turning technical concepts into usable frameworks, examples, onboarding materials, and builder notes that help people move faster.",
  },
  {
    period: "Performance layer",
    title: "Sports mindset as an operating system",
    context: "Discipline and review",
    mode: "performance",
    description:
      "Using training principles such as reps, recovery, pressure management, and film review as a lens for better creative and technical work.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Experience"
        title="A timeline for systems, education, and operator judgment."
        description="The experience page is framed around work modes rather than a flat resume: technical systems, customer adoption, teaching, and performance habits."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="Operator arc"
            title="How the pieces connect."
            description="V1 keeps this page intentionally clean. It can later expand into richer roles, outcomes, case studies, and downloadable proof points."
          />
          <ExperienceTimeline items={experienceItems} />
        </div>
      </section>
    </>
  );
}
