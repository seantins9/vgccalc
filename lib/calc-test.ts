/**
 * Engine smoke test:
 *   pnpm tsx lib/calc-test.ts
 *
 * Verifies @smogon/calc Gen 9 single-target damage calc works end-to-end
 * before we wire any UI on top of it.
 */
import { Generations, calculate, Pokemon, Move, Field } from '@smogon/calc';

const gens = Generations.get(9);

const attacker = new Pokemon(gens, 'Charizard', {
  level: 100,
  nature: 'Modest',
  evs: { spa: 252, spe: 252, hp: 4 },
  ability: 'Blaze',
  item: 'Choice Specs',
  teraType: 'Fire',
});

const defender = new Pokemon(gens, 'Venusaur', {
  level: 100,
  nature: 'Bold',
  evs: { hp: 252, def: 252, spd: 4 },
  ability: 'Overgrow',
  item: 'Leftovers',
});

const move = new Move(gens, 'Flamethrower');
const field = new Field({});

const result = calculate(gens, attacker, defender, move, field);

console.log('---- Engine Test: Charizard Flamethrower vs Venusaur ----');
console.log('Damage range:', result.range());
console.log('Description:', result.desc());
console.log('KO chance:', result.kochance());
console.log('Full desc:', result.fullDesc());
