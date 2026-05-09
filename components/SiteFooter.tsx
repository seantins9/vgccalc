import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--panel)]/60 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-[11px] text-[var(--muted)] leading-relaxed space-y-3">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/" className="hover:text-[var(--accent)] underline">
            Home
          </Link>
          <Link href="/about/" className="hover:text-[var(--accent)] underline">
            About
          </Link>
          <Link href="/faq/" className="hover:text-[var(--accent)] underline">
            FAQ
          </Link>
          <Link href="/contact/" className="hover:text-[var(--accent)] underline">
            Contact
          </Link>
          <Link href="/privacy/" className="hover:text-[var(--accent)] underline">
            Privacy
          </Link>
          <Link href="/terms/" className="hover:text-[var(--accent)] underline">
            Terms
          </Link>
        </nav>
        <p>
          Pokemon and related properties &copy; Nintendo / Game Freak / The Pokemon Company.
          This site is not affiliated with, endorsed by, or sponsored by any of those entities.
          Damage formulas via the open-source{" "}
          <a
            href="https://github.com/smogon/damage-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @smogon/calc
          </a>{" "}
          project.
        </p>
      </div>
    </footer>
  );
}
