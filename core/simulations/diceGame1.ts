import { type RNG, type SimulationResults } from '../../types';
import { rollDice } from '../utils';

export const diceGame1 = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
  const { n } = params;
  let gan = 0, wins = 0;
  const log: string[] = [];

  for (let i = 1; i <= n; i++) {
    const r = rollDice(rng);
    const g = (r === 1 || r === 6) ? 5 : -2;
    gan += g;
    if (g > 0) wins++;
    log.push(`Juego ${i}: salió ${r} → ${g > 0 ? '+' : ''}${g} Bs`);
  }

  return {
    summary: {
      "Ganancia total": `${gan.toFixed(2)} Bs`,
      "Promedio/juego": `${(gan / n).toFixed(4)} Bs`,
      "Éxitos": `${wins}/${n} (${(100 * wins / n).toFixed(1)}%)`,
    },
    log,
  };
};
