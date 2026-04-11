"use client"

import { useEffect, useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteContent } from "@/lib/site-content"
import { cn } from "@/lib/utils"

export function MobileCtaBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 140)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector)
    if (!element) return

    const headerOffset = 88
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[55] px-4 transition-all duration-300 lg:hidden",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <div className="mx-auto max-w-md rounded-[1.6rem] border border-[rgba(185,154,99,0.2)] bg-background/96 p-3 shadow-[0_-20px_46px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-foreground">{siteContent.brand.workingLabel}</span>
          <span className="text-[rgba(185,154,99,0.9)]">Premium booking</span>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button
            onClick={() => scrollToSection("#price")}
            className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Тарифы и бронь
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 rounded-2xl border-[rgba(185,154,99,0.2)] bg-card px-4 text-foreground hover:bg-secondary"
          >
            <a href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`} aria-label="Позвонить в F16 Arena">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
