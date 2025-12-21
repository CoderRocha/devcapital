import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GraduationCap, Briefcase, Award, Crown } from "lucide-react"

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

const phaseConfig = {
  junior: {
    color: "#7BC04A",
    icon: GraduationCap,
  },
  pleno: {
    color: "#5BA32C",
    icon: Briefcase,
  },
  senior: {
    color: "#4A8A24",
    icon: Award,
  },
  lider: {
    color: "#3D7220",
    icon: Crown,
  },
}

export function PhaseCard({
  phase,
  index,
  onPhaseChange,
  isEditable = true,
}: PhaseCardProps) {
  const normalizedName = phase.name
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
    <Card className="border-l-4 hover:shadow-md transition-shadow duration-200" style={{ borderLeftColor: config.color }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon className="size-4" style={{ color: config.color }} />
              <Badge className="text-white border-0" style={{ backgroundColor: config.color }}>
                {phase.name}
              </Badge>
            </div>
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

