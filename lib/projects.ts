import type { Project } from "@/generated/prisma/client";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";

export type ProjectQueryResult =
  | {
      projects: Project[];
      unavailable: false;
    }
  | {
      projects: [];
      unavailable: true;
    };

export type ProjectDetailResult =
  | {
      project: Project | null;
      unavailable: false;
    }
  | {
      project: null;
      unavailable: true;
    };

export async function getFeaturedProjects(): Promise<ProjectQueryResult> {
  if (!hasDatabaseUrl()) {
    return { projects: [], unavailable: true };
  }

  try {
    const prisma = getPrisma();
    const projects = await prisma.project.findMany({
      where: {
        status: "published",
        featured: true,
      },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
      take: 3,
    });

    return { projects, unavailable: false };
  } catch (error) {
    console.error("Unable to load featured projects", error);
    return { projects: [], unavailable: true };
  }
}

export async function getPublishedProjects(): Promise<ProjectQueryResult> {
  if (!hasDatabaseUrl()) {
    return { projects: [], unavailable: true };
  }

  try {
    const prisma = getPrisma();
    const projects = await prisma.project.findMany({
      where: {
        status: "published",
      },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    });

    return { projects, unavailable: false };
  } catch (error) {
    console.error("Unable to load projects", error);
    return { projects: [], unavailable: true };
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetailResult> {
  if (!hasDatabaseUrl()) {
    return { project: null, unavailable: true };
  }

  try {
    const prisma = getPrisma();
    const project = await prisma.project.findFirst({
      where: {
        slug,
        status: "published",
      },
    });

    return { project, unavailable: false };
  } catch (error) {
    console.error(`Unable to load project ${slug}`, error);
    return { project: null, unavailable: true };
  }
}
