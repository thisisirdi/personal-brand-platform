import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.16em] text-teal-700 uppercase">
          Not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-neutral-950">
          This page is not available.
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          The page may have moved, or the project may not be published.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>
      </div>
    </section>
  );
}
