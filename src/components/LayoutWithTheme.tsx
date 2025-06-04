"use client"

import React, { useEffect } from "react"
import { useTheme } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import SupportButton from "@/components/SupportButton"
import { usePathname } from "next/navigation"
import CustomUserNavbar from "@/components/CustomUserNavbar"

const LayoutWithTheme = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useTheme()
  const pathname = usePathname()

  // 🔁 Sync dark class to <html> tag
  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [isDarkMode])

  // ✅ Check if current route is /u/[username]
  const isUserPage = pathname?.startsWith("/u/")

  return (
    <>
       {isUserPage ? <CustomUserNavbar /> : <Navbar />}
      {children}
    </>
  )
}

export default LayoutWithTheme


