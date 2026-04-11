"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Gamepad2, Car, Users, Clock, Zap, Phone, MessageCircle, MapPin } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { siteContent } from "@/lib/site-content"

const heroIcons = {
  monitor: Monitor,
  gamepad: Gamepad2,
  car: Car,
  zap: Zap,
}

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [counts, setCounts] = useState(siteContent.hero.stats.map(() => 0))
  const [currentWord, setCurrentWord] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const intervals = siteContent.hero.stats.map((stat, index) => {
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
      const fullText = siteContent.hero.typedWords[currentWord]

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1))
      } else {
        setText(fullText.substring(0, text.length + 1))
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setCurrentWord((prev) => (prev + 1) % siteContent.hero.typedWords.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentWord])

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <Image
          src="/hero-simracing-elite.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] opacity-25"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              <span className="text-foreground">{siteContent.hero.badge}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              {siteContent.brand.name}
              <span className="text-primary block text-4xl sm:text-5xl lg:text-6xl mt-2 h-20 sm:h-24">
                для {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              {siteContent.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full"
              >
                Забронировать сейчас
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

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`}
                className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-4 py-4 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${siteContent.contacts.phones[0].badgeClass}`}>
                    <Phone className={`h-5 w-5 ${siteContent.contacts.phones[0].accentClass}`} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Быстрый звонок</div>
                    <div className="font-semibold text-foreground">{siteContent.contacts.phones[0].phone}</div>
                  </div>
                </div>
              </a>
              <a
                href={`https://wa.me/${siteContent.contacts.phones[1].phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-4 py-4 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${siteContent.contacts.phones[1].badgeClass}`}>
                    <MessageCircle className={`h-5 w-5 ${siteContent.contacts.phones[1].accentClass}`} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">PS5 и Extra</div>
                    <div className="font-semibold text-foreground">WhatsApp за 30 секунд</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{siteContent.hero.quickFacts[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{siteContent.hero.quickFacts[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{siteContent.hero.quickFacts[2]}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{siteContent.brand.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 animate-in slide-in-from-right-10 duration-700">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-foreground">Наши возможности</h3>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Бронь за 30 секунд
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {siteContent.hero.stats.map((stat, index) => {
                  const Icon = heroIcons[stat.icon]

                  return (
                    <div
                      key={stat.label}
                      className="bg-secondary/20 rounded-xl p-4 text-center hover:bg-secondary/30 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground font-mono">
                        {counts[index]}
                        {"suffix" in stat ? stat.suffix : null}
                      </div>
                      <div className="text-sm text-foreground">{stat.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                    </div>
                  )
                })}
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

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {siteContent.hero.salesPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-foreground">{point.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} targetPhone="77080161720" />
    </section>
  )
}
