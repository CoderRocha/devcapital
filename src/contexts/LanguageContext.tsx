"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

export const translations = {
  pt: {
    "app.title": "Dev Capital",
    "calculator.title": "Planeje seu Futuro Financeiro",
    "calculator.subtitle": "Calcule quanto você pode acumular através das diferentes fases da sua carreira como desenvolvedor",
    "interest.rate": "Taxa de Juros",
    "interest.rate.description": "Selecione o tipo e ajuste a taxa de juros",
    "interest.annual": "Anual",
    "interest.monthly": "Mensal",
    "interest.rate.label": "Taxa de Juros {type}",
    "savings.percentage": "Percentual de Economia",
    "savings.percentage.description": "Quanto você pretende guardar do seu salário",
    "savings.percentage.label": "Percentual",
    "initial.deposit": "Aporte Inicial",
    "initial.deposit.description": "Valor inicial que você já possui para investir",
    "initial.deposit.label": "Valor Inicial",
    "career.phases": "Fases da Carreira",
    "career.phases.description": "Configure salário e duração de cada fase",
    "phase.salary": "Salário Mensal",
    "phase.years": "Duração (anos)",
    "calculate": "Calcular",
    "results.final": "Resultado Final",
    "results.total.saved": "Total Guardado",
    "results.earned": "Juros Ganhos",
    "results.final.amount": "Valor Final",
    "timeline.title": "Timeline da Carreira",
    "timeline.years": "{start} - {end} Anos ({duration} anos)",
    "timeline.salary": "Salário",
    "timeline.monthly.saved": "Guardado/Mês",
    "timeline.total.saved": "Total Guardado",
    "timeline.accumulated": "Acumulado ao Final",
    "download": "Baixar",
    "placeholder.message": "Configure os valores e clique em 'Calcular' para ver os resultados",
    "phase.junior": "Júnior",
    "phase.pleno": "Pleno",
    "phase.senior": "Sênior",
    "phase.lider": "Tech Lead",
    "pdf.title": "Planejamento Financeiro para Devs",
    "pdf.generated": "Relatório gerado em: {date}",
    "pdf.footer": "Dev Capital - Calculadora de Juros Compostos para Devs",
    "pdf.copyright": "Criado por Guilherme Rocha (github.com/coderrocha)",
    "pdf.filename": "Planejamento Financeiro para Devs",
  },
  en: {
    "app.title": "Dev Capital",
    "calculator.title": "Plan Your Financial Future",
    "calculator.subtitle": "Calculate how much you can accumulate through the different phases of your career as a developer",
    "interest.rate": "Interest Rate",
    "interest.rate.description": "Select the type and adjust the interest rate",
    "interest.annual": "Annual",
    "interest.monthly": "Monthly",
    "interest.rate.label": "Interest Rate {type}",
    "savings.percentage": "Savings Percentage",
    "savings.percentage.description": "How much you plan to save from your salary",
    "savings.percentage.label": "Percentage",
    "initial.deposit": "Initial Deposit",
    "initial.deposit.description": "Initial amount you already have to invest",
    "initial.deposit.label": "Initial Value",
    "career.phases": "Career Phases",
    "career.phases.description": "Configure salary and duration of each phase",
    "phase.salary": "Monthly Salary",
    "phase.years": "Duration (years)",
    "calculate": "Calculate",
    "results.final": "Final Result",
    "results.total.saved": "Total Saved",
    "results.earned": "Interest Earned",
    "results.final.amount": "Final Amount",
    "timeline.title": "Career Timeline",
    "timeline.years": "{start} - {end} Years ({duration} years)",
    "timeline.salary": "Salary",
    "timeline.monthly.saved": "Saved/Month",
    "timeline.total.saved": "Total Saved",
    "timeline.accumulated": "Accumulated at End",
    "download": "Download",
    "placeholder.message": "Configure the values and click 'Calculate' to see the results",
    "phase.junior": "Junior",
    "phase.pleno": "Mid-level",
    "phase.senior": "Senior",
    "phase.lider": "Tech Lead",
    "pdf.title": "Financial Planning for Devs",
    "pdf.generated": "Report generated on: {date}",
    "pdf.footer": "Dev Capital - Compound Interest Calculator for Devs",
    "pdf.copyright": "Created by Guilherme Rocha (github.com/coderrocha)",
    "pdf.filename": "Financial Planning for Devs",
  },
}

export function translatePhaseName(name: string, language: Language): string {
  const normalizedName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("tech lead", "lider")
    .replace("tech-lead", "lider")
    .replace("leader", "lider")

  const phaseKey = normalizedName as "junior" | "pleno" | "senior" | "lider"
  const key = `phase.${phaseKey}` as keyof typeof translations.pt
  
  return translations[language][key] || name
}

export function formatCurrency(value: number, language: Language): string {
  const currency = language === "en" ? "$" : "R$"
  const locale = language === "pt" ? "pt-BR" : "en-US"
  
  return `${currency} ${value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key as keyof typeof translations.pt] || key
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value))
      })
    }
    return text
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

