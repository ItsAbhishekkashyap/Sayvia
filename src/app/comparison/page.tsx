'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, MessageSquare, Heart, BarChart2, Smartphone, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const metadata = {
    title: 'Sayvia - Anonymous Message and Feedback App | Share Honestly',
    description: 'Send and receive anonymous messages with Sayvia. Completely secure, user-friendly, and ad-free.',
    keywords: ['anonymous messaging', 'Sayvia', 'send messages', 'chat anonymously', 'how it works', 'how sayvia work','how sayvia is different from other','sayvia vs quora','sayvia vs google form'],
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

// Animated counter component
const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const incrementTime = (duration * 1000) / end;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span className="font-bold">{count}K+</span>;
};

export default function ComparisonPage() {
    const [activeTab, setActiveTab] = useState<keyof FeaturesType>('messaging');
    // This ensures activeTab can only be 'messaging' or 'experience'
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
    const { isDarkMode, toggleTheme } = useTheme();

    type FeatureItem = {
        name: string;
        sayvia: string;
        competitors: string;
        icon: React.ReactNode;
        stat: string;
    };

    type FeaturesType = {
        messaging: FeatureItem[];
        experience: FeatureItem[];
    };

    type TabType = keyof FeaturesType;

    const features: FeaturesType = {
        messaging: [
            {
                name: 'Emotional Connection',
                sayvia: 'Deep sentiment analysis',
                competitors: 'Basic text processing',
                icon: <Heart className="w-5 h-5" />,
                stat: '87%'
            },
            {
                name: 'Response Time',
                sayvia: 'Instant AI suggestions',
                competitors: 'Manual responses',
                icon: <Zap className="w-5 h-5" />,
                stat: '2.3s'
            },
            {
                name: 'Message Privacy',
                sayvia: 'End-to-end encryption',
                competitors: 'Basic security',
                icon: <Shield className="w-5 h-5" />,
                stat: '100%'
            }
        ],
        experience: [
            {
                name: 'Dashboard Insights',
                sayvia: 'Personalized analytics',
                competitors: 'Basic statistics',
                icon: <BarChart2 className="w-5 h-5" />,
                stat: '24+'
            },
            {
                name: 'Mobile Optimization',
                sayvia: 'Gesture navigation',
                competitors: 'Basic adaptation',
                icon: <Smartphone className="w-5 h-5" />,
                stat: '99%'
            },
            {
                name: 'Customization',
                sayvia: 'Themes & layouts',
                competitors: 'Limited options',
                icon: <Sparkles className="w-5 h-5" />,
                stat: '15+'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section with Animated Stats */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-24 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto text-center relative z-10"
                >
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="inline-flex items-center justify-center bg-white/20 p-3 rounded-full mb-6"
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        The <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">Sayvia Difference</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl opacity-90 max-w-2xl mx-auto mb-12"
                    >
                        Sayvia: Designed for deeper connections and more meaningful experiences.
                    </motion.p>

                    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { value: null, label: 'Active Communities' },
                            { value: null, label: 'Satisfaction Rate' },
                            { value: null, label: 'Avg. Session (min)' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                            >
                                <div className="text-3xl font-bold mb-2">
                                    {stat.value != null ? (
                                        i === 1 ? `${stat.value}%` : <Counter value={stat.value} />
                                    ) : (
                                        <span className="opacity-70">Coming<span className="animate-pulse">…</span></span>
                                    )}
                                </div>
                                <div className="text-sm opacity-80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>


                {/* Animated background elements */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-400/20 blur-xl"
                />
            </div>

            {/* Interactive Comparison Section */}
            <div className="max-w-6xl mx-auto px-4 py-20">
                {/* Tab Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-white p-1 rounded-full shadow-md border border-gray-200">
                        {(['messaging', 'experience'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                {tab === 'messaging' ? 'Messaging Features' : 'User Experience'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feature Comparison */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6" />
                            Why Sayvia Wins
                        </h2>

                        <AnimatePresence mode="wait">
                            {features[activeTab].map((feature, i) => (
                                <motion.div
                                    key={`sayvia-${i}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: i * 0.1 }}
                                    onMouseEnter={() => setHoveredFeature(i)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    className={`p-6 rounded-xl border-2 transition-all ${hoveredFeature === i
                                            ? 'border-purple-400 bg-background text-foreground shadow-lg'
                                            : 'border-transparent border-gray-400 bg-background text-foreground shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg ${hoveredFeature === i
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">{feature.name}</h3>
                                            <p className="text-gray-600">{feature.sayvia}</p>
                                            {hoveredFeature === i && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-2 text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full inline-flex items-center"
                                                >
                                                    <span className="font-bold mr-1">{feature.stat}</span> better performance
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-2">
                            <X className="w-6 h-6" />
                            The Competition Lacks
                        </h2>

                        <AnimatePresence mode="wait">
                            {features[activeTab].map((feature, i) => (
                                <motion.div
                                    key={`competitors-${i}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: i * 0.1 }}
                                    onMouseEnter={() => setHoveredFeature(i)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    className={`p-6 rounded-xl border-2 transition-all ${hoveredFeature === i
                                            ? 'border-red-100 bg-background text-foreground shadow-lg'
                                            : 'border-gray-400 bg-background text-foreground shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg ${hoveredFeature === i
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1 text-foreground">{feature.name}</h3>
                                            <p className="text-gray-500">{feature.competitors}</p>
                                            {hoveredFeature === i && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-2 text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full inline-flex items-center"
                                                >
                                                    <span className="font-bold mr-1">Limited</span> functionality
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Interactive Demo CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden"
                >
                    <div className="max-w-2xl mx-auto text-center relative z-10">
                        <h2 className="text-3xl font-bold mb-4">See the difference yourself</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Experience Sayvia&#39;s superior features with our interactive demo
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2"
                            >
                                Live Demo <ChevronRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white/10 border border-white/20 px-8 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
                            >
                                Watch Video
                            </motion.button>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-2 border-white/10"
                    />
                </motion.div>
            </div>
        </div>
    );
}
