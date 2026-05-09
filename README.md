# VGC Calc

Static Pokemon damage calculator (Gen 9 / Champions / VGC 2026 Reg M-A) built on
[`@smogon/calc`](https://github.com/smogon/damage-calc).

Live: <https://vgc-calc.pages.dev>

## Stack

- Next.js 16 App Router (static export, `output: 'export'`)
- TypeScript (strict)
- Tailwind CSS v4
- `@smogon/calc` engine
- Zustand for client state
- Cloudflare Pages for hosting

No DB, no auth, no server actions — 100% static.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm tsc --noEmit # type check
pnpm lint
pnpm build        # outputs to ./out
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` which deploys to
Cloudflare Pages project `vgc-calc`.

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN` — Pages Edit permission
- `CLOUDFLARE_ACCOUNT_ID`

Manual deploy from a clean working tree:

```bash
pnpm build
pnpm dlx wrangler pages deploy out --project-name=vgc-calc --branch=main
```

## Layout

- `app/page.tsx` — main calculator page
- `app/layout.tsx` — metadata, JSON-LD schema
- `app/sitemap.ts`, `app/robots.ts` — static SEO files
- `components/Calculator.tsx` — wires attacker / defender / moves / field
- `components/PokemonCard.tsx` — shared card for both sides
- `components/MoveSlot.tsx`, `components/FieldPanel.tsx`
- `components/Combobox.tsx` — searchable typeahead (1k+ species, 600+ items)
- `lib/calc.ts` — thin facade over `@smogon/calc`
- `lib/dex.ts` — single source of truth for dex data (species, moves, etc.)
- `lib/store.ts` — Zustand store with sensible Gen 9 defaults
- `lib/calc-test.ts` — engine smoke test, run via `pnpm tsx lib/calc-test.ts`

## License

Pokemon and related properties © Nintendo / Game Freak / The Pokemon Company.
This project is not affiliated with, endorsed by, or sponsored by any of those
entities.
