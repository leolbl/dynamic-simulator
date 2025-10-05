import { type RNG, type SimulationResults } from '../../types';
import { poissonInv } from '../utils';

export const farmerSimulation = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    const { D, lam, pRot, pPol, pSur, Ph, Pp } = params;
    let puestos=0, rotos=0, pollos=0, pollosMuertos=0, huevosVend=0;
    const log: string[] = [];

    for (let d=1; d<=D; d++){
        const n = poissonInv(rng, lam);
        puestos += n;
        const r = Math.round(n*(pRot/100));
        const nacen = Math.round((n-r)*(pPol/100));
        const quedanHuevos = (n - r - nacen);
        const mueren = Math.round(nacen*(1-(pSur/100)));
        const vivos  = nacen - mueren;
        rotos += r; pollos += vivos; pollosMuertos += mueren; huevosVend += quedanHuevos;
        log.push(`Día ${d}: puestos=${n}, rotos=${r}, huevos vend=${quedanHuevos}, pollos vivos=${vivos}, muertos=${mueren}`);
    }
    
    const ingreso = huevosVend*Ph + pollos*Pp;

    return {
        summary: {
            "Huevos puestos": puestos,
            "Huevos rotos": rotos,
            "Huevos vendidos": huevosVend,
            "Pollos vendidos": pollos,
            "Ingreso total": `Bs ${ingreso.toFixed(2)}`
        },
        log
    }
};
