"use client"

import { useState, useEffect } from "react"
import { ArrowUp, Instagram, Send, MessageCircle, Mail, Clock, MapPin, Phone, CreditCard } from "lucide-react"
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
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <>
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">{siteContent.brand.shortName}</span>
                </div>
                <div>
                  <span className="text-foreground font-semibold text-lg block">{siteContent.brand.name}</span>
                  <span className="text-xs text-muted-foreground">{siteContent.brand.subtitle}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Компьютерный клуб с топовым железом, PS5 и SimRacing в {siteContent.brand.city}. Работаем 24/7 и подтверждаем бронь через WhatsApp.
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className={cn("w-4 h-4", social.color)} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Навигация</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Контакты</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{siteContent.brand.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href={`tel:+${siteContent.contacts.phones[0].phoneRaw}`} className="text-sm text-muted-foreground hover:text-primary">
                    {siteContent.contacts.phones[0].phone} ({siteContent.contacts.phones[0].shortLabel})
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href={`tel:+${siteContent.contacts.phones[1].phoneRaw}`} className="text-sm text-muted-foreground hover:text-primary">
                    {siteContent.contacts.phones[1].phone} ({siteContent.contacts.phones[1].shortLabel})
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href={`mailto:${siteContent.brand.email}`} className="text-sm text-muted-foreground hover:text-primary">
                    {siteContent.brand.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{siteContent.brand.workingLabel}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Способы оплаты</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {paymentSystems.map((payment) => (
                  <div
                    key={payment.name}
                    className="px-3 py-1.5 bg-secondary/50 rounded-lg text-sm text-foreground flex items-center gap-1"
                  >
                    <CreditCard className="w-3 h-3" />
                    {payment.name}
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-foreground mb-2">Скачать приложение</h3>
              <p className="text-xs text-muted-foreground mb-3">Скоро в App Store и Google Play</p>
              <div className="flex gap-2 opacity-50">
                <div className="bg-secondary/30 px-3 py-2 rounded-lg text-xs">App Store</div>
                <div className="bg-secondary/30 px-3 py-2 rounded-lg text-xs">Google Play</div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © <span suppressHydrationWarning>{currentYear}</span> F16 Arena. Все права защищены.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Для правил бронирования и уточнений удобнее всего написать в WhatsApp или Telegram.
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
        aria-label="Наверх"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  )
}
