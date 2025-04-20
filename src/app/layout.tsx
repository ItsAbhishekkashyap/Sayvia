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
  description: "Sayvia is a sleek and secure anonymous messaging platform designed to help you express yourself freely. Whether you want to share honest feedback, heartfelt messages, or just have fun with friends — Sayvia gives you a safe space to do it all without revealing your identity. Unlike traditional apps, Sayvia is completely ad-free, ensuring a distraction-free and private experience.Built with user privacy at its core, Sayvia doesn’t store sensitive user data and never shows intrusive ads. Our simple and intuitive interface makes it easy to send and receive anonymous messages, even if you're not tech-savvy. You can create your unique profile link, share it with friends or on social media, and start getting messages instantly. Sayvia is perfect for open communication, honest feedback, confession pages, or just anonymous fun — and it works beautifully across all devices. Whether you're a student, creator, or someone who just wants to connect without filters, Sayvia has your back. Start your anonymous journey today and experience the freedom to speak your mind.",
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
  openGraph: {
    title: 'Sayvia',
    description: 'Anonymous message platform.',
    url: 'https://sayvia.xyz',
    siteName: 'Sayvia',
    icons: {
      icon: "/phone.svg",

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
    images: ['sayviaimg.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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




