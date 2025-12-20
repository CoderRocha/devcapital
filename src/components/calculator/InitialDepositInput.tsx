"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PiggyBank } from "lucide-react"

interface InitialDepositInputProps {
  initialDeposit?: number
  onInitialDepositChange?: (value: number) => void
}

export function InitialDepositInput({
  initialDeposit: controlledInitialDeposit = 0,
  onInitialDepositChange,
}: InitialDepositInputProps) {
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
          Aporte Inicial
        </CardTitle>
        <CardDescription>
          Valor inicial que você já possui para investir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Valor Inicial
            </label>
            <span className="text-xl font-bold text-primary">
              R${" "}
              {initialDeposit.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
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