'use client'
import React, { useEffect, useState } from 'react'
import { useDebounceValue , useDebounceCallback } from 'usehooks-ts'
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





const Page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 300)
  // jo request fire krenge backend pe vo debounce request krenge debouncedUsername variable ke through agr username ke through karenge to kuch hoga nhi bs jaise hi key event press krenge to bar bar request jayega jisse load bhut padega 

  const { toast } = useToast()
  const router = useRouter();

  // zod implementation
  // use form ka kaam kya hai ki iske andr hm resolvers use kr skte hai
  const form = useForm<z.infer<typeof signUpSchema>>
    // ye zo z aaya hai iske pas ek aur option hota hai jo ki infer kra skta hai ki kis type ki value mere pas aaye gi ynha pe infer kra skte hai ki typeof signupschema type ki value aaye gi. Isse 100% surity ho jati hai . and ye optional hai.
    ({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        username: '',
        email: '',
        password: ''
        // ynha pe agr form aur bda hai to aur bhi values add kr skte hai aur uske liye schema bhi bna skte hai.
      }
    })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          let message = response.data.message
          setUsernameMessage(message)
          // response me phle data aata hai aur usme se fir message extract kra skte hai.
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;

          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally { // finally hmesa chalta hi chlta hai try catch chale ya na chle.
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameUnique()


  }, [username])  // jb bhi debouncedUsername hit hoga ye username ko check karega jo ki hmne bna rakha hai api ke andr check-username

  // ab submit data ko dekhte hai ki kaise krna hai....

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

    // async ki andr hme data milta hai onSubmit use krne pe. data hme handlesubmit ke through milta hai

    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast({
        title: 'Success',
        description: response.data.message
      })

      router.replace(`/verify/${username}`)
      setIsSubmitting(false)


    } catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      })

      setIsSubmitting(false)
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Whispr✨
          </h1>
          <p className='mb-4'>Sign up to start your anonymous adventure</p>
        </div>

        {/* // main khel to ynha se shuru hai form wala */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                    
                  </FormControl>
                  {isCheckingUsername && <Loader2 className='animate-spin' />}
                  <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500':'text-red-500'}`}>
                     {usernameMessage}
                  </p>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field}
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

            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : ('Signup')
              }
            </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className='text-blue-600 hover:text-blue-800'>
            Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Page
