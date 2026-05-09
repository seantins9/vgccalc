import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact VGC Calc – send bug reports, feature requests, or feedback by email at hello@vgccalc.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 prose prose-invert">
        <h1 className="text-2xl font-bold tracking-tight">Contact</h1>

        <p className="mt-4 text-[var(--muted)]">
          The fastest way to reach us is email. We read every message – usually within a day
          or two.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Email</h2>
        <p className="text-[var(--muted)]">
          <a href="mailto:hello@vgccalc.com" className="underline hover:text-[var(--accent)]">
            hello@vgccalc.com
          </a>
        </p>

        <h2 className="mt-8 text-lg font-semibold">What to include</h2>
        <ul className="text-[var(--muted)] list-disc pl-5 space-y-1">
          <li>
            <strong>Bug report</strong>: which Pokemon / move / setup, what number you
            expected, what number we showed, and your browser + device.
          </li>
          <li>
            <strong>Feature request</strong>: what you want and what tournament / format you
            need it for.
          </li>
          <li>
            <strong>Data correction</strong>: a link to the upstream source (Bulbapedia,
            Smogon, Serebii) when possible.
          </li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold">Engine bugs</h2>
        <p className="text-[var(--muted)]">
          If a damage roll looks wrong, the issue is almost always in the upstream{" "}
          <a
            href="https://github.com/smogon/damage-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--accent)]"
          >
            <code>@smogon/calc</code>
          </a>{" "}
          engine – feel free to open an issue there as well.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
