// src/app/dashboard/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Dashboard | Sayvia✨",
//   description: "Your private dashboard",
//   icons: {
//     icon: "/chat.svg", 

//   }
// };

export const metadata = {
  title: 'Sayvia - Anonymous Message App | Share Honestly',
  description: 'Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.',
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
  openGraph: {
    title: 'Sayvia',
    description: 'Anonymous message platform.',
    url: 'https://sayvia.in',
    siteName: 'Sayvia',
    icons: {
          icon: "/chat.svg", 
      
        },
    images: [
      {
        url: 'sayviaimg.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://sayvia.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayvia',
    description: 'Send anonymous messages securely.',
    images: ['https://sayvia.in/og-image.png'],
  },
};


//  Create a Client Component to use the hook
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


