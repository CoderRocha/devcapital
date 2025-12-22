"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer overflow-hidden"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5">

        {/* Modo claro */}

        <Sun
          className={`absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 transition-all duration-500 ease-in-out ${
            !isDark
              ? "opacity-100 rotate-0 scale-100 translate-y-0"
              : "opacity-0 rotate-180 scale-0 -translate-y-6"
          }`}
        />
        {/* Modo escuro */}
        <Moon
          className={`absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 text-blue-300 transition-all duration-500 ease-in-out ${
            isDark
              ? "opacity-100 rotate-0 scale-100 translate-y-0"
              : "opacity-0 -rotate-180 scale-0 translate-y-6"
          }`}
        />
      </div>
    </button>
  )
}

