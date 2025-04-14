// src/app/dashboard/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Whispr✨",
  description: "Your private dashboard",
};

// ✅ Create a Client Component to use the hook
import ClientLayoutWithTheme from "@/components/ClientLayoutWithTheme"; // We'll make this next

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayoutWithTheme>{children}</ClientLayoutWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}


