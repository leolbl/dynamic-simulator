import React, { createContext, useState, useMemo, useContext, useCallback, useEffect } from 'react';
import { type RNG } from '../types';
import { mulberry32 } from '../core/rng';

interface GlobalSettingsContextType {
  seed: number;
  seedInputValue: string;
  setSeedInputValue: (value: string) => void;
  reseed: (newSeed?: number | string) => RNG;
  rng: RNG;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined);

export const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seed, setSeed] = useState<number>(Date.now() >>> 0);
  const [seedInputValue, setSeedInputValue] = useState<string>(seed.toString());

  useEffect(() => {
    // Sync input value if seed is changed programmatically (e.g., by reseed())
    setSeedInputValue(seed.toString());
  }, [seed]);

  const rng = useMemo(() => mulberry32(seed), [seed]);

  const reseed = useCallback((newSeedValue?: number | string): RNG => {
    const s = (newSeedValue === '' || newSeedValue === undefined || newSeedValue === null)
      ? (Date.now() >>> 0)
      : (Number(newSeedValue) >>> 0);
    setSeed(s);
    return mulberry32(s);
  }, []);
  
  const value = useMemo(() => ({ seed, seedInputValue, setSeedInputValue, reseed, rng }), [seed, seedInputValue, reseed, rng]);

  return <GlobalSettingsContext.Provider value={value}>{children}</GlobalSettingsContext.Provider>;
};

export const useGlobalSettings = (): GlobalSettingsContextType => {
  const context = useContext(GlobalSettingsContext);
  if (context === undefined) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
};