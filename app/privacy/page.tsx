import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "VGC Calc privacy policy. We collect no personal data, set no advertising cookies, and use Google Analytics 4 with anonymized IP only.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 prose prose-invert">
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-[var(--muted)] mt-1">Last updated: 2026-05-09</p>

        <h2 className="mt-8 text-lg font-semibold">What we collect</h2>
        <p className="text-[var(--muted)]">
          VGC Calc does not require an account. We do not ask for, store, or sell any
          personal information. The damage calculator runs entirely in your browser – the
          Pokemon, moves, and stats you enter never leave your device.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Analytics</h2>
        <p className="text-[var(--muted)]">
          We use Google Analytics 4 to count page views and understand which features get
          used. IP addresses are anonymized at collection. We do not share or sell analytics
          data, and we do not run any advertising or remarketing tags.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Cookies</h2>
        <p className="text-[var(--muted)]">
          The only cookies the site sets are the ones required by Google Analytics 4 to
          deduplicate visitors. There are no advertising, social-media, or third-party
          tracking cookies. You can block them via your browser settings without breaking the
          calculator.
        </p>

        <h2 className="mt-8 text-lg font-semibold">Hosting</h2>
        <p className="text-[var(--muted)]">
          The site is statically generated and served by Cloudflare Pages. Cloudflare may
          collect minimal request logs (IP, user-agent, request URL) for security and
          performance reasons – these logs are subject to{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--accent)]"
          >
            Cloudflare&apos;s privacy policy
          </a>
          .
        </p>

        <h2 className="mt-8 text-lg font-semibold">Contact</h2>
        <p className="text-[var(--muted)]">
          Questions about privacy? Email{" "}
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
