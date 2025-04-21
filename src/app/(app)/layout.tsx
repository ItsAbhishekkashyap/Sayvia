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
  description: "Sayvia lets you send and receive anonymous messages easily. It’s secure, private, user-friendly, and completely ad-free—making sharing truly effortless.",
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
  openGraph: {
    title: 'Sayvia',
    description: 'Anonymous message platform.',
    url: 'https://sayvia.xyz',
    siteName: 'Sayvia',
    icons: {
      icon: "/favicon.ico",

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
    canonical: 'https://sayvia.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayvia',
    description: 'Send anonymous messages securely.',
    images: ['sayviaimg.png'],
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
      <head>
      <link rel="icon" href="/chat.svg" />
        <meta name="description" content="Send and receive anonymous messages with Sayvia. 100% private, secure, and ad-free. Join the anonymous revolution today." />
        <meta property="og:title" content="Sayvia – Anonymous Messaging" />
        <meta property="og:description" content="Completely private, ad-free platform to send and receive anonymous messages. No ads. Just pure connection." />
        <meta property="og:url" content="https://sayvia.xyz/" />
        <meta property="og:image" content="sayviaimg.png" />

      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayoutWithTheme>{children}</ClientLayoutWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}


