// src/context/FetchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FetchContextType {
  globalLoading: boolean;
  globalError: string | null;
  setGlobalLoading: (loading: boolean) => void;
  setGlobalError: (error: string | null) => void;
}

const FetchContext = createContext<FetchContextType | undefined>(undefined);

export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  return (
    <FetchContext.Provider
      value={{ globalLoading, globalError, setGlobalLoading, setGlobalError }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetchContext must be used within a FetchProvider');
  }
  return context;
};
