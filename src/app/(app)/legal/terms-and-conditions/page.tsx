'use client';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ScrollText, ShieldAlert, UserCheck, Flag, AlertTriangle, Hammer } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      icon: <ScrollText className="h-6 w-6" />,
      title: "Introduction",
      content: " Welcome to Sayvia. By using our platform, you agree to these terms."
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Use of Service",
      items: [
        "You must be at least 13 years old to use Sayvia.",
        "You are responsible for maintaining the confidentiality of your account information.",
        "You agree not to use Sayvia for any unlawful or prohibited activities."
      ]
    },
    {
      icon: <Flag className="h-6 w-6" />,
      title: "User Content",
      items: [
        "You retain ownership of the content you post but grant Sayvia a license to use it for service provision.",
        "You are solely responsible for the content you share."
      ]
    },
    {
      icon: <ShieldAlert className="h-6 w-6" />,
      title: "Termination",
      content: "We reserve the right to suspend or terminate your account if you violate these terms."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Limitation of Liability",
      content: "Sayvia is not liable for any indirect, incidental, or consequential damages arising from your use of the platform."
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Animated header */}
        <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 p-1">
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
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 bg-[length:300%_300%]"
          ></motion.div>
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full shadow-lg mb-6"
            >
              <Hammer className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
              Terms & Conditions
            </h1>
            
          </div>
        </div>

        {/* Terms sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      {section.title}
                    </h2>
                    {section.content && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-3 mt-3">
                        {section.items.map((item, i) => (
                          <motion.li
                            key={i}
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                          >
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Acceptance section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center border border-blue-100 dark:border-gray-700"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-full shadow-md mb-6">
            <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Your Agreement
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            By using Sayvia, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          
        </motion.div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}