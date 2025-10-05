import { type RNG, type SimulationResults } from '../types';

// Utility Functions
const randInt = (rng: RNG, a: number, b: number) => a + Math.floor(rng() * (b - a + 1));
const expMean = (rng: RNG, mean: number) => -mean * Math.log(1 - rng());
const sampleDiscrete = (rng: RNG, values: number[], probs: number[]): number => {
  const u = rng();
  let acc = 0;
  for (let i = 0; i < values.length; i++) {
    acc += probs[i];
    if (u <= acc) return values[i];
  }
  return values[values.length - 1];
};
const poissonInv = (rng: RNG, lambda: number): number => {
  const u = rng();
  let k = 0;
  let p = Math.exp(-lambda);
  let c = p;
  while (u > c) {
    k++;
    p = p * lambda / k;
    c += p;
    if (k > 1000) break;
  }
  return k;
};
const dado = (rng: RNG) => 1 + Math.floor(rng() * 6);


// Problem 1: Optimize Z
export const optimizeZ = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
  const { iters, showK } = params;
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
  const shown = steps.slice(0, showK);

  return {
    summary: {
      "Mejor Z": best.Z.toFixed(4),
      "Mejor x1": best.x1.toFixed(4),
      "Mejor x2": best.x2,
      "Mejor x3": best.x3.toFixed(4),
    },
    log: shown.map(s => `#${s.i}: Z=${s.Z.toFixed(3)} | x1=${s.x1.toFixed(3)}  x2=${s.x2}  x3=${s.x3.toFixed(3)}`),
  };
};

// Problem 2: Dice 1/6
export const diceGame1 = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
  const { n } = params;
  let gan = 0, wins = 0;
  const log: string[] = [];

  for (let i = 1; i <= n; i++) {
    const r = dado(rng);
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

// Problem 3: Two Dice Sum 7
export const diceGame2 = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    const { n } = params;
    let casa = 0, ganaJugador = 0;
    const log: string[] = [];
    for (let i=1; i<=n; i++){
        const a = dado(rng), b = dado(rng), s = a+b;
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

// Problem 4: Store Simulation
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

// Problem 5: Farmer (Poisson)
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

// Problem 6: Inventory
export const inventorySimulation = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    const { dias, cap, media, R, Lmin, Lmax, Corden, Chold, Cadq, Precio } = params;
    let inv = cap, demandaInsat=0, ingreso=0, cPedidos=0, cMant=0, cAdq=0;
    let pedidoPendiente=0, llegaEnDia=0;
    const log: string[] = [];

    for (let d=1; d<=dias; d++){
        if (pedidoPendiente>0 && d===llegaEnDia){
            const recibible = Math.min(pedidoPendiente, cap - inv);
            inv += recibible;
            pedidoPendiente = 0;
        }
        
        let orderMessage = '';
        if (d%R===0){
            const aPedir = Math.max(0, cap - inv);
            if (aPedir>0){
                const lead = randInt(rng, Lmin, Lmax);
                pedidoPendiente = aPedir;
                llegaEnDia = d + lead;
                cPedidos += Corden;
                cAdq += aPedir*Cadq;
                orderMessage = ` | PEDIDO: ${aPedir.toFixed(2)}Kg (llega en ${lead} días)`;
            }
        }

        const dem = expMean(rng, media);
        const venta = Math.min(inv, dem);
        const falta = Math.max(0, dem - inv);
        inv -= venta;
        ingreso += venta*Precio;
        demandaInsat += falta;
        cMant += inv * Chold;

        const dailyStatus = `Día ${d}: vendido=${venta.toFixed(2)}Kg, faltante=${falta.toFixed(2)}Kg, inv=${inv.toFixed(2)}Kg`;
        log.push(dailyStatus + orderMessage);
    }
    
    const costoTotal = cPedidos + cMant + cAdq;
    const gananciaNeta = ingreso - costoTotal;

    return {
        summary: {
            "Ingreso ventas": `Bs ${ingreso.toFixed(2)}`,
            "Costo total": `Bs ${costoTotal.toFixed(2)}`,
            "Ganancia neta": `Bs ${gananciaNeta.toFixed(2)}`,
            "Demanda insatisfecha": `${demandaInsat.toFixed(2)} Kg`,
            "Costo pedidos": `Bs ${cPedidos.toFixed(2)}`,
            "Costo adquisición": `Bs ${cAdq.toFixed(2)}`,
            "Costo mantenimiento": `Bs ${cMant.toFixed(2)}`,
        },
        log
    }
};