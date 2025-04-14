'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
// import { Button } from '@react-email/components'
import { Button } from "@/components/ui/button"
// jnha use keyword aaye uska mtlb hm data vnha se nhi lenge blki hook se import karayenge.
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';


const Navbar = () => {

    const {data: session} = useSession()
    const user: User = session?.user

  return (
    <nav className='p-4 md:p-6 bg-background text-foreground shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="#">Whispr✨</a>
            {
                session ? (
                    <>
                    <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                    <ThemeSwitcher /> 
                    <Button className='w-full md:w-auto' onClick={()=> signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link href='/sign-in'>
  <Button className='w-full md:w-auto'>Login</Button>
</Link>

                )
            }
        </div>
    </nav>
  )
}

export default Navbar
