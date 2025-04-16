// components/LayoutWithTheme.tsx
"use client"

import React, { useEffect } from "react"
import { useTheme } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import ErrorBoundary from "./ErrorBoundary"

const LayoutWithTheme = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useTheme()

  // 🔁 Sync dark class to <html> tag
  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <>
    <ErrorBoundary >
      <Navbar />
      {children}
      </ErrorBoundary>
    </>
  )
}

export default LayoutWithTheme

