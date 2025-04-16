// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/options';
// import { redirect } from 'next/navigation';
// import dbconnect from '@/lib/dbconnect';
// import User from '@/model/user';

// // Import components here...
// import PremiumDashboardClient from './PremiumDashboardClient';

// export default async function PremiumDashboard() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect('/login');
//   }

//   await dbconnect();
//   const user = await User.findOne({ email: session?.user.email });

//   if (!user || !user.isPremium) {
//     redirect('/dashboard'); // or wherever you want to send non-premium users
//   }

//   return <PremiumDashboardClient session={session} />;
// }

// export default function TestPremiumPage() {
//   return <h1>Test Premium Page</h1>;
// }

import { getServerSession } from "next-auth";
import PremiumDashboardClient from "./PremiumDashboardClient";

export default async function Page() {
  const session = await getServerSession();
  return <PremiumDashboardClient session={session} />;
}


