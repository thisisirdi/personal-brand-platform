# Architecture

## Overview

This is a minimal Next.js App Router application for Irdi Duka's personal brand platform. The product direction is a hybrid personal brand: technical credibility, creative identity, project proof, education, onboarding, business thinking, and performance mindset.

V1 prioritizes a clean foundation over breadth. It includes public pages, database-managed projects, contact capture, and documented extension points.

## Runtime

- Next.js App Router handles routing, layouts, pages, and API routes.
- Server components load project content through Prisma.
- The contact form is a client component that posts to an API route.
- App runtime connects to Supabase Postgres through private `DATABASE_URL`.
- Prisma CLI migrations use private `DIRECT_URL` when present.
- Public Supabase client values live in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for future auth or storage work.
- Tailwind CSS handles styling.

## Pages

- `/` is the brand landing page.
- `/about` explains the hybrid brand story.
- `/experience` presents work modes and operator timeline.
- `/projects` lists published database projects.
- `/projects/[slug]` renders a project detail page.
- `/contact` renders the contact intake flow.

## Component Boundaries

- `Navbar` and `Footer` provide global layout.
- `Hero` creates the primary brand surface and visual operating-system motif.
- `SectionHeader` keeps section intros consistent.
- `ProjectCard` presents project records from Prisma.
- `ExperienceTimeline` renders structured static timeline data.
- `ContactForm` handles client-side validation state and form submission.

## Data Access

Project queries live in `lib/projects.ts`. This keeps Prisma access out of page components and makes it easier to add caching, admin filters, previews, or analytics enrichment later.

The Prisma singleton lives in `lib/prisma.ts`. This avoids creating a new client on every hot reload in development.

The public Supabase URL and publishable key do not grant Prisma database access. Runtime project reads and contact persistence require `DATABASE_URL`; migrations should use `DIRECT_URL`.

## Contact Flow

1. `ContactForm` validates input with the shared Zod schema.
2. The form posts JSON to `app/api/contact/route.ts`.
3. The API route validates again on the server.
4. Valid submissions are stored in the `Contact` table.
5. The API returns clean success or error states to the client.

## Analytics Boundary

PostHog is intentionally not implemented in V1. The app includes `lib/analytics.ts` as a no-op boundary. Current calls can stay in place and later route to PostHog capture calls without changing page or form logic.

## Not In V1

- Authentication
- PostHog implementation
- Blog
- Admin
- Services or freelance page
