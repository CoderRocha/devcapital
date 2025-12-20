import Image from "next/image"
import logo from "@/app/assets/devcapital-logo.png"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-white flex items-center px-6">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="Dev Capital Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="text-lg font-semibold text-foreground">
          Dev Capital
        </div>
      </div>
    </header>
  )
}