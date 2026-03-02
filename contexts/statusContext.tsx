"use client";

import { createContext, useContext, useState } from 'react';

const StatusContext = createContext({
  reportStatus: (name: string, success: boolean) => {},
  isAllLive: true
});

export const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [systems, setSystems] = useState<Record<string, boolean>>({});

  const reportStatus = (name: string, success: boolean) => {
    setSystems(prev => ({ ...prev, [name]: success }));
  };

  const isAllLive = Object.values(systems).length > 0 && Object.values(systems).every(v => v === true);

  return (
    <StatusContext.Provider value={{ reportStatus, isAllLive }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);