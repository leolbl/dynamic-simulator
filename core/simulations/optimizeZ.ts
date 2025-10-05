import { type RNG, type SimulationResults } from '../../types';
import { randInt } from '../utils';

export const optimizeZ = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
  const { iters } = params;
  let best = { x1: 0, x2: 0, x3: 0, Z: -Infinity };
  const steps: { i: number, x1: number, x2: number, x3: number, Z: number }[] = [];

  for (let i = 0; i < iters; i++) {
    let x1 = rng() * 10;
    let x2 = randInt(rng, 0, 100);
    let x3 = 1 + rng();
    if (x1 + x2 < 2) x2 = Math.ceil(2 - x1);
    x2 = Math.max(0, Math.round(x2));
    const Z = 2 * x1 + 3 * x2 - x3;
    steps.push({ i, x1, x2, x3, Z });
    if (Z > best.Z) best = { x1, x2, x3, Z };
  }

  steps.sort((a, b) => b.Z - a.Z);

  return {
    summary: {
      "Mejor Z": best.Z.toFixed(4),
      "Mejor x1": best.x1.toFixed(4),
      "Mejor x2": best.x2,
      "Mejor x3": best.x3.toFixed(4),
    },
    log: steps.map(s => `#${s.i}: Z=${s.Z.toFixed(3)} | x1=${s.x1.toFixed(3)}  x2=${s.x2}  x3=${s.x3.toFixed(3)}`),
  };
};