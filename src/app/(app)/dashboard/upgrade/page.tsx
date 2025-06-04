// src/app/(app)/dashboard/upgrade/page.tsx
'use client'

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Check, Crown, Palette, BarChart, MessageSquare, Shield, Link2, Ban } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { User } from "next-auth";
import Link from "next/link";
// import { Footer } from "@/components/Footer";

// export const metadata = {
//   title: 'Sayvia - Anonymous Message App | Share Honestly',
//   description: 'Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.',
//   keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously'],
//   openGraph: {
//     title: 'Sayvia',
//     description: 'Anonymous message platform.',
//     url: 'https://sayvia.in',
//     siteName: 'Sayvia',
//     images: [
//       {
//         url: 'sayviaimg.png',
//         width: 1200,
//         height: 630,
//       },
//     ],
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Sayvia',
//     description: 'Send anonymous messages securely.',
//     images: ['sayviaimg.png'],
//   },
// };
export default function UpgradePage() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  

  const handleUpgrade = async () => {
    const res = await fetch("/api/upgrade", { method: "POST" });
    const data = await res.json();

    {session? (user?.isPremium && (
      res.ok ? (
        toast({ 
          title: "You are a premium User 😊 ",
          description: "Your account has been already upgraded",
        })
      ) : (
        toast({ 
          title: "Upgrade failed", 
          description: data.message, 
          variant: "destructive" 
        })
      )
    
    ))
     : (!user?.isPremium && (
      res.ok ? (
        toast({ 
          title: "🎉 Welcome to Premium!",
          description: "Your account has been upgraded successfully",
        })
       ) : ( 
        toast({ 
          title: "Upgrade failed", 
          description: data.message, 
          variant: "destructive" 
        })
       )
     ))
    }
    
  };

  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Profile Themes",
      description: "5 exclusive color themes for your profile",
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "Message Analytics",
      description: "Visual charts of your feedback trends",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "AI Reply Suggestions",
      description: "GPT-powered feedback suggestions",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Message Moderation",
      description: "Auto-filter inappropriate content",
    },
    {
      icon: <Ban className="w-5 h-5" />,
      title: "Ad-Free Experience",
      description: "No distractions, just pure feedback",
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      title: "Custom Profile Link",
      description: "sayvia.com/yourname",
    },
  ];

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto mt-12 p-4 sm:p-6"
    >
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
          Unlock Sayvia Premium
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Get powerful tools to enhance your feedback experience and grow faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full border border-gray-200 hover:border-amber-200 transition-all">
              <CardHeader className="flex flex-row items-start space-x-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-3xl p-10 border border-amber-300 shadow-xl">
  <div className="max-w-2xl mx-auto text-center">
    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1 rounded-full uppercase mb-4 tracking-wide shadow-sm">
      Limited Time Offer
    </span>
    <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-3">
      Enjoy Premium, On Us! 🎁
    </h2>
    <p className="text-lg text-amber-800 mb-6">
      Unlock all premium features <strong>100% free</strong> during our early access period. No commitments. Just pure value.
    </p>

    <ul className="space-y-3 mb-8 text-left max-w-md mx-auto text-amber-900 font-medium">
      <li className="flex items-start gap-3">
        <Check className="w-5 h-5 text-amber-600 mt-1" />
        <span>Full access to premium tools and insights</span>
      </li>
      <li className="flex items-start gap-3">
        <Check className="w-5 h-5 text-amber-600 mt-1" />
        <span>No credit card or payment required</span>
      </li>
      <li className="flex items-start gap-3">
        <Check className="w-5 h-5 text-amber-600 mt-1" />
        <span>Be among the first to shape the future features</span>
      </li>
      <li className="flex items-start gap-3">
        <Check className="w-5 h-5 text-amber-600 mt-1" />
        <span>Priority support & community badge</span>
      </li>
    </ul>

{session ? (
  user?.isPremium ? (
    <Link href="/dashboard/premium">
      <Button
        onClick={handleUpgrade}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-600 px-8 py-6 text-lg font-bold text-white shadow-xl transition-all duration-300 ease-in-out hover:from-yellow-500 hover:to-amber-700 hover:scale-105"
      >
        <span className="mr-2">See Your Power</span>
        <span className="animate-bounce">💥</span>
      </Button>
    </Link>
  ) : (
    <Button
      onClick={handleUpgrade}
      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg px-8 py-6 text-lg font-semibold rounded-xl"
    >
      🔓 Unlock Premium for Free
    </Button>
  )
) : null}

    {/* <Button
      onClick={handleUpgrade}
      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg px-8 py-6 text-lg font-semibold rounded-xl"
    >
      🔓 Unlock Premium for Free
    </Button> */}

    <p className="mt-4 text-sm text-gray-500">
      {/* Offer valid until <strong>June 30, 2025</strong> • Early adopters get lifetime perks! */}
    </p>
  </div>
</div>


      <div className="mt-8 text-center text-sm text-gray-500">
        Already premium? <a href="/dashboard/premium" className="text-amber-600 hover:underline">Go to your dashboard</a>
      </div>

    </motion.div>
      {/* Footer */}
      <Footer/>
      
    </>
  );
}