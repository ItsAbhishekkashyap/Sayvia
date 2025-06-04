'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Mail, Menu, X, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("Navbar session:", session);
  const user: User = session?.user as User;
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-4"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sayvia✨
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            
              
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">
                    Welcome
                  </span>
                </div>

               
          </div>

          
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">

              <div className="pt-2 space-y-2">
                <div className="flex items-center px-4 py-2 text-sm">
                  <Mail className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-muted-foreground">
                    WELCOME
                  </span>
                </div>
                

               

              </div>
    
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;