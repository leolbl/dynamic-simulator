import { type RNG } from '../types';

export const randInt = (rng: RNG, a: number, b: number) => a + Math.floor(rng() * (b - a + 1));

export const expMean = (rng: RNG, mean: number) => -mean * Math.log(1 - rng());

export const sampleDiscrete = (rng: RNG, values: number[], probs: number[]): number => {
  const u = rng();
  let acc = 0;
  for (let i = 0; i < values.length; i++) {
    acc += probs[i];
    if (u <= acc) return values[i];
  }
  return values[values.length - 1];
};

export const poissonInv = (rng: RNG, lambda: number): number => {
  const u = rng();
  let k = 0;
  let p = Math.exp(-lambda);
  let c = p;
  while (u > c) {
    k++;
    p = p * lambda / k;
    c += p;
    if (k > 1000) break; // safety break
  }
  return k;
};

export const rollDice = (rng: RNG) => 1 + Math.floor(rng() * 6);