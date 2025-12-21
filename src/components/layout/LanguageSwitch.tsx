"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import brFlag from "@/app/assets/br-flag.png"
import usFlag from "@/app/assets/us-flag.png"

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt")
  }

  const isEnglish = language === "en"

  return (
    <div className="flex items-center gap-3">

      {/* Bandeira BR */}

      <button
        onClick={() => setLanguage("pt")}
        className={`flex items-center justify-center transition-opacity cursor-pointer ${
          !isEnglish ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
        aria-label="Português"
      >
        <Image
          src={brFlag}
          alt="Bandeira do Brasil"
          width={24}
          height={16}
          className="rounded-sm"
        />
      </button>

      {/* Switch Toggle */}

      <button
        onClick={toggleLanguage}
        className="relative w-12 h-6 rounded-full border-2 border-border transition-colors ring-2 ring-primary ring-offset-2 cursor-pointer flex items-center"
        style={{ backgroundColor: '#5BA32C' }}
        aria-label={isEnglish ? "Switch to Portuguese" : "Switch to English"}
        role="switch"
        aria-checked={isEnglish}
      >
        {/* Thumb do switch */}
        <span
          className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
            isEnglish ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      {/* Bandeira EUA */}
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center justify-center transition-opacity cursor-pointer ${
          isEnglish ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
        aria-label="English"
      >
        <Image
          src={usFlag}
          alt="USA Flag"
          width={24}
          height={16}
          className="rounded-sm"
        />
      </button>
    </div>
  )
}

