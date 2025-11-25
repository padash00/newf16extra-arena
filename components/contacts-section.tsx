"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, MessageCircle, Monitor, Gamepad2, Navigation } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const socials = [
  { name: "Instagram", href: "https://instagram.com/f16arena_", icon: MessageCircle },
  { name: "Telegram", href: "https://t.me/f16arena", icon: MessageCircle },
]

export function ContactsSection() {
  return (
    <section id="contacts" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <Navigation className="w-4 h-4" />
            Локация
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Контакты <span className="text-primary">F16</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Единая база для всех направлений
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Левая колонка: Информация */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Карточка Адреса */}
            <SpotlightCard className="p-6 group border-primary/10 hover:border-primary/30 transition-colors bg-card/40 backdrop-blur-md">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_-5px_rgba(205,233,1,0.3)] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-2">Главная база</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    г. Усть-Каменогорск,<br />
                    ул. 30-й Гвардейской Дивизии, 24/1
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Открыто 24/7
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Панель связи */}
            <SpotlightCard className="p-6 group border-primary/10 hover:border-primary/30 transition-colors bg-card/40 backdrop-blur-md flex-grow">
              <h3 className="font-bold text-foreground text-xl mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Связь с базой
              </h3>

              <div className="space-y-4">
                {/* Arena Contact */}
                <div className="relative group/item overflow-hidden rounded-xl bg-secondary/20 border border-border/50 hover:border-blue-500/50 transition-all">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  <div className="relative p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-0.5">PC CLUB</div>
                            <div className="font-mono font-bold text-foreground text-lg">+7 (708) 016-17-20</div>
                        </div>
                    </div>
                    <Button 
                        size="sm" 
                        className="bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/20"
                        onClick={() => window.open('https://wa.me/77080161720', '_blank')}
                    >
                        WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Extra Contact */}
                <div className="relative group/item overflow-hidden rounded-xl bg-secondary/20 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  <div className="relative p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Gamepad2 className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">PS5 & VR</div>
                            <div className="font-mono font-bold text-foreground text-lg">+7 (708) 016-00-07</div>
                        </div>
                    </div>
                    <Button 
                        size="sm" 
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20"
                        onClick={() => window.open('https://wa.me/77080160007', '_blank')}
                    >
                        WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Соцсети (кнопки) */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/30">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-lg bg-background border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all group/link"
                    >
                        <social.icon className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
                        <span className="text-sm font-medium text-muted-foreground group-hover/link:text-foreground transition-colors">{social.name}</span>
                    </a>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Правая колонка: Карта */}
          <div className="lg:col-span-7 h-full min-h-[500px]">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card/20 backdrop-blur-sm group">
              
              {/* Декор рамки карты */}
              <div className="absolute inset-0 pointer-events-none border-[4px] border-primary/5 rounded-3xl z-20" />
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-black/80 backdrop-blur-md border border-primary/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Live Map</span>
                </div>
              </div>

              {/* Карта с темным фильтром */}
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A5e696c533091ba1440a327093ec523f62e5f8557d07cfc5509d363cb8f28bc7e&source=constructor"
                width="100%" 
                height="100%" 
                frameBorder="0"
                allowFullScreen={true}
                // ФИЛЬТР: Делает карту темной (инверсия + ч/б), при наведении возвращает цвет
                className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out filter grayscale invert contrast-75 opacity-80 hover:filter-none hover:opacity-100"
                style={{ minHeight: '500px' }}
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}