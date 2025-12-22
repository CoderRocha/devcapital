"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function CalculatorHeader() {
  const { t } = useLanguage()

  return (
    <div className="text-center py-6 sm:py-8 lg:py-12 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in-up">
        {t("calculator.title")}
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground animate-fade-in-up-delay-1 mt-4 sm:mt-6">
        {t("calculator.subtitle")}
      </p>
    </div>
  )
}