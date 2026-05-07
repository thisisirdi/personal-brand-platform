import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] uppercase text-teal-200">
            Irdi Duka
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-300">
            A personal brand platform for technical credibility, creative
            identity, data systems, onboarding, education, business thinking,
            and performance-minded experimentation.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-2 md:justify-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
