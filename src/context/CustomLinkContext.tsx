// context/CustomLinkContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CustomLinkContextType = {
  customLink: string;
  setCustomLink: (link: string) => void;
};

const CustomLinkContext = createContext<CustomLinkContextType | undefined>(undefined);

type CustomLinkProviderProps = {
  children: ReactNode;
  initialLink?: string;
};

export const CustomLinkProvider = ({ children, initialLink = "" }: CustomLinkProviderProps) => {
  const [customLink, setCustomLink] = useState<string>(initialLink);

  return (
    <CustomLinkContext.Provider value={{ customLink, setCustomLink }}>
      {children}
    </CustomLinkContext.Provider>
  );
};

export const useCustomLink = (): CustomLinkContextType => {
  const context = useContext(CustomLinkContext);
  if (!context) {
    throw new Error("useCustomLink must be used within a CustomLinkProvider");
  }
  return context;
};

