import Image from "next/image"
import logo from "@/app/assets/devcapital-logo.png"
import { LanguageSwitch } from "./LanguageSwitch"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="Dev Capital Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="text-lg font-semibold text-foreground">
          Dev Capital
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitch />
      </div>
    </header>
  )
}