"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#price", label: "Прайс" },
  { href: "#devices", label: "Девайсы" },
  { href: "#extra", label: "F16 Extra" },
  { href: "#contacts", label: "Контакты" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Эффект для изменения прозрачности хедера при скролле
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-2" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <span className="text-primary-foreground font-bold text-lg">F16</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Arena</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("#price")}
              className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent transition-all hover:scale-105"
            >
              Забронировать ПК
            </Button>
            <Button 
              size="sm" 
              onClick={() => scrollToSection("#extra")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:scale-105"
            >
              Забронировать VR / PS5
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground" aria-label="Меню">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn("lg:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-xl absolute top-full left-0 right-0 border-b border-border shadow-2xl", isOpen ? "max-h-[500px] py-6" : "max-h-0")}
        >
          <nav className="flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2">
              <Button
                variant="outline"
                onClick={() => scrollToSection("#price")}
                className="w-full border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Забронировать ПК
              </Button>
              <Button 
                onClick={() => scrollToSection("#extra")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Забронировать VR / PS5
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}