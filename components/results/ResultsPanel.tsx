import React from 'react';
import { type SimulationResults } from '../../types';
import SummaryCard from './SummaryCard';
import SimulationLog from './SimulationLog';
import { Bot } from 'lucide-react';

interface ResultsPanelProps {
  results: SimulationResults | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-100/50 dark:bg-slate-800/20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
        <Bot className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Esperando resultados</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Configure los parámetros y ejecute la simulación para ver los resultados aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 flex-grow min-h-0">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex-shrink-0">Resultados de la Simulación</h3>
      <div className="flex-shrink-0">
        <SummaryCard data={results.summary} />
      </div>
      <SimulationLog lines={results.log} />
    </div>
  );
};

export default ResultsPanel;