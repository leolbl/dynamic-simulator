import React from 'react';
import { useGlobalSettings } from '../../contexts/GlobalSettingsContext';
import { RefreshCw } from 'lucide-react';

const SeedController: React.FC = () => {
  const { seedInputValue, setSeedInputValue, reseed } = useGlobalSettings();

  const handleReseed = () => {
    reseed(seedInputValue);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="seed-input" className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:block">Semilla:</label>
      <input
        id="seed-input"
        type="text"
        value={seedInputValue}
        onChange={(e) => setSeedInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleReseed()}
        placeholder="Semilla (opcional)"
        className="w-24 sm:w-32 px-3 py-1.5 bg-white/0 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
      <button
        onClick={handleReseed}
        className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        aria-label="Reseed RNG"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SeedController;