import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: number;
  description?: string;
}

const Slider: React.FC<SliderProps> = ({ label, id, value, description, ...props }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        {...props}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
      />
      {description && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
  );
};

export default Slider;
