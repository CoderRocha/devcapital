"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"

type RateType = "annual" | "monthly"

interface InterestRateSelectorProps {
  rateType?: RateType
  onRateTypeChange?: (type: RateType) => void
  interestRate?: number
  onInterestRateChange?: (rate: number) => void
}

export function InterestRateSelector({
  rateType: controlledRateType,
  onRateTypeChange,
  interestRate: controlledInterestRate = 10,
  onInterestRateChange,
}: InterestRateSelectorProps) {
  const { t } = useLanguage()
  const [internalRateType, setInternalRateType] = useState<RateType>("annual")
  const [internalInterestRate, setInternalInterestRate] = useState(10)

  const rateType = controlledRateType ?? internalRateType
  const interestRate = controlledInterestRate ?? internalInterestRate

  const handleRateTypeChange = (type: RateType) => {
    if (onRateTypeChange) {
      onRateTypeChange(type)
    } else {
      setInternalRateType(type)
    }
  }

  const handleRateChange = (value: number) => {
    if (onInterestRateChange) {
      onInterestRateChange(value)
    } else {
      setInternalInterestRate(value)
    }
  }

  const maxRate = rateType === "annual" ? 20 : 2
  const step = rateType === "annual" ? 0.5 : 0.1

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="size-5 text-primary" />
          {t("interest.rate")}
        </CardTitle>
        <CardDescription>
          {t("interest.rate.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Toggle Anual/Mensal */}
        
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => handleRateTypeChange("annual")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
              rateType === "annual"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t("interest.annual")}
          </button>
          <button
            type="button"
            onClick={() => handleRateTypeChange("monthly")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
              rateType === "monthly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t("interest.monthly")}
          </button>
        </div>

        {/* Slider e Input */}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {t("interest.rate.label", { type: rateType === "annual" ? t("interest.annual") : t("interest.monthly") })}
            </label>
            <span className="text-lg font-semibold text-primary">
              {interestRate}%
            </span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={([value]) => handleRateChange(value)}
            min={0}
            max={maxRate}
            step={step}
            className="w-full"
          />
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => handleRateChange(Number(e.target.value))}
            min={0}
            max={maxRate}
            step={step}
            className="mt-2"
            placeholder="0"
          />
        </div>
      </CardContent>
    </Card>
  )
}