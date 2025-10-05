import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ProblemDefinition, type SimulationResults } from '../types';
import ControlPanel from '../components/simulation/ControlPanel';
import ResultsPanel from '../components/results/ResultsPanel';
import { useGlobalSettings } from '../contexts/GlobalSettingsContext';
import SideNavPanel from '../components/simulation/SideNavPanel';

interface SimulationProps {
  problem: ProblemDefinition;
  problems: ProblemDefinition[];
  onSelectProblem: (id: string) => void;
  onGoBack: () => void;
}

const Simulation: React.FC<SimulationProps> = ({ problem, problems, onSelectProblem, onGoBack }) => {
  const { reseed, seedInputValue } = useGlobalSettings();

  const getInitialParams = useCallback(() => {
    return problem.parameters.reduce((acc, param) => {
      acc[param.id] = param.defaultValue;
      return acc;
    }, {} as { [key: string]: number });
  }, [problem]);
  
  const [params, setParams] = useState<{ [key: string]: number }>(getInitialParams());
  const [results, setResults] = useState<SimulationResults | null>(null);

  useEffect(() => {
    setParams(getInitialParams());
    setResults(null);
  }, [problem.id, getInitialParams]);

  const handleParamsChange = useCallback((id: string, value: number) => {
    setParams(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    // 1. Reseed with the current input value and get the RNG for this run.
    const runRng = reseed(seedInputValue);
    
    // 2. Execute the simulation with the new RNG.
    const simulationResults = problem.simulationFunction(params, runRng);
    setResults(simulationResults);

    // 3. Generate a new random seed for the next run.
    reseed();
  }, [params, problem, reseed, seedInputValue]);

  return (
    <div className="h-full w-full flex flex-col py-2">
        <motion.div 
            layoutId={`problem-card-${problem.id}`}
            className="w-full flex-grow flex flex-row gap-0 border rounded-2xl shadow-2xl
                       bg-white/70 dark:bg-gray-800/70 
                       border-slate-200 dark:border-slate-700 
                       backdrop-blur-xl overflow-hidden"
        >
          <SideNavPanel
            problems={problems}
            activeProblemId={problem.id}
            onSelectProblem={onSelectProblem}
          />
          {/* This container now uses flexbox to strictly manage its children's height */}
          <div className="flex-grow w-full p-6 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
                {/* This motion.div now grows to fill the container and is allowed to shrink */}
                <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="w-full flex-grow flex flex-col lg:flex-row gap-8 min-h-0"
                >
                    <ControlPanel
                        problem={problem}
                        params={params}
                        onParamsChange={handleParamsChange}
                        onSubmit={handleSubmit}
                        onGoBack={onGoBack}
                    />
                    <div className="flex-grow w-full lg:w-2/3 flex flex-col min-h-0 lg:min-h-[65vh]">
                        <ResultsPanel results={results} />
                    </div>
                </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
    </div>
  );
};

export default Simulation;