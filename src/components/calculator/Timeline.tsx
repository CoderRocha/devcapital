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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t("timeline.title")}</h2>

      <div className="space-y-6">
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
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-200 border-l-4 p-0"
              style={{ borderLeftColor: config.color }}
            >
              <div className="flex min-h-full">

                {/* Barra colorida lateral com ícone */}

                <div
                  className="w-20 flex flex-col items-center justify-center p-4 text-white shrink-0 rounded-l-lg"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon className="size-8 mb-2" />
                  <span className="text-xs font-semibold text-center leading-tight">
                    {translatedPhaseName}
                  </span>
                </div>

                {/* Conteúdo do card */}
                
                <div className="flex-1">
                  <CardHeader className="px-6 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {translatedPhaseName}
                        </CardTitle>
                        <CardDescription>
                          {t("timeline.years", { 
                            start: result.startYear, 
                            end: result.endYear, 
                            duration: result.phase.years 
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{t("timeline.salary")}</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(result.phase.salary, language)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.monthly.saved")}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {formatCurrency(result.monthlySavings, language)}
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.total.saved")}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {formatCurrency(result.totalSavedInPhase, language)}
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t("timeline.accumulated")}
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          {formatCurrency(result.accumulatedAtEnd, language)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}