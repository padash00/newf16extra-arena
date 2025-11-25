"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Gamepad2, Headset, Car } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"

const stats = [
  { label: "Standart", value: "25 ПК", description: "оптимальный выбор", icon: Monitor },
  { label: "Standart Premium", value: "30 ПК", description: "комфорт и FPS", icon: Monitor },
  { label: "VIP", value: "6 ПК", description: "премиум для ценителей", icon: Monitor },
  { label: "PRO", value: "5 ПК", description: "максимальная мощность", icon: Monitor },
  { label: "VR", value: "5 шлемов", description: "эффект полного погружения", icon: Headset },
  { label: "PS5", value: "4 консоли", description: "турниры и кооп", icon: Gamepad2 },
  { label: "SimRacing", value: "2 установки", description: "драйв и реализм", icon: Car },
]

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute inset-0 bg-[url('/dark-gaming-room-with-neon-lights-and-pc-setups.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Усть-Каменогорск
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                F16 Arena <span className="text-primary">&</span> F16 Extra
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/90 font-medium max-w-xl leading-relaxed">
                Компьютеры, VR, PS5 и SimRacing — для ярких эмоций, соревнований и отдыха с друзьями
              </p>
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                Топовое оборудование, продуманная атмосфера и развлечения нового уровня — всё в одном месте
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => setIsBookingOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-[0_0_20px_rgba(205,233,1,0.4)] transition-all hover:scale-105"
              >
                Забронировать
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <a href="#price">Посмотреть прайс</a>
              </Button>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 sm:p-8 animate-in slide-in-from-right-10 duration-700 fade-in delay-200">
            <h3 className="text-lg font-semibold text-foreground mb-6">Наши возможности</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary/50 rounded-xl p-4 group hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 hidden sm:block">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        category="Быстрая бронь (Главная)"
        targetPhone="77080161720" // НОМЕР ARENA
      />
    </section>
  )
}