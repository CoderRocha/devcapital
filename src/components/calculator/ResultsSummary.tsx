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
    <Card 
      className="border-2 border-primary shadow-lg"
      style={{
        background: "linear-gradient(to bottom right, white, rgba(232, 245, 224, 0.3))"
      }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="size-6 text-primary" />
          </div>
          <span>Resultado Final</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "#7BC04A" }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Total Guardado
            </p>
            <p className="text-3xl font-bold text-primary">
              R${" "}
              {totalSaved.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div 
            className="p-6 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "#7BC04A" }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Juros Ganhos
            </p>
            <p className="text-3xl font-bold" style={{ color: "#4A8A24" }}>
              R${" "}
              {totalEarned.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary shadow-md">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Valor Final
            </p>
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