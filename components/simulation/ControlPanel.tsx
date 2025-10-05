import React from 'react';
import { type ProblemDefinition } from '../../types';
import { ArrowLeft, Play } from 'lucide-react';
import Input from '../ui/Input';
import Slider from '../ui/Slider';

interface ControlPanelProps {
  problem: ProblemDefinition;
  params: { [key: string]: number };
  onParamsChange: (id: string, value: number) => void;
  onSubmit: () => void;
  onGoBack: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ problem, params, onParamsChange, onSubmit, onGoBack }) => {
  return (
    <div className="w-full lg:w-1/3 flex-shrink-0 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-6 h-6"/>
        </button>
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{problem.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{problem.description}</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
        {problem.parameters.map(param => (
          param.type === 'slider' ? (
            <Slider
              key={param.id}
              id={param.id}
              label={param.label}
              value={params[param.id]}
              onChange={(e) => onParamsChange(param.id, parseFloat(e.target.value))}
              min={param.min}
              max={param.max}
              step={param.step}
              description={param.description}
            />
          ) : (
            <Input
              key={param.id}
              id={param.id}
              label={param.label}
              type="number"
              value={params[param.id]}
              onChange={(e) => onParamsChange(param.id, parseFloat(e.target.value))}
              description={param.description}
            />
          )
        ))}
      </form>
      
      <div className="mt-6">
        <button 
          onClick={onSubmit}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-transform hover:scale-105"
        >
          <Play className="w-5 h-5"/>
          Ejecutar Simulación
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
