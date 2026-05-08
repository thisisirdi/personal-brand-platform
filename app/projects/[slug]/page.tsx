import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { ProjectViewTracker } from "@/components/analytics/ProjectViewTracker";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjectBySlug } from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDestinationHost(href: string) {
  try {
    return new URL(href).hostname;
  } catch {
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const { project, unavailable } = await getProjectBySlug(slug);

  if (unavailable) {
    return (
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
          <div className="mt-8 rounded-lg border border-amber-700/20 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            This project could not be loaded because the database is
            unavailable. Check `DATABASE_URL` and the Prisma migration status.
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    notFound();
  }

  const paragraphs = project.content.split("\n\n");
  const sourcePage = `/projects/${project.slug}`;

  return (
    <>
      <ProjectViewTracker
        project_slug={project.slug}
        project_title={project.title}
        category={project.category}
      />

      <section className="border-b border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="mt-10">
            <p className="text-sm font-semibold tracking-[0.16em] text-teal-700 uppercase">
              {project.category}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-neutral-950 sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              {project.summary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl ? (
              <TrackedLink
                href={project.githubUrl}
                analyticsEvent="external_link_clicked"
                analyticsProperties={{
                  href: project.githubUrl,
                  label: "Code",
                  source_page: sourcePage,
                  destination_host: getDestinationHost(project.githubUrl),
                  project_slug: project.slug,
                  project_title: project.title,
                  link_type: "github",
                }}
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-neutral-50"
              >
                <Code2 size={16} />
                Code
              </TrackedLink>
            ) : null}
            {project.demoUrl ? (
              <TrackedLink
                href={project.demoUrl}
                analyticsEvent="external_link_clicked"
                analyticsProperties={{
                  href: project.demoUrl,
                  label: "Demo",
                  source_page: sourcePage,
                  destination_host: getDestinationHost(project.demoUrl),
                  project_slug: project.slug,
                  project_title: project.title,
                  link_type: "demo",
                }}
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                <ExternalLink size={16} />
                Demo
              </TrackedLink>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeader
            eyebrow="Case note"
            title="What this project explores."
            description="Project detail pages are intentionally simple in V1. They can later evolve into richer case studies, media, metrics, and event tracking."
          />
          <article className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <div className="space-y-5 text-base leading-8 text-neutral-700">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
