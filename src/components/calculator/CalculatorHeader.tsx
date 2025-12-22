"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function CalculatorHeader() {
  const { t } = useLanguage()

  return (
    <div className="text-center py-12 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
        {t("calculator.title")}
      </h1>
      <br />
      <br />
      <p className="text-lg text-muted-foreground animate-fade-in-up-delay-1">
        {t("calculator.subtitle")}
      </p>
    </div>
  )
}