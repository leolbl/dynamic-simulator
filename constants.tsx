import React from 'react';
import { type ProblemDefinition } from './types';
import { optimizeZ, diceGame1, diceGame2, storeSimulation, farmerSimulation, inventorySimulation } from './core/simulations/index';
// FIX: The 'Dice' icon does not exist in lucide-react. It has been replaced with 'Dice1' and 'Dices' for the respective games.
import { BarChart, Dice1, Dices, Store, Egg, Package, BrainCircuit } from 'lucide-react';

export const PROBLEMS: ProblemDefinition[] = [
  {
    id: 'optimize-z',
    title: 'Optimización de Z',
    description: 'Encontrar los valores óptimos de x1, x2, x3 que maximicen la función Z.',
    icon: <BrainCircuit className="w-8 h-8" />,
    parameters: [
      { id: 'iters', type: 'number', label: 'Iteraciones', defaultValue: 10000 },
      { id: 'showK', type: 'number', label: 'Mejores K resultados', defaultValue: 10 },
    ],
    simulationFunction: optimizeZ,
  },
  {
    id: 'dice-game-1',
    title: 'Juego de Dados 1/6',
    description: 'Simular un juego de dados donde se gana con 1 o 6.',
    // FIX: Use the 'Dice1' icon as 'Dice' is not a valid icon name.
    icon: <Dice1 className="w-8 h-8" />,
    parameters: [
      { id: 'n', type: 'number', label: 'Número de juegos', defaultValue: 100 },
    ],
    simulationFunction: diceGame1,
  },
  {
    id: 'dice-game-2',
    title: 'Dos Dados Suma 7',
    description: 'Simular un juego donde la casa paga si la suma es 7.',
    // FIX: Use the 'Dices' icon for the two-dice game, which is more appropriate.
    icon: <Dices className="w-8 h-8" />,
    parameters: [
      { id: 'n', type: 'number', label: 'Número de tiros', defaultValue: 100 },
    ],
    simulationFunction: diceGame2,
  },
  {
    id: 'store-sim',
    title: 'Simulación de Tienda',
    description: 'Calcular la ganancia de una tienda basado en llegadas y compras de clientes.',
    icon: <Store className="w-8 h-8" />,
    parameters: [
      { id: 'NHA', type: 'number', label: 'Horas abiertas', defaultValue: 8 },
      { id: 'CFD', type: 'number', label: 'Costo Fijo Diario (Bs)', defaultValue: 50 },
      { id: 'CUA', type: 'number', label: 'Costo por Artículo (Bs)', defaultValue: 3 },
      { id: 'PVU', type: 'number', label: 'Precio de Venta (Bs)', defaultValue: 5 },
    ],
    simulationFunction: storeSimulation,
  },
  {
    id: 'farmer-sim',
    title: 'Simulación de Granjero',
    description: 'Calcular el ingreso de un granjero por la venta de huevos y pollos.',
    icon: <Egg className="w-8 h-8" />,
    parameters: [
      { id: 'D', type: 'number', label: 'Días de simulación', defaultValue: 30 },
      { id: 'lam', type: 'number', label: 'λ (huevos/día)', defaultValue: 10 },
      { id: 'pRot', type: 'number', label: '% Rotos', defaultValue: 5 },
      { id: 'pPol', type: 'number', label: '% Nacen pollos', defaultValue: 70 },
      { id: 'pSur', type: 'number', label: '% Sobreviven', defaultValue: 90 },
      { id: 'Ph', type: 'number', label: 'Precio Huevo (Bs)', defaultValue: 1 },
      { id: 'Pp', type: 'number', label: 'Precio Pollo (Bs)', defaultValue: 10 },
    ],
    simulationFunction: farmerSimulation,
  },
  {
    id: 'inventory-sim',
    title: 'Inventario de Azúcar',
    description: 'Optimizar la gestión de inventario para maximizar ganancias.',
    icon: <Package className="w-8 h-8" />,
    parameters: [
      { id: 'dias', type: 'number', label: 'Días de simulación', defaultValue: 60 },
      { id: 'cap', type: 'number', label: 'Capacidad Almacén (Kg)', defaultValue: 1000 },
      { id: 'media', type: 'number', label: 'Demanda Media (Kg/día)', defaultValue: 100 },
      { id: 'R', type: 'number', label: 'Período Revisión (días)', defaultValue: 7 },
      { id: 'Lmin', type: 'number', label: 'Lead Time Mín (días)', defaultValue: 1 },
      { id: 'Lmax', type: 'number', label: 'Lead Time Máx (días)', defaultValue: 3 },
      { id: 'Corden', type: 'number', label: 'Costo Orden (Bs)', defaultValue: 50 },
      { id: 'Chold', type: 'number', label: 'Costo Mantenimiento (Bs/Kg/día)', defaultValue: 0.1 },
      { id: 'Cadq', type: 'number', label: 'Costo Adquisición (Bs/Kg)', defaultValue: 2 },
      { id: 'Precio', type: 'number', label: 'Precio Venta (Bs/Kg)', defaultValue: 4 },
    ],
    simulationFunction: inventorySimulation,
  },
];
