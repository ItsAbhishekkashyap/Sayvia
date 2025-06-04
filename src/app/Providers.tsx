// app/Providers.tsx
'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { SessionProvider } from 'next-auth/react';
import LayoutWithTheme from '@/components/LayoutWithTheme';
import AuthProvider from '@/context/AuthProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      
      <AuthProvider>
      <LayoutWithTheme>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      </NextThemeProvider>
      </LayoutWithTheme>
      </AuthProvider>
      
    </SessionProvider>
  )
}