import React from 'react';
import SupportUsCard from '@/components/SupportUsCard';

export const metadata = {
  title: 'Sayvia - Anonymous Message App | Share Honestly',
  description: 'Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.',
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
  openGraph: {
    title: 'Sayvia',
    description: 'Anonymous message platform.',
    url: 'https://sayvia.in',
    siteName: 'Sayvia',
    images: [
      {
        url: 'sayviaimg.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayvia',
    description: 'Send anonymous messages securely.',
    images: ['sayviaimg.png'],
  },
};

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SupportUsCard />
    </div>
  );
};

export default SupportPage;
