import Script from "next/script";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
      <body>{children}</body>
    </html>
  )
}
