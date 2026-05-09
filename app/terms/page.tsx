import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for VGC Calc – the free, fan-made Pokemon damage calculator. The site is provided as-is, with no warranty, and is not affiliated with Nintendo or Smogon.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 prose prose-invert">
        <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-xs text-[var(--muted)] mt-1">Last updated: 2026-05-09</p>

        <h2 className="mt-8 text-lg font-semibold">Acceptance</h2>
        <p className="text-[var(--muted)]">
          By using VGC Calc you agree to these terms. If you do not agree, please stop using
          the site.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Service provided as-is</h2>
        <p className="text-[var(--muted)]">
          VGC Calc is a free, fan-made tool offered &quot;as is&quot; and &quot;as
          available&quot;, without any warranty of any kind, express or implied. We do our
          best to keep the calculator accurate, but we make no guarantee of completeness,
          uptime, or fitness for a particular purpose. Tournament decisions are your own – do
          not rely on this calculator as the final source of truth for any prize event.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Not affiliated with Nintendo or Smogon</h2>
        <p className="text-[var(--muted)]">
          Pokemon and related properties &copy; Nintendo / Game Freak / The Pokemon Company.
          VGC Calc is not affiliated with, endorsed by, or sponsored by any of those
          entities, nor by Smogon University. The damage engine is the open-source{" "}
          <a
            href="https://github.com/smogon/damage-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--accent)]"
          >
            <code>@smogon/calc</code>
          </a>{" "}
          project, used under its license.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Acceptable use</h2>
        <p className="text-[var(--muted)]">
          Don&apos;t scrape the site at high rates, don&apos;t try to break it, and don&apos;t
          rebrand and redistribute it as your own. Personal, non-commercial use is welcome.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Limitation of liability</h2>
        <p className="text-[var(--muted)]">
          To the maximum extent allowed by law, the maintainers of VGC Calc are not liable
          for any damages arising out of your use of the site, including but not limited to
          lost games, lost rating points, or lost time.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Changes</h2>
        <p className="text-[var(--muted)]">
          We may update these terms occasionally. Material changes will be reflected by the
          &quot;last updated&quot; date above.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
