'use client'
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MailCheck, ShieldCheck } from 'lucide-react';

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username: string}>()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            setIsSubmitting(true)
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })

            toast({
                title: "Success",
                description: response.data.message
            })

            router.replace('sign-in')
        } catch (error) {
            console.error("Error in signup of user", error)
            const axiosError = error as AxiosError<ApiResponse>;
            
            toast({
                title: "Verification failed",
                description: axiosError.response?.data.message || "An error occurred",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='min-h-screen mt-10 w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md'
            >
                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    {/* Header with gradient */}
                    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center'>
                        <motion.div
                            animate={{ 
                                y: [0, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className='inline-block mb-4'
                        >
                            <ShieldCheck className='h-12 w-12 text-white' />
                        </motion.div>
                        <h1 className='text-2xl font-bold text-white'>Account Verification</h1>
                        <p className='text-indigo-100 mt-2'>Secure your access with verification</p>
                    </div>

                    {/* Form section */}
                    <div className='p-8'>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='bg-indigo-100 p-3 rounded-full'>
                                <MailCheck className='h-8 w-8 text-indigo-600' />
                            </div>
                        </div>
                        
                        <p className='text-center text-gray-600 mb-8'>
                            We&#39;ve sent a 6-digit code to your email. Please enter it below to verify your account.
                        </p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                <FormField
                                    name="code"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-gray-700'>Verification Code</FormLabel>
                                            <FormControl>
                                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                                    <Input 
                                                        placeholder="Enter 6-digit code" 
                                                        {...field} 
                                                        className='py-6 text-center text-lg font-medium tracking-widest'
                                                        maxLength={6}
                                                    />
                                                </motion.div>
                                            </FormControl>
                                            <FormMessage className='text-red-500' />
                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button 
                                        type="submit" 
                                        className='w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className='flex items-center justify-center'>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Verifying...
                                            </span>
                                        ) : (
                                            "Verify Account"
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>

                        <div className='mt-6 text-center'>
                            <button 
                                onClick={() => router.push('/sign-in')}
                                className='text-indigo-600 hover:text-indigo-800 text-sm font-medium'
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default VerifyAccount;
