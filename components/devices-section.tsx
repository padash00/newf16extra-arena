"use client"

import { useState } from "react"
import { Cpu, MonitorIcon, Mouse, Keyboard, Headphones, CheckCircle2, Star, ChevronDown, ChevronUp, CpuIcon, Gauge, HardDrive, Fan } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Расширенные данные с рейтингами и производителями
const devices = [
  {
    zone: "Standart",
    rating: 4.2,
    specs: [
      { icon: Cpu, label: "i5-12400F", brand: "intel" },
      { icon: MonitorIcon, label: "RTX 4060 8GB", brand: "nvidia" },
      { icon: Cpu, label: "16GB DDR4", brand: "generic" },
      { icon: MonitorIcon, label: "240Hz", brand: "generic" },
    ],
    fullSpecs: [
      { icon: Cpu, label: "Процессор: Intel Core i5-12400F, 6 ядер / 12 потоков" },
      { icon: MonitorIcon, label: "Видеокарта: NVIDIA RTX 4060 8GB GDDR6" },
      { icon: HardDrive, label: "ОЗУ: 16GB DDR4 3200MHz" },
      { icon: HardDrive, label: "Накопитель: SSD 512GB NVMe" },
      { icon: Fan, label: "Охлаждение: Air cooling" },
    ],
    gear: [
      { icon: Mouse, label: "Asus ROG Strix Impact II", brand: "asus" },
      { icon: Keyboard, label: "Royal Kludge RK87", brand: "rk" },
      { icon: Headphones, label: "HyperX Cloud II", brand: "hyperx" },
    ],
    performance: "Отлично для CS2, Dota 2, Valorant",
  },
  {
    zone: "Standart Premium",
    rating: 4.5,
    specs: [
      { icon: Cpu, label: "i5-13400F", brand: "intel" },
      { icon: MonitorIcon, label: "RTX 5060 8GB", brand: "nvidia" },
      { icon: Cpu, label: "16GB DDR5", brand: "generic" },
      { icon: MonitorIcon, label: "280Hz", brand: "generic" },
    ],
    fullSpecs: [
      { icon: Cpu, label: "Процессор: Intel Core i5-13400F, 10 ядер / 16 потоков" },
      { icon: MonitorIcon, label: "Видеокарта: NVIDIA RTX 5060 8GB GDDR7" },
      { icon: HardDrive, label: "ОЗУ: 16GB DDR5 5600MHz" },
      { icon: HardDrive, label: "Накопитель: SSD 1TB NVMe" },
      { icon: Fan, label: "Охлаждение: Air cooling" },
    ],
    gear: [
      { icon: Mouse, label: "HyperX Pulsefire Haste 2 Wireless", brand: "hyperx" },
      { icon: Keyboard, label: "HyperX Alloy Origins 65", brand: "hyperx" },
      { icon: Headphones, label: "HyperX Cloud II Wireless", brand: "hyperx" },
    ],
    performance: "140+ FPS в Warzone, отличный запас",
  },
  {
    zone: "VIP",
    featured: true,
    rating: 4.8,
    specs: [
      { icon: Cpu, label: "i7-13700F", brand: "intel" },
      { icon: MonitorIcon, label: "RTX 4070 Super 12GB", brand: "nvidia" },
      { icon: Cpu, label: "32GB DDR5", brand: "generic" },
      { icon: MonitorIcon, label: "380Hz", brand: "generic" },
    ],
    fullSpecs: [
      { icon: Cpu, label: "Процессор: Intel Core i7-13700F, 16 ядер / 24 потока" },
      { icon: MonitorIcon, label: "Видеокарта: NVIDIA RTX 4070 Super 12GB GDDR6X" },
      { icon: HardDrive, label: "ОЗУ: 32GB DDR5 6000MHz" },
      { icon: HardDrive, label: "Накопитель: SSD 2TB NVMe" },
      { icon: Fan, label: "Охлаждение: Liquid cooling" },
    ],
    gear: [
      { icon: Mouse, label: "Logitech G Pro X Superlight", brand: "logitech" },
      { icon: Keyboard, label: "Dark Project Kepler", brand: "darkproject" },
      { icon: Headphones, label: "Logitech G Pro X", brand: "logitech" },
    ],
    performance: "Максимальные настройки в любых играх, 200+ FPS в Cyberpunk",
  },
  {
    zone: "PRO",
    rating: 5.0,
    specs: [
      { icon: Cpu, label: "Ryzen 7 7800X3D", brand: "amd" },
      { icon: MonitorIcon, label: "RTX 5070", brand: "nvidia" },
      { icon: Cpu, label: "32GB DDR5 6000MHz", brand: "generic" },
      { icon: MonitorIcon, label: "540Hz", brand: "generic" },
    ],
    fullSpecs: [
      { icon: Cpu, label: "Процессор: AMD Ryzen 7 7800X3D, 8 ядер / 16 потоков, 3D V-Cache" },
      { icon: MonitorIcon, label: "Видеокарта: NVIDIA RTX 5070 12GB GDDR7" },
      { icon: HardDrive, label: "ОЗУ: 32GB DDR5 6000MHz CL30" },
      { icon: HardDrive, label: "Накопитель: SSD 2TB NVMe Gen4" },
      { icon: Fan, label: "Охлаждение: Liquid cooling" },
    ],
    gear: [
      { icon: Mouse, label: "Logitech G Pro X Superlight 2", brand: "logitech" },
      { icon: Keyboard, label: "Varmilo Minilo Wireless", brand: "varmilo" },
      { icon: Headphones, label: "Logitech G Pro X 2 Lightspeed", brand: "logitech" },
    ],
    performance: "Топ для киберспорта, 360+ FPS в CS2, 250+ в PUBG",
  },
  {
    zone: "Elite",
    featured: true,
    rating: 5.0,
    specs: [
      { icon: Cpu, label: "Ryzen 7 9800X3D", brand: "amd" },
      { icon: MonitorIcon, label: "RTX 5070 Ti", brand: "nvidia" },
      { icon: Cpu, label: "32GB", brand: "generic" },
      { icon: MonitorIcon, label: "600Hz", brand: "benq" },
    ],
    fullSpecs: [
      { icon: Cpu, label: "Процессор: AMD Ryzen 7 9800X3D" },
      { icon: MonitorIcon, label: "Видеокарта: NVIDIA RTX 5070 Ti" },
      { icon: HardDrive, label: "ОЗУ: 32GB" },
      { icon: MonitorIcon, label: "Монитор: Zowie BenQ 600Hz" },
      { icon: Mouse, label: "Мышь: Logitech Superstrike" },
      { icon: Keyboard, label: "Клавиатура: Logitech TKL Rapid" },
      { icon: Headphones, label: "Наушники: Logitech G Pro X2 P" },
    ],
    gear: [
      { icon: Mouse, label: "Logitech Superstrike", brand: "logitech" },
      { icon: Keyboard, label: "Logitech TKL Rapid", brand: "logitech" },
      { icon: Headphones, label: "Logitech G Pro X2 P", brand: "logitech" },
    ],
    performance: "Премиум-зона для максимального отклика и киберспортивного уровня",
  },
]

