"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  Car,
  Clock3,
  Crown,
  Gamepad2,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react"
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

  const eliteZone = useMemo(
    () => siteContent.pricing.zones.find((zone) => zone.name === "Elite"),
    [],
  )

  useEffect(() => {
    const intervals = siteContent.hero.stats.map((stat, index) => {
      const target = stat.value
      let current = 0

      return setInterval(() => {
        if (current >= target) return

        current += Math.ceil(target / 50)
        if (current > target) current = target

        setCounts((prev) => {
          const next = [...prev]
          next[index] = current
          return next
        })
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
    }, isDeleting ? 48 : 90)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentWord])

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
    <section id="hero" className="section-shell premium-grid relative flex min-h-screen items-center overflow-hidden bg-background pt-28">
      <div className="absolute inset-0">
        <Image
          src="/hero-simracing-elite.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] opacity-[0.34]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,7,0.93)_0%,rgba(8,7,7,0.88)_38%,rgba(8,7,7,0.56)_66%,rgba(8,7,7,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(223,255,87,0.12),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(185,154,99,0.18),transparent_20%),linear-gradient(to_bottom,rgba(8,7,7,0.12),rgba(8,7,7,0.64))]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-12">
        <div className="grid items-center gap-10 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl animate-in slide-in-from-left-10 duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(185,154,99,0.24)] bg-[rgba(18,16,15,0.74)] px-4 py-2 text-sm text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(223,255,87,0.55)]" />
              {siteContent.hero.badge}
            </div>

            <div className="mb-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.28em] text-[rgba(185,154,99,0.9)]">
              <span className="premium-pill rounded-full px-3 py-1">Premium Cyber Lounge</span>
              <span className="premium-pill rounded-full px-3 py-1">Elite 600Hz</span>
              <span className="premium-pill rounded-full px-3 py-1">24/7 Booking</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              {siteContent.brand.name}
              <span className="mt-3 block text-4xl font-semibold tracking-[-0.04em] text-[rgba(246,240,231,0.92)] sm:text-5xl xl:text-[4rem]">
                для
                <span className="ml-3 inline-flex min-h-[1.15em] items-center text-primary">
                  {text}
                  <span className="ml-1 animate-pulse text-[rgba(185,154,99,0.95)]">|</span>
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(246,240,231,0.72)] sm:text-xl">
              {siteContent.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_22px_40px_rgba(223,255,87,0.16)] hover:bg-primary/90"
              >
                Забронировать сейчас
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#price")}
                className="h-14 rounded-full border-[rgba(185,154,99,0.26)] bg-card/70 px-8 text-base text-foreground hover:bg-secondary"
              >
                Смотреть зоны и прайс
              </Button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`}
                className="premium-panel rounded-[1.6rem] px-5 py-4 backdrop-blur-xl transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(223,255,87,0.14)] text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(185,154,99,0.9)]">
                      Быстрый звонок
                    </div>
                    <div className="mt-1 text-lg font-semibold text-foreground">
                      {siteContent.contacts.phones[0].phone}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">ПК, Elite, VIP, PRO</div>
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteContent.contacts.phones[1].phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="premium-panel rounded-[1.6rem] px-5 py-4 backdrop-blur-xl transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(185,154,99,0.16)] text-[rgba(185,154,99,0.95)]">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(185,154,99,0.9)]">
                      Бронь и подтверждение
                    </div>
                    <div className="mt-1 text-lg font-semibold text-foreground">WhatsApp за 30 секунд</div>
                    <div className="mt-1 text-sm text-muted-foreground">PS5, SimRacing, пакеты</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {siteContent.hero.quickFacts.map((fact, index) => {
                const icons = [Clock3, Crown, Zap, MapPin]
                const Icon = icons[index] ?? ShieldCheck

                return (
                  <div
                    key={fact}
                    className="rounded-[1.35rem] border border-[rgba(185,154,99,0.18)] bg-[rgba(18,16,15,0.72)] px-4 py-4 backdrop-blur-xl"
                  >
                    <Icon className="h-4 w-4 text-[rgba(185,154,99,0.95)]" />
                    <div className="mt-3 text-sm font-medium text-foreground">{fact}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {index === 0 && "Без выходных и ночных пауз"}
                      {index === 1 && "Комфортно для компаний и мероприятий"}
                      {index === 2 && "Топовая частота для киберспорта"}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="animate-in slide-in-from-right-10 duration-700">
            <div className="premium-panel rounded-[2rem] p-6 backdrop-blur-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(185,154,99,0.92)]">
                    Signature Zone
                  </div>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Elite</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
                    Флагманская зона клуба с самой быстрой посадкой, топовой сборкой и частотой до 600Hz.
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(185,154,99,0.24)] bg-[rgba(185,154,99,0.12)] px-3 py-1 text-xs font-semibold text-[rgba(185,154,99,0.98)]">
                  5 мест
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {siteContent.hero.stats.map((stat, index) => {
                  const Icon = heroIcons[stat.icon]

                  return (
                    <div
                      key={stat.label}
                      className="rounded-[1.4rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="mt-4 font-mono text-3xl font-semibold text-foreground">
                        {counts[index]}
                        {"suffix" in stat ? stat.suffix : null}
                      </div>
                      <div className="mt-2 text-sm font-medium text-foreground">{stat.label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{stat.description}</div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-[rgba(185,154,99,0.18)] bg-[rgba(255,255,255,0.02)] p-5">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[rgba(185,154,99,0.9)]">
                  <ShieldCheck className="h-4 w-4" />
                  Premium build
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
                    <span className="text-muted-foreground">Процессор</span>
                    <span className="text-right font-medium text-foreground">Ryzen 7 9800X3D</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
                    <span className="text-muted-foreground">Видеокарта</span>
                    <span className="text-right font-medium text-foreground">RTX 5070 Ti</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
                    <span className="text-muted-foreground">Монитор</span>
                    <span className="text-right font-medium text-foreground">Zowie BenQ 600Hz</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Прайс</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {eliteZone?.prices[0]?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}₸/час
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {siteContent.hero.salesPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[1.35rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4 sm:last:col-span-2"
                  >
                    <div className="text-sm font-semibold text-foreground">{point.title}</div>
                    <div className="mt-2 text-sm leading-7 text-muted-foreground">{point.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} targetPhone="77080161720" />
    </section>
  )
}
