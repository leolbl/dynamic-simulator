import React from 'react';
import { motion } from 'framer-motion';
import { type ProblemDefinition } from '../types';
import ProblemCard from '../components/common/ProblemCard';

interface ProblemSelectionProps {
  problems: ProblemDefinition[];
  onSelectProblem: (id: string) => void;
}

const ProblemSelection: React.FC<ProblemSelectionProps> = ({ problems, onSelectProblem }) => {
  return (
    <div className="space-y-8 py-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Elija una Simulación</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Seleccione un problema para configurar sus parámetros y ejecutar la simulación.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {problems.map((problem) => (
            <ProblemCard
            key={problem.id}
            {...problem}
            onClick={() => onSelectProblem(problem.id)}
            layoutId={`problem-card-${problem.id}`}
            />
        ))}
        </div>
    </div>
  );
};

export default ProblemSelection;
