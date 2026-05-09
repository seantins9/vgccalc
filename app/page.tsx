import { Calculator } from '@/components/Calculator';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />

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

      <SiteFooter />
    </div>
  );
}
