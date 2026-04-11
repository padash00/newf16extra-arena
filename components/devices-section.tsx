"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  CpuIcon,
  Fan,
  Gauge,
  HardDrive,
  Headphones,
  Keyboard,
  MonitorIcon,
  Mouse,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

const brandColors = {
  intel: "text-blue-400",
  nvidia: "text-green-400",
  amd: "text-orange-300",
  hyperx: "text-violet-400",
  logitech: "text-neutral-300",
  benq: "text-cyan-300",
  asus: "text-orange-400",
  darkproject: "text-indigo-300",
  varmilo: "text-pink-300",
  rk: "text-yellow-300",
  generic: "text-muted-foreground",
}

const renderRating = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />)
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className="relative">
          <Star className="h-3.5 w-3.5 text-muted-foreground" />
          <Star
            className="absolute left-0 top-0 h-3.5 w-3.5 fill-primary text-primary"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      )
    } else {
      stars.push(<Star key={i} className="h-3.5 w-3.5 text-muted-foreground" />)
    }
  }

  return stars
}

export function DevicesSection() {
  const [expandedZone, setExpandedZone] = useState<string | null>("Elite")
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("compact")

  const toggleExpand = (zone: string) => {
    setExpandedZone(expandedZone === zone ? null : zone)
  }

  return (
    <section id="devices" className="section-shell py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
            <CpuIcon className="h-4 w-4" />
            Hardware catalogue
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Железо, собранное
            <span className="block text-primary">от стабильного уровня до Elite</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Каждая зона отличается по отклику, периферии и частоте монитора. Это помогает сразу выбрать комфортный уровень.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 p-1.5">
            <Button
              variant={viewMode === "compact" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("compact")}
              className="rounded-full px-5"
            >
              Компактно
            </Button>
            <Button
              variant={viewMode === "detailed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("detailed")}
              className="rounded-full px-5"
            >
              Подробно
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {devices.map((device) => (
            <article
              key={device.zone}
              className={cn(
                "premium-panel rounded-[1.9rem] p-6 backdrop-blur-xl transition-all hover:-translate-y-1",
                device.featured && "border-[rgba(185,154,99,0.28)]",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-[rgba(185,154,99,0.24)] bg-[rgba(185,154,99,0.12)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[rgba(185,154,99,0.96)]">
                    {device.zone}
                  </div>
                  {device.featured && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-medium text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Premium pick
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {renderRating(device.rating)}
                  <span className="ml-1 text-xs font-mono text-muted-foreground">{device.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {device.specs.map((spec, index) => (
                  <div
                    key={`${device.zone}-${spec.label}-${index}`}
                    className="rounded-[1.1rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] px-3 py-3"
                  >
                    <spec.icon className={cn("h-4 w-4", brandColors[spec.brand as keyof typeof brandColors])} />
                    <div className="mt-3 text-sm font-medium text-foreground">{spec.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[rgba(185,154,99,0.88)]">Периферия</div>
                <div className="mt-3 space-y-2.5">
                  {device.gear.map((item, index) => (
                    <div key={`${device.zone}-gear-${index}`} className="flex items-center gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/70">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className={cn("text-foreground", brandColors[item.brand as keyof typeof brandColors])}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.25rem] bg-[rgba(223,255,87,0.07)] px-4 py-3 text-sm leading-7 text-foreground">
                <Gauge className="mr-2 inline h-4 w-4 text-primary" />
                {device.performance}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(device.zone)}
                className="mt-4 h-11 w-full justify-between rounded-2xl border border-[rgba(185,154,99,0.14)] bg-card/40 px-4 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <span>{expandedZone === device.zone ? "Скрыть спецификацию" : "Открыть полную спецификацию"}</span>
                {expandedZone === device.zone ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {(viewMode === "detailed" || expandedZone === device.zone) && (
                <div className="mt-4 space-y-2 rounded-[1.35rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[rgba(185,154,99,0.88)]">Полная спецификация</div>
                  {device.fullSpecs.map((spec, index) => (
                    <div key={`${device.zone}-full-${index}`} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <spec.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{spec.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
