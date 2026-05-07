# Personal Brand Platform

Minimal personal brand platform for Irdi Duka, built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Postgres, and Prisma ORM.

The product is intentionally not a generic portfolio. It is a hybrid brand platform for technical systems, APIs, onboarding, education, business thinking, sports/performance mindset, and creative experimentation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase public project config through `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Supabase Postgres through private `DATABASE_URL` and `DIRECT_URL`
- Prisma ORM
- Zod contact form validation

PostHog, authentication, blog, admin, and services/freelance pages are not implemented in V1.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project and copy:

- Project URL
- Publishable key
- Pooled Postgres connection string
- Migration Postgres connection string

3. Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Set the public Supabase values and private database URLs:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_your_key"
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:5432/postgres"
```

The checked-in `.env.example` uses placeholders. Local `.env` and `.env.local` are ignored by git.

5. Generate the Prisma client:

```bash
npm run prisma:generate
```

6. Apply the schema to the database:

```bash
npm run prisma:migrate -- --name init
```

7. Seed the first three projects:

```bash
npm run db:seed
```

8. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:deploy
npm run db:seed
npm run db:studio
```

## Project Structure

```text
app/                  App Router pages and API routes
components/           Reusable UI and feature components
docs/                 Architecture, data model, roadmap, analytics notes
generated/prisma/     Generated Prisma client, ignored by git
lib/                  Prisma, validation, analytics boundary, data access
prisma/               Prisma schema and seed script
```

## V1 Pages

- `/`
- `/about`
- `/experience`
- `/projects`
- `/projects/[slug]`
- `/contact`

## Data Flow

- Projects are stored in Postgres and read through Prisma.
- Contact submissions are validated with Zod and saved through `app/api/contact/route.ts`.
- Prisma CLI uses `DIRECT_URL` when present. App runtime uses `DATABASE_URL`.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are reserved for future Supabase client features such as auth or storage.
- `lib/analytics.ts` provides a no-op event boundary so PostHog can be added later without scattering analytics calls across the app.
