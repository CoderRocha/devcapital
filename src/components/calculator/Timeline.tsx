"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CareerPhase } from "./CareerPhasesConfig"
import { GraduationCap, Briefcase, Award, Crown } from "lucide-react"
import { useLanguage, translatePhaseName, formatCurrency } from "@/contexts/LanguageContext"

export interface PhaseResult {
  phase: CareerPhase
  startYear: number
  endYear: number
  monthlySavings: number
  totalSavedInPhase: number
  accumulatedAtEnd: number
}

interface TimelineProps {
  phases?: PhaseResult[]
}

const defaultPhases: PhaseResult[] = []

const phaseConfig = {
  junior: {
    color: "#7BC04A",
    icon: GraduationCap,
    label: "Júnior",
  },
  pleno: {
    color: "#5BA32C",
    icon: Briefcase,
    label: "Pleno",
  },
  senior: {
    color: "#4A8A24",
    icon: Award,
    label: "Sênior",
  },
  lider: {
    color: "#3D7220",
    icon: Crown,
    label: "Líder",
  },
}

export function Timeline({ phases = defaultPhases }: TimelineProps) {
  const { t, language } = useLanguage()
  
  if (!phases || phases.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">{t("timeline.title")}</h2>

      <div className="space-y-4 sm:space-y-6">
        {phases.map((result, index) => {
          const normalizedName = result.phase.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace("tech lead", "lider")
            .replace("tech-lead", "lider")
          
          const phaseKey = normalizedName as
            | "junior"
            | "pleno"
            | "senior"
            | "lider"

          const config = phaseConfig[phaseKey] || phaseConfig.pleno
          const Icon = config.icon
          const translatedPhaseName = translatePhaseName(result.phase.name, language)

          return (
            <div
              key={index}
              className="hover:shadow-lg transition-all duration-200 rounded-lg overflow-hidden border-2"
              style={{ borderColor: config.color }}
            >
              <div className="flex flex-col sm:flex-row min-h-full">

                {/* Barra colorida lateral com ícone */}

                <div
                  className="w-full sm:w-20 flex flex-row sm:flex-col items-center justify-center sm:justify-center p-3 sm:p-4 text-white shrink-0 gap-2 sm:gap-0"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon className="size-6 sm:size-8 mb-0 sm:mb-2" />
                  <span className="text-xs font-semibold text-center leading-tight">
                    {translatedPhaseName}
                  </span>
                </div>

                {/* Conteúdo do card */}
                
                <div className="flex-1 bg-card">
                  <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3 sm:gap-4">
                      <div>
                        <CardTitle className="text-lg sm:text-xl mb-1">
                          {translatedPhaseName}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {t("timeline.years", { 
                            start: result.startYear, 
                            end: result.endYear, 
                            duration: result.phase.years 
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-xs sm:text-sm text-muted-foreground">{t("timeline.salary")}</p>
                        <p className="text-lg sm:text-xl font-semibold text-foreground break-all">
                          {formatCurrency(result.phase.salary, language)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 bg-muted rounded-lg overflow-hidden">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.monthly.saved")}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground break-all">
                          {formatCurrency(result.monthlySavings, language)}
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-muted rounded-lg overflow-hidden">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.total.saved")}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground break-all">
                          {formatCurrency(result.totalSavedInPhase, language)}
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/20 overflow-hidden sm:col-span-2 lg:col-span-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.accumulated")}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg font-semibold text-primary break-all">
                          {formatCurrency(result.accumulatedAtEnd, language)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}