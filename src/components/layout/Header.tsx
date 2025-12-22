"use client"

import Image from "next/image"
import logo from "@/app/assets/devcapital-logo.png"
import { LanguageSwitch } from "./LanguageSwitch"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-background flex items-center justify-between px-3 sm:px-6">
      <button
        onClick={scrollToTop}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Home"
      >
        <Image
          src={logo}
          alt="Dev Capital Logo"
          width={40}
          height={40}
          className="object-contain w-8 h-8 sm:w-10 sm:h-10"
        />
        <div className="text-base sm:text-lg font-semibold text-foreground">
          Dev Capital
        </div>
      </button>
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <LanguageSwitch />
      </div>
    </header>
  )
}