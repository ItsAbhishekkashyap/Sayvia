import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import dbconnect from '@/lib/dbconnect';
import User from '@/model/user';

// Import components here...
import PremiumDashboardClient from './PremiumDashboardClient';

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

export default async function PremiumDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  await dbconnect();
  const user = await User.findOne({ email: session.user.email });

  if (!user || !user.isPremium) {
    redirect('/dashboard'); // or wherever you want to send non-premium users
  }

  return <PremiumDashboardClient session={session} />;
}

