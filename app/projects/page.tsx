import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Database-managed technical and creative projects from Irdi Duka.",
};

export default async function ProjectsPage() {
  const { projects, unavailable } = await getPublishedProjects();

  return (
    <>
      <Hero
        compact
        eyebrow="Projects"
        title="Technical builds with an operator's lens."
        description="Each project is managed in Postgres through Prisma from day one, creating a clean path toward admin tools, analytics, and publishing workflows later."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Project library"
            title="Systems, onboarding, APIs, and experiments."
            description="The current seed set gives the platform useful content immediately while keeping the data model ready for real case studies."
          />

          {unavailable ? (
            <div className="mt-10 rounded-lg border border-amber-700/20 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              Project data is unavailable. Configure `DATABASE_URL`, run the
              Prisma migration, then seed the database.
            </div>
          ) : projects.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  position={index + 1}
                  sourcePage="/projects"
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-black/10 bg-white p-5 text-sm leading-6 text-neutral-600">
              No published projects yet. Run `npm run db:seed` after applying
              the Prisma migration.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
