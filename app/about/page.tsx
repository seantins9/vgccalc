import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "About VGC Calc – a free, fast Pokemon damage calculator for Gen 9 / Scarlet & Violet / VGC 2026 built on the open-source @smogon/calc engine.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 prose prose-invert">
        <h1 className="text-2xl font-bold tracking-tight">About VGC Calc</h1>

        <p className="mt-4 text-[var(--muted)]">
          VGC Calc is a free, fast, mobile-friendly Pokemon damage calculator built for the
          competitive Gen 9 metagame – Scarlet &amp; Violet, the new Pokemon Champions title,
          and VGC 2026 Regulation M-A.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Why we built this</h2>
        <p className="text-[var(--muted)]">
          The classic Showdown calculator is fantastic but desktop-first. We wanted a
          calculator that loads in under a second on a phone, fits in your pocket between
          rounds, and works without an account or any cookie banner. Set EVs, IVs, nature,
          item, ability, Tera type, weather, and terrain – read damage range, OHKO/2HKO odds,
          and a Smogon-style description on every move, instantly.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Engine &amp; data</h2>
        <p className="text-[var(--muted)]">
          All damage math runs through{" "}
          <a
            href="https://github.com/smogon/damage-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--accent)]"
          >
            <code>@smogon/calc</code>
          </a>
          , the same open-source engine that powers the official Smogon damage calculator. We
          stay on the latest release so newly-released Pokemon, moves, and items show up as
          soon as they ship upstream.
        </p>

        <h2 className="mt-8 text-lg font-semibold">What we are not</h2>
        <p className="text-[var(--muted)]">
          VGC Calc is an unofficial, fan-made tool. It is not affiliated with, endorsed by,
          or sponsored by Nintendo, Game Freak, The Pokemon Company, or Smogon. Pokemon and
          related properties belong to their respective owners.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Contact</h2>
        <p className="text-[var(--muted)]">
          Bug report or feature request? Reach us at{" "}
          <a href="mailto:hello@vgccalc.com" className="underline hover:text-[var(--accent)]">
            hello@vgccalc.com
          </a>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
