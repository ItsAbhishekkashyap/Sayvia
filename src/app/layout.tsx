// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWithTheme from "@/components/LayoutWithTheme";
import SupportButton from "@/components/SupportButton";
import { MessageCircleHeart} from "lucide-react";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sayvia✨",
  description: "Send anonymous messages to your friends!",
  icons: {
    icon: "/phone.svg", 
    
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html  lang="en" suppressHydrationWarning>
        <body  className={inter.className}>
          <ThemeProvider>
            <AuthProvider>
              <LayoutWithTheme>
                {children}
                
              </LayoutWithTheme>
              <SupportButton />
              {/* <div className="fixed bottom-4 right-4 bg-yellow-500 rounded-full text-white p-4">support</div> */}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  

  

