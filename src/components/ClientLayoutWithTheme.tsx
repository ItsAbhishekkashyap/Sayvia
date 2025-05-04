// src/components/ClientLayoutWithTheme.tsx
'use client';

import { useTheme } from "@/context/ThemeContext";
import { useSession } from "next-auth/react";
import LoadingSpinner from '@/components/LoadingSpinner';


// import Navbar from "@/components/Navbar";

export default function ClientLayoutWithTheme({

  
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();
  const { data: session, status } = useSession();
  if(status === "loading") return <LoadingSpinner/>

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* <Navbar /> */}
        {children}
      </div>
    </div>
  );
}
