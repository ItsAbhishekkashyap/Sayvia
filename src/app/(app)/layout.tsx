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
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          type="application/ld+json"
          strategy="afterInteractive"
          id="organization-schema"  // Add a unique id
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sayvia",
            "url": "https://sayvia.xyz",
            "logo": "https://sayvia.xyz/chat.svg",
            "sameAs": [
              "https://twitter.com/sayvia",
              "https://github.com/ItsAbhishekkashyap/Sayvia"
            ]
          })}
        </Script>
        <link rel="icon" href="/chat.svg" />
        <meta property="og:title" content="Sayvia" />
        <meta property="og:description" content="Send messages and give feedback without revealing your identity. Safe, simple, Sayvia." />
        <meta property="og:image" content="https://sayvia.xyz/chat.svg" />
        <meta property="og:url" content="https://sayvia.xyz" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sayvia" />
        <meta name="twitter:description" content="Send messages anonymously and safely with Sayvia." />
        <meta name="twitter:image" content="https://sayvia.xyz/chat.svg" />


      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayoutWithTheme>{children}</ClientLayoutWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}


