"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Wallet } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface SavingsPercentageInputProps {
  savingsPercentage?: number
  onSavingsPercentageChange?: (percentage: number) => void
}

export function SavingsPercentageInput({
  savingsPercentage: controlledSavingsPercentage = 30,
  onSavingsPercentageChange,
}: SavingsPercentageInputProps) {
  const { t } = useLanguage()
  const [internalSavingsPercentage, setInternalSavingsPercentage] = useState(30)

  const savingsPercentage =
    controlledSavingsPercentage ?? internalSavingsPercentage

  const handleChange = (value: number) => {
    if (onSavingsPercentageChange) {
      onSavingsPercentageChange(value)
    } else {
      setInternalSavingsPercentage(value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          {t("savings.percentage")}
        </CardTitle>
        <CardDescription>
          {t("savings.percentage.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {t("savings.percentage.label")}
            </label>
            <span className="text-2xl font-bold text-primary">
              {savingsPercentage}%
            </span>
          </div>
          <Slider
            value={[savingsPercentage]}
            onValueChange={([value]) => handleChange(value)}
            min={0}
            max={50}
            step={5}
            className="w-full cursor-pointer"
          />
          <Input
            type="number"
            value={savingsPercentage}
            onChange={(e) => handleChange(Number(e.target.value))}
            min={0}
            max={50}
            step={5}
            className="mt-2"
            placeholder="30"
          />
        </div>
      </CardContent>
    </Card>
  )
}