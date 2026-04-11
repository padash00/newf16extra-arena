"use client"

import { useEffect, useState } from "react"
import { ArrowUp, Clock, CreditCard, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteContent } from "@/lib/site-content"

const footerLinks = [
  { href: "#price", label: "Прайс" },
  { href: "#devices", label: "Девайсы" },
  { href: "#extra", label: "F16 Extra" },
  { href: "#contacts", label: "Контакты" },
  { href: "#gallery", label: "Галерея" },
]

const socialLinks = [
  { icon: Instagram, href: siteContent.contacts.socials[0].href, label: "Instagram", color: siteContent.contacts.socials[0].colorClass },
  { icon: Send, href: siteContent.contacts.socials[1].href, label: "Telegram", color: siteContent.contacts.socials[1].colorClass },
  { icon: MessageCircle, href: siteContent.contacts.socials[2].href, label: "WhatsApp", color: siteContent.contacts.socials[2].colorClass },
]

const paymentSystems = [{ name: "Kaspi" }, { name: "Visa" }, { name: "Mastercard" }, { name: "Наличные" }]

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const currentYear = new Date().getUTCFullYear()

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (!element) return

    const headerOffset = 88
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
  }

  return (
    <>
      <footer className="section-shell overflow-hidden border-t border-[rgba(185,154,99,0.14)] bg-[rgba(11,9,8,0.94)]">
        <div className="container relative z-10 mx-auto px-4 py-16">
          <div className="premium-panel rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.7fr_0.9fr_0.8fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-primary-foreground">
                    {siteContent.brand.shortName}
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{siteContent.brand.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(185,154,99,0.9)]">
                      Premium Cyber Lounge
                    </div>
                  </div>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                  Компьютерный клуб с топовым железом, PS5 и SimRacing в {siteContent.brand.city}. Работаем 24/7 и подтверждаем бронь через WhatsApp.
                </p>

                <div className="mt-5 flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(185,154,99,0.16)] bg-card/60 transition-colors hover:bg-secondary"
                      aria-label={social.label}
                    >
                      <social.icon className={cn("h-4 w-4", social.color)} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(185,154,99,0.92)]">Навигация</div>
                <div className="mt-5 space-y-3">
                  {footerLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(185,154,99,0.92)]">Контакты</div>
                <div className="mt-5 space-y-3.5">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{siteContent.brand.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`} className="hover:text-primary">
                      {siteContent.contacts.phones[0].phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:+${siteContent.contacts.phones[1].phoneRaw}`} className="hover:text-primary">
                      {siteContent.contacts.phones[1].phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <a href={`mailto:${siteContent.brand.email}`} className="hover:text-primary">
                      {siteContent.brand.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    <span>{siteContent.brand.workingLabel}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(185,154,99,0.92)]">Оплата</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {paymentSystems.map((payment) => (
                    <div
                      key={payment.name}
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(185,154,99,0.16)] bg-card/60 px-3 py-2 text-sm text-foreground"
                    >
                      <CreditCard className="h-3.5 w-3.5 text-primary" />
                      {payment.name}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[rgba(185,154,99,0.88)]">Быстрый совет</div>
                  <div className="mt-2 text-sm leading-7 text-muted-foreground">
                    Для уточнений по местам и пакетам быстрее всего писать в WhatsApp или Telegram.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(185,154,99,0.12)] pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <p>
                © <span suppressHydrationWarning>{currentYear}</span> {siteContent.brand.name}. Все права защищены.
              </p>
              <p className="text-left md:text-right">Премиальный компьютерный клуб для игр, встреч и ночных сессий.</p>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_44px_rgba(223,255,87,0.18)] transition-all duration-300 hover:scale-110",
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0",
        )}
        aria-label="Наверх"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  )
}
