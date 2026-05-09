'use client';
import { useMemo } from 'react';
import { Combobox } from './Combobox';
import { getMoves } from '@/lib/dex';
import type { CalcRow } from '@/lib/calc';
import { cn } from '@/lib/utils';

interface Props {
  index: number;
  moveName: string;
  result: CalcRow | null;
  onChange: (mv: string) => void;
}

function koColor(text: string): string {
  if (!text) return 'bg-[var(--panel-2)] text-[var(--muted)]';
  const t = text.toLowerCase();
  if (t === 'immune') return 'bg-slate-600 text-slate-200';
  if (t.includes('guaranteed ohko')) return 'bg-red-600 text-white';
  if (t.includes('ohko')) return 'bg-red-500/80 text-white';
  if (t.includes('guaranteed 2hko')) return 'bg-orange-600 text-white';
  if (t.includes('2hko')) return 'bg-orange-500/80 text-white';
  if (t.includes('3hko')) return 'bg-amber-600/80 text-white';
  if (t.includes('possible')) return 'bg-yellow-600/70 text-black';
  return 'bg-[var(--panel-2)] text-[var(--muted)]';
}

export function MoveSlot({ index, moveName, result, onChange }: Props) {
  const moves = useMemo(() => getMoves().map((m) => m.name), []);
  const moveData = useMemo(
    () => getMoves().find((m) => m.name === moveName),
    [moveName]
  );

  const pct = result
    ? result.immune
      ? '0%'
      : `${result.minPct.toFixed(1)} – ${result.maxPct.toFixed(1)}%`
    : '—';
  const range = result
    ? result.immune
      ? '0'
      : `${result.range[0]}–${result.range[1]}`
    : '—';

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-[var(--muted)] w-5">
          M{index + 1}
        </span>
        <div className="flex-1">
          <Combobox
            value={moveName}
            onChange={onChange}
            options={moves}
            placeholder="Move"
            allowEmpty
            emptyLabel="— Empty Slot —"
            ariaLabel={`Move slot ${index + 1}`}
          />
        </div>
        {moveData && moveData.type && (
          <span className={`type-badge type-${moveData.type}`}>{moveData.type}</span>
        )}
      </div>

      {moveData && moveData.bp > 0 && (
        <div className="text-[11px] text-[var(--muted)] mb-2 font-mono">
          BP {moveData.bp} · {moveData.category}
        </div>
      )}

      <div className="flex items-baseline gap-3 mb-1">
        <div className="text-2xl font-bold font-mono">{pct}</div>
        <div
          className={cn(
            'rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
            koColor(result?.koText ?? '')
          )}
        >
          {result?.koText || 'no calc'}
        </div>
      </div>
      <div className="text-[11px] text-[var(--muted)] font-mono mb-2">
        Damage: {range}
      </div>
      {result?.immune && (
        <p className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-2 break-words">
          No Effect — defender is immune to this move.
        </p>
      )}
      {result?.desc && !result.immune && (
        <p className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-2 break-words">
          {result.desc}
        </p>
      )}
    </div>
  );
}
