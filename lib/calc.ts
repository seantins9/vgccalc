/**
 * Thin facade around @smogon/calc so React components don't import the engine directly.
 * Inputs are plain serializable objects that come straight from our Zustand store.
 */
import { calculate, Pokemon, Move, Field } from '@smogon/calc';
import type { TypeName, StatusName } from '@smogon/calc/dist/data/interface';
import { gens } from './dex';

export interface PokemonInput {
  species: string;
  level: number;
  ability?: string;
  item?: string;
  nature: string;
  teraType?: string;
  teraActive: boolean;
  status?: StatusName | '';
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  boosts: { atk: number; def: number; spa: number; spd: number; spe: number };
}

export interface FieldInput {
  weather: string; // '' | 'Sun' | 'Rain' | 'Sand' | 'Snow' | 'Harsh Sunshine' | 'Heavy Rain'
  terrain: string; // '' | 'Electric' | 'Grassy' | 'Misty' | 'Psychic'
}

export interface CalcRow {
  moveName: string;
  range: [number, number];
  desc: string;
  koText: string;
  defenderHP: number;
  minPct: number;
  maxPct: number;
  immune?: boolean;
}

function buildPokemon(input: PokemonInput): Pokemon {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opts: any = {
    level: input.level,
    nature: input.nature,
    evs: input.evs,
    ivs: input.ivs,
    boosts: { ...input.boosts, hp: 0 },
  };
  if (input.ability) opts.ability = input.ability;
  if (input.item) opts.item = input.item;
  if (input.teraActive && input.teraType) {
    opts.teraType = input.teraType as TypeName;
  }
  if (input.status) opts.status = input.status;
  return new Pokemon(gens, input.species, opts);
}

export function calcMove(
  attacker: PokemonInput,
  defender: PokemonInput,
  field: FieldInput,
  moveName: string
): CalcRow | null {
  if (!moveName) return null;
  try {
    const a = buildPokemon(attacker);
    const d = buildPokemon(defender);
    const m = new Move(gens, moveName);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldOpts: any = {};
    if (field.weather) fieldOpts.weather = field.weather;
    if (field.terrain) fieldOpts.terrain = field.terrain;
    const f = new Field(fieldOpts);

    const r = calculate(gens, a, d, m, f);
    const range = r.range();
    const defenderHP = d.maxHP();
    const minPct = (range[0] / defenderHP) * 100;
    const maxPct = (range[1] / defenderHP) * 100;

    // When the move is immune (damage = 0), @smogon/calc throws from
    // kochance()/fullDesc() with "damage[damage.length - 1] === 0.".
    // Treat that as an Immune result rather than surfacing the raw error.
    const isImmune = range[1] === 0;
    if (isImmune) {
      return {
        moveName,
        range: [0, 0],
        desc: '',
        koText: 'Immune',
        defenderHP,
        minPct: 0,
        maxPct: 0,
        immune: true,
      };
    }

    let desc = '';
    let koText = '';
    try {
      desc = r.fullDesc();
    } catch (descErr) {
      const msg = (descErr as Error).message ?? '';
      if (msg.includes('damage[damage.length - 1] === 0')) {
        return {
          moveName,
          range: [0, 0],
          desc: '',
          koText: 'Immune',
          defenderHP,
          minPct: 0,
          maxPct: 0,
          immune: true,
        };
      }
      desc = '';
    }
    try {
      koText = r.kochance().text;
    } catch (koErr) {
      const msg = (koErr as Error).message ?? '';
      if (msg.includes('damage[damage.length - 1] === 0')) {
        return {
          moveName,
          range: [0, 0],
          desc: '',
          koText: 'Immune',
          defenderHP,
          minPct: 0,
          maxPct: 0,
          immune: true,
        };
      }
      koText = '';
    }

    return {
      moveName,
      range: [range[0], range[1]],
      desc,
      koText,
      defenderHP,
      minPct,
      maxPct,
    };
  } catch (err) {
    const msg = (err as Error).message ?? '';
    if (msg.includes('damage[damage.length - 1] === 0')) {
      return {
        moveName,
        range: [0, 0],
        desc: '',
        koText: 'Immune',
        defenderHP: 0,
        minPct: 0,
        maxPct: 0,
        immune: true,
      };
    }
    return {
      moveName,
      range: [0, 0],
      desc: `Error: ${msg}`,
      koText: '',
      defenderHP: 0,
      minPct: 0,
      maxPct: 0,
    };
  }
}

export function calcAllMoves(
  attacker: PokemonInput,
  defender: PokemonInput,
  field: FieldInput,
  moves: string[]
): (CalcRow | null)[] {
  return moves.map((mv) => calcMove(attacker, defender, field, mv));
}
