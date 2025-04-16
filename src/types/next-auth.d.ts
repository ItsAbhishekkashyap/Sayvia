import { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    _id?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    resetToken?: string;          // Add if needed in User object
    resetTokenExpiry?: Date; 
    isPremium: boolean;
         // Add if needed in User object
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string;
      _id?: string;
      username?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      isPremium: boolean;
      // Add resetToken fields only if you need them in session
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    // Add resetToken fields only if you need them in JWT
  }
}
