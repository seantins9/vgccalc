'use client';
import { create } from 'zustand';
import type { PokemonInput, FieldInput } from './calc';

const DEFAULT_EVS = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
const DEFAULT_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
const DEFAULT_BOOSTS = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

// VGC 2026 Reg M-A enforces Level 50 for all Pokemon.
export const VGC_LEVEL = 50;

export const DEFAULT_ATTACKER: PokemonInput = {
  species: 'Charizard',
  level: VGC_LEVEL,
  ability: 'Blaze',
  item: 'Choice Specs',
  nature: 'Modest',
  teraType: 'Fire',
  teraActive: false,
  status: '',
  evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
  ivs: { ...DEFAULT_IVS },
  boosts: { ...DEFAULT_BOOSTS },
};

export const DEFAULT_DEFENDER: PokemonInput = {
  species: 'Venusaur',
  level: VGC_LEVEL,
  ability: 'Overgrow',
  item: 'Leftovers',
  nature: 'Bold',
  teraType: 'Grass',
  teraActive: false,
  status: '',
  evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
  ivs: { ...DEFAULT_IVS },
  boosts: { ...DEFAULT_BOOSTS },
};

export const DEFAULT_MOVES: [string, string, string, string] = [
  'Flamethrower',
  'Air Slash',
  'Focus Blast',
  'Solar Beam',
];

export const DEFAULT_FIELD: FieldInput = {
  weather: '',
  terrain: '',
};

interface CalcState {
  attacker: PokemonInput;
  defender: PokemonInput;
  moves: [string, string, string, string];
  field: FieldInput;
  setAttacker: (p: Partial<PokemonInput>) => void;
  setDefender: (p: Partial<PokemonInput>) => void;
  setAttackerEv: (k: keyof typeof DEFAULT_EVS, v: number) => void;
  setDefenderEv: (k: keyof typeof DEFAULT_EVS, v: number) => void;
  setAttackerBoost: (k: keyof typeof DEFAULT_BOOSTS, v: number) => void;
  setDefenderBoost: (k: keyof typeof DEFAULT_BOOSTS, v: number) => void;
  setMove: (idx: 0 | 1 | 2 | 3, mv: string) => void;
  setField: (f: Partial<FieldInput>) => void;
  reset: () => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  attacker: { ...DEFAULT_ATTACKER },
  defender: { ...DEFAULT_DEFENDER },
  moves: [...DEFAULT_MOVES],
  field: { ...DEFAULT_FIELD },
  setAttacker: (p) => set((s) => ({ attacker: { ...s.attacker, ...p } })),
  setDefender: (p) => set((s) => ({ defender: { ...s.defender, ...p } })),
  setAttackerEv: (k, v) =>
    set((s) => ({ attacker: { ...s.attacker, evs: { ...s.attacker.evs, [k]: v } } })),
  setDefenderEv: (k, v) =>
    set((s) => ({ defender: { ...s.defender, evs: { ...s.defender.evs, [k]: v } } })),
  setAttackerBoost: (k, v) =>
    set((s) => ({ attacker: { ...s.attacker, boosts: { ...s.attacker.boosts, [k]: v } } })),
  setDefenderBoost: (k, v) =>
    set((s) => ({ defender: { ...s.defender, boosts: { ...s.defender.boosts, [k]: v } } })),
  setMove: (idx, mv) =>
    set((s) => {
      const moves = [...s.moves] as [string, string, string, string];
      moves[idx] = mv;
      return { moves };
    }),
  setField: (f) => set((s) => ({ field: { ...s.field, ...f } })),
  reset: () =>
    set({
      attacker: { ...DEFAULT_ATTACKER },
      defender: { ...DEFAULT_DEFENDER },
      moves: [...DEFAULT_MOVES],
      field: { ...DEFAULT_FIELD },
    }),
}));