// Цвета для брендов
const brandColors = {
  intel: "text-blue-500",
  nvidia: "text-green-500",
  amd: "text-red-500",
  hyperx: "text-purple-500",
  logitech: "text-gray-400",
  benq: "text-cyan-400",
  asus: "text-orange-500",
  darkproject: "text-indigo-500",
  varmilo: "text-pink-500",
  rk: "text-yellow-500",
  generic: "text-muted-foreground",
}

// Иконки для рейтинга
const renderRating = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-3 h-3 fill-primary text-primary" />)
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className="relative">
          <Star className="w-3 h-3 text-muted-foreground" />
          <Star className="w-3 h-3 fill-primary text-primary absolute top-0 left-0 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      )
    } else {
      stars.push(<Star key={i} className="w-3 h-3 text-muted-foreground" />)
    }
  }
  return stars
}

export function DevicesSection() {
  const [expandedZone, setExpandedZone] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("compact")

  const toggleExpand = (zone: string) => {
    setExpandedZone(expandedZone === zone ? null : zone)
  }

  return (
    <section id="devices" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium mb-6">
            <CpuIcon className="w-4 h-4" />
            Характеристики
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Девайсы и <span className="text-primary">железо</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Только топовое оборудование для максимальной производительности
          </p>

          {/* Переключатель режима просмотра */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant={viewMode === "compact" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("compact")}
              className="rounded-full"
            >
              Компактно
            </Button>
            <Button
              variant={viewMode === "detailed" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("detailed")}
              className="rounded-full"
            >
              Подробно
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {devices.map((device) => (
            <div
              key={device.zone}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              {/* Заголовок с рейтингом */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-semibold text-foreground">
                    {device.zone}
                  </div>
                  {device.featured && (
                    <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      PRO CHOICE
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {renderRating(device.rating)}
                  <span className="text-xs text-muted-foreground ml-1">{device.rating}</span>
                </div>
              </div>

              {/* Характеристики (основные) */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {device.specs.map((spec, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg text-xs",
                      "bg-secondary/30 border border-border/50"
                    )}
                  >
                    <spec.icon className={cn("w-3.5 h-3.5 shrink-0", brandColors[spec.brand as keyof typeof brandColors])} />
                    <span className="text-foreground truncate">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Периферия */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Периферия
                </div>
                {device.gear.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-md bg-secondary/50 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <span className={cn(
                      "text-foreground",
                      item.brand && brandColors[item.brand as keyof typeof brandColors]
                    )}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Производительность */}
              <div className="text-xs text-muted-foreground mb-4 p-3 bg-secondary/20 rounded-lg">
                <Gauge className="w-3.5 h-3.5 inline mr-1 text-primary" />
                {device.performance}
              </div>

              {/* Кнопка "Подробнее" с выпадайкой */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(device.zone)}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                {expandedZone === device.zone ? (
                  <>Скрыть <ChevronUp className="w-4 h-4 ml-1" /></>
                ) : (
                  <>Все характеристики <ChevronDown className="w-4 h-4 ml-1" /></>
                )}
              </Button>

              {/* Детальные характеристики (раскрывается) */}
              {expandedZone === device.zone && (
                <div className="mt-4 pt-4 border-t border-border space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Полная спецификация:
                  </div>
                  {device.fullSpecs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <spec.icon className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{spec.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
