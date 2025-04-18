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
            {session ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">
                    Welcome, <span className="font-medium text-foreground">{user?.username || user?.email}</span>
                  </span>
                </div>

                {/* 💎 Add Upgrade button if not premium */}
                {!user?.isPremium && (
                  <Link href="/dashboard/upgrade">
                    <Button variant="outline" className="text-purple-600 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900 transition-all">
                      Upgrade 💎
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-foreground hover:bg-purple-500/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Right Section - Theme + User */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-purple-500/10 text-foreground"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-purple-600" />
              )}
            </Button>

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback className="bg-purple-500 text-white">
                        {user?.username?.charAt(0) || user?.email?.charAt(0) || <UserIcon className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-54" align="end" forceMount>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    <span className="text-red-600">Sign out</span>
                  </DropdownMenuItem>
                  {user?.isPremium && (
                    <DropdownMenuItem className="cursor-pointer" >
                      <Link href={"/dashboard/premium"}>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> 💎 Premium Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="md:hidden">
                <Link href="/sign-in">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {session ? (
              <div className="pt-2 space-y-2">
                <div className="flex items-center px-4 py-2 text-sm">
                  <Mail className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-muted-foreground">
                    Hi, <span className="font-medium text-foreground">{user?.username || user?.email}</span>
                  </span>
                </div>
                <Button
                  onClick={() => signOut()}
                  className="w-full justify-start"
                  variant="ghost"
                >
                  Sign Out
                </Button>

                {!user?.isPremium && (
                  <Link href="/dashboard/upgrade">
                    <Button variant="outline" className="w-full justify-start">
                      Upgrade 💎
                    </Button>
                  </Link>
                )}

              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/sign-in">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
