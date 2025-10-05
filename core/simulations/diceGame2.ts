import { type RNG, type SimulationResults } from '../../types';
import { rollDice } from '../utils';

export const diceGame2 = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    const { n } = params;
    let casa = 0, ganaJugador = 0;
    const log: string[] = [];
    for (let i=1; i<=n; i++){
        const a = rollDice(rng), b = rollDice(rng), s = a+b;
        let varCasa = (s === 7) ? -5 : 2;
        if (s === 7) ganaJugador++;
        casa += varCasa;
        log.push(`Tiro ${i}: ${a}+${b}=${s} → ${varCasa >= 0?'+':''}${varCasa} Bs para la casa`);
    }

    return {
        summary: {
            "Ganancia neta de la casa": `${casa.toFixed(2)} Bs`,
            "Juegos gana jugador": `${ganaJugador}/${n}`,
            "% Gana la casa": `${(100*(n-ganaJugador)/n).toFixed(1)}%`
        },
        log
    }
};
