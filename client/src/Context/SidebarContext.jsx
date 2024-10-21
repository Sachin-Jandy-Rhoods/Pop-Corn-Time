import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [progress, setprogress] = useState(0);

  return (
    <SidebarContext.Provider value={{ progress, setprogress }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
