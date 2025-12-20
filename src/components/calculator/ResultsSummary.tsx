import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface ResultsSummaryProps {
  totalSaved?: number
  totalEarned?: number
  finalAmount?: number
}

export function ResultsSummary({
  totalSaved = 0,
  totalEarned = 0,
  finalAmount = 0,
}: ResultsSummaryProps) {
  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="size-6 text-primary" />
          Resultado Final
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-onp-blue-lighter rounded-lg border border-onp-blue-light">
            <p className="text-sm text-muted-foreground mb-2">Total Guardado</p>
            <p className="text-3xl font-bold text-primary">
              R${" "}
              {totalSaved.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-6 bg-onp-blue-lighter rounded-lg border border-onp-blue-light">
            <p className="text-sm text-muted-foreground mb-2">Juros Ganhos</p>
            <p className="text-3xl font-bold text-onp-blue-dark">
              R${" "}
              {totalEarned.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-6 bg-primary/10 rounded-lg border border-primary">
            <p className="text-sm text-muted-foreground mb-2">Valor Final</p>
            <p className="text-3xl font-bold text-primary">
              R${" "}
              {finalAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}