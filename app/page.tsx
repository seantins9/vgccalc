import { Calculator } from '@/components/Calculator';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--panel)]/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              Pokemon Damage Calculator
            </h1>
            <p className="text-[10px] sm:text-xs text-[var(--muted)] mt-0.5">
              Gen 9 · Champions · VGC 2026 Reg M-A
            </p>
          </div>
          <div className="text-[10px] sm:text-xs text-[var(--muted)] font-mono">
            Powered by{' '}
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Calculator />

        <section className="mt-10 prose prose-invert max-w-none text-sm text-[var(--muted)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text)]">
            About this Pokemon Damage Calculator
          </h2>
          <p>
            This is a free Gen 9 Pokemon damage calculator covering Scarlet &amp; Violet,
            the new Champions title, and VGC 2026 Reg M-A. Pick any attacker and defender,
            tweak EVs / IVs / nature / item / ability, set a Tera type, and the calculator
            shows damage range, OHKO/2HKO probability, and a Smogon-style description for
            each of the four moves.
          </p>
          <p>
            Calculations use the open-source{' '}
            <a
              href="https://github.com/smogon/damage-calc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--accent)]"
            >
              @smogon/calc
            </a>{' '}
            engine — the same engine that powers the Showdown damage calculator.
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--panel)]/60 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-[11px] text-[var(--muted)] leading-relaxed">
          Pokemon and related properties © Nintendo / Game Freak / The Pokemon Company.
          This site is not affiliated with, endorsed by, or sponsored by any of those entities.
          Damage formulas via the open-source{' '}
          <a
            href="https://github.com/smogon/damage-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @smogon/calc
          </a>{' '}
          project.
        </div>
      </footer>
    </div>
  );
}
