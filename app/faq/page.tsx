import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about VGC Calc – the free Pokemon damage calculator for Gen 9, Champions, and VGC 2026 Reg M-A.",
  alternates: { canonical: "/faq" },
};

const faqs: Array<{ q: string; a: string }> = [
  {
    q: "What is VGC Calc?",
    a: "VGC Calc is a free Pokemon damage calculator built for Gen 9 – Scarlet & Violet, Pokemon Champions, and the VGC 2026 Reg M-A doubles format. Pick an attacker and defender, set EVs/IVs/nature/item/ability/Tera/weather/terrain, and read damage range, OHKO/2HKO odds, and a Smogon-style description for each move.",
  },
  {
    q: "How do I use it?",
    a: "Open the home page, search a Pokemon for each side, and tweak the four moves on the attacker. Stats default to a sensible Lvl 50 VGC spread (252/252/4) and you can hand-edit any EV, IV, or nature. The damage panel updates as you type – no submit button.",
  },
  {
    q: "Are the numbers accurate?",
    a: "Yes. All math is delegated to the open-source @smogon/calc library, the same engine that powers the official Smogon damage calculator. We update the dependency whenever upstream ships new mechanics or items. If a roll looks off, the bug is almost always in the upstream engine and should be reported there.",
  },
  {
    q: "How is this different from the Showdown calculator?",
    a: "Same engine, different focus. The Showdown calc is desktop-first, packed with every feature, and assumes you know the format. VGC Calc is mobile-first, defaults to VGC 2026 Reg M-A doubles at Lvl 50, loads in under a second, and trims advanced fields you don't need at a tournament table. Best results: keep both bookmarked.",
  },
  {
    q: "Is this site official or affiliated with Nintendo / Smogon?",
    a: "No. VGC Calc is an unofficial fan tool. It is not affiliated with, endorsed by, or sponsored by Nintendo, Game Freak, The Pokemon Company, or Smogon University. Pokemon and related properties belong to their respective owners.",
  },
  {
    q: "How is Tera type damage calculated?",
    a: "Pick a Tera type for the attacker. If the move's type matches the Tera type and the attacker's original type, you get the boosted 2× STAB; if it matches only the Tera type (not the original type), STAB is the standard 1.5×. The calculator handles Tera Stellar and the once-per-battle 1.2× bonus for non-STAB Stellar moves automatically.",
  },
  {
    q: "What is Reg M-A?",
    a: "Reg M-A is the official VGC 2026 ruleset. Doubles, Lvl 50, two restricted Pokemon allowed per team (Series M restricted list), and one paradox / sub-legend per team. The calculator's defaults already match this format so you can just pick mons and start typing.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes – mobile is the primary target. The layout reflows for narrow screens, the search inputs are big enough to tap, and the damage panel stays sticky so you can see numbers while you tweak EVs. There's no install, no account, and no cookie banner – just open the URL.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 prose prose-invert">
        <h1 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-2 text-[var(--muted)]">
          Quick answers about VGC Calc, accuracy, Tera, mobile, and the VGC 2026 format.
        </p>

        <div className="mt-8 space-y-6">
          {faqs.map((f) => (
            <section key={f.q}>
              <h2 className="text-base font-semibold text-[var(--text)]">{f.q}</h2>
              <p className="mt-1 text-[var(--muted)]">{f.a}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
