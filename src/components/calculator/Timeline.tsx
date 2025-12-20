import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CareerPhase } from "./CareerPhasesConfig"

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

const phaseColors = {
  junior: "bg-onp-green-light",
  pleno: "bg-primary",
  senior: "bg-onp-green-dark",
  "tech-lead": "bg-onp-green-darker",
}

export function Timeline({ phases = defaultPhases }: TimelineProps) {
  if (!phases || phases.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Timeline da Carreira</h2>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-onp-green-lighter" />

        <div className="space-y-8">
          {phases.map((result, index) => {
            const phaseKey = result.phase.name
              .toLowerCase()
              .replace(" ", "-") as
              | "junior"
              | "pleno"
              | "senior"
              | "tech-lead"

            const bgColor = phaseColors[phaseKey] || "bg-primary"

            return (
              <div key={index} className="relative pl-20">
                <div
                  className={`absolute left-6 top-6 size-4 rounded-full border-4 border-white ${bgColor} shadow-sm`}
                />

                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <Badge className={`${bgColor} text-white border-0`}>
                            {result.phase.name}
                          </Badge>
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
                          {(result.monthlySavings || 0).toLocaleString("pt-BR", {
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
                          {(result.totalSavedInPhase || 0).toLocaleString("pt-BR", {
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
                          {(result.accumulatedAtEnd || 0).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}