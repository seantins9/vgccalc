import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--panel)]/60 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <Link href="/" className="block">
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              Pokemon Damage Calculator
            </h1>
            <p className="text-[10px] sm:text-xs text-[var(--muted)] mt-0.5">
              Gen 9 · Champions · VGC 2026 Reg M-A
            </p>
          </Link>
        </div>
        <div className="text-[10px] sm:text-xs text-[var(--muted)] font-mono">
          Powered by{" "}
          <a
            href="https://github.com/smogon/damage-calc"
            className="hover:text-[var(--accent)] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @smogon/calc
          </a>
        </div>
      </div>
    </header>
  );
}
