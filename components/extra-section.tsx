"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2, Headset, Car, Package, Sparkles } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const extraItems = [
  {
    category: "PS5",
    icon: Gamepad2,
    description: "Комфортные зоны с большими экранами, идеальны для компаний",
    items: [
      { name: 'PS5 65"', price: "1 200₸", note: "2+1 — 2 400₸" },
      { name: 'PS5 75"', price: "1 500₸", note: "2+1 — 3 000₸" },
    ],
  },
  {
    category: "SimRacing",
    icon: Car,
    description: "Реалистичные кокпиты для полного погружения в гонку",
    items: [
      { name: "Час", price: "2 500₸" },
      { name: "2+1", price: "4 800₸" },
      { name: "3+2", price: "7 200₸" },
    ],
  },
  {
    category: "VR",
    icon: Headset,
    description: "VR Meta Quest 2/3 — игры, аттракционы и соревнования в виртуальном мире",
    items: [{ name: "1 шлем", price: "3 000₸" }],
  },
]

const packages = [
  { name: "5 VR шлемов", price: "13 000₸", duration: "1 час", subtitle: "Лучший выбор для большой компании" },
  { name: "5 VR шлемов", price: "25 000₸", duration: "2 часа", subtitle: null },
  { name: "VR + 4 PS5", price: "30 000₸", duration: "1 час", subtitle: "Максимум развлечений для всех" },
  {
    name: "VR + PS5 + SimRacing",
    price: "35 000₸",
    duration: "Комбо",
    subtitle: "Комбо-набор для незабываемого вечера",
  },
]

export function ExtraSection() {
  const [selectedExtra, setSelectedExtra] = useState<{name: string, price: string} | null>(null)

  return (
    <section id="extra" className="py-20 sm:py-32 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_var(--primary)]" />
      
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6 animate-in fade-in zoom-in duration-500">
            <Sparkles className="w-4 h-4" />
            Развлечения нового уровня
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            F16 Extra — <span className="text-primary">VR, PS5 и SimRacing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите формат отдыха: виртуальная реальность, консоли или полный драйв за рулём
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {extraItems.map((item) => (
            <SpotlightCard
              key={item.category}
              className="p-6 flex flex-col hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground text-xl">{item.category}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">{item.description}</p>

              <div className="space-y-4 mb-6">
                {item.items.map((subItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 border border-transparent hover:border-primary/20 rounded-xl transition-all">
                    <div>
                      <span className="text-foreground font-medium">{subItem.name}</span>
                      {subItem.note && <p className="text-xs text-muted-foreground mt-1">{subItem.note}</p>}
                    </div>
                    <span className="text-primary font-bold text-lg">{subItem.price}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setSelectedExtra({ name: item.category, price: "По прайсу" })}
                className="w-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground mt-auto transition-all"
              >
                Забронировать
              </Button>
            </SpotlightCard>
          ))}
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-2xl blur opacity-75" />
          <div className="bg-card border border-primary/20 rounded-2xl p-6 sm:p-8 relative backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-primary text-primary-foreground shadow-[0_0_15px_rgba(205,233,1,0.4)]">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-xl">Пакеты аренды</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Готовые решения для вечеринок, дней рождения и корпоративов
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedExtra({ name: `ПАКЕТ: ${pkg.name}`, price: pkg.price })}
                  className="bg-secondary/30 rounded-xl p-4 text-center hover:bg-primary/10 transition-all group cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="text-xs text-muted-foreground mb-2 group-hover:text-primary transition-colors">{pkg.duration}</div>
                  <div className="font-semibold text-foreground mb-2">{pkg.name}</div>
                  <div className="text-2xl font-bold text-primary mb-2 font-mono">{pkg.price}</div>
                  {pkg.subtitle && <div className="text-xs text-muted-foreground leading-relaxed">{pkg.subtitle}</div>}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                onClick={() => setSelectedExtra({ name: "Пакетное предложение", price: "Уточнить" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 shadow-[0_0_20px_rgba(205,233,1,0.3)] hover:shadow-[0_0_30px_rgba(205,233,1,0.5)] transition-all hover:scale-105"
              >
                Забронировать пакет
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={!!selectedExtra} 
        onClose={() => setSelectedExtra(null)} 
        category={selectedExtra?.name}
        price={selectedExtra?.price}
        targetPhone="77080160007" // НОМЕР EXTRA !!!
      />
    </section>
  )
}