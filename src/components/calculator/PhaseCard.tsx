import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface CareerPhase {
  name: string
  salary: number
  years: number
  color: string
}

interface PhaseCardProps {
  phase: CareerPhase
  index: number
  onPhaseChange?: (index: number, field: keyof CareerPhase, value: number) => void
  isEditable?: boolean
}

const phaseColors = {
  junior: "bg-onp-blue-light",
  pleno: "bg-primary",
  senior: "bg-onp-blue-dark",
  "tech-lead": "bg-onp-blue-darker",
}

const phaseTextColors = {
  junior: "text-onp-blue-light",
  pleno: "text-primary",
  senior: "text-onp-blue-dark",
  "tech-lead": "text-onp-blue-darker",
}

export function PhaseCard({
  phase,
  index,
  onPhaseChange,
  isEditable = true,
}: PhaseCardProps) {
  const phaseKey = phase.name.toLowerCase().replace(" ", "-") as
    | "junior"
    | "pleno"
    | "senior"
    | "tech-lead"

  const bgColor = phaseColors[phaseKey] || "bg-primary"
  const textColor = phaseTextColors[phaseKey] || "text-primary"

  return (
    <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={`${bgColor} text-white border-0`}>
              {phase.name}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Salário Mensal (R$)
          </label>
          <Input
            type="number"
            value={phase.salary}
            onChange={(e) =>
              onPhaseChange?.(index, "salary", Number(e.target.value))
            }
            disabled={!isEditable}
            min={0}
            step={100}
            className="text-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Duração (anos)
          </label>
          <Input
            type="number"
            value={phase.years}
            onChange={(e) =>
              onPhaseChange?.(index, "years", Number(e.target.value))
            }
            disabled={!isEditable}
            min={1}
            step={1}
            className="text-base"
          />
        </div>
      </CardContent>
    </Card>
  )
}

