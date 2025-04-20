'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Sparkles, Shield, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"
import Head from "next/head";

export const metadata = {
  title: 'Sayvia - Anonymous Message and Feedback App | Share Honestly',
  description: 'Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.',
  keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously', 'how it works', 'how sayvia work'],
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


const HowItWorksPage = () => {
  const steps = [
    {
      icon: <LinkIcon className="h-8 w-8 text-purple-400" />,
      title: "Get Your Unique Link",
      description: "Get your personalized Sayvia link to share with friends and followers"
      
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-pink-400" />,
      title: "Receive Anonymous Messages",
      description: "People can send you messages without revealing their identity"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-300" />,
      title: "Full Control",
      description: "Manage your messages - delete unwanted ones anytime"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-300" />,
      title: "AI Suggestions",
      description: "Get conversation starters suggested by our AI"
    }
  ]

  return (
    <>
    <Head>
        <link rel="canonical" href="https://sayvia.xyz/how-it-works" />
      </Head>
    <div className="container mx-auto mt-4 px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          How Sayvia Works
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Send and receive anonymous messages and feedback in just a few simple steps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-900/20 rounded-xl p-6 hover:border-purple-500/50 transition-all h-full"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 text-center border border-purple-900/30"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create your profile and start receiving anonymous messages in minutes
        </p>
        <Button
          asChild
          className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-purple-500/20 transition-all gap-2"
          size="lg"
        >
          <Link href="/dashboard">
            Get Your Sayvia Link <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </div>
    <Footer/>
    </>
  )
}

export default HowItWorksPage