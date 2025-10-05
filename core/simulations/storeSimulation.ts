import { type RNG, type SimulationResults } from '../../types';
import { sampleDiscrete } from '../utils';

export const storeSimulation = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    const { NHA, CFD, CUA, PVU } = params;
    const llegadas = [0,1,2,3,4];
    const pLleg    = [0.2,0.2,0.2,0.2,0.2];
    const valuesA  = [0,1,2,3];
    const pArt     = [0.2,0.3,0.4,0.1];
    let TART=0;
    const log: string[] = [];

    for (let h=1; h<=NHA; h++){
        const cli = sampleDiscrete(rng, llegadas, pLleg);
        let vendidos=0;
        for (let c=0; c<cli; c++){
            vendidos += sampleDiscrete(rng, valuesA, pArt);
        }
        TART += vendidos;
        log.push(`Hora ${h}: llegaron ${cli} clientes, vendidos ${vendidos} artículos`);
    }
    
    const ingreso = TART*PVU;
    const costo   = TART*CUA + CFD;
    const GN = ingreso - costo;

    return {
        summary: {
            "Total vendidos": `${TART} un`,
            "Ingreso": `Bs ${ingreso.toFixed(2)}`,
            "Costo": `Bs ${costo.toFixed(2)}`,
            "Ganancia neta": `Bs ${GN.toFixed(2)}`
        },
        log
    }
};
