"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-4 sm:py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground px-2">
            {(() => {
              const copyright = t("footer.copyright", { year: currentYear })
              const parts = copyright.split("Dev Capital")
              return (
                <>
                  {parts[0]}Dev <span className="text-primary">Capital</span>
                  {parts[1]}
                </>
              )
            })()}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground px-2">
            {t("footer.name")}{" "}
            <a 
              href="https://github.com/coderrocha" 
              target="_blank" 
              rel="noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("footer.author")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}