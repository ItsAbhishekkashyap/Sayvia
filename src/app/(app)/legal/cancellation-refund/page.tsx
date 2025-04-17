'use client';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CreditCard, RotateCcw, Settings, Mail, Shield } from 'lucide-react';

export default function CancellationRefundPage() {
  const policies = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Premium Features",
      content: "At Sayvia, we offer premium features to enhance your experience."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Cancellation",
      content: "You can cancel your premium subscription at any time through your account settings.",
      note: "Cancellation stops future billing but does not refund past payments."
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Refunds",
      content: "All payments are non-refundable. However, if you experience issues with premium features, we're here to help.",
      action: "Contact us at support@sayvia.in and we'll address your concerns."
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Animated header */}
        <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-rose-500 to-pink-600 p-1">
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
            className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-purple-400/20 bg-[length:300%_300%]"
          ></motion.div>
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-rose-100 dark:bg-rose-900/50 p-4 rounded-full shadow-lg mb-6"
            >
              <Shield className="h-10 w-10 text-rose-600 dark:text-rose-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 mb-4">
              Cancellation & Refund Policy
            </h1>
            
          </div>
        </div>

        {/* Policy sections */}
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
                  <div className="p-3 bg-rose-100 dark:bg-rose-900/50 rounded-lg text-rose-600 dark:text-rose-400">
                    {policy.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                      {policy.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {policy.content}
                    </p>
                    {policy.note && (
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="mt-3 p-3 bg-rose-50 dark:bg-gray-700 rounded-lg border border-rose-100 dark:border-gray-600"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {policy.note}
                        </p>
                      </motion.div>
                    )}
                    {policy.action && (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="mt-4 flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium"
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

        {/* Support section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center border border-rose-100 dark:border-gray-700"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-full shadow-md mb-6">
            <Mail className="h-8 w-8 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is ready to assist with any questions about your subscription
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:support@sayvia.in"
            className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Contact Support at support@sayvia.in
          </motion.a>
        </motion.div>
      </motion.div>

      
    </div>
    {/* Footer */}
    <Footer/>
    </>
  );
}