'use client';
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="outline">
      {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
};

export default ThemeSwitcher;


