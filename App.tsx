import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalSettingsProvider } from './contexts/GlobalSettingsContext';
import MainLayout from './layouts/MainLayout';
import ProblemSelection from './pages/ProblemSelection';
import Simulation from './pages/Simulation';
import { PROBLEMS } from './constants';

function App() {
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);

  const handleSelectProblem = (id: string) => {
    setActiveProblemId(id);
  };

  const handleGoBack = () => {
    setActiveProblemId(null);
  };

  const activeProblem = activeProblemId ? PROBLEMS.find(p => p.id === activeProblemId) : null;

  return (
    <ThemeProvider>
      <GlobalSettingsProvider>
        <MainLayout onTitleClick={handleGoBack}>
          <AnimatePresence mode="wait">
            {!activeProblem ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProblemSelection problems={PROBLEMS} onSelectProblem={handleSelectProblem} />
              </motion.div>
            ) : (
              <motion.div
                key="simulation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Simulation
                  problem={activeProblem}
                  problems={PROBLEMS}
                  onSelectProblem={handleSelectProblem}
                  onGoBack={handleGoBack}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </MainLayout>
      </GlobalSettingsProvider>
    </ThemeProvider>
  );
}

export default App;