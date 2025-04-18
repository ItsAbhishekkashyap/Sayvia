// components/SupportButton.jsx
"use client";
import { HeartHandshake } from "lucide-react";
import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SupportButton() {
    const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clickTimeout = useRef(null); // Removed TypeScript type annotation
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleClick = () => {
    if (!isMobile) {
      router.push('/support');
      return;
    }

    // Handle double click detection
    if (clickTimeout.current) {
      // Double click detected
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      setIsExpanded(false);
      router.push("/support");
    } else {
      // First click - expand and set timeout
      setIsExpanded(true);
      clickTimeout.current = setTimeout(() => {
        // Single click - redirect after delay if still expanded
        if (isExpanded) {
          setIsExpanded(false);
          router.push('/support');
        }
        clickTimeout.current = null;
      }, 1500); // 300ms delay to detect double click
      
      
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

  return (
    <motion.div
    aria-label="Support us"
    role="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[9999] rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-900 px-4 py-3 shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2 border border-yellow-300/30"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <HeartHandshake className="w-5 h-5" />
      </motion.div>

      {/* Text that shows on desktop or when expanded on mobile */}
      {(!isMobile || isExpanded) && (
        <motion.span
          className="font-medium text-sm whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }} 

        >
          Support Us
        </motion.span>
      )}
    </motion.div>
  );
}
