'use client';
import { useMemo } from 'react';
import { Combobox } from './Combobox';
import type { PokemonInput } from '@/lib/calc';
import { getSpecies, getAbilities, getItems, getNatures, getTypes } from '@/lib/dex';
import { calcStat } from '@smogon/calc';

const STAT_KEYS = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const;
const STAT_LABELS: Record<typeof STAT_KEYS[number], string> = {
  hp: 'HP',
  atk: 'Atk',
  def: 'Def',
  spa: 'SpA',
  spd: 'SpD',
  spe: 'Spe',
};

const BOOST_OPTIONS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

interface Props {
  title: string;
  value: PokemonInput;
  onChange: (p: Partial<PokemonInput>) => void;
  onEvChange: (k: typeof STAT_KEYS[number], v: number) => void;
  onBoostChange: (k: 'atk' | 'def' | 'spa' | 'spd' | 'spe', v: number) => void;
  accentColor: string; // 'red' | 'blue'
}

export function PokemonCard({ title, value, onChange, onEvChange, onBoostChange, accentColor }: Props) {
  const species = useMemo(() => getSpecies(), []);
  const abilities = useMemo(() => getAbilities(), []);
  const items = useMemo(() => getItems(), []);
  const natures = useMemo(() => getNatures(), []);
  const types = useMemo(() => getTypes(), []);

  const speciesNames = useMemo(() => species.map((s) => s.name), [species]);
  const speciesData = useMemo(
    () => species.find((s) => s.name === value.species),
    [species, value.species]
  );

  const evTotal = STAT_KEYS.reduce((acc, k) => acc + value.evs[k], 0);

  // Live computed stats
  const computedStats = useMemo(() => {
    if (!speciesData) return null;
    const out: Record<string, number> = {};
    for (const k of STAT_KEYS) {
      out[k] = calcStat(
        9,
        k as 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe',
        speciesData.baseStats[k],
        value.ivs[k],
        value.evs[k],
        value.level,
        value.nature
      );
    }
    return out;
  }, [speciesData, value.ivs, value.evs, value.level, value.nature]);

  const accentRing = accentColor === 'red' ? 'ring-red-500/30' : 'ring-blue-500/30';
  const accentText = accentColor === 'red' ? 'text-red-400' : 'text-blue-400';

  return (
    <section
      className={`rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5 shadow-lg ring-1 ${accentRing}`}
      aria-label={title}
    >
      <header className="flex items-center justify-between mb-3">
        <h2 className={`text-sm font-semibold uppercase tracking-wider ${accentText}`}>{title}</h2>
        {speciesData && (
          <div className="flex gap-1.5">
            {speciesData.types.map((t) => (
              <span key={t} className={`type-badge type-${t}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Species + Level */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="col-span-2">
          <Label>Pokemon</Label>
          <Combobox
            value={value.species}
            onChange={(v) => {
              if (v === value.species) return;
              const s = species.find((x) => x.name === v);
              // Reset personalisation fields when swapping to a different
              // Pokemon; carrying over the previous Nature/EVs/IVs/etc.
              // produces nonsense results.
              onChange({
                species: v,
                ability: s?.abilities[0] ?? '',
                item: '',
                nature: 'Hardy',
                teraType: s?.types[0] ?? 'Normal',
                teraActive: false,
                status: '',
                evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
                ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
                boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
              });
            }}
            options={speciesNames}
            placeholder="Select Pokemon"
            ariaLabel={`${title} Pokemon`}
          />
        </div>
        <div>
          <Label>Level</Label>
          <input
            type="number"
            min={1}
            max={100}
            value={value.level}
            onChange={(e) => onChange({ level: Math.max(1, Math.min(100, +e.target.value || 0)) })}
            className="text-sm"
          />
        </div>
      </div>

      {/* Ability + Item + Nature */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <Label>Ability</Label>
          <Combobox
            value={value.ability ?? ''}
            onChange={(v) => onChange({ ability: v })}
            options={abilities}
            placeholder="Ability"
            allowEmpty
            ariaLabel={`${title} Ability`}
          />
        </div>
        <div>
          <Label>Item</Label>
          <Combobox
            value={value.item ?? ''}
            onChange={(v) => onChange({ item: v })}
            options={items}
            placeholder="Item"
            allowEmpty
            ariaLabel={`${title} Item`}
          />
        </div>
        <div>
          <Label>Nature</Label>
          <Combobox
            value={value.nature}
            onChange={(v) => onChange({ nature: v })}
            options={natures}
            ariaLabel={`${title} Nature`}
          />
        </div>
        <div>
          <Label>Status</Label>
          <select
            value={value.status ?? ''}
            onChange={(e) => onChange({ status: e.target.value as PokemonInput['status'] })}
            className="text-sm"
          >
            <option value="">Healthy</option>
            <option value="Burned">Burned</option>
            <option value="Paralyzed">Paralyzed</option>
            <option value="Poisoned">Poisoned</option>
            <option value="Badly Poisoned">Badly Poisoned</option>
            <option value="Asleep">Asleep</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>
      </div>

      {/* Tera */}
      <div className="grid grid-cols-3 gap-2 mb-3 items-end">
        <div className="col-span-2">
          <Label>Tera Type</Label>
          <Combobox
            value={value.teraType ?? ''}
            onChange={(v) => onChange({ teraType: v })}
            options={types}
            ariaLabel={`${title} Tera Type`}
          />
        </div>
        <label className="flex items-center gap-2 text-sm pb-1.5">
          <input
            type="checkbox"
            checked={value.teraActive}
            onChange={(e) => onChange({ teraActive: e.target.checked })}
            className="!w-auto"
          />
          <span>Terastallized</span>
        </label>
      </div>

      {/* EV / IV grid */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Stats
          </span>
          <span
            className={`text-xs font-mono ${
              evTotal > 510 ? 'text-[var(--bad)]' : 'text-[var(--muted)]'
            }`}
          >
            EVs {evTotal}/510
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 text-xs">
          <div className="col-span-1"></div>
          <div className="text-center text-[var(--muted)]">Base</div>
          <div className="text-center text-[var(--muted)]">EV</div>
          <div className="text-center text-[var(--muted)]">IV</div>
          <div className="text-center text-[var(--muted)]">Stat</div>
          <div></div>
          {STAT_KEYS.map((k) => (
            <div key={k} className="contents">
              <div className="font-semibold flex items-center">{STAT_LABELS[k]}</div>
              <div className="font-mono text-center text-[var(--muted)] flex items-center justify-center">
                {speciesData?.baseStats[k] ?? '-'}
              </div>
              <input
                type="number"
                min={0}
                max={252}
                step={4}
                value={value.evs[k]}
                onChange={(e) =>
                  onEvChange(k, Math.max(0, Math.min(252, +e.target.value || 0)))
                }
                className="text-xs px-1 py-0.5 text-center"
                aria-label={`${title} ${STAT_LABELS[k]} EV`}
              />
              <input
                type="number"
                min={0}
                max={31}
                value={value.ivs[k]}
                onChange={(e) =>
                  onChange({
                    ivs: {
                      ...value.ivs,
                      [k]: Math.max(0, Math.min(31, +e.target.value || 0)),
                    },
                  })
                }
                className="text-xs px-1 py-0.5 text-center"
                aria-label={`${title} ${STAT_LABELS[k]} IV`}
              />
              <div className="font-mono text-center font-semibold flex items-center justify-center">
                {computedStats?.[k] ?? '-'}
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat boosts */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-2)] p-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
          Stat Boosts
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {(['atk', 'def', 'spa', 'spd', 'spe'] as const).map((k) => (
            <div key={k}>
              <div className="text-[10px] text-center text-[var(--muted)] mb-0.5">
                {STAT_LABELS[k]}
              </div>
              <select
                value={value.boosts[k]}
                onChange={(e) => onBoostChange(k, +e.target.value)}
                className="text-xs px-1 py-1 text-center"
                aria-label={`${title} ${STAT_LABELS[k]} Boost`}
              >
                {BOOST_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b > 0 ? `+${b}` : b}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
      {children}
    </div>
  );
}
