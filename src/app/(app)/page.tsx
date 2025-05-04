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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Sparkles, MessageCircle, Shield, Link2Icon, Link2, Ban, Inbox, Smartphone, Lock, Clock, BarChart, QuoteIcon, ArrowRight, StarIcon } from "lucide-react";
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
              } as React.CSSProperties}
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
      {/* Features Grid */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="h-10 w-10 text-purple-400" />,
              title: "Anonymous Messaging",
              description: "Receive honest messages without revealing other identity."
            },
            {
              icon: <Sparkles className="h-10 w-10 text-pink-400" />,
              title: "AI Message Suggestions",
              description: "Let AI help craft thoughtful and engaging messages."
            },
            {
              icon: <Ban className="h-10 w-10 text-red-400" />,
              title: "AI Spam Blocking",
              description: "Blocks spam and inappropriate content automatically."
            },
            {
              icon: <Link2 className="h-10 w-10 text-blue-400" />,
              title: "Unique Profile Links",
              description: "Share your custom link to collect messages."
            },
            {
              icon: <Inbox className="h-10 w-10 text-indigo-400" />,
              title: "Message Dashboard",
              description: "Easily view, manage, and delete messages."
            },
            {
              icon: <Smartphone className="h-10 w-10 text-green-400" />,
              title: "Mobile-Responsive",
              description: "Optimized for seamless use on all devices."
            },
            {
              icon: <Lock className="h-10 w-10 text-yellow-400" />,
              title: "Secure Authentication",
              description: "Login and sign up with strong protection."
            },
            {
              icon: <Clock className="h-10 w-10 text-purple-500" />,
              title: "Message Timestamps",
              description: "Track exactly when each message was received."
            },
            {
              icon: <BarChart className="h-10 w-10 text-teal-400" />,
              title: "Data Analytics",
              description: "Analyze messages received over time (week, month, year)."
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
      {/* Professional Testimonials with Light Purple Background */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-b from-purple-500/20 to-pink-500/20 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-200/40 blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-indigo-200/40 blur-[100px]"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-4xl font-bold tracking-tighter sm:text-2xl md:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-purple-800/80 dark:text-white max-w-2xl mx-auto">
              See how Sayvia transforms professional workflows

            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Carousel
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false
                })
              ]}
              className="w-full max-w-6xl mx-auto"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="py-2">
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -3 }}
                      className="h-full"
                    >
                      <Card className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                        <CardHeader className="p-6 pb-3">
                          <div className="flex items-center gap-4">
                            {/* Avatar with gradient border */}
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-0.5">
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-300">
                                  {message.title.charAt(0)}
                                </div>
                              </div>
                              {/* Verification badge */}
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>

                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                {message.title}
                              </CardTitle>
                              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {message.received}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-6 pt-0">
                          <div className="relative">
                            {/* Double quote decoration */}
                            <div className="absolute -top-2 -left-2 text-purple-200 dark:text-purple-900/50 text-5xl font-serif">`&quot;`</div>
                            <p className="text-gray-700 dark:text-gray-300 pl-8 text-lg leading-relaxed relative z-10">
                              {message.content}
                            </p>
                          </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                          <div className="w-full flex items-center justify-between">
                            {/* Rating stars */}
                            {/* <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-5 h-5 ${star <= 5 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600 fill-transparent'}`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div> */}

                            {/* Sample disclaimer with fade-in animation */}
                            <div className="text-xs text-gray-400 dark:text-gray-500 italic animate-pulse">
                              Real testimonial • Coming soon
                            </div>
                          </div>
                        </CardFooter>
                      </Card>

                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-10 flex justify-center gap-3">
                <CarouselPrevious className="relative left-0 -translate-x-0 bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-purple-700 shadow-sm" />
                <CarouselNext className="relative right-0 -translate-x-0 bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-purple-700 shadow-sm" />
              </div>
            </Carousel>
          </motion.div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >

            <Link href='/sign-in'>
              <Button

                className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 rounded-lg font-medium text-base transition-all group shadow-sm hover:shadow-md"
              >
                Be Among the First to Try
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-purple-700/70 dark:text-white text-sm mt-4">
              Enjoy the sayvia feature
            </p>
          </motion.div>
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
              } as React.CSSProperties}
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
                    <div className="absolute top-8 left-8 bg-white/90 dark:bg-purple-400/90 p-4 rounded-xl max-w-[60%] shadow-sm">
                      <p className="text-sm">What&#39;s something you&#39;ve never told anyone? 👀</p>
                    </div>
                    <div className="absolute bottom-12 right-8 bg-purple-600 text-white p-4 rounded-xl max-w-[70%] shadow-sm">
                      <p className="text-sm">You have the most amazing smile! 😊</p>
                    </div>
                    <div className="absolute top-1/2 left-1/4 bg-white/90 dark:bg-purple-400/90 p-4 rounded-xl max-w-[50%] shadow-sm">
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
      <Footer />
    </div>
  );
};

export default Home;