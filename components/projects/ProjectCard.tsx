import type { Project } from "@/generated/prisma/client";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type ProjectCardProps = {
  project: Project;
  position: number;
  sourcePage: string;
};

function getDestinationHost(href: string) {
  try {
    return new URL(href).hostname;
  } catch {
    return undefined;
  }
}

export function ProjectCard({ project, position, sourcePage }: ProjectCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const projectClickProperties = {
    project_slug: project.slug,
    project_title: project.title,
    position,
    source_page: sourcePage,
  };

  return (
    <article className="group flex h-full flex-col rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-700/35 hover:shadow-lg hover:shadow-neutral-950/8">
      <TrackedLink
        href={projectHref}
        analyticsEvent="project_card_clicked"
        analyticsProperties={projectClickProperties}
        className="block"
      >
        <div className="signal-grid grid aspect-[16/9] place-items-center overflow-hidden rounded-md border border-black/10 bg-neutral-950">
          <div className="w-3/4 rounded-md border border-white/15 bg-white/8 p-4 text-white backdrop-blur">
            <p className="text-xs font-semibold tracking-[0.14em] text-teal-200 uppercase">
              {project.category}
            </p>
            <p className="mt-3 text-xl font-semibold">{project.title}</p>
          </div>
        </div>
      </TrackedLink>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-teal-700 uppercase">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              <TrackedLink
                href={projectHref}
                analyticsEvent="project_card_clicked"
                analyticsProperties={projectClickProperties}
              >
                {project.title}
              </TrackedLink>
            </h3>
          </div>
          <ArrowUpRight
            className="mt-1 text-neutral-400 transition group-hover:text-teal-700"
            size={20}
          />
        </div>

        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
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
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              <Code2 size={15} />
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
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              <ExternalLink size={15} />
              Demo
            </TrackedLink>
          ) : null}
          <TrackedLink
            href={projectHref}
            analyticsEvent="project_card_clicked"
            analyticsProperties={projectClickProperties}
            className="inline-flex min-h-9 items-center gap-2 rounded-md bg-neutral-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Read case
            <ArrowUpRight size={15} />
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}
