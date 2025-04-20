"use client";
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Sparkles, MessageCircle, Shield, Link2Icon, Link2 } from "lucide-react";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from '@react-email/components';
import { Footer } from '@/components/Footer';




const Home = () => {


  return (
    <div className="min-h-screen  flex flex-col">
      {/* Animated Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-900/20 to-background relative overflow-hidden">
        {/* Floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500/10"
              initial={{
                y: Math.random() * 100,
                x: Math.random() * 100,
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                y: [null, Math.random() * 100 - 50],
                x: [null, Math.random() * 100 - 50],
                opacity: [0, 0.3, 0],
                scale: [0.5, 1.2]
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: `${10 + Math.random() * 30}px`,
                height: `${10 + Math.random() * 30}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 mt-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Speak Freely. Stay Anonymous.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Sayvia lets you receive honest feedback without revealing identities.
              <span className="inline-flex items-center ml-2">
                Try it today <Sparkles className="ml-1 h-4 w-4 text-purple-400" />
              </span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

              <Button
                className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-purple-500/20 transition-all"
                size="lg"

              >
                <Link href='/dashboard' style={{ color: 'inherit' }} className='flex items-center no-underline text-white' >

                  <Link2Icon className="mr-5 h-5 w-5" />
                  Get Your Unique Link
                </Link>

              </Button>

              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-purple-300 text-purple-300 hover:bg-purple-900/30 hover:text-purple-100"
                size="lg"
                asChild
              >
                <Link href="/how-it-works" style={{ color: 'inherit' }} className='flex items-center no-underline text-purple-400'>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  How It Works
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="h-10 w-10 text-purple-400" />,
              title: "Complete Anonymity",
              description: "No sender information is ever revealed"
            },
            {
              icon: <MessageCircle className="h-10 w-10 text-pink-400" />,
              title: "Real Conversations",
              description: "Get honest feedback from friends & followers"
            },
            {
              icon: <Sparkles className="h-10 w-10 text-purple-300" />,
              title: "AI Suggestions",
              description: "Stuck? Let AI help start the conversation"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-b from-purple-900/10 to-transparent border border-purple-900/20 hover:border-purple-500/50 transition-all hover:shadow-lg">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-purple-900/10">
        <div className="container px-4 md:px-6">
          <motion.h2
            className="text-2xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What’s Been Said on Sayvia ?
          </motion.h2>

          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full max-w-3xl mx-auto"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                  >
                    <Card className="h-full bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-900/20 hover:border-purple-500/50 transition-all group">
                      <CardHeader>
                        <CardTitle className="text-purple-300 group-hover:text-purple-200 transition-colors">
                          {message.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                          {message.content}
                        </p>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <span className="text-sm text-purple-400/70">Anonymous</span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        {/* Floating gradient circles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              initial={{
                y: Math.random() * 100,
                x: Math.random() * 100,
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                y: [null, Math.random() * 100 - 50],
                x: [null, Math.random() * 100 - 50],
                opacity: [0, 0.2, 0],
                scale: [0.5, 1.2]
              }}
              transition={{
                duration: 15 + Math.random() * 30,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(40px)'
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Two-column layout on desktop */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Left column - Visual element */}
              <motion.div
                className="flex-1"
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="relative aspect-square max-w-[400px] mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-2xl overflow-hidden">
                    {/* Mock message bubbles */}
                    <div className="absolute top-8 left-8 bg-white/90 dark:bg-gray-900/90 p-4 rounded-xl max-w-[60%] shadow-sm">
                      <p className="text-sm">What&#39;s something you&#39;ve never told anyone? 👀</p>
                    </div>
                    <div className="absolute bottom-12 right-8 bg-purple-600 text-white p-4 rounded-xl max-w-[70%] shadow-sm">
                      <p className="text-sm">You have the most amazing smile! 😊</p>
                    </div>
                    <div className="absolute top-1/2 left-1/4 bg-white/90 dark:bg-gray-900/90 p-4 rounded-xl max-w-[50%] shadow-sm">
                      <p className="text-sm">Your work inspires me daily</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right column - Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    Ready for Honest Feedback?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Sayvia lets you receive <span className="font-medium text-purple-300">authentic messages</span> while keeping senders completely anonymous.
                  </p>

                  <div className="space-y-4 max-w-md mx-auto md:mx-0">
                    {/* <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="yourname"
                  className="flex-1 bg-background/90 backdrop-blur-sm border-purple-300/50 focus:border-purple-400 text-center md:text-left"
                />
                <span className="self-center text-muted-foreground">.Sayvia.me</span>
              </div> */}

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/30 transition-all py-6 text-lg"
                      size="lg"
                    >
                      <Link href="/dashboard" style={{ color: 'inherit' }} className='flex items-center no-underline text-white'>
                        Claim Your Link Now
                      </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      Join thousands receiving honest feedback anonymously
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Footer */}
      {/* <footer className="w-full py-8 border-t border-purple-900/20 mt-auto bg-background/40 backdrop-blur-sm">
        <div className="container px-4 md:px-6 flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-purple-400" />
            © 2025 <span className="font-semibold ml-1 text-purple-500">Sayvia✨</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-purple-500 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-purple-500 transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link href="/cancellation-refund-policy" className="hover:text-purple-500 transition-colors duration-200">
              Cancellation & Refund Policy
            </Link>
            <Link href="/shipping-delivery-policy" className="hover:text-purple-500 transition-colors duration-200">
              Shipping & Delivery Policy
            </Link>
            <Link href="/contact" className="hover:text-purple-500 transition-colors duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
};

export default Home;