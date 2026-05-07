import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    title: "Onboarding Signal Console",
    slug: "onboarding-signal-console",
    summary:
      "A product-ops console concept for turning customer onboarding activity into clean signals for customer teams.",
    content:
      "This project explores how onboarding data can become a shared operating layer instead of a scattered set of notes, calls, and dashboards.\n\nThe system models accounts, milestones, risks, and success signals so teams can see where a customer is stuck and what should happen next. It is built around the idea that onboarding should feel measurable without becoming robotic.\n\nV1 focuses on the information architecture, database model, and API shape a team would need before layering in analytics, alerts, or workflow automation.",
    category: "Customer onboarding",
    techStack: ["Next.js", "Supabase", "Prisma", "Product analytics"],
    featured: true,
    orderIndex: 1,
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "API Reliability Field Kit",
    slug: "api-reliability-field-kit",
    summary:
      "A lightweight framework for documenting API behavior, edge cases, and operational playbooks for technical teams.",
    content:
      "The API Reliability Field Kit is a structured way to make API behavior easier to explain, test, and operate.\n\nIt combines endpoint maps, failure-mode notes, example payloads, and operator checklists into a format that works for engineering, support, and implementation teams.\n\nThe project reflects a practical belief: strong technical systems are easier to scale when their assumptions are visible.",
    category: "Data systems",
    techStack: ["TypeScript", "REST APIs", "Documentation systems", "QA"],
    featured: true,
    orderIndex: 2,
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "Performance Mindset Lab",
    slug: "performance-mindset-lab",
    summary:
      "A creative experiment connecting sports training habits with builder routines, decision quality, and feedback loops.",
    content:
      "Performance Mindset Lab is a personal operating system experiment inspired by sports, coaching, and creative technical work.\n\nIt tracks training cycles, recovery, focus blocks, and project momentum to understand how performance habits carry across physical and intellectual work.\n\nThe goal is not quantified-self noise. The goal is a simple feedback loop that helps a builder make better decisions under pressure.",
    category: "Sports mindset",
    techStack: ["Data modeling", "Habit systems", "Dashboards", "Research"],
    featured: false,
    orderIndex: 3,
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
