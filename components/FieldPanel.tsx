'use client';
import type { FieldInput } from '@/lib/calc';

const WEATHERS = [
  { value: '', label: 'None' },
  { value: 'Sun', label: 'Sun' },
  { value: 'Rain', label: 'Rain' },
  { value: 'Sand', label: 'Sand' },
  { value: 'Snow', label: 'Snow' },
  { value: 'Harsh Sunshine', label: 'Harsh Sunshine' },
  { value: 'Heavy Rain', label: 'Heavy Rain' },
];

const TERRAINS = [
  { value: '', label: 'None' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Grassy', label: 'Grassy' },
  { value: 'Misty', label: 'Misty' },
  { value: 'Psychic', label: 'Psychic' },
];

interface Props {
  value: FieldInput;
  onChange: (f: Partial<FieldInput>) => void;
}

export function FieldPanel({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5 shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
        Field
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
            Weather
          </div>
          <select
            value={value.weather}
            onChange={(e) => onChange({ weather: e.target.value })}
            className="text-sm"
            aria-label="Weather"
          >
            {WEATHERS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
            Terrain
          </div>
          <select
            value={value.terrain}
            onChange={(e) => onChange({ terrain: e.target.value })}
            className="text-sm"
            aria-label="Terrain"
          >
            {TERRAINS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
