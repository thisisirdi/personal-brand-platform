import type { Project } from "@/generated/prisma/client";
import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-700/35 hover:shadow-lg hover:shadow-neutral-950/8">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="signal-grid grid aspect-[16/9] place-items-center overflow-hidden rounded-md border border-black/10 bg-neutral-950">
          <div className="w-3/4 rounded-md border border-white/15 bg-white/8 p-4 text-white backdrop-blur">
            <p className="text-xs font-semibold tracking-[0.14em] text-teal-200 uppercase">
              {project.category}
            </p>
            <p className="mt-3 text-xl font-semibold">{project.title}</p>
          </div>
        </div>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-teal-700 uppercase">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-950">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
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
            <Link
              href={project.githubUrl}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              <Code2 size={15} />
              Code
            </Link>
          ) : null}
          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              <ExternalLink size={15} />
              Demo
            </Link>
          ) : null}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-9 items-center gap-2 rounded-md bg-neutral-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Read case
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
