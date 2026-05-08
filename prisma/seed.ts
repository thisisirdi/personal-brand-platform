import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const legacyProjectSlugs = [
  "onboarding-signal-console",
  "api-reliability-field-kit",
  "performance-mindset-lab",
];

const projects = [
  {
    title: "SQL Server to PostgreSQL ETL Desktop App",
    slug: "sql-server-to-postgresql-etl-desktop-app",
    summary:
      "A Windows desktop ETL application for syncing SQL Server data into PostgreSQL with saved jobs, run history, scheduling, and encrypted local credentials.",
    content:
      "This is a local desktop data tool built around a practical migration problem: moving data from SQL Server into PostgreSQL without turning every sync into a one-off script.\n\nThe app uses a PySide6 interface to manage saved source and target connections, define table-based or custom SQL jobs, preview source data, and run full refresh or incremental syncs. Local SQLite stores connection metadata, job definitions, run history, logs, scheduler state, and incremental watermarks, while Windows DPAPI protects saved credentials.\n\nThe core engineering work is in the boundaries between UI, persistence, database adapters, and job execution. SQL Server metadata, key inference, source extraction, PostgreSQL schema creation, full-load inserts, and incremental upserts are separated so the workflow can grow without becoming a single procedural script.\n\nThis project is strongest as an operator tool: it handles manual runs, pause and resume behavior, cancellation, interrupted-run recovery, concurrency limits, and scheduler rules. It reflects a bias toward data tools that are understandable, inspectable, and realistic for support or migration teams.",
    category: "Data engineering",
    techStack: ["Python", "PySide6", "SQL Server", "PostgreSQL", "SQLite"],
    featured: true,
    orderIndex: 1,
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "OptikSaaS Demo",
    slug: "optiksaas-demo",
    summary:
      "A Next.js and Supabase SaaS demo for optical clinic staff workflows, including patients, prescriptions, dashboard metrics, and printable PDFs.",
    content:
      "OptikSaaS is a focused product demo for an optical clinic workflow. The goal is not to build a generic dashboard, but to make a believable internal staff experience around patient lookup, prescription capture, clinic metrics, and PDF generation.\n\nThe app is built with Next.js App Router, React, Tailwind CSS, Supabase Auth, Supabase Postgres, row-level-security setup, Zod validation, and server-side PDF generation with React PDF. The flow starts with shared staff authentication, then moves through patient search and creation, prescription entry with optical measurement fields, and downloadable prescription documents.\n\nThe useful product work is in the shape of the workflow: clinic staff need fast lookup, clear forms, printable outputs, and a dashboard that reflects patient and prescription activity. The demo also leaves honest boundaries for future work, including role-aware staff accounts, edit flows, appointments, reporting, inventory, audit logs, and stronger RLS.\n\nAs a portfolio project, it shows full-stack product thinking: domain-specific data modeling, protected app routes, server actions, validation, reporting surfaces, and a roadmap that moves from demo credibility toward production readiness.",
    category: "SaaS product",
    techStack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Zod"],
    featured: true,
    orderIndex: 2,
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "SQL Server DBA Support Lab",
    slug: "sql-server-dba-support-lab",
    summary:
      "A practical SQL Server support toolkit with scripts and playbooks for environment discovery, diagnostics, audits, backups, restores, and upgrade readiness.",
    content:
      "The SQL Server DBA Support Lab is a collection of operational scripts and documentation for common database administration and support workflows. It is built for the kind of work that happens when a team needs to understand an unfamiliar SQL Server environment quickly and safely.\n\nThe repository covers environment inventory, database health checks, performance diagnostics, index and statistics review, blocking and long-running query analysis, security audits, backup creation, restore validation, upgrade readiness, metadata inspection, audit columns, triggers, and index tuning demos.\n\nThe project is organized as both tooling and process. Scripts live beside support playbooks, findings templates, upgrade runbooks, and screenshots so the output can be explained to technical and non-technical stakeholders.\n\nThis is a strong credibility project because it shows applied database operations rather than abstract SQL examples. It is useful for onboarding a new environment, investigating performance issues, validating recovery procedures, and preparing upgrade conversations.",
    category: "Database operations",
    techStack: ["SQL Server", "T-SQL", "DBA", "Performance tuning", "Runbooks"],
    featured: true,
    orderIndex: 3,
    githubUrl: "https://github.com/thisisirdi/sql-server-dba-support-lab",
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "Dynamics CRM Migration Toolkit",
    slug: "dynamics-crm-migration-toolkit",
    summary:
      "A SQL Server-centered migration toolkit for profiling, mapping, staging, loading, and validating Dynamics CRM or Dataverse-style data.",
    content:
      "The Dynamics CRM Migration Toolkit turns a messy CRM migration into a repeatable sequence of checks and transformations. It focuses on the operational path from source profiling to post-load validation rather than treating migration as a single export and import step.\n\nThe toolkit covers row counts, null-rate checks, duplicate detection, mapping documentation, SQL-backed mapping rules, staging transformations, value standardization, load patterns with insert and merge behavior, and validation queries for reconciliation and orphan detection.\n\nThe demo model uses simplified Dynamics-like entities for accounts, contacts, and opportunities, but the structure is designed around real scoping questions: source and target CRM, custom entities, history requirements, extraction method, identity rules, dedupe rules, and relationship handling.\n\nThis project documents a migration mindset: first understand the data, then agree on mappings, then transform into staging, then load with clear business keys, then validate what changed. That makes it useful for client-facing technical conversations as much as for implementation work.",
    category: "Data migration",
    techStack: ["SQL Server", "T-SQL", "Dynamics CRM", "Dataverse", "ETL"],
    featured: false,
    orderIndex: 4,
    githubUrl: "https://github.com/thisisirdi/Dynamics-CRM-Migration-Toolkit",
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "SQL Server CDC Incremental Replication Demo",
    slug: "sql-server-cdc-incremental-replication-demo",
    summary:
      "A production-style SQL Server demo for enabling CDC, simulating source changes, and supporting incremental replication workflows.",
    content:
      "This project demonstrates how SQL Server Change Data Capture can support incremental replication and ETL proof-of-concept work. It is designed as a practical lab for testing CDC behavior before introducing a dedicated replication or sync tool.\n\nThe demo walks through enabling CDC at the database and table level, maintaining modified timestamps for incremental loads, simulating inserts and updates, and verifying change rows through the CDC capture tables.\n\nThe useful context is customer onboarding and ETL validation. Teams often need a controlled source system where they can prove that changes are visible, ordered, and ready for downstream sync into another database or platform.\n\nAs a portfolio item, it shows fluency with SQL Server operational features, incremental load design, and the kind of technical demos that help customers understand data movement before a production rollout.",
    category: "Replication",
    techStack: ["SQL Server", "CDC", "T-SQL", "ETL", "CData Sync"],
    featured: false,
    orderIndex: 5,
    githubUrl:
      "https://github.com/thisisirdi/SQL-Server-CDC-Incremental-Replication-Demo",
    demoUrl: null,
    imageUrl: null,
  },
  {
    title: "Idea Parking Lot",
    slug: "idea-parking-lot",
    summary:
      "A compact Next.js app for capturing ideas, revisiting them later, scoring them with RICE, and enforcing clean status transitions.",
    content:
      "Idea Parking Lot is a small internal thinking tool for capturing ideas before they become projects. It is intentionally not a task manager; the product is designed around parking, reviewing, scoring, and moving ideas through a simple lifecycle.\n\nThe application supports fast title-first capture, optional descriptions, newest-first listing, detail pages, optional RICE inputs, server-computed RICE scores, and backend-enforced status transitions across inbox, parked, exploring, in progress, shipped, and archived states.\n\nThe engineering choices keep the app small but principled. Domain rules for scoring and status transitions live outside the UI, PostgreSQL persistence is handled through Prisma, and the codebase is shaped as a modular monolith so future auth, AI-assisted refinement, filtering, or SaaS packaging can be added without rewriting the core idea logic.\n\nThis project is useful as a product-thinking sample because it shows restraint. It solves one workflow clearly, keeps the backend as the source of truth for important rules, and avoids expanding into collaboration or task-management features before the core habit is proven.",
    category: "Productivity tool",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "RICE"],
    featured: false,
    orderIndex: 6,
    githubUrl: "https://github.com/thisisirdi/idea-parking-lot",
    demoUrl: null,
    imageUrl: null,
  },
];

async function main() {
  await prisma.project.deleteMany({
    where: {
      slug: {
        in: legacyProjectSlugs,
      },
    },
  });

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
