// src/app/(app)/dashboard/upgrade/page.tsx
'use client'

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Check, Crown, Palette, BarChart, MessageSquare, Shield, Link2, Ban } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

export default function UpgradePage() {
  const { data: session } = useSession();

  const handleUpgrade = async () => {
    const res = await fetch("/api/upgrade", { method: "POST" });
    const data = await res.json();

    if (res.ok) {
      toast({ 
        title: "🎉 Welcome to Premium!",
        description: "Your account has been upgraded successfully",
      });
    } else {
      toast({ 
        title: "Upgrade failed", 
        description: data.message, 
        variant: "destructive" 
      });
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

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            Premium Membership
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-4xl font-bold text-amber-600">$9</span>
            <span className=" dark:text-black">/ month</span>
          </div>
          <ul className="space-y-2 mb-8 text-left max-w-md mx-auto">
            <li className="flex dark:text-black items-center gap-2">
              <Check className="w-5 h-5 text-amber-600" />
              <span>All premium features included</span>
            </li>
            <li className="flex dark:text-black items-center gap-2">
              <Check className="w-5 h-5 text-amber-600" />
              <span>Cancel anytime</span>
            </li>
            <li className="flex dark:text-black items-center gap-2">
              <Check className="w-5 h-5 text-amber-600" />
              <span>7-day money back guarantee</span>
            </li>
          </ul>
          <Button
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg px-8 py-6 text-lg font-semibold"
          >
            Upgrade to Premium
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Secured with Stripe • No hidden fees
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Already premium? <a href="/dashboard/premium" className="text-amber-600 hover:underline">Go to your dashboard</a>
      </div>

      {/* Footer */}
    </motion.div>
      <Footer/>
    </>
  );
}
