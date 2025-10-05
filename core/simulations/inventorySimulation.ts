import { type RNG, type SimulationResults } from '../../types';
import { randInt, expMean } from '../utils';

interface PendingOrder {
  arrivesOn: number;
  quantity: number;
}

export const inventorySimulation = (params: { [key: string]: number }, rng: RNG): SimulationResults => {
    // Parameters from UI, matching the user's Python script's intent
    const { 
        dias,    // NMD
        cap,     // CAP
        media,   // LAMBDA_DEMANDA
        R,       // PREV
        Lmin, 
        Lmax,
        Corden,  // CO
        Chold,   // CA
        Cadq,    // CAD
        Precio   // PV
    } = params;

    // State and Endogenous Variables
    let inv = cap;                      // INV
    let pendingOrders: PendingOrder[] = []; // ORD_P
    let demandaInsat = 0;               // DI
    let ingreso = 0;                    // IT
    let cPedidos = 0;
    let cMant = 0;                      // Part of CT
    let cAdq = 0;
    const log: string[] = [];

    // Main Simulation Loop
    for (let d = 1; d <= dias; d++) {
        let dailyLog = `Día ${d}:`;

        // 1. Receive incoming orders at the start of the day
        const arrivedOrders = pendingOrders.filter(o => o.arrivesOn === d);
        if (arrivedOrders.length > 0) {
            let receivedQty = 0;
            for (const order of arrivedOrders) {
                // Respect warehouse capacity
                const receivable = Math.min(order.quantity, cap - inv);
                inv += receivable;
                receivedQty += receivable;
            }
            dailyLog += ` | LLEGADA: ${receivedQty.toFixed(2)}Kg`;
        }
        // Remove arrived orders from the pending list
        pendingOrders = pendingOrders.filter(o => o.arrivesOn !== d);

        // 2. Generate and satisfy demand
        const dem = expMean(rng, media);
        const venta = Math.min(inv, dem);
        const falta = Math.max(0, dem - inv);
        
        demandaInsat += falta;
        ingreso += venta * Precio;
        inv -= venta;
        
        dailyLog += ` | Demanda=${dem.toFixed(2)}Kg, Vendido=${venta.toFixed(2)}Kg`;

        // 3. Calculate daily holding cost on end-of-day inventory
        cMant += inv * Chold;

        // 4. Review inventory and place a new order if necessary at the end of the day
        if (d % R === 0) {
            const aPedir = Math.max(0, cap - inv);
            if (aPedir > 0) {
                // Costs are incurred when the order is placed
                cPedidos += Corden;
                cAdq += aPedir * Cadq;

                const lead = randInt(rng, Lmin, Lmax);
                const newOrder: PendingOrder = {
                    arrivesOn: d + lead,
                    quantity: aPedir
                };
                pendingOrders.push(newOrder);

                dailyLog += ` | PEDIDO: ${aPedir.toFixed(2)}Kg (llega en ${lead} días)`;
            }
        }
        
        dailyLog += ` | Inv. Final=${inv.toFixed(2)}Kg`;
        log.push(dailyLog);
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
    };
};
