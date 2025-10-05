import React from 'react';
import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';

interface ProblemCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  layoutId: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, icon, onClick, layoutId }) => {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <motion.div
      layoutId={layoutId}
      ref={tiltRef}
      onClick={onClick}
      className="cursor-pointer p-6 border rounded-2xl shadow-lg transition-all duration-300 
                 bg-white/60 dark:bg-gray-800/60 
                 border-slate-200 dark:border-slate-700 
                 hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50
                 backdrop-blur-xl"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center gap-4 mb-4 text-blue-500">
        {icon}
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
      </div>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
};

export default ProblemCard;
