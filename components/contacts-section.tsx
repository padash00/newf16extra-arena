"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  MessageCircle,
  Monitor,
  Gamepad2,
  Navigation,
  Copy,
  ExternalLink,
  Clock,
  ChevronDown,
  Instagram,
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
  const [showAllHours, setShowAllHours] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(`г. ${siteContent.brand.city}, ${siteContent.brand.address}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openRoute = () => {
    window.open("https://yandex.ru/maps/?text=Усть-Каменогорск+30-й+Гвардейской+Дивизии+24%2F1", "_blank")
  }

  return (
    <section id="contacts" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium mb-6">
            <Navigation className="w-4 h-4" />
            Локация
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Контакты <span className="text-primary">{siteContent.brand.shortName}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Актуальные контакты, адрес и клуб, который работает 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">Главная база</h3>
                  <p className="text-muted-foreground">
                    г. {siteContent.brand.city},
                    <br />
                    {siteContent.brand.address}
                  </p>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <span className="inline-flex h-2 w-2 rounded-full bg-primary"></span>
                      Открыты 24/7
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copied ? "Скопировано!" : "Копировать"}
                    </Button>
                  </div>

                  <Button
                    onClick={openRoute}
                    className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Проложить маршрут
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Телефоны
              </h3>

              <div className="space-y-4">
                {siteContent.contacts.phones.map((phoneItem) => {
                  const Icon = phoneItem.id === "pc" ? Monitor : Gamepad2

                  return (
                    <div key={phoneItem.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${phoneItem.badgeClass} flex items-center justify-center ${phoneItem.accentClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className={`text-xs font-medium ${phoneItem.accentClass}`}>{phoneItem.label}</div>
                          <a
                            href={`tel:+${phoneItem.phoneRaw}`}
                            className="font-mono font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {phoneItem.phone}
                          </a>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`${phoneItem.accentClass} hover:bg-secondary`}
                        onClick={() => window.open(`https://wa.me/${phoneItem.phoneRaw}`, "_blank")}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground text-lg mb-4">Мы в соцсетях</h3>
              <div className="grid grid-cols-2 gap-3">
                {siteContent.contacts.socials.slice(0, 2).map((social) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons]

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all group"
                    >
                      <Icon className={cn("w-4 h-4", social.colorClass)} />
                      <span className="text-sm font-medium text-foreground">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Часы работы
              </h3>

              <div className="space-y-2">
                {(showAllHours ? siteContent.contacts.workingHours : siteContent.contacts.workingHours.slice(0, 3)).map((item) => (
                  <div key={item.day} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium text-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllHours(!showAllHours)}
                className="w-full mt-2 text-muted-foreground"
              >
                <ChevronDown className={cn("w-4 h-4 mr-1 transition-transform", showAllHours && "rotate-180")} />
                {showAllHours ? "Скрыть" : "Показать график"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-2xl overflow-hidden h-[600px] relative">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="sm"
                  className="bg-background/95 backdrop-blur-sm border border-border text-foreground hover:bg-background shadow-lg"
                  onClick={openRoute}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть карту
                </Button>
              </div>

              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e696c533091ba1440a327093ec523f62e5f8557d07cfc5509d363cb8f28bc7e&source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                style={{ minHeight: "600px" }}
                title="Карта F16 Arena"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
