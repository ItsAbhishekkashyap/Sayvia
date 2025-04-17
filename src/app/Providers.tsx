// app/Providers.tsx
'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      </NextThemeProvider>
    </SessionProvider>
  )
}