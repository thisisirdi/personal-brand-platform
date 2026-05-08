import type { Metadata } from "next";
import { Mail, MessageSquareText, Send } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Irdi Duka about systems, onboarding, APIs, education, or creative technical work.",
};

const contactReasons = [
  {
    title: "Technical systems",
    body: "Data models, APIs, documentation, implementation, and operational clarity.",
    icon: MessageSquareText,
  },
  {
    title: "Product and onboarding",
    body: "Customer activation, enablement, internal tools, and success signals.",
    icon: Send,
  },
  {
    title: "Creative experiments",
    body: "Builder notes, education ideas, performance systems, and platform feedback.",
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Contact"
        title="Start with the problem, context, or idea."
        description="Use the form for technical work, platform feedback, collaboration ideas, or anything that belongs at the intersection of systems, education, and creative operation."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeader
              eyebrow="Signal intake"
              title="A simple contact flow backed by Postgres."
              description="Messages are validated, saved through the API route, and ready for future routing, CRM sync, or analytics events."
            />

            <div className="mt-8 grid gap-4">
              {contactReasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <article
                    key={reason.title}
                    className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-teal-50 text-teal-700">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="font-semibold text-neutral-950">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          {reason.body}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <ContactForm sourcePage="/contact" />
        </div>
      </section>
    </>
  );
}
