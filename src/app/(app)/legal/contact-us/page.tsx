'use client';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      details: "support@sayvia.in",
      description: "For general inquiries and technical support",
      action: "Send us an email",
      link: "mailto:support@sayvia.in"
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: "Instagram",
      details: "@sayvia.official",
      description: "Follow us for updates and send DMs",
      action: "Message us on Instagram",
      link: "https://instagram.com/sayvia.official"
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Vibrant header section */}
        <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-purple-500 to-pink-600 p-1">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 bg-[length:300%_300%]"
          ></motion.div>
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 p-4 rounded-full shadow-lg mb-6"
            >
              <Send className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
              Contact Sayvia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We&#39;re here to help and answer any questions you might have
            </p>
          </div>
        </div>

        {/* Contact methods grid - now 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400 w-max mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">
                {method.details}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {method.description}
              </p>
              <motion.a
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
              >
                {method.action}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Response time assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center border border-purple-100 dark:border-gray-700"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-full shadow-md mb-6">
            <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Quick Response Guarantee
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We typically respond to all inquiries within 24–48 business hours
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:support@sayvia.in"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Us
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://instagram.com/sayvia.official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-purple-600 font-medium rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Instagram className="h-5 w-5 mr-2" />
              DM on Instagram
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}