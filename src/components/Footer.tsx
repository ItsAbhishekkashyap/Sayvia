'use client';

import { Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Footer() {
  const links = [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
    { name: 'Cancellation Policy', href: '/legal/cancellation-refund' },
    { name: 'Delivery Policy', href: '/legal/shipping-delivery' },
    { name: 'Contact Us', href: '/legal/contact-us' },
  ];

  // Particle state initialized without window-dependent values
  const [particles, setParticles] = useState(
    Array.from({ length: 20 }).map(() => ({
      x: 0,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 5 + 3,
    }))
  );

  // Update particle positions on client mount
  useEffect(() => {
    setParticles((prev) =>
      prev.map((p) => ({
        ...p,
        x: Math.random() * window.innerWidth,
      }))
    );
  }, []);

  return (
    <footer className="relative w-full py-12 mt-auto bg-gradient-to-b from-background via-purple-50/30 to-background dark:via-purple-900/10 border-t border-purple-900/10">
      <div className="container px-4 md:px-6">
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-900 mb-8 mx-auto max-w-2xl"
        />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={link.href}
                className="group text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center"
              >
                <span className="h-px w-4 bg-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300" />
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Copyright section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-pulse" />
            <span>
              © 2025 <span className="font-semibold text-purple-600 dark:text-purple-400">Sayvia</span>.
              All rights reserved.
            </span>
            <Link
              href="/support"
              className="relative overflow-hidden group"
            >
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r ml-2 from-purple-500 to-pink-500 text-white font-medium px-2 py-1.5 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                {/* Animated coffee cup */}
                <motion.span
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-lg"
                >
                  🌟
                </motion.span>
                <span>Support Our Work</span>

                {/* Glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full -z-10"></span>
              </motion.span>

              {/* Subtle pulse animation */}
              <motion.span
                className="absolute inset-0 border-2 border-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </Link>
          </div>

          <div className="flex items-center">
            <span className="mr-1">Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500/20" />
            </motion.span>
            <span className="ml-1">in India</span>
          </div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-400/20 dark:bg-purple-600/20"
              initial={{ x: p.x, y: 0, width: p.width, height: p.height, opacity: p.opacity }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
