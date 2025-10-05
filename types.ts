import React from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type RNG = () => number;

export interface ProblemParameter {
  id: string;
  type: 'number' | 'slider';
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface SimulationResults {
  summary: { [key: string]: string | number };
  log: string[];
}

export interface ProblemDefinition {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  parameters: ProblemParameter[];
  simulationFunction: (params: { [key: string]: number }, rng: RNG) => SimulationResults;
}