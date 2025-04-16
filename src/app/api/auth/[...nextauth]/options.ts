import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          // ✅ Only return plain serializable object
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isPremium: user.isPremium,
            isVerified: user.isVerified,
          };
        } catch (err: any) {
          throw new Error(err.message || "Login error");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // If it's a new login
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.isPremium = user.isPremium;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },

    async session({ session, token }) {
      const dbUser = await UserModel.findOne({ email: session.user.email });

      session.user._id = dbUser._id.toString();
      session.user.username = dbUser.username;
      session.user.isVerified = dbUser.isVerified;
      session.user.isAcceptingMessages = dbUser.isAcceptingMessages;
      session.user.isPremium = dbUser.isPremium;
      session.user.messages = dbUser.messages || []; // ✅ Now TypeScript won't complain

      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  
};
