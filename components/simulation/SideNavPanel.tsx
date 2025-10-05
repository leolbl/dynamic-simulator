import React from 'react';
import { type ProblemDefinition } from '../../types';

interface SideNavPanelProps {
  problems: ProblemDefinition[];
  activeProblemId: string;
  onSelectProblem: (id: string) => void;
}

const SideNavPanel: React.FC<SideNavPanelProps> = ({ problems, activeProblemId, onSelectProblem }) => {
  return (
    <nav className="flex-shrink-0 w-20 bg-slate-100/50 dark:bg-slate-900/20 border-r border-slate-200 dark:border-slate-700 p-2 flex flex-col items-center gap-2 overflow-y-auto">
      {problems.map(p => (
        <button
          key={p.id}
          onClick={() => onSelectProblem(p.id)}
          title={p.title}
          className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 transform
            ${activeProblemId === p.id 
              ? 'bg-blue-600 text-white shadow-lg scale-105' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'
            }`}
          aria-label={`Select ${p.title}`}
        >
          {/* FIX: Explicitly cast `p.icon` to a ReactElement that accepts a `className` prop. This is necessary because TypeScript cannot infer the specific props from the general `React.ReactNode` type, even after the `isValidElement` check, which was causing the overload error for `React.cloneElement`. */}
          {React.isValidElement(p.icon) ? React.cloneElement(p.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" }) : p.icon}
        </button>
      ))}
    </nav>
  );
};

export default SideNavPanel;
