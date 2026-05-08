# PostHog Analytics Plan

This document defines the V1 product analytics foundation for the personal brand platform. The implementation keeps PostHog optional: when `NEXT_PUBLIC_POSTHOG_KEY` is missing, client and server analytics calls safely do nothing.

## Event Taxonomy

| Event | Trigger | Purpose |
| --- | --- | --- |
| `page_viewed` | App Router path/search change | Baseline traffic, content reach, funnel entry points |
| `hero_cta_clicked` | Homepage hero CTA click | Measures above-the-fold intent |
| `project_card_clicked` | Project card detail-link click | Measures project discovery and card effectiveness |
| `project_viewed` | `/projects/[slug]` detail render | Measures project content demand |
| `contact_form_started` | First focus or typed input in the contact form | Measures intent before submission |
| `contact_submitted` | Contact API saves a valid message | Measures conversion |
| `contact_failed` | Contact API rejects or fails to save a message | Measures form/API friction |
| `external_link_clicked` | GitHub/demo/external project link click | Measures outbound intent |

## Event Properties

| Event | Properties |
| --- | --- |
| `page_viewed` | `path`, `url`, optional `search`, optional `referrer` |
| `hero_cta_clicked` | `cta_label`, `destination`, `source_page`, optional `variant` |
| `project_card_clicked` | `project_slug`, `project_title`, `position`, `source_page` |
| `project_viewed` | `project_slug`, `project_title`, optional `category` |
| `contact_form_started` | optional `source_page` |
| `contact_submitted` | `contact_id`, optional `source_page` |
| `contact_failed` | `reason`, optional `source_page`, optional `status_code`, optional `field_count` |
| `external_link_clicked` | `href`, optional `label`, optional `source_page`, optional `destination_host`, optional `project_slug`, optional `project_title`, optional `link_type` |

## Funnel Plan

Primary conversion funnel:

1. `page_viewed` where `path = "/"`.
2. `hero_cta_clicked` where `destination = "/projects"` or `destination = "/contact"`.
3. `project_card_clicked`.
4. `project_viewed`.
5. `contact_form_started`.
6. `contact_submitted`.

Supporting analysis:

- Break down project discovery by `source_page`, `position`, `project_slug`, and `category`.
- Monitor `contact_failed` by `reason` and `status_code`.
- Compare `external_link_clicked` by `link_type` to see whether GitHub or demos drive stronger outbound interest.

## Feature Flag Ideas

- `homepage_hero_positioning`: vary the hero description between systems-focused, onboarding-focused, and creative-operator positioning.
- `projects_card_cta`: test "Read case" against "View project" on project cards.
- `contact_prompt_copy`: test direct collaboration language against problem-first language near the contact form.
- `project_external_links_visibility`: test showing GitHub/demo links on cards versus only on detail pages.

## Homepage Positioning Experiment

Hypothesis: A systems-focused homepage hero will drive more qualified project exploration than a broad personal-brand hero.

Experiment:

- Variant A: current broad positioning for "systems, story, performance."
- Variant B: sharper systems/operator positioning with the primary CTA unchanged.
- Primary metric: `hero_cta_clicked` rate for `destination = "/projects"`.
- Secondary metrics: `project_card_clicked`, `project_viewed`, `contact_form_started`, and `contact_submitted`.
- Guardrail: `contact_failed` rate should not increase materially.

## Privacy And Form-Field Masking

- Do not capture contact message body, name, raw email, or any free-text form value.
- Keep contact analytics limited to metadata such as `source_page`, `reason`, `status_code`, `field_count`, and generated `contact_id`.
- Keep PostHog optional for local development and previews by treating missing PostHog env vars as a no-op.
- Use PostHog field masking/session recording settings before enabling session replay on contact pages.
- Avoid identifying anonymous visitors until authentication or an explicit consent/identity flow exists.
