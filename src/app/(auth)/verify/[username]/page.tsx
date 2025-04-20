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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username: string}>()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = React.useState(false)

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })

            toast({
                title: "Success",
                description: response.data.message,
                className: "bg-green-500 text-white"
            })

            router.replace('/sign-in')
        } catch (error) {
            console.error("Verification error", error)
            const axiosError = error as AxiosError<ApiResponse>;
            
            toast({
                title: "Verification Failed",
                description: axiosError.response?.data.message || "An error occurred",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
      <>
        <div className='relative flex min-h-screen mt-10 flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 p-4'>
            {/* Floating Particles Background */}
            <div className='absolute inset-0 overflow-hidden'>
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className='absolute rounded-full bg-indigo-200/30 dark:bg-indigo-800/30'
                        style={{
                            width: Math.random() * 10 + 5 + 'px',
                            height: Math.random() * 10 + 5 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: Math.random() * 5 + 's'
                        }}
                    />
                ))}
            </div>

            {/* Branding */}
            <div className='relative mb-10 flex flex-col items-center'>
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-2xl bg-purple-600 rotate-45 transform"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                        S
                    </div>
                </div>
                <h1 className='mt-4 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400'>
                    SAYVIA
                </h1>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                The secure platform for unfiltered communication
                </p>
            </div>

            {/* Verification Card */}
            <Card className='relative w-full max-w-md border-0 shadow-xl dark:border dark:border-gray-700 overflow-hidden'>
                {/* Decorative Accent */}
                <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500'></div>
                
                <CardHeader className='space-y-3 text-center px-8 pt-10 pb-2'>
                    <CardTitle className='text-3xl font-bold tracking-tight'>
                        Verify Your Account
                    </CardTitle>
                    <p className='text-muted-foreground'>
                        We&#39;ve sent a 6-digit code to your email
                    </p>
                </CardHeader>
                
                <CardContent className='px-8 pb-8'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='sr-only'>Verification Code</FormLabel>
                                        <FormControl>
                                            <div className='flex justify-center'>
                                                <Input 
                                                    {...field} 
                                                    placeholder="• • • • • •" 
                                                    className='h-16 w-64 text-center text-2xl font-mono tracking-[1rem] border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800'
                                                    maxLength={6}
                                                    autoComplete='one-time-code'
                                                    inputMode='numeric'
                                                    pattern='\d{6}'
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-center text-xs' />
                                    </FormItem>
                                )}
                            />
                            
                            <div className='space-y-4'>
                                <Button 
                                    type="submit" 
                                    className='w-full h-12 text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className='flex items-center'>
                                            <span className='mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                            Verifying...
                                        </span>
                                    ) : (
                                        'Verify Account'
                                    )}
                                </Button>

                                {/* <div className='text-center text-sm text-muted-foreground'>
                                    Didn&#39;t receive a code?{' '}
                                    <button 
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
                                    >
                                        Resend
                                    </button>
                                </div> */}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className='relative mt-8 text-center text-xs text-gray-500 dark:text-gray-400'>
                <p>By continuing, you agree to our <a href="#" className='underline'>Terms of Service</a></p>
            </div>

            {/* Global Styles for Animation */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
                }
            `}</style>
        </div>
        <Footer/>
        </>
    )
}

export default VerifyAccount