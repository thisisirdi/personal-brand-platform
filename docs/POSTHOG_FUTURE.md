# PostHog Future Integration

PostHog is not implemented in V1. The app only reserves integration points so analytics can be added cleanly later.

## Current Boundary

`lib/analytics.ts` exports `trackAnalyticsEvent`. It is currently a no-op.

This keeps analytics calls centralized and avoids importing PostHog directly inside pages, components, or API routes.

## Candidate Events

- `project_viewed`
- `project_card_clicked`
- `contact_submitted`
- `contact_failed`
- `nav_clicked`
- `hero_cta_clicked`

## Future Client Strategy

When PostHog is added, create a client-side analytics provider in the root layout or a dedicated provider component. Keep initialization isolated from presentational components.

Recommended future files:

```text
lib/analytics.ts
components/analytics/AnalyticsProvider.tsx
components/analytics/TrackLink.tsx
```

## Future Server Strategy

Server-side events can be captured from route handlers or server actions. Avoid sending sensitive contact fields to analytics. For contact submissions, send metadata such as source and status, not message content or email.

## Privacy Notes

- Do not capture contact message bodies.
- Do not capture raw email addresses.
- Consider masking IP data and honoring consent requirements before production use.
- Keep analytics optional for local development.

## Implementation Sketch

Future implementation can preserve the existing public function:

```ts
export async function trackAnalyticsEvent(event, properties = {}) {
  if (!process.env.POSTHOG_KEY) {
    return;
  }

  // Initialize and capture through PostHog here.
}
```

This should happen in V2 or V3 after the product has meaningful events to measure.
