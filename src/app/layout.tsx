// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWithTheme from "@/components/LayoutWithTheme";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whispr✨",
  description: "Send anonymous messages to your friends!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider>
            <AuthProvider>
              <LayoutWithTheme>
                {children}
              </LayoutWithTheme>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  

  

