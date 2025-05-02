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


  title: 'Sayvia - Anonymous Message and Feedback App | Share Honestly',
  description: "Sayvia lets you send and receive anonymous messages and feedback easily. It’s secure, private, user-friendly, and completely ad-free—making sharing truly effortless.",
  keywords: [
    "anonymous message app",
    "send anonymous messages",
    "sayvia",
    "secure feedback app",
    "no login messaging"
  ],
  openGraph: {
    title: 'Sayvia - Anonymous Message and Feedback App | Share Honestly',
    description: "Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.",
    url: 'https://sayvia.xyz',
    siteName: 'Sayvia',
    icons: {
      icon: "/favicon.ico",

    },
    images: [
      {
        url: "chat.svg",
        width: 1200,
        height: 630,
        alt: "Sayvia – Anonymous Message App"
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
    description: "Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.",
    images: ["chat.svg"],
  },
};


//  Create a Client Component to use the hook
import ClientLayoutWithTheme from "@/components/ClientLayoutWithTheme"; // We'll make this next
import Script from "next/script";
import { CustomLinkProvider } from "@/context/CustomLinkContext";

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
            "@type": "WebSite",
            "name": "Sayvia",
            "url": "https://sayvia.xyz",
            "description": "Sayvia lets users send and receive anonymous messages. Completely secure and ad-free.",
            "logo": "chat.svg",
            "sameAs": [
              "https://twitter.com/sayvia",
              "https://github.com/ItsAbhishekkashyap/Sayvia"
            ],
            "potentialAction": {
    "@type": "SearchAction",
    "target": "https://sayvia.xyz/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
          })}
        </Script>
        <link rel="icon" href="/chat.svg" />
        <meta property="og:title" content="Sayvia" />
        <meta property="og:description" content="Send messages and give feedback without revealing your identity. Safe, simple, Sayvia." />
        <meta property="og:image" content="chat.svg" />
        <meta property="og:url" content="https://sayvia.xyz" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sayvia" />
        <meta name="twitter:description" content="Send messages anonymously and safely with Sayvia." />
        <meta name="twitter:image" content="chat.svg" />


      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CustomLinkProvider>
          <ClientLayoutWithTheme>{children}</ClientLayoutWithTheme>
          </CustomLinkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


