"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Copy,
  ExternalLink,
  Gamepad2,
  Instagram,
  MapPin,
  MessageCircle,
  Monitor,
  Navigation,
  Phone,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { siteContent } from "@/lib/site-content"

const socialIcons = {
  Instagram,
  Telegram: Send,
  WhatsApp: MessageCircle,
}

export function ContactsSection() {
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`г. ${siteContent.brand.city}, ${siteContent.brand.address}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openRoute = () => {
    window.open("https://yandex.ru/maps/?text=Усть-Каменогорск+30-й+Гвардейской+Дивизии+24%2F1", "_blank")
  }

  return (
    <section id="contacts" className="section-shell py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
            <Navigation className="h-4 w-4" />
            Контакты и маршрут
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Приехать легко,
            <span className="block text-primary">связаться ещё проще</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Всё, что нужно для брони и навигации: адрес, телефоны, рабочие часы и карта прямо на странице.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="premium-panel rounded-[1.9rem] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(223,255,87,0.12)] text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(185,154,99,0.9)]">Главная локация</div>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground">{siteContent.brand.name}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    г. {siteContent.brand.city},<br />
                    {siteContent.brand.address}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                      Открыты 24/7
                    </div>
                    <button
                      onClick={copyAddress}
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(185,154,99,0.18)] bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Скопировано" : "Скопировать адрес"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={openRoute}
                  className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Открыть маршрут
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(siteContent.contacts.socials[0].href, "_blank")}
                  className="h-12 rounded-full border-[rgba(185,154,99,0.2)] bg-card/60 text-foreground hover:bg-secondary"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram клуба
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteContent.contacts.phones.map((phoneItem) => {
                const Icon = phoneItem.id === "pc" ? Monitor : Gamepad2

                return (
                  <div key={phoneItem.id} className="premium-panel rounded-[1.6rem] p-5">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", phoneItem.badgeClass, phoneItem.accentClass)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-[rgba(185,154,99,0.9)]">{phoneItem.label}</div>
                        <a
                          href={`tel:+${phoneItem.phoneRaw}`}
                          className="mt-1 block text-lg font-semibold text-foreground transition-colors hover:text-primary"
                        >
                          {phoneItem.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <Button asChild className="h-11 flex-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        <a href={`tel:+${phoneItem.phoneRaw}`}>Позвонить</a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://wa.me/${phoneItem.phoneRaw}`, "_blank")}
                        className="h-11 rounded-full border-[rgba(185,154,99,0.18)] bg-card/60 px-4"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="premium-panel rounded-[1.6rem] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(185,154,99,0.12)] text-[rgba(185,154,99,0.95)]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[rgba(185,154,99,0.9)]">Часы работы</div>
                    <div className="mt-1 text-lg font-semibold text-foreground">24/7 без выходных</div>
                  </div>
                </div>
                <div className="mt-4 text-sm leading-7 text-muted-foreground">
                  Работаем ежедневно. Ночной режим и поздние заезды доступны всегда.
                </div>
              </div>

              <div className="premium-panel rounded-[1.6rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[rgba(185,154,99,0.9)]">Соцсети</div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {siteContent.contacts.socials.map((social) => {
                    const Icon = socialIcons[social.name as keyof typeof socialIcons]

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-14 items-center justify-center rounded-2xl border border-[rgba(185,154,99,0.16)] bg-card/60 transition-colors hover:bg-secondary"
                        aria-label={social.name}
                      >
                        <Icon className={cn("h-5 w-5", social.colorClass)} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="premium-panel relative overflow-hidden rounded-[2rem] p-3">
            <div className="absolute right-6 top-6 z-10">
              <Button
                size="sm"
                className="rounded-full bg-background/90 text-foreground shadow-[0_14px_30px_rgba(0,0,0,0.2)] hover:bg-background"
                onClick={openRoute}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Открыть карту
              </Button>
            </div>

            <div className="h-[620px] overflow-hidden rounded-[1.5rem] border border-[rgba(185,154,99,0.16)]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e696c533091ba1440a327093ec523f62e5f8557d07cfc5509d363cb8f28bc7e&source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="h-full w-full"
                style={{ minHeight: "620px" }}
                title="Карта F16 Arena"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
