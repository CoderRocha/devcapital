import jsPDF from "jspdf"
import { translations, translatePhaseName, formatCurrency, type Language } from "@/contexts/LanguageContext"

interface PDFData {
  totalSaved: number
  totalEarned: number
  finalAmount: number
  language?: Language
  logoBase64?: string
  phases?: Array<{
    name: string
    startYear: number
    endYear: number
    monthlySavings: number
    totalSavedInPhase: number
    accumulatedAtEnd: number
    salary: number
  }>
}

export function generatePDF(data: PDFData) {
  const language: Language = (data.language === "en" || data.language === "pt") 
    ? data.language 
    : "pt"
  
  const t = (key: string, params?: Record<string, string | number>): string => {
    
    const langTranslations = translations[language] || translations.pt
    let text = langTranslations[key as keyof typeof translations.pt] || key
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value))
      })
    }
    return text
  }
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  const primaryColor = "#5BA32C"
  const lightGreen = "#E8F5E0"
  const darkGreen = "#4A8A24"

  doc.setFontSize(24)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  doc.text(t("pdf.title"), pageWidth / 2, yPosition, {
    align: "center",
  })
  yPosition += 15

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  const date = new Date().toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  doc.text(t("pdf.generated", { date }), pageWidth / 2, yPosition, {
    align: "center",
  })
  yPosition += 20

  if (data.phases && data.phases.length > 0) {
    const phases = data.phases
    doc.setFontSize(18)
    doc.setTextColor(primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text(t("timeline.title"), margin, yPosition)
    yPosition += 15

    phases.forEach((phase, index) => {
      if (yPosition > pageHeight - 50) {
        doc.addPage()
        yPosition = margin
      }

      const translatedPhaseName = translatePhaseName(phase.name, language)
      
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "bold")
      doc.text(translatedPhaseName, margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text(
        t("timeline.years", {
          start: phase.startYear,
          end: phase.endYear,
          duration: phase.endYear - phase.startYear,
        }),
        margin,
        yPosition
      )
      yPosition += 10

      doc.setFontSize(9)
      doc.setTextColor(0, 0, 0)
      doc.text(
        `${t("timeline.salary")}: ${formatCurrency(phase.salary, language)}`,
        margin,
        yPosition
      )
      yPosition += 6
      doc.text(
        `${t("timeline.monthly.saved")}: ${formatCurrency(phase.monthlySavings, language)}`,
        margin,
        yPosition
      )
      yPosition += 6
      doc.text(
        `${t("timeline.total.saved")}: ${formatCurrency(phase.totalSavedInPhase, language)}`,
        margin,
        yPosition
      )
      yPosition += 6
      doc.setFont("helvetica", "bold")
      doc.setTextColor(primaryColor)
      doc.text(
        `${t("timeline.accumulated")}: ${formatCurrency(phase.accumulatedAtEnd, language)}`,
        margin,
        yPosition
      )
      yPosition += 15

      if (index < phases.length - 1) {
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(0.5)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 10
      }
    })
    
    yPosition += 20
  }

  if (yPosition > pageHeight - 80) {
    doc.addPage()
    yPosition = margin
  }

  doc.setFontSize(18)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  doc.text(t("results.final"), margin, yPosition)
  yPosition += 15

  const cardWidth = (pageWidth - margin * 2 - 10) / 3
  const cardHeight = 40
  const cardY = yPosition

  const splitTextToFit = (text: string, maxWidth: number, fontSize: number): string[] => {
    doc.setFontSize(fontSize)
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const width = doc.getTextWidth(testLine)
      
      if (width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    
    if (currentLine) {
      lines.push(currentLine)
    }
    
    return lines
  }

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(123, 192, 74)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text(t("results.total.saved"), margin + 5, cardY + 8)

  doc.setFontSize(14)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  const totalSavedText = formatCurrency(data.totalSaved, language)
  const totalSavedLines = splitTextToFit(totalSavedText, cardWidth - 10, 14)
  totalSavedLines.forEach((line, index) => {
    doc.text(line, margin + 5, cardY + 20 + (index * 6))
  })

  const card2X = margin + cardWidth + 5
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(card2X, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(123, 192, 74)
  doc.roundedRect(card2X, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text(t("results.earned"), card2X + 5, cardY + 8)

  doc.setFontSize(14)
  doc.setTextColor(darkGreen)
  doc.setFont("helvetica", "bold")
  const totalEarnedText = formatCurrency(data.totalEarned, language)
  const totalEarnedLines = splitTextToFit(totalEarnedText, cardWidth - 10, 14)
  totalEarnedLines.forEach((line, index) => {
    doc.text(line, card2X + 5, cardY + 20 + (index * 6))
  })

  const card3X = card2X + cardWidth + 5
  doc.setFillColor(232, 245, 224)
  doc.roundedRect(card3X, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(primaryColor)
  doc.setLineWidth(0.8)
  doc.roundedRect(card3X, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text(t("results.final.amount"), card3X + 5, cardY + 8)

  doc.setFontSize(14)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  const finalAmountText = formatCurrency(data.finalAmount, language)
  const finalAmountLines = splitTextToFit(finalAmountText, cardWidth - 10, 14)
  finalAmountLines.forEach((line, index) => {
    doc.text(line, card3X + 5, cardY + 20 + (index * 6))
  })

  const logoY = pageHeight - 22
  if (data.logoBase64) {
      const logoWidth = 12
      const logoHeight = 12
      doc.addImage(data.logoBase64, "PNG", pageWidth / 2 - logoWidth / 2, logoY - logoHeight - 5, logoWidth, logoHeight)
  }

  const footerY = pageHeight - 20
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.setFont("helvetica", "normal")
  doc.text(t("pdf.footer"), pageWidth / 2, footerY, {
    align: "center",
  })

  const copyrightY = pageHeight - 15
  doc.setFontSize(7)
  doc.setTextColor(150, 150, 150)
  doc.setFont("helvetica", "normal")
  doc.text(t("pdf.copyright"), pageWidth / 2, copyrightY, {
    align: "center",
  })

  const filename = t("pdf.filename") + ".pdf"
  doc.save(filename)
}