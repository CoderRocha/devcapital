import jsPDF from "jspdf"

interface PDFData {
  totalSaved: number
  totalEarned: number
  finalAmount: number
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
  doc.text("Planejamento Financeiro para Devs", pageWidth / 2, yPosition, {
    align: "center",
  })
  yPosition += 15

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  const date = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  doc.text(`Gerado em: ${date}`, pageWidth / 2, yPosition, {
    align: "center",
  })
  yPosition += 20

  if (data.phases && data.phases.length > 0) {
    doc.setFontSize(18)
    doc.setTextColor(primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("Timeline da Carreira", margin, yPosition)
    yPosition += 15

    data.phases.forEach((phase, index) => {
      if (yPosition > pageHeight - 50) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "bold")
      doc.text(`${phase.name}`, margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text(
        `Anos ${phase.startYear} - ${phase.endYear} (${phase.endYear - phase.startYear} anos)`,
        margin,
        yPosition
      )
      yPosition += 10

      doc.setFontSize(9)
      doc.setTextColor(0, 0, 0)
      doc.text(`Salário: R$ ${phase.salary.toLocaleString("pt-BR")}`, margin, yPosition)
      yPosition += 6
      doc.text(
        `Guardado/Mês: R$ ${phase.monthlySavings.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        margin,
        yPosition
      )
      yPosition += 6
      doc.text(
        `Total Guardado: R$ ${phase.totalSavedInPhase.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        margin,
        yPosition
      )
      yPosition += 6
      doc.setFont("helvetica", "bold")
      doc.setTextColor(primaryColor)
      doc.text(
        `Acumulado ao Final: R$ ${phase.accumulatedAtEnd.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        margin,
        yPosition
      )
      yPosition += 15

      if (index < data.phases.length - 1) {
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
  doc.text("Resultado Final", margin, yPosition)
  yPosition += 15

  const cardWidth = (pageWidth - margin * 2 - 10) / 3
  const cardHeight = 40
  const cardY = yPosition

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(123, 192, 74)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text("Total Guardado", margin + 5, cardY + 8)

  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  const totalSavedText = `R$ ${data.totalSaved.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  doc.text(totalSavedText, margin + 5, cardY + 20)

  const card2X = margin + cardWidth + 5
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(card2X, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(123, 192, 74)
  doc.roundedRect(card2X, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text("Juros Ganhos", card2X + 5, cardY + 8)

  doc.setFontSize(16)
  doc.setTextColor(darkGreen)
  doc.setFont("helvetica", "bold")
  const totalEarnedText = `R$ ${data.totalEarned.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  doc.text(totalEarnedText, card2X + 5, cardY + 20)

  const card3X = card2X + cardWidth + 5
  doc.setFillColor(232, 245, 224)
  doc.roundedRect(card3X, cardY, cardWidth, cardHeight, 3, 3, "FD")
  doc.setDrawColor(primaryColor)
  doc.setLineWidth(0.8)
  doc.roundedRect(card3X, cardY, cardWidth, cardHeight, 3, 3, "D")

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont("helvetica", "normal")
  doc.text("Valor Final", card3X + 5, cardY + 8)

  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.setFont("helvetica", "bold")
  const finalAmountText = `R$ ${data.finalAmount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  doc.text(finalAmountText, card3X + 5, cardY + 20)

  const footerY = pageHeight - 15
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.setFont("helvetica", "normal")
  doc.text("Dev Capital - Calculadora de Juros Compostos", pageWidth / 2, footerY, {
    align: "center",
  })

  doc.save("Planejamento Financeiro para Devs.pdf")
}