'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Coffee, Heart, CheckCircle, Zap, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';

const SupportUsCard: React.FC = () => {
    const [showThanks, setShowThanks] = useState(false);
    const [coffees, setCoffees] = useState(12);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const [currentSupporterIndex, setCurrentSupporterIndex] = useState(0);

    const supporters = [
        { name: "Raghav", amount: 5, color: "bg-green-400" },
        { name: "Priya", amount: 3, color: "bg-blue-400" },
        { name: "Mehul", amount: 2, color: "bg-purple-400" },
        { name: "You", amount: null, color: "bg-yellow-400" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSupporterIndex((prev) => (prev + 1) % supporters.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [supporters.length]);

    const handleCoffeeClick = (amount: number) => {
        setSelectedAmount(amount);
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6'],
        });
        setShowThanks(true);
        setCoffees(prev => prev + amount);
        setTimeout(() => {
            setShowThanks(false);
            if (typeof window !== 'undefined') {
                window.open("https://buymeacoffee.com/sayvia", "_blank");
            }
        }, 1800);
    };

    const supportTiers = [
        { amount: 1, label: "Support", icon: <Heart className="w-4 h-4" /> },
        { amount: 3, label: "Boost", icon: <Zap className="w-4 h-4" /> },
        { amount: 5, label: "Supercharge", icon: <Gift className="w-4 h-4" /> }
    ];

    return (

        <div className="min-h-screen w-[100vw] flex bg-background flex-col">
            <div className="flex-grow flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative max-w-md mx-auto pt-14 pb-8 mt-20 mb-5 px-8 bg-background border border-gray-100 rounded-2xl shadow-xl text-center overflow-visible"
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                >
                    {/* Floating sparkles decoration */}
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 rounded-full shadow-lg z-10"
                        animate={{
                            y: isHoveringCard ? [-2, 2, -2] : [0, -4, 0],
                            rotate: isHoveringCard ? [0, 5, -5, 0] : [0, 0, 0]
                        }}
                        transition={{
                            duration: isHoveringCard ? 1.5 : 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Sparkles className="text-white w-5 h-5" />
                    </motion.div>

                    {/* Background glow effect */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-50/30 to-yellow-100/10 opacity-0"
                        animate={{ opacity: isHoveringCard ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Floating coffee cup */}
                    <motion.div
                        className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-100 rounded-full opacity-20 flex items-center justify-center"
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Coffee className="w-8 h-8 text-yellow-600 opacity-70" />
                    </motion.div>

                    <div className="relative z-10">
                        {/* Header */}
                        <motion.div
                            animate={isHoveringCard ? { y: -2 } : { y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent mb-2">
                                Fuel Sayvia&#39;s Growth
                            </h2>
                            <p className="text-foreground/80 mb-6 leading-relaxed">
                                Join {coffees}+ supporters helping us to build the amazing tools.
                                <br className="hidden sm:block" /> Every contribution powers new features!
                            </p>
                        </motion.div>

                        {/* Progress indicator with animation */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-foreground/60 mb-2">
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-500">✦</span> {coffees} supporters
                                </span>
                                <span className="flex items-center gap-1">
                                    Goal: 30 <span className="text-yellow-500">✦</span>
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2.5 rounded-full relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((coffees / 30) * 100, 100)}%` }}
                                    transition={{ duration: 1.2, delay: 0.3 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-background opacity-30"
                                        animate={{ left: ['-100%', '100%'] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Support options with enhanced interaction */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {supportTiers.map((tier, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ y: -4, scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleCoffeeClick(tier.amount)}
                                    className={`p-3 rounded-xl border-2 transition-all ${selectedAmount === tier.amount
                                            ? 'border-yellow-400 bg-yellow-50 shadow-md'
                                            : 'border-gray-200 hover:border-yellow-300 bg-background'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`p-2 rounded-full ${selectedAmount === tier.amount
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-gray-50 text-foreground/80'
                                            }`}>
                                            {tier.icon}
                                        </div>
                                        <span className="font-semibold text-foreground">₹{tier.amount * 100}</span>
                                        <span className="text-xs text-foreground/60">{tier.label}</span>
                                    </div>
                                </motion.button>
                            ))}

                            {/* Custom Support Button */}
                            <motion.a
                                href="https://www.buymeacoffee.com/abhishek"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4, scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="p-3 rounded-xl border-2 border-gray-200 hover:border-yellow-300 bg-background transition-all flex flex-col items-center gap-1"
                            >
                                <div className="p-2 rounded-full bg-gray-50 text-foreground/80">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-foreground">Custom</span>
                                <span className="text-xs text-foreground/60">Any Amount</span>
                            </motion.a>
                        </div>

                        {/* Thank you message with animation */}
                        <AnimatePresence>
                            {showThanks && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="text-yellow-600 font-medium mb-6 flex flex-col items-center"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1.5 }}
                                        className="bg-yellow-100 p-3 rounded-full mb-2"
                                    >
                                        <CheckCircle className="w-6 h-6" />
                                    </motion.div>
                                    <span>Thank you for your support!</span>
                                    <span className="text-sm text-yellow-500 mt-1">Redirecting to payment...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated supporters wall */}
                        <div className="mt-8 pt-5 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
                                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                                <span>Our Supporters Family</span>
                            </h4>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSupporterIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center gap-2 text-sm text-foreground/80"
                                >
                                    <div className={`w-3 h-3 rounded-full ${supporters[currentSupporterIndex].color}`} />
                                    <div className="text-center">
                                        <p className="font-medium text-foreground">
                                            {supporters[currentSupporterIndex].name}
                                        </p>
                                        {supporters[currentSupporterIndex].amount && (
                                            <p className="text-xs text-foreground/60">
                                                {supporters[currentSupporterIndex].amount} coffee{supporters[currentSupporterIndex].amount !== 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-center mt-4 gap-1">
                                {supporters.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSupporterIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${currentSupporterIndex === idx ? 'bg-yellow-500 w-3' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportUsCard;



