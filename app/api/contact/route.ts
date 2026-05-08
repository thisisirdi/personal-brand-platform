import { NextResponse } from "next/server";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";
import { contactInputSchema } from "@/lib/validation/contact";

function getSourcePage(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return undefined;
  }

  const source = (body as { source?: unknown }).source;

  return typeof source === "string" && source.trim()
    ? source.trim()
    : undefined;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Send valid JSON.",
      },
      { status: 400 },
    );
  }

  const parsed = contactInputSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    await trackAnalyticsEvent("contact_failed", {
      reason: "validation",
      source_page: getSourcePage(body),
      status_code: 400,
      field_count: Object.keys(fieldErrors).length,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  if (!hasDatabaseUrl()) {
    await trackAnalyticsEvent("contact_failed", {
      reason: "missing_database_url",
      source_page: parsed.data.source,
      status_code: 503,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Contact storage is not configured yet.",
      },
      { status: 503 },
    );
  }

  try {
    const prisma = getPrisma();
    const contact = await prisma.contact.create({
      data: parsed.data,
    });

    await trackAnalyticsEvent("contact_submitted", {
      contact_id: contact.id,
      source_page: parsed.data.source,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Message received. Irdi will follow up soon.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to save contact message", error);

    await trackAnalyticsEvent("contact_failed", {
      reason: "database",
      source_page: parsed.data.source,
      status_code: 500,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "The message could not be saved. Please try again.",
      },
      { status: 500 },
    );
  }
}
