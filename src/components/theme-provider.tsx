// src/components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export type Theme = "light" | "dark" | "system"
export type ColorTheme = "default" | "ocean" | "forest" | "sunset" | "lavender" | "monochrome"

export interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode
  serverTheme?: Theme
  serverColorTheme?: ColorTheme
}

export function ThemeProvider({ 
  children, 
  serverTheme,
  serverColorTheme,
  ...props 
}: ExtendedThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <NextThemesProvider 
      defaultTheme={serverTheme || "system"}
      {...props}
    >
      <ColorThemeInitializer serverColorTheme={serverColorTheme}>
        {children}
      </ColorThemeInitializer>
    </NextThemesProvider>
  )
}

function ColorThemeInitializer({ 
  children,
  serverColorTheme 
}: { 
  children: React.ReactNode,
  serverColorTheme?: ColorTheme 
}) {
  const [initialized, setInitialized] = React.useState(false)
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(serverColorTheme || "default")

  React.useEffect(() => {
    // Initialize from localStorage or server
    const savedColorTheme = localStorage.getItem("color-theme") as ColorTheme | null
    const initialColorTheme = serverColorTheme || savedColorTheme || "default"
    
    // Remove all theme classes
    document.documentElement.classList.remove(
      "theme-default",
      "theme-ocean",
      "theme-forest",
      "theme-sunset",
      "theme-lavender",
      "theme-monochrome",
    )

    if (initialColorTheme !== "default") {
      document.documentElement.classList.add(`theme-${initialColorTheme}`)
    }

    setColorTheme(initialColorTheme)
    setInitialized(true)
  }, [serverColorTheme])

  if (!initialized) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return <>{children}</>
}

export function useExtendedTheme() {
  const { data: session } = useSession()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>("default")

  const updateColorTheme = React.useCallback(async (newColorTheme: ColorTheme) => {
    // Update local state
    document.documentElement.classList.remove(
      "theme-default",
      "theme-ocean",
      "theme-forest",
      "theme-sunset",
      "theme-lavender",
      "theme-monochrome",
    )

    if (newColorTheme !== "default") {
      document.documentElement.classList.add(`theme-${newColorTheme}`)
    }

    localStorage.setItem("color-theme", newColorTheme)
    setColorTheme(newColorTheme)

    // Sync with server if authenticated
    if (session?.user) {
      try {
        await fetch('/api/user/theme', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            colorTheme: newColorTheme,
            theme: theme
          })
        })
      } catch (error) {
        console.error('Failed to sync theme with server:', error)
      }
    }
  }, [session, theme])

  return {
    theme: theme as Theme,
    setTheme,
    resolvedTheme: resolvedTheme as Theme,
    colorTheme,
    setColorTheme: updateColorTheme,
  }
}