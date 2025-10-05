import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import { useTheme } from '../contexts/ThemeContext';
import InteractiveParticles from '../components/layout/InteractiveParticles';

const MainLayout: React.FC<{ children: React.ReactNode; onTitleClick: () => void; }> = ({ children, onTitleClick }) => {
  const { theme } = useTheme();

  return (
    <div className={`relative min-h-screen w-full flex flex-col transition-colors duration-500 text-slate-800 dark:text-slate-200`}>
       {/* Solid background color layer, behind everything else */}
       <div className="absolute inset-0 -z-50 bg-white dark:bg-slate-950" />

       {/* Animated decorative background with blurred gradients */}
       <div className="absolute inset-0 -z-30 h-full w-full overflow-hidden">
          <motion.div
            className="absolute h-1/2 w-1/2 rounded-full bg-blue-400/20 dark:bg-blue-600/20 opacity-40 blur-3xl"
            initial={{ x: '-25%', y: '-25%' }}
            animate={{
              x: ['-25%', '125%', '-25%'],
              y: ['-25%', '75%', '-25%'],
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 40,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute h-1/2 w-1/2 rounded-full bg-sky-400/20 dark:bg-sky-600/20 opacity-40 blur-3xl"
            initial={{ x: '125%', y: '75%' }}
            animate={{
              x: ['125%', '-25%', '125%'],
              y: ['75%', '-25%', '75%'],
              scale: [1, 0.8, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 45,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 5,
            }}
          />
       </div>
       
       <InteractiveParticles />

      <Header onTitleClick={onTitleClick} />
      <main className="flex-grow container mx-auto px-4 w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;