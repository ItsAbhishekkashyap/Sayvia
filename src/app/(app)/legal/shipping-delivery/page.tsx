'use client';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Rocket, Zap, Wifi, AlertCircle, Mail } from 'lucide-react';

export default function ShippingDeliveryPage() {
  const policies = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Digital Platform",
      content: "Sayvia is a digital platform; therefore, no physical products are shipped."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Activation",
      content: "Premium features are activated immediately upon successful payment.",
      highlight: "No waiting time - access your features right away"
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Technical Support",
      content: "If you encounter any issues accessing premium features, our team is ready to help.",
      action: "Contact us immediately at support@sayvia.in"
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Animated header with digital theme */}
        <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-teal-500 to-emerald-600 p-1">
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
            className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-emerald-400/20 to-green-400/20 bg-[length:300%_300%]"
          ></motion.div>
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-teal-100 dark:bg-teal-900/50 p-4 rounded-full shadow-lg mb-6"
            >
              <Wifi className="h-10 w-10 text-teal-600 dark:text-teal-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 mb-4">
              Digital Delivery Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Instant access to your premium features
            </p>
          </div>
        </div>

        {/* Policy sections with digital theme */}
        <div className="space-y-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-lg text-teal-600 dark:text-teal-400">
                    {policy.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                      {policy.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {policy.content}
                    </p>
                    {policy.highlight && (
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="mt-3 p-3 bg-teal-50 dark:bg-gray-700 rounded-lg border border-teal-100 dark:border-gray-600"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          ⚡ {policy.highlight}
                        </p>
                      </motion.div>
                    )}
                    {policy.action && (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="mt-4 flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium"
                      >
                        <Mail className="h-5 w-5" />
                        <span>{policy.action}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Digital assurance section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center border border-teal-100 dark:border-gray-700"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-full shadow-md mb-6">
            <Zap className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Instant Digital Access
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Experience seamless activation of premium features with our digital delivery system
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:support@sayvia.in"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Contact Support at support@sayvia.in
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}