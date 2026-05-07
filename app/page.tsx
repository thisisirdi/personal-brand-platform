import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  GraduationCap,
  LineChart,
  Trophy,
} from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

const operatingModes = [
  {
    title: "Data systems",
    description:
      "Turning messy technical information into models, workflows, and dashboards that teams can operate.",
    icon: Database,
  },
  {
    title: "Customer onboarding",
    description:
      "Designing handoffs, success signals, and customer journeys that make technical adoption easier.",
    icon: LineChart,
  },
  {
    title: "Education",
    description:
      "Explaining complex tools with a practical voice, useful examples, and fewer assumptions.",
    icon: GraduationCap,
  },
  {
    title: "Sports mindset",
    description:
      "Applying discipline, reps, review, and recovery to technical and creative work.",
    icon: Trophy,
  },
  {
    title: "Creative experiments",
    description:
      "Testing ideas across product, media, learning systems, and small software tools.",
    icon: BrainCircuit,
  },
];

export default async function Home() {
  const { projects, unavailable } = await getFeaturedProjects();

  return (
    <>
      <Hero
        eyebrow="Creative technical operator"
        title="Irdi Duka"
        description="I build systems that make complex technical work easier to understand, operate, and scale."
        primaryCta={{ href: "/projects", label: "Explore projects" }}
        secondaryCta={{ href: "/contact", label: "Contact Irdi" }}
      />

      <section className="border-b border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Brand thesis"
            title="A platform for systems thinking with a human operating layer."
            description="This is not a generic portfolio. It is a home base for technical credibility, business thinking, customer empathy, performance habits, and creative exploration."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {operatingModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <article
                  key={mode.title}
                  className="rounded-lg border border-black/10 bg-neutral-50 p-5"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-white text-teal-700 shadow-sm">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                    {mode.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {mode.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Selected builds"
              title="Projects managed from the database."
              description="V1 starts with Prisma-backed project content so the platform can grow into admin workflows, writing, analytics, and richer publishing later."
            />
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-black/25 hover:bg-neutral-50"
            >
              View all projects
              <ArrowRight size={16} />
            </Link>
          </div>

          {unavailable ? (
            <div className="mt-10 rounded-lg border border-amber-700/20 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              Project data is unavailable. Add `DATABASE_URL`, run the Prisma
              migration, and seed the database to populate this section.
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
