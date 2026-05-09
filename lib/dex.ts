/**
 * Single source of truth for all Gen 9 dex data we feed into UI selectors.
 * @smogon/calc's `Generations.get(9)` already gives us iterable species/moves/abilities/items/natures.
 */
import { Generations } from '@smogon/calc';
import type { TypeName } from '@smogon/calc/dist/data/interface';

export const GEN = 9 as const;
export const gens = Generations.get(GEN);

export interface SpeciesEntry {
  name: string;
  types: TypeName[];
  baseStats: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  abilities: string[];
}

export interface MoveEntry {
  name: string;
  type: TypeName;
  category: 'Physical' | 'Special' | 'Status';
  bp: number;
}

let _species: SpeciesEntry[] | null = null;
let _moves: MoveEntry[] | null = null;
let _abilities: string[] | null = null;
let _items: string[] | null = null;
let _natures: string[] | null = null;
let _types: TypeName[] | null = null;

export function getSpecies(): SpeciesEntry[] {
  if (_species) return _species;
  const out: SpeciesEntry[] = [];
  for (const s of gens.species) {
    if (!s.name || s.name.startsWith('(')) continue;
    out.push({
      name: s.name,
      types: [...s.types] as TypeName[],
      baseStats: {
        hp: s.baseStats.hp,
        atk: s.baseStats.atk,
        def: s.baseStats.def,
        spa: s.baseStats.spa,
        spd: s.baseStats.spd,
        spe: s.baseStats.spe,
      },
      abilities: s.abilities ? Object.values(s.abilities).filter(Boolean) as string[] : [],
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  _species = out;
  return out;
}

export function getMoves(): MoveEntry[] {
  if (_moves) return _moves;
  const out: MoveEntry[] = [];
  for (const m of gens.moves) {
    if (!m.name || m.name === '(No Move)') continue;
    out.push({
      name: m.name,
      type: m.type as TypeName,
      category: (m.category ?? 'Status') as 'Physical' | 'Special' | 'Status',
      bp: m.basePower ?? 0,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  _moves = out;
  return out;
}

export function getAbilities(): string[] {
  if (_abilities) return _abilities;
  const out: string[] = [];
  for (const a of gens.abilities) {
    if (a.name) out.push(a.name);
  }
  out.sort();
  _abilities = out;
  return out;
}

export function getItems(): string[] {
  if (_items) return _items;
  const out: string[] = [];
  for (const i of gens.items) {
    if (i.name) out.push(i.name);
  }
  out.sort();
  _items = out;
  return out;
}

export function getNatures(): string[] {
  if (_natures) return _natures;
  const out: string[] = [];
  for (const n of gens.natures) {
    if (n.name) out.push(n.name);
  }
  out.sort();
  _natures = out;
  return out;
}

export const TYPES: TypeName[] = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
];

export function getTypes(): TypeName[] {
  return _types ?? (_types = [...TYPES]);
}

export const WEATHERS = ['', 'Sun', 'Rain', 'Sand', 'Snow', 'Harsh Sunshine', 'Heavy Rain'] as const;
export const TERRAINS = ['', 'Electric', 'Grassy', 'Misty', 'Psychic'] as const;

export type Weather = typeof WEATHERS[number];
export type Terrain = typeof TERRAINS[number];
