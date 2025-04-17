// lib/authOptions.ts
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from './dbconnect';
import User from "@/model/user";
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                console.log("🔐 Authorize called with:", credentials);
                await dbConnect()
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with this email")
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account before login')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user

                    } else {
                        throw new Error('Incorrect Password')
                    }



                } catch (err: any) {
                    throw new Error(err)

                }
            }
        })
    ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
