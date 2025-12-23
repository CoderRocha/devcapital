"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function CalculatorHeader() {
  const { t, language } = useLanguage()

  const renderTitle = () => {
    const title = t("calculator.title")
    if (language === "pt") {
      const parts = title.split("Futuro Financeiro")
      return (
        <>
          {parts[0]}
          <span className="text-primary">Futuro Financeiro</span>
        </>
      )
    } else {
      const parts = title.split("Financial Future")
      return (
        <>
          {parts[0]}
          <span className="text-primary">Financial Future</span>
        </>
      )
    }
  }

  const renderSubtitle = () => {
    const subtitle = t("calculator.subtitle")
    if (language === "pt") {
      const parts = subtitle.split("você pode acumular")
      return (
        <>
          {parts[0]}
          <span className="text-primary">você pode acumular</span>
          {parts[1]}
        </>
      )
    } else {
      const parts = subtitle.split("you can accumulate")
      return (
        <>
          {parts[0]}
          <span className="text-primary">you can accumulate</span>
          {parts[1]}
        </>
      )
    }
  }

  return (
    <div className="text-center py-6 sm:py-8 lg:py-12 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in-up">
        {renderTitle()}
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground animate-fade-in-up-delay-1 mt-4 sm:mt-6">
        {renderSubtitle()}
      </p>
    </div>
  )
}