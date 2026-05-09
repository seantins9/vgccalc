'use client';
import { useMemo } from 'react';
import { useCalcStore } from '@/lib/store';
import { calcAllMoves } from '@/lib/calc';
import { PokemonCard } from './PokemonCard';
import { FieldPanel } from './FieldPanel';
import { MoveSlot } from './MoveSlot';

export function Calculator() {
  const attacker = useCalcStore((s) => s.attacker);
  const defender = useCalcStore((s) => s.defender);
  const moves = useCalcStore((s) => s.moves);
  const field = useCalcStore((s) => s.field);
  const setAttacker = useCalcStore((s) => s.setAttacker);
  const setDefender = useCalcStore((s) => s.setDefender);
  const setAttackerEv = useCalcStore((s) => s.setAttackerEv);
  const setDefenderEv = useCalcStore((s) => s.setDefenderEv);
  const setAttackerBoost = useCalcStore((s) => s.setAttackerBoost);
  const setDefenderBoost = useCalcStore((s) => s.setDefenderBoost);
  const setMove = useCalcStore((s) => s.setMove);
  const setField = useCalcStore((s) => s.setField);
  const reset = useCalcStore((s) => s.reset);

  const results = useMemo(
    () => calcAllMoves(attacker, defender, field, moves),
    [attacker, defender, field, moves]
  );

  function swapSides() {
    // Swap attacker <-> defender wholesale
    const a = attacker;
    setAttacker(defender);
    setDefender(a);
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top action bar */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <FieldPanelWrapper field={field} setField={setField} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={swapSides}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:bg-[var(--panel-2)] px-3 py-2 text-sm font-medium transition-colors"
          >
            ⇅ Swap Sides
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:bg-[var(--panel-2)] px-3 py-2 text-sm font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Two pokemon cards */}
      <div className="grid lg:grid-cols-2 gap-4">
        <PokemonCard
          title="Attacker"
          value={attacker}
          onChange={setAttacker}
          onEvChange={setAttackerEv}
          onBoostChange={setAttackerBoost}
          accentColor="red"
        />
        <PokemonCard
          title="Defender"
          value={defender}
          onChange={setDefender}
          onEvChange={setDefenderEv}
          onBoostChange={setDefenderBoost}
          accentColor="blue"
        />
      </div>

      {/* Move slots */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
            Attacker Moves
          </h2>
          <span className="text-xs text-[var(--muted)]">
            HP: <span className="font-mono">{results[0]?.defenderHP ?? '—'}</span>
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {moves.map((mv, i) => (
            <MoveSlot
              key={i}
              index={i}
              moveName={mv}
              result={results[i]}
              onChange={(v) => setMove(i as 0 | 1 | 2 | 3, v)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FieldPanelWrapper({
  field,
  setField,
}: {
  field: ReturnType<typeof useCalcStore.getState>['field'];
  setField: ReturnType<typeof useCalcStore.getState>['setField'];
}) {
  return (
    <div className="flex-1 min-w-[280px]">
      <FieldPanel value={field} onChange={setField} />
    </div>
  );
}
