"use client";

import { FormEvent, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useAnalytics } from "@/lib/useAnalytics";
import {
  contactInputSchema,
  type ContactInput,
} from "@/lib/validation/contact";

type FieldErrors = Partial<Record<keyof ContactInput, string[]>>;

type ContactApiResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: FieldErrors;
};

function getInitialForm(sourcePage: string): ContactInput {
  return {
    name: "",
    email: "",
    message: "",
    source: sourcePage,
  };
}

type ContactFormProps = {
  sourcePage?: string;
};

export function ContactForm({ sourcePage = "/contact" }: ContactFormProps) {
  const { capture } = useAnalytics();
  const hasTrackedStart = useRef(false);
  const [form, setForm] = useState<ContactInput>(() =>
    getInitialForm(sourcePage),
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [notice, setNotice] = useState("");

  function trackContactFormStarted() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    capture("contact_form_started", {
      source_page: sourcePage,
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setNotice("");
    setFieldErrors({});

    const parsed = contactInputSchema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      setNotice("Please fix the highlighted fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setStatus("error");
        setNotice(data.message);
        return;
      }

      setForm(getInitialForm(sourcePage));
      setStatus("success");
      setNotice(data.message);
    } catch {
      setStatus("error");
      setNotice("Something went wrong. Please try again.");
    }
  }

  function updateField(field: keyof ContactInput, value: string) {
    trackContactFormStarted();

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={trackContactFormStarted}
      className="rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6"
      noValidate
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-neutral-900"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name ? (
            <p id="name-error" className="mt-2 text-sm text-rose-700">
              {fieldErrors.name[0]}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email ? (
            <p id="email-error" className="mt-2 text-sm text-rose-700">
              {fieldErrors.email[0]}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-semibold text-neutral-900"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={7}
            className="mt-2 w-full resize-y rounded-md border border-black/15 bg-white px-3 py-2 text-sm leading-6 text-neutral-950 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? "message-error" : undefined
            }
          />
          {fieldErrors.message ? (
            <p id="message-error" className="mt-2 text-sm text-rose-700">
              {fieldErrors.message[0]}
            </p>
          ) : null}
        </div>
      </div>

      {notice ? (
        <div
          className={`mt-5 flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${
            status === "success"
              ? "border-teal-700/20 bg-teal-50 text-teal-900"
              : "border-rose-700/20 bg-rose-50 text-rose-900"
          }`}
          role="status"
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0" size={18} />
          )}
          <span>{notice}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400 sm:w-auto"
      >
        <Send size={16} />
        {status === "sending" ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
