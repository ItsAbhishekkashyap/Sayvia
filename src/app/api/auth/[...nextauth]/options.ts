import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbconnect";
import User from "@/model/user";

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

    cookies: {
        sessionToken: {
          name: process.env.NODE_ENV === 'production'
            ? '__Secure-next-auth.session-token'
            : 'next-auth.session-token',
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production", // should be false in dev
          },
        },
      },
      

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username
            }

            return token
        },
        async session({ session, token }) {
            console.log("🔥 SESSION CALLBACK STARTED");
          
            try {
              const dbUser = await User.findOne({ email: session.user.email });
          
              if (!dbUser) {
                console.error("❌ No user found in DB for session email:", session.user.email);
                return session;
              }
          
              session.user._id = dbUser._id.toString();
              session.user.username = dbUser.username;
              session.user.isVerified = dbUser.isVerified;
              session.user.isAcceptingMessages = dbUser.isAcceptingMessages;
              session.user.isPremium = dbUser.isPremium;
              session.user.messages = dbUser.messages || [];
          
              console.log("✅ Session hydrated:", session.user.username);
              return session;
            } catch (err) {
              console.error("❌ Error in session callback:", err);
              return session; // fallback
            }
          }
          ,
    },



    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    
    secret: process.env.NEXTAUTH_SECRET,

}