"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold text-foreground">
            Dev Capital
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright", { year: currentYear })}
          </p>
          <p className="text-xs text-muted-foreground">
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