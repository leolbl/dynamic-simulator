import React from 'react';

interface SimulationLogProps {
  lines: string[];
}

const SimulationLog: React.FC<SimulationLogProps> = ({ lines }) => {
  return (
    <div className="flex-grow min-h-0 flex flex-col">
       <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200 flex-shrink-0">Log Detallado</h4>
      <div className="flex-grow min-h-0 max-h-96 p-4 bg-slate-100 dark:bg-slate-900/70 rounded-xl overflow-auto border border-slate-200 dark:border-slate-700">
        <pre className="text-xs font-fira-code text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
          {lines.join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default SimulationLog;