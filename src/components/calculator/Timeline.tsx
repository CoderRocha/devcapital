import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CareerPhase } from "./CareerPhasesConfig"
import { GraduationCap, Briefcase, Award, Crown } from "lucide-react"

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
  if (!phases || phases.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Timeline da Carreira</h2>

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

          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-200 overflow-hidden border-l-4 p-0"
              style={{ borderLeftColor: config.color }}
            >
              <div className="flex min-h-full">

                {/* Barra colorida lateral com ícone */}

                <div
                  className="w-20 flex flex-col items-center justify-center p-4 text-white shrink-0"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon className="size-8 mb-2" />
                  <span className="text-xs font-semibold text-center leading-tight">
                    {config.label}
                  </span>
                </div>

                {/* Conteúdo do card */}
                
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {result.phase.name}
                        </CardTitle>
                        <CardDescription>
                          Anos {result.startYear} - {result.endYear} (
                          {result.phase.years} anos)
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Salário</p>
                        <p className="text-xl font-semibold text-foreground">
                          R${" "}
                          {result.phase.salary.toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          Guardado/Mês
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          R${" "}
                          {result.monthlySavings.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          Total Guardado
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          R${" "}
                          {result.totalSavedInPhase.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">
                          Acumulado ao Final
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          R${" "}
                          {result.accumulatedAtEnd.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
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