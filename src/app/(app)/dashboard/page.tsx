'use client'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { IMessage } from '@/model/user';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Copy, Loader2, RefreshCcw, Mail, Link as LinkIcon, ToggleLeft, ToggleRight, Filter, ArrowUpDown, Search, LogIn } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import MessageCard from '@/components/MessageCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Sparkles, Lock } from "lucide-react";
import { useRouter } from 'next/navigation';






const Dashboard = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>('newest');
  const [filterOption, setFilterOption] = useState<'all' | 'recent'>('all');

  const { toast } = useToast();
  const { data: session, } = useSession();
  

  

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  // Filter and sort messages
  const getFilteredSortedMessages = useCallback(() => {
    let result = [...messages];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by time
    if (filterOption === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      result = result.filter(msg => 
        new Date(msg.createdAt) > oneWeekAgo
      );
    }
    
    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOption === 'newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
    
    return result;
  }, [messages, searchQuery, sortOption, filterOption]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [messagesRes, settingsRes] = await Promise.all([
        axios.get<ApiResponse>('/api/get-messages'),
        axios.get<ApiResponse>('/api/accept-messages')
      ]);
      setMessages(messagesRes.data.messages || []);
      setValue('acceptMessages', settingsRes.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [setValue, toast]);

  useEffect(() => {
    if (!session?.user) return;
    fetchData();
  }, [session, fetchData]);

  // Handlers
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`/api/delete-message/${messageId}`);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      toast({ title: "Deleted", description: "Message removed" });
    } catch (error) {
      handleError(error, "Failed to delete message");
    }
  };

  const toggleMessageAcceptance = async () => {
    try {
      setIsSwitchLoading(true);
      const { data } = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      });
      setValue('acceptMessages', !acceptMessages);
      toast({ title: data.message });
    } catch (error) {
      handleError(error, "Failed to update settings");
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const handleError = (error: unknown, defaultMsg: string) => {
    const axiosError = error as AxiosError<ApiResponse>;
    toast({
      title: "Error",
      description: axiosError.response?.data.message || defaultMsg,
      variant: "destructive"
    });
  };

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/u/${session?.user?.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: "Copied!", description: "Profile link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  

  


  const SignInPrompt = () => {
    const router = useRouter();
  
    return (
      <div className="relative h-[60vh] w-full mt-10 overflow-hidden bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-900/80 dark:to-gray-800/80">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-200/50 dark:bg-purple-900/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                opacity: Math.random() * 0.4 + 0.1,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
  
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center justify-center space-y-6 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:shadow-gray-700/20"
          >
            {/* Animated lock icon */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50"
            >
              <Lock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
  
            <div className="space-y-2 text-center">
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-gray-900 dark:text-white"
              >
                Secure Dashboard Access
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground"
              >
                Sign in to access your personalized dashboard
              </motion.p>
            </div>
  
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => router.push('/sign-in')}
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
              >
                <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span>Sign In Now</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  };


  if (!session?.user) {
    return <SignInPrompt />;
  }




  
  return (
    <div className="container mx-auto mt-24 px-4 py-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Secret Inbox
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your anonymous messages
        </p>
      </motion.div>

      {/* Profile Link Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-purple-900/30 rounded-xl p-6 mb-8 shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <LinkIcon className="h-5 w-5 text-purple-400" />
              Your Unique Profile Link
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Share this to receive anonymous messages
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-lg bg-background border border-border truncate">
              {`${window.location.origin}/u/${session?.user.username}`}
            </div>
            <Button 
              onClick={copyProfileUrl}
              size="sm"
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              {copied ? "Copied!" : "Copy"}
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Settings Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background border border-border rounded-xl p-6 mb-8 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Message Settings</h3>
              <p className="text-sm text-muted-foreground">
                {acceptMessages ? "Accepting new messages" : "Not accepting messages"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSwitchLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="text-sm text-muted-foreground">
                  {acceptMessages ? "ON" : "OFF"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMessageAcceptance}
                  className="p-0 h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-800"
                >
                  <span className={`flex items-center justify-center h-5 w-5 rounded-full transition-all ${acceptMessages ? 'bg-purple-600 translate-x-[1.35rem]' : 'bg-gray-400 translate-x-0.5'}`}>
                    {acceptMessages ? (
                      <ToggleRight className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <ToggleLeft className="h-3.5 w-3.5 text-white" />
                    )}
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Messages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              Your Messages
              <span className="text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full">
                {getFilteredSortedMessages().length}
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {messages.length} total messages
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterOption} onValueChange={(value) => setFilterOption(value as "all" | "recent")}>
                <SelectTrigger className="w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="recent">Recent (7d)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as "newest" | "oldest")}>
                <SelectTrigger className="w-[120px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => fetchData()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        <AnimatePresence>
          {getFilteredSortedMessages().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredSortedMessages().map((message) => (
                <motion.div
                  key={message._id as string}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCard
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground">
                {messages.length === 0 ? "No messages yet" : "No matching messages"}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                {messages.length === 0 
                  ? "Share your profile link to start receiving anonymous messages"
                  : "Try adjusting your search or filters"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;
