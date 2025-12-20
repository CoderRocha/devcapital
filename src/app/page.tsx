"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/Header"
import { CalculatorHeader } from "@/components/calculator/CalculatorHeader"
import { InterestRateSelector } from "@/components/calculator/InterestRateSelector"
import { InitialDepositInput } from "@/components/calculator/InitialDepositInput"
import { SavingsPercentageInput } from "@/components/calculator/SavingsPercentageInput"
import { CareerPhasesConfig, type CareerPhase } from "@/components/calculator/CareerPhasesConfig"
import { ResultsSummary } from "@/components/calculator/ResultsSummary"
import { Timeline } from "@/components/calculator/Timeline"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

type RateType = "annual" | "monthly"

interface PhaseResult {
  phase: CareerPhase
  startYear: number
  endYear: number
  monthlySavings: number
  totalSavedInPhase: number
  accumulatedAtEnd: number
}

export default function Home() {
  const [rateType, setRateType] = useState<RateType>("annual")
  const [interestRate, setInterestRate] = useState(10)
  const [initialDeposit, setInitialDeposit] = useState(0)
  const [savingsPercentage, setSavingsPercentage] = useState(30)
  const [calculated, setCalculated] = useState(false)

  const [phases, setPhases] = useState<CareerPhase[]>([
    { name: "Júnior", salary: 4500, years: 2, color: "bg-onp-green-light" },
    { name: "Pleno", salary: 8000, years: 3, color: "bg-primary" },
    { name: "Sênior", salary: 14000, years: 4, color: "bg-onp-green-dark" },
    { name: "Tech Lead", salary: 17000, years: 5, color: "bg-onp-green-darker" },
  ])

  const handlePhaseChange = (
    index: number,
    field: keyof CareerPhase,
    value: number
  ) => {
    const updated = [...phases]
    updated[index] = { ...updated[index], [field]: value }
    setPhases(updated)
    setCalculated(false)
  }

  // Função para calcular juros compostos mensais
  const calculateCompoundInterest = (
    principal: number,
    monthlyDeposit: number,
    monthlyRate: number,
    months: number
  ): number => {
    let amount = principal
    
    for (let i = 0; i < months; i++) {
      amount = amount * (1 + monthlyRate) + monthlyDeposit
    }
    
    return amount
  }

  // Calcular resultados quando o botão for clicado
  const results = useMemo(() => {
    if (!calculated) return []

    const phaseResults: PhaseResult[] = []
    let accumulated = initialDeposit
    let currentYear = 0

    // Converter taxa anual para mensal (se necessário)
    const monthlyRate = rateType === "annual" 
      ? interestRate / 100 / 12 
      : interestRate / 100

    phases.forEach((phase) => {
      const monthlySavings = (phase.salary * savingsPercentage) / 100
      const months = phase.years * 12
      
      // Calcular quanto foi guardado nesta fase (sem juros)
      const totalSavedInPhase = monthlySavings * months
      
      // Calcular acumulado ao final da fase (com juros compostos)
      accumulated = calculateCompoundInterest(
        accumulated,
        monthlySavings,
        monthlyRate,
        months
      )

      phaseResults.push({
        phase,
        monthlySavings,
        totalSavedInPhase,
        accumulatedAtEnd: accumulated,
        startYear: currentYear,
        endYear: currentYear + phase.years,
      })

      currentYear += phase.years
    })

    return phaseResults
  }, [phases, interestRate, savingsPercentage, rateType, calculated, initialDeposit])

  const totalSaved = initialDeposit + results.reduce((sum, r) => sum + r.totalSavedInPhase, 0)
  const finalAmount = results[results.length - 1]?.accumulatedAtEnd || 0
  const totalEarned = finalAmount - totalSaved

  const handleCalculate = () => {
    setCalculated(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalculatorHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          
          {/* Painel de Configurações */}
          
          <div className="lg:col-span-1 space-y-6">
            <InterestRateSelector
              rateType={rateType}
              onRateTypeChange={(type) => {
                setRateType(type)
                setCalculated(false)
              }}
              interestRate={interestRate}
              onInterestRateChange={(rate) => {
                setInterestRate(rate)
                setCalculated(false)
              }}
            />

            <InitialDepositInput
              initialDeposit={initialDeposit}
              onInitialDepositChange={(value) => {
                setInitialDeposit(value)
                setCalculated(false)
              }}
            />

            <SavingsPercentageInput
              savingsPercentage={savingsPercentage}
              onSavingsPercentageChange={(percentage) => {
                setSavingsPercentage(percentage)
                setCalculated(false)
              }}
            />

            <CareerPhasesConfig
              phases={phases}
              onPhaseChange={handlePhaseChange}
            />

            {/* Botão de Calcular */}

            <Button
              onClick={handleCalculate}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              <Calculator className="size-5 mr-2" />
              Calcular
            </Button>
          </div>

          {/* Resultados */}
          
          <div className="lg:col-span-2 space-y-8">
            {calculated ? (
              <>
                <Timeline phases={results} />

                <ResultsSummary
                  totalSaved={totalSaved}
                  totalEarned={totalEarned}
                  finalAmount={finalAmount}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                <div className="text-center">
                  <Calculator className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Configure os valores e clique em "Calcular" para ver os resultados
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
