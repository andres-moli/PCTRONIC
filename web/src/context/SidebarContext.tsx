// SidebarContext.tsx
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext({
  isCollapsed: true,
  setIsCollapsed: (value: boolean) => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
