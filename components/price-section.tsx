"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Crown, Star, Zap } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const zones = [
  {
    name: "Standart",
    pcs: "25 ПК",
    description: "Надёжные ПК для стабильной игры и ежедневных каток",
    icon: Monitor,
    color: "text-muted-foreground",
    prices: [
      { label: "Час", value: "900₸" },
      { label: "2+1", value: "1 800₸" },
      { label: "3+2", value: "2 700₸" },
      { label: "День", value: "1 500₸" },
      { label: "Ночь", value: "3 000₸" },
    ],
  },
  {
    name: "Standart Premium",
    pcs: "30 ПК",
    description: "Улучшенные мониторы, высокая частота кадров и комфорт",
    icon: Star,
    color: "text-blue-400",
    prices: [
      { label: "Час", value: "1 200₸" },
      { label: "2+1", value: "2 400₸" },
      { label: "3+2", value: "3 600₸" },
      { label: "День", value: "2 500₸" },
      { label: "Ночь", value: "4 500₸" },
    ],
  },
  {
    name: "VIP",
    pcs: "6 ПК",
    description: "Премиум-станции для тех, кто хочет максимум",
    icon: Crown,
    color: "text-primary",
    featured: true,
    prices: [
      { label: "Час", value: "1 400₸" },
      { label: "2+1", value: "2 800₸" },
      { label: "3+2", value: "4 200₸" },
      { label: "Ночь", value: "5 000₸" },
    ],
  },
  {
    name: "PRO",
    pcs: "5 ПК",
    description: "Топовое железо для киберспортсменов и продвинутых игроков",
    icon: Zap,
    color: "text-orange-400",
    prices: [
      { label: "Час", value: "1 800₸" },
      { label: "2+1", value: "3 600₸" },
      { label: "3+2", value: "5 400₸" },
      { label: "Ночь", value: "5 800₸" },
    ],
  },
]

export function PriceSection() {
  const [selectedZone, setSelectedZone] = useState<{name: string, price: string} | null>(null)

  return (
    <section id="price" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Прайс <span className="text-primary cursor-default inline-block">F16 Arena</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите зону, которая подходит под ваш стиль игры
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zones.map((zone) => (
            <SpotlightCard
              key={zone.name}
              className="p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
            >
              {zone.featured && (
                <div className="text-xs font-medium text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Популярный выбор
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-secondary/80 backdrop-blur-sm ${zone.color}`}>
                  <zone.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{zone.name}</h3>
                  <p className="text-sm text-muted-foreground">{zone.pcs}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">{zone.description}</p>

              <div className="space-y-3 mb-6 bg-secondary/20 p-4 rounded-xl backdrop-blur-sm">
                {zone.prices.map((price) => (
                  <div
                    key={price.label}
                    className="flex items-center justify-between py-1 border-b border-border/10 last:border-0"
                  >
                    <span className="text-muted-foreground text-sm">{price.label}</span>
                    <span className="font-semibold text-foreground font-mono">{price.value}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setSelectedZone({ name: zone.name, price: "См. прайс" })}
                className="w-full mt-auto font-bold tracking-wide bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Забронировать
              </Button>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={!!selectedZone} 
        onClose={() => setSelectedZone(null)} 
        category={selectedZone?.name}
        price={selectedZone?.price}
        targetPhone="77080161720" // НОМЕР ARENA
      />
    </section>
  )
}