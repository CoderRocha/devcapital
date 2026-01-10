"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { PhaseCard } from "./PhaseCard"
import { useLanguage } from "@/contexts/LanguageContext"

export interface CareerPhase {
  name: string
  salary: number
  years: number
  color: string
  savingsPercentage: number
}

interface CareerPhasesConfigProps {
  phases?: CareerPhase[]
  onPhaseChange?: (index: number, field: keyof CareerPhase, value: number) => void
}

const defaultPhases: CareerPhase[] = [
  { name: "Júnior", salary: 4500, years: 2, color: "bg-onp-green-light", savingsPercentage: 30 },
  { name: "Pleno", salary: 8000, years: 3, color: "bg-primary", savingsPercentage: 30 },
  { name: "Sênior", salary: 14000, years: 4, color: "bg-onp-green-dark", savingsPercentage: 30 },
  { name: "Tech Lead", salary: 17000, years: 5, color: "bg-onp-green-darker", savingsPercentage: 30 },
]

export function CareerPhasesConfig({
  phases = defaultPhases,
  onPhaseChange,
}: CareerPhasesConfigProps) {
  const { t } = useLanguage()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5 text-primary" />
          {t("career.phases")}
        </CardTitle>
        <CardDescription>
          {t("career.phases.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phases.map((phase, index) => (
            <PhaseCard
              key={index}
              phase={phase}
              index={index}
              onPhaseChange={onPhaseChange}
              isEditable={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}