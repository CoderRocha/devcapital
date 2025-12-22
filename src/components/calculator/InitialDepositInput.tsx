"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PiggyBank } from "lucide-react"
import { useLanguage, formatCurrency } from "@/contexts/LanguageContext"

interface InitialDepositInputProps {
  initialDeposit?: number
  onInitialDepositChange?: (value: number) => void
}

export function InitialDepositInput({
  initialDeposit: controlledInitialDeposit = 0,
  onInitialDepositChange,
}: InitialDepositInputProps) {
  const { t, language } = useLanguage()
  const [internalInitialDeposit, setInternalInitialDeposit] = useState(0)

  const initialDeposit =
    controlledInitialDeposit ?? internalInitialDeposit

  const handleChange = (value: number) => {
    const newValue = Math.max(0, value)
    if (onInitialDepositChange) {
      onInitialDepositChange(newValue)
    } else {
      setInternalInitialDeposit(newValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="size-5 text-primary" />
          {t("initial.deposit")}
        </CardTitle>
        <CardDescription>
          {t("initial.deposit.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              {t("initial.deposit.label")}
            </label>
            <span className="text-lg sm:text-xl font-bold text-primary break-all text-right ml-2">
              {formatCurrency(initialDeposit, language)}
            </span>
          </div>
          <Input
            type="number"
            value={initialDeposit}
            onChange={(e) => handleChange(Number(e.target.value))}
            min={0}
            step={100}
            className="text-base"
            placeholder="0,00"
          />
        </div>
      </CardContent>
    </Card>
  )
}