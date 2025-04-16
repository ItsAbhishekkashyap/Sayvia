// src/types/user.d.ts
import { User as NextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    id: string; // Ensure 'id' is required and matches your app's user model
    username?: string;
    isPremium: boolean;
    // Add any other custom fields here
  }
}
