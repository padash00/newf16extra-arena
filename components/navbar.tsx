"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  // Эффект для скролла и активного пункта
  useEffect(() => {
    const handleScroll = () => {
      // Проверяем, проскроллили ли мы больше 20px
      setIsScrolled(window.scrollY > 20)

      // Вычисляем прогресс чтения страницы
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = (window.scrollY / documentHeight) * 100
      setScrollProgress(progress)

      // Определяем активную секцию
      const sections = navLinks.map(link => link.href.substring(1))
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Если секция видна (верхняя часть в пределах экрана)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Вызываем сразу для установки начальных значений
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Плавный скролл к секции с отступом
  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.querySelector(id)
    if (element) {
      const headerOffset = 80 // Высота хедера
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      {/* Прогресс-бар чтения */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border py-2 shadow-sm" 
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#hero")
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-primary-foreground font-bold text-lg">F16</span>
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block text-foreground">
                Arena
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
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
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all relative",
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("#price")}
                className="border-border text-foreground hover:bg-secondary rounded-full px-5"
              >
                Забронировать ПК
              </Button>
              <Button 
                size="sm" 
                onClick={() => scrollToSection("#extra")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
              >
                Забронировать PS5
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              aria-label="Меню"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg",
              isOpen ? "max-h-[500px] py-4" : "max-h-0"
            )}
          >
            <nav className="flex flex-col px-4">
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
                      setIsOpen(false)
                    }}
                    className={cn(
                      "py-3 px-2 rounded-lg transition-colors",
                      isActive 
                        ? "text-primary bg-primary/10 font-medium" 
                        : "text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
              
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    scrollToSection("#price")
                    setIsOpen(false)
                  }}
                  className="w-full border-border text-foreground hover:bg-secondary"
                >
                  Забронировать ПК
                </Button>
                <Button 
                  onClick={() => {
                    scrollToSection("#extra")
                    setIsOpen(false)
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Забронировать PS5
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
