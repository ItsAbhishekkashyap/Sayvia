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
import { Description } from '@radix-ui/react-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{username: string}>()
    const {toast} = useToast()

    // zod implementation
  // use form ka kaam kya hai ki iske andr hm resolvers use kr skte hai
  const form = useForm<z.infer<typeof verifySchema>>
  // ye zo z aaya hai iske pas ek aur option hota hai jo ki infer kra skta hai ki kis type ki value mere pas aaye gi ynha pe infer kra skte hai ki typeof signupschema type ki value aaye gi. Isse 100% surity ho jati hai . and ye optional hai.
  ({
    resolver: zodResolver(verifySchema),

    
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
       const response = await  axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
        })


        toast({
            title:"Success",
            description: response.data.message
        })

        router.replace('sign-in')
    } catch (error) {
        console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>;
       
      toast({
        title: "Signup failed",
        description: axiosError.response?.data.message,
        variant: "destructive"
      })

     
    }
  }



  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='wifull max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className='mb-4'>Enter the verification code sent to your email</p>
        </div>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>


      </div>
    </div>
  );
}

export default VerifyAccount;
