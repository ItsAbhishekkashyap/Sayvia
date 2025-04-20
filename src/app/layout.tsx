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
  description: "Sayvia lets you send and receive anonymous messages easily. It’s secure, private, user-friendly, and completely ad-free—making sharing truly effortless.",
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
  openGraph: {
    title: 'Sayvia',
    description: 'Anonymous message platform.',
    url: 'https://sayvia.xyz',
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
    canonical: 'https://sayvia.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayvia',
    description: 'Send anonymous messages securely.',
    images: ['sayviaimg.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <meta name="description" content="Send and receive anonymous messages with Sayvia. 100% private, secure, and ad-free. Join the anonymous revolution today." />
        <meta property="og:title" content="Sayvia – Anonymous Messaging" />
        <meta property="og:description" content="Completely private, ad-free platform to send and receive anonymous messages. No ads. Just pure connection." />
        <meta property="og:url" content="https://sayvia.xyz/" />
        <meta property="og:image" content="sayviaimg.png" />

        {/* Organization JSON-LD */}
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
            "logo": "https://sayvia.xyz/logo.png",
            "sameAs": [
              "https://twitter.com/sayvia",
              "https://github.com/ItsAbhishekkashyap/Sayvia"
            ]
          })}
        </Script>
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




