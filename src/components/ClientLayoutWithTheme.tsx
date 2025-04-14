// src/components/ClientLayoutWithTheme.tsx
'use client';

import { useTheme } from "@/context/ThemeContext";
// import Navbar from "@/components/Navbar";

export default function ClientLayoutWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* <Navbar /> */}
        {children}
      </div>
    </div>
  );
}
