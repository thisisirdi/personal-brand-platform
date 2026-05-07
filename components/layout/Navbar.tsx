import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/82 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-neutral-950 text-white shadow-sm">
            <Sparkles size={18} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.12em] text-neutral-950 uppercase">
              Irdi Duka
            </span>
            <span className="block text-xs text-neutral-500">
              Systems. Story. Performance.
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
        >
          Start a thread
          <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
