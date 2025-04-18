// components/SupportButton.jsx
"use client"
import { MessageCircleHeart } from 'lucide-react';

export default function SupportButton() {
  return (
    <a
      href="/support"
      className="fixed bottom-6 right-6 z-[9999] bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
    >
      <MessageCircleHeart className="w-5 h-5" />
      <span className="">Support Us</span>
    </a>
  );
}
