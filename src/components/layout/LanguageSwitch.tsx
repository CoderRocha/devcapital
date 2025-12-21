"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt")
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="icon"
      className="gap-2 px-3"
      aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      {language === "pt" ? (
        <span className="text-2xl">🇧🇷</span>
      ) : (
        <span className="text-2xl">🇺🇸</span>
      )}
    </Button>
  )
}

