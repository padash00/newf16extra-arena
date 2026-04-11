"use client"

import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteContent } from "@/lib/site-content"

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#price", label: "Прайс" },
  { href: "#devices", label: "Девайсы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#extra", label: "F16 Extra" },
  { href: "#contacts", label: "Контакты" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = documentHeight <= 0 ? 0 : (window.scrollY / documentHeight) * 100
      setScrollProgress(progress)

      const sections = navLinks.map((link) => link.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.querySelector(id)
    if (!element) return

    const headerOffset = 92
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-primary transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[1.75rem] border px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-5",
              isScrolled
                ? "border-[rgba(185,154,99,0.26)] bg-background/88 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                : "border-transparent bg-background/38",
            )}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#hero")
              }}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-primary-foreground shadow-[0_0_32px_rgba(223,255,87,0.2)]">
                F16
              </div>
              <div className="min-w-0">
                <div className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
                  {siteContent.brand.name}
                </div>
                <div className="hidden text-[11px] uppercase tracking-[0.28em] text-[rgba(185,154,99,0.9)] sm:block">
                  Premium Cyber Lounge
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-1 rounded-full border border-[rgba(185,154,99,0.16)] bg-card/70 px-2 py-1 lg:flex">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1)
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[rgba(185,154,99,0.14)] text-foreground shadow-[inset_0_0_0_1px_rgba(185,154,99,0.28)]"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("#price")}
                className="h-11 rounded-full border-[rgba(185,154,99,0.28)] bg-card/70 px-5 text-foreground hover:bg-secondary"
              >
                ПК и Elite
              </Button>
              <Button
                size="sm"
                onClick={() => scrollToSection("#extra")}
                className="h-11 rounded-full bg-primary px-5 text-primary-foreground shadow-[0_18px_38px_rgba(223,255,87,0.15)] hover:bg-primary/90"
              >
                PS5 / Extra
              </Button>
            </div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(185,154,99,0.22)] bg-card/80 text-foreground transition-colors hover:bg-secondary lg:hidden"
              aria-label="Меню"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 lg:hidden",
              isOpen ? "max-h-[520px] pt-3 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="rounded-[1.75rem] border border-[rgba(185,154,99,0.22)] bg-background/96 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between rounded-2xl border border-[rgba(185,154,99,0.18)] bg-card/70 px-4 py-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(185,154,99,0.9)]">
                    24/7 booking
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    Бронь подтверждаем через WhatsApp
                  </div>
                </div>
                <a
                  href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                  aria-label="Позвонить"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const sectionId = link.href.substring(1)
                  const isActive = activeSection === sectionId

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm transition-all",
                        isActive
                          ? "bg-[rgba(185,154,99,0.14)] text-foreground shadow-[inset_0_0_0_1px_rgba(185,154,99,0.28)]"
                          : "bg-card/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#price")}
                  className="h-12 rounded-2xl border-[rgba(185,154,99,0.22)] bg-card/70 text-foreground hover:bg-secondary"
                >
                  ПК и Elite
                </Button>
                <Button
                  onClick={() => scrollToSection("#extra")}
                  className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  PS5 / Extra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
