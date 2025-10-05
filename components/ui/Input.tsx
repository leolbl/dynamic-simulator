import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  description?: string;
}

const Input: React.FC<InputProps> = ({ label, id, description, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      />
       {description && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
  );
};

export default Input;
