// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWithTheme from "@/components/LayoutWithTheme";
import SupportButton from "@/components/SupportButton";
import { MessageCircleHeart } from "lucide-react";
import Script from "next/script";



const inter = Inter({ subsets: ["latin"] });

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
        url: "https://sayvia.xyz/chat.svg",
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
    images: ["https://sayvia.xyz/chat.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            "logo": "https://sayvia.xyz/chat.svg",
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
        <meta property="og:image" content="https://sayvia.xyz/chat.svg" />
        <meta property="og:url" content="https://sayvia.xyz" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sayvia" />
        <meta name="twitter:description" content="Send messages anonymously and safely with Sayvia." />
        <meta name="twitter:image" content="https://sayvia.xyz/chat.svg" />

       

      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <LayoutWithTheme>
              {children}

            </LayoutWithTheme>
            <SupportButton />
            {/* <div className="fixed bottom-4 right-4 bg-yellow-500 rounded-full text-white p-4">support</div> */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}




