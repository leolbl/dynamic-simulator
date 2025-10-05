import React from 'react';

interface SummaryCardProps {
  data: { [key: string]: string | number };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  return (
    <div className="p-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
      <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Resumen</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <p className="text-xs text-slate-500 dark:text-slate-400">{key}</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
