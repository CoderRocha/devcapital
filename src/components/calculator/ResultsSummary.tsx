"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useLanguage, formatCurrency } from "@/contexts/LanguageContext"

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
  const { t, language } = useLanguage()
  
  return (
    <Card 
      className="border-2 border-primary shadow-lg bg-card"
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="size-6 text-primary" />
          </div>
          <span>{t("results.final")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 bg-card rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "#7BC04A" }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {t("results.total.saved")}
            </p>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(totalSaved, language)}
            </p>
          </div>
          <div 
            className="p-6 bg-card rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "#7BC04A" }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {t("results.earned")}
            </p>
            <p className="text-3xl font-bold" style={{ color: "#4A8A24" }}>
              {formatCurrency(totalEarned, language)}
            </p>
          </div>
          <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary shadow-md">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {t("results.final.amount")}
            </p>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(finalAmount, language)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}