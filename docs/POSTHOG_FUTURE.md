# PostHog Integration

PostHog is installed for client-side analytics in V1.

## Current Integration

- `posthog-js` is installed as an app dependency.
- `app/providers.tsx` initializes PostHog when `NEXT_PUBLIC_POSTHOG_KEY` is available.
- `app/PostHogPageView.tsx` captures App Router page views.
- `NEXT_PUBLIC_POSTHOG_HOST` defaults to the EU ingest host.

## Required Environment

```env
NEXT_PUBLIC_POSTHOG_KEY="phc_your_project_key"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
```

## Server-Side Boundary

`lib/analytics.ts` remains a no-op for server-side events. Route handlers already call this boundary for contact and project events, so future server-side PostHog capture can be added without changing those callers.

## Privacy Notes

- Do not capture contact message bodies.
- Do not capture raw email addresses.
- Keep contact route analytics limited to metadata such as source, status, and event type.
- Keep analytics optional for local development by allowing missing PostHog env vars.

## Candidate Future Events

- `project_card_clicked`
- `contact_submitted`
- `contact_failed`
- `nav_clicked`
- `hero_cta_clicked`
