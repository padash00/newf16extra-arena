"use client"

import { Cpu, MonitorIcon, Mouse, Keyboard, Headphones, CheckCircle2 } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const devices = [
  {
    zone: "Standart",
    specs: [
      { icon: Cpu, label: "i5-12400F" },
      { icon: MonitorIcon, label: "RTX 4060 8GB" },
      { icon: Cpu, label: "16GB RAM" },
      { icon: MonitorIcon, label: "240Hz" },
    ],
    // Разделил девайсы на объекты
    gear: [
      { icon: Mouse, label: "Asus ROG" },
      { icon: Keyboard, label: "Royal Kludge 87" },
      { icon: Headphones, label: "HyperX Cloud 2" },
    ]
  },
  {
    zone: "Standart Premium",
    specs: [
      { icon: Cpu, label: "i5-13400F" },
      { icon: MonitorIcon, label: "RTX 5060 8GB" },
      { icon: Cpu, label: "16GB RAM" },
      { icon: MonitorIcon, label: "280Hz" },
    ],
    gear: [
      { icon: Mouse, label: "HyperX Haste 2 WL" },
      { icon: Keyboard, label: "HyperX Alloy Origin" },
      { icon: Headphones, label: "HyperX Cloud 2" },
    ]
  },
  {
    zone: "VIP",
    featured: true, // Оставил флаг только для надписи, но не для цвета
    specs: [
      { icon: Cpu, label: "i7-13700F" },
      { icon: MonitorIcon, label: "RTX 4070 Super 12GB" },
      { icon: Cpu, label: "32GB RAM" },
      { icon: MonitorIcon, label: "380Hz" },
    ],
    gear: [
      { icon: Mouse, label: "Logitech Superlight" },
      { icon: Keyboard, label: "Dark Project" },
      { icon: Headphones, label: "Logitech G PRO SE" },
    ]
  },
  {
    zone: "PRO",
    specs: [
      { icon: Cpu, label: "Ryzen 7 7800X3D" },
      { icon: MonitorIcon, label: "RTX 5070" },
      { icon: Cpu, label: "32GB 6000MHz" },
      { icon: MonitorIcon, label: "540Hz" },
    ],
    gear: [
      { icon: Mouse, label: "Superlight 2 WL" },
      { icon: Keyboard, label: "Varmillo Wireless" },
      { icon: Headphones, label: "Logitech G PRO X2" },
    ]
  },
]

export function DevicesSection() {
  return (
    <section id="devices" className="py-20 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Девайсы и <span className="text-primary inline-block cursor-default">железо</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Только топовое оборудование для максимальной производительности
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {devices.map((device) => (
            <SpotlightCard
              key={device.zone}
              className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-2 rounded-lg text-sm font-bold tracking-wide bg-secondary/50 text-foreground border border-border">
                  {device.zone}
                </div>
                {device.featured && (
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    PRO CHOICE
                  </div>
                )}
              </div>

              {/* Характеристики ПК */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {device.specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3 p-2.5 bg-secondary/20 rounded-lg border border-transparent hover:border-primary/10 transition-colors">
                    <spec.icon className="w-4 h-4 flex-shrink-0 text-primary/80" />
                    <span className="text-sm text-foreground font-medium truncate">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Периферия - теперь красиво */}
              <div className="pt-5 border-t border-border/50 space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Периферия</div>
                {device.gear.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-secondary/40 flex items-center justify-center flex-shrink-0 text-muted-foreground">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground/90">{item.label}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}