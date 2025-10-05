import React from 'react';
import SeedController from '../common/SeedController';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC<{ onTitleClick: () => void }> = ({ onTitleClick }) => {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={onTitleClick} className="text-left transition-opacity hover:opacity-80">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Oráculo Estocástico
          </h1>
        </button>
        <div className="flex items-center gap-4">
          <SeedController />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;