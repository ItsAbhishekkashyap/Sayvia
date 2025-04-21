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

export type MoodType = 'happy' | 'sad' | 'angry' | 'excited';

type MoodDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMood: MoodType | null;
  setSelectedMood: (mood: MoodType) => void;
  onSubmit: (mood: MoodType) => void;
};




const MoodDialog = ({ open, onOpenChange, selectedMood, setSelectedMood, onSubmit}: MoodDialogProps) => {
  const [moodModalOpen, setMoodModalOpen] = useState(true);
  // const [selectedMood, setSelectedMood] = useState<MoodType | ''>('');
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


  const handleMoodSubmit = () => {
    if (!selectedMood) return;

    // setEffect(effects[selectedMood]); // No more error!
    setTimeout(() => setEffect(null), 3000);
    setMoodModalOpen(false);
  };

  // Fix 1: Create a type-safe handler
  const handleMoodChange = (value: string) => {
    // Only update if it's a valid MoodType
    if (value === 'happy' || value === 'sad' || value === 'angry' || value === 'excited') {
      setSelectedMood(value);
    } else {
      setSelectedMood('happy');
    }
  };

  return (
    <>
      

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
              value={selectedMood ?? ''}
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
                  setSelectedMood("happy");
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
