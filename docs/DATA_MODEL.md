# Data Model

## Project

Projects are database-managed from day one. They power the project list and project detail pages.

```prisma
model Project {
  id         String   @id @default(uuid())
  title      String
  slug       String   @unique
  summary    String
  content    String
  category   String
  techStack  String[] @default([])
  status     String   @default("published")
  featured   Boolean  @default(false)
  orderIndex Int      @default(0)
  githubUrl  String?
  demoUrl    String?
  imageUrl   String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Notes

- `slug` is unique and drives `/projects/[slug]`.
- `status` allows draft and published flows later without changing routes.
- `featured` controls home page visibility.
- `orderIndex` keeps editorial ordering out of code.
- `techStack` uses a Postgres text array through Prisma.

## Contact

Contact submissions are stored for follow-up and future CRM or workflow integrations.

```prisma
model Contact {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  source    String?
  createdAt DateTime @default(now())
}
```

### Notes

- `source` identifies where the submission came from.
- Validation lives in `lib/validation/contact.ts`.
- Persistence requires a server-side `DATABASE_URL`; public Supabase client keys are not enough for Prisma writes.
- V1 does not include spam protection, rate limiting, or email delivery.

## Future Model: Post

Blog is intentionally deferred. A future `Post` model can be added without changing the existing project model.

```prisma
model Post {
  id          String    @id @default(uuid())
  title       String
  slug        String    @unique
  excerpt     String
  content     String
  status      String    @default("draft")
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```
