'use client'
import React, { useEffect, useState } from 'react'
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
// import { Form, useForm } from "react-hook-form"
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FormProvider } from "react-hook-form";
import * as z from "zod"
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { FormField } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'
import { FormLabel } from '@/components/ui/form'
import { FormDescription } from '@/components/ui/form'
import { FormMessage } from '@/components/ui/form'
import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'





const Page = () => {

 


  // jo request fire krenge backend pe vo debounce request krenge debouncedUsername variable ke through agr username ke through karenge to kuch hoga nhi bs jaise hi key event press krenge to bar bar request jayega jisse load bhut padega 

  // const debouncedUsername  = useDebounceValue(username, 300)
  const { toast } = useToast()
  const router = useRouter();
 
  // zod implementation
  // use form ka kaam kya hai ki iske andr hm resolvers use kr skte hai
  const form = useForm<z.infer<typeof signInSchema>>
    // ye zo z aaya hai iske pas ek aur option hota hai jo ki infer kra skta hai ki kis type ki value mere pas aaye gi ynha pe infer kra skte hai ki typeof signupschema type ki value aaye gi. Isse 100% surity ho jati hai . and ye optional hai.
    ({
      resolver: zodResolver(signInSchema),
      defaultValues: {

        identifier: '',
        password: ''
        // ynha pe agr form aur bda hai to aur bhi values add kr skte hai aur uske liye schema bhi bna skte hai.
      }
    })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {

    // async ki andr hme data milta hai onSubmit use krne pe. data hme handlesubmit ke through milta hai

    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if (result?.error) {
      toast({
        title: "Login failed",
        description: "Incorrect username or password",
        variant: "destructive"
      })
    }

    if (result?.url) {
      router.replace('/dashboard')
    }
  }



  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className='mb-4'>Sign in to start your anonymous adventure</p>
        </div>

        {/* // main khel to ynha se shuru hai form wala */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" >
              SignIn
            </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member?{' '}
            <Link href="/sign-up" className='text-blue-600 hover:text-blue-800'>
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Page
