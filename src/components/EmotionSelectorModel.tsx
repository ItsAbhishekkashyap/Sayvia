import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type MoodEffect = {
  type: 'confetti' | 'rain' | 'fireworks' | 'hearts';
  emoji: string;
} | null;

type MoodType = 'happy' | 'sad' | 'angry' | 'excited';



const MoodDialog = () => {
  const [moodModalOpen, setMoodModalOpen] = useState(true);
  const [selectedMood, setSelectedMood] = useState<MoodType | ''>('');
  const [effect, setEffect] = useState<MoodEffect>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const effects: Record<MoodType, MoodEffect> = {
    happy: { type: 'confetti', emoji: '🎉' },
    sad: { type: 'rain', emoji: '☔️' },
    angry: { type: 'fireworks', emoji: '🎆' },
    excited: { type: 'hearts', emoji: '💖' }
  };

  const handleMoodSubmit = () => {
    if (!selectedMood) return;

    setEffect(effects[selectedMood]); // No more error!
    setTimeout(() => setEffect(null), 3000);
    setMoodModalOpen(false);
  };

  const renderEffect = () => {
    if (!effect) return null;
  
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {effect.type === 'confetti' && (
            <>
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={800}
                gravity={0.15}
                colors={['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b']}
                confettiSource={{
                  x: windowSize.width / 2,
                  y: windowSize.height,
                  w: 0,
                  h: 0
                }}
                initialVelocityY={-15}
                tweenDuration={10000}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-50/20 dark:to-indigo-900/10"
              />
            </>
          )}
  
          {effect.type === 'rain' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[url('/images/rain-bg.png')] bg-cover mix-blend-screen"
            >
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -100, 
                    x: Math.random() * windowSize.width,
                    opacity: 0.7 + Math.random() * 0.3
                  }}
                  animate={{
                    y: windowSize.height + 100,
                    transition: {
                      duration: 1.5 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  className="absolute text-4xl drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))",
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  {effect.emoji}
                </motion.div>
              ))}
            </motion.div>
          )}
  
          {effect.type === 'fireworks' && (
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    scale: 0,
                    x: windowSize.width * (0.1 + i * 0.125),
                    y: windowSize.height * 0.7
                  }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                    y: windowSize.height * 0.3,
                    transition: {
                      duration: 2.5,
                      delay: i * 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  className="absolute origin-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 1],
                      opacity: [1, 0],
                      transition: {
                        duration: 1.5,
                        delay: 1,
                        ease: "circOut"
                      }
                    }}
                    className="text-6xl"
                  >
                    {effect.emoji}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 2],
                      opacity: [0.7, 0],
                      transition: {
                        duration: 2,
                        delay: 1.2
                      }
                    }}
                    className="absolute inset-0 rounded-full border-2 border-indigo-400/50"
                  />
                </motion.div>
              ))}
            </div>
          )}
  
          {effect.type === 'hearts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent"
            >
              {[...Array(25)].map((_, i) => {
                const size = 2 + Math.random() * 3;
                return (
                  <motion.div
                    key={i}
                    initial={{
                      scale: 0,
                      x: windowSize.width / 2,
                      y: windowSize.height / 2,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      scale: [0, size * 0.8, 0],
                      x: [
                        windowSize.width / 2,
                        windowSize.width / 2 + (Math.random() - 0.5) * 500,
                        windowSize.width / 2 + (Math.random() - 0.5) * 600
                      ],
                      y: [
                        windowSize.height / 2,
                        windowSize.height / 2 - 100 - Math.random() * 200,
                        windowSize.height / 2 - 300 - Math.random() * 200
                      ],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 2.5,
                        delay: i * 0.08,
                        ease: "backOut"
                      }
                    }}
                    className="absolute text-5xl"
                    style={{
                      filter: `drop-shadow(0 0 12px rgba(236, 72, 153, ${0.3 + Math.random() * 0.3}))`
                    }}
                  >
                    {effect.emoji}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };


  // Fix 1: Create a type-safe handler
  const handleMoodChange = (value: string) => {
    // Only update if it's a valid MoodType
    if (value === 'happy' || value === 'sad' || value === 'angry' || value === 'excited') {
      setSelectedMood(value);
    } else {
      setSelectedMood('');
    }
  };

  return (
    <>
      <AnimatePresence>
        {effect && renderEffect()}
      </AnimatePresence>

      <AlertDialog open={moodModalOpen} onOpenChange={setMoodModalOpen}>
        <AlertDialogContent className="max-w-md border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                How are you feeling today?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-sm text-gray-500 dark:text-gray-400">
                Your mood will customize your experience
              </AlertDialogDescription>
            </AlertDialogHeader>

            <RadioGroup
              value={selectedMood}
              onValueChange={handleMoodChange}  // Now properly typed
              className="grid grid-cols-2 gap-4 py-4"
            >
              {[
                { value: "happy", label: "😄 Happy", color: "bg-yellow-100 dark:bg-yellow-900/30" },
                { value: "sad", label: "😢 Sad", color: "bg-blue-100 dark:bg-blue-900/30" },
                { value: "angry", label: "😠 Angry", color: "bg-red-100 dark:bg-red-900/30" },
                { value: "excited", label: "🤩 Excited", color: "bg-purple-100 dark:bg-purple-900/30" }
              ].map((mood) => (
                <motion.div
                  key={mood.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RadioGroupItem
                    value={mood.value}
                    id={mood.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={mood.value}
                    className={`flex flex-col items-center justify-center rounded-xl p-4 border-2 border-transparent cursor-pointer transition-all 
                    ${mood.color} 
                    hover:border-indigo-400 
                    peer-data-[state=checked]:border-indigo-600
                    peer-data-[state=checked]:ring-2
                    peer-data-[state=checked]:ring-indigo-200
                    peer-data-[state=checked]:scale-[1.03]`}
                  >
                    <span className="text-3xl mb-2">{mood.label.split(' ')[0]}</span>
                    <span className="font-medium">{mood.label.split(' ')[1]}</span>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>

            <div className="flex justify-center gap-4 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedMood("");
                  setMoodModalOpen(false);
                }}
                className="px-6"
              >
                Maybe Later
              </Button>
              <Button
                onClick={handleMoodSubmit}
                disabled={!selectedMood}
                className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-transform hover:-translate-y-0.5"
              >
                {selectedMood ? `I'm ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}!` : "Select Mood"}
              </Button>
            </div>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MoodDialog;
