import { NextResponse } from "next/server";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";
import { contactInputSchema } from "@/lib/validation/contact";

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
    await trackAnalyticsEvent("contact_failed", {
      reason: "validation",
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (!hasDatabaseUrl()) {
    await trackAnalyticsEvent("contact_failed", {
      reason: "missing_database_url",
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
      contactId: contact.id,
      source: parsed.data.source ?? "unknown",
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
