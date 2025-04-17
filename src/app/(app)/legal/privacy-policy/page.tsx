'use client';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, User, BarChart2, Cookie, Settings } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Our Commitment",
      content: "At Sayvia, we prioritize your privacy. This policy outlines how we collect, use, and protect your information."
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Information We Collect",
      items: [
        "Personal Information: When you sign up, we collect your name, email address, and chosen username.",
        "Usage Data: We gather data on how you interact with our platform to improve user experience.",
        "Cookies: We use cookies to enhance site functionality and user experience."
      ]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "How We Use Your Information",
      items: [
        "To create and manage your personal dashboard.",
        "To send you important updates and notifications.",
        "To improve our services based on user feedback and usage patterns."
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security",
      content: "We implement robust security measures to protect your data. However, no method of transmission over the internet is 100% secure."
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Third-Party Services",
      content: "We may use third-party services for analytics and payment processing. These services have their own privacy policies."
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 dark:opacity-30"></div>
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
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 bg-[length:300%_300%]"
          ></motion.div>
          <div className="relative z-10 p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-6"
            >
              <ShieldCheck className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your data security is our top priority
            </p>
          </div>
        </div>

        {/* Policy sections */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
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
                            <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
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

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center border border-indigo-100 dark:border-gray-700"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-full shadow-md mb-6">
            <Mail className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact our privacy team for any concerns about your data
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:support@sayvia.in"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Email Us at support@sayvia.in
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}
  