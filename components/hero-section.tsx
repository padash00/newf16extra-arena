"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Gamepad2, Car, Users, Clock, Zap } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"

const stats = [
  { label: "ПК всего", value: 66, description: "игровых станций", icon: Monitor },
  { label: "PS5", value: 4, description: "консоли", icon: Gamepad2 },
  { label: "SimRacing", value: 2, description: "установки", icon: Car },
  { label: "Мониторы", value: 540, description: "Hz макс", icon: Zap, suffix: "Hz" },
]

const typedWords = ["Компьютеры", "PS5", "SimRacing", "вечеринки", "турниры"]

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [currentWord, setCurrentWord] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const target = stat.value
      let current = 0

      return setInterval(() => {
        if (current < target) {
          current += Math.ceil(target / 50)
          if (current > target) current = target

          setCounts((prev) => {
            const next = [...prev]
            next[index] = current
            return next
          })
        }
      }, 30)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = typedWords[currentWord]

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1))
      } else {
        setText(fullText.substring(0, text.length + 1))
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setCurrentWord((prev) => (prev + 1) % typedWords.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentWord])

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <Image
          src="/dark-gaming-room-with-neon-lights-and-pc-setups.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              <span className="text-foreground">Бронь через WhatsApp, актуальные часы работы указаны ниже</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              F16 Arena
              <span className="text-primary block text-4xl sm:text-5xl lg:text-6xl mt-2 h-20 sm:h-24">
                для {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Топовое железо, PS5 и SimRacing. Пространство для игр, отдыха и встреч в Усть-Каменогорске.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full"
              >
                Забронировать
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary text-lg px-10 py-6 rounded-full"
                onClick={() => {
                  const element = document.querySelector("#price")
                  if (element) {
                    const headerOffset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                  }
                }}
              >
                Выбрать тариф
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">График по расписанию</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">До 70 гостей</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">540Hz мониторы</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 animate-in slide-in-from-right-10 duration-700">
            <h3 className="text-lg font-semibold text-foreground mb-6">Наши возможности</h3>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-secondary/20 rounded-xl p-4 text-center hover:bg-secondary/30 transition-colors"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Формат брони:</span>
                <span className="text-foreground font-medium">ПК, PS5, SimRacing</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Подтверждение:</span>
                <span className="text-foreground font-medium">через WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} targetPhone="77080161720" />
    </section>
  )
}
