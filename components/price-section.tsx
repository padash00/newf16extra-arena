"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Crown, Filter, Monitor, Percent, Star, TrendingUp, Zap } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { siteContent } from "@/lib/site-content"
import { cn } from "@/lib/utils"

interface ZonePrice {
  label: string
  value: number
  unit: string
  type: "hour" | "package" | "day" | "night"
  discount?: number
}

interface Zone {
  name: string
  pcs: string
  description: string
  icon: "monitor" | "star" | "crown" | "zap"
  color: string
  bgColor: string
  featured?: boolean
  prices: ZonePrice[]
}

const iconMap = {
  monitor: Monitor,
  star: Star,
  crown: Crown,
  zap: Zap,
}

const sortOptions = [...siteContent.pricing.sortOptions]
const timeFilters = [...siteContent.pricing.timeFilters]
const zones: Zone[] = siteContent.pricing.zones.map((zone) => ({
  ...zone,
  prices: zone.prices.map((price) => ({ ...price })),
}))

export function PriceSection() {
  const [selectedZone, setSelectedZone] = useState<{ name: string; price: string } | null>(null)
  const [hoursByZone, setHoursByZone] = useState<Record<string, number>>(
    Object.fromEntries(zones.map((zone) => [zone.name, 1])),
  )
  const [selectedPriceByZone, setSelectedPriceByZone] = useState<Record<string, string>>(
    Object.fromEntries(zones.map((zone) => [zone.name, zone.prices[0].label])),
  )
  const [sortBy, setSortBy] = useState("default")
  const [activeFilter, setActiveFilter] = useState("all")

  const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₸"

  const getPricePerHour = (price: ZonePrice) => {
    if (price.type === "hour") return price.value
    if (price.type === "package") {
      if (price.label === "2+1") return price.value / 3
      if (price.label === "3+2") return price.value / 5
    }
    if (price.type === "night") return price.value / 8
    if (price.type === "day") return price.value / 12
    return price.value
  }

  const filteredZones: Zone[] = zones
    .map((zone) => ({
      ...zone,
      prices: zone.prices.filter((price) => (activeFilter === "all" ? true : price.type === activeFilter)),
    }))
    .filter((zone) => zone.prices.length > 0)

  const sortedZones = [...filteredZones].sort((a, b) => {
    if (sortBy === "price-asc") {
      const aMin = Math.min(...a.prices.map((price) => price.value))
      const bMin = Math.min(...b.prices.map((price) => price.value))
      return aMin - bMin
    }
    if (sortBy === "price-desc") {
      const aMax = Math.max(...a.prices.map((price) => price.value))
      const bMax = Math.max(...b.prices.map((price) => price.value))
      return bMax - aMax
    }
    if (sortBy === "popular") {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
    }
    return 0
  })

  const getSelectedPrice = (zone: Zone) => zone.prices.find((price) => price.label === selectedPriceByZone[zone.name]) ?? zone.prices[0]

  const getTotalPrice = (zone: Zone) => {
    const selectedPrice = getSelectedPrice(zone)
    const hours = hoursByZone[zone.name] ?? 1
    return selectedPrice.type === "hour" ? selectedPrice.value * hours : selectedPrice.value
  }

  return (
    <section id="price" className="section-shell py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
            <TrendingUp className="h-4 w-4" />
            Premium pricing
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Прайс, собранный
            <span className="block text-primary">по зонам и уровню комфорта</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            От стандартных посадок до Elite: понятные тарифы, отдельные пакеты и честная ночная ставка.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 p-1.5">
              <Filter className="ml-2 h-4 w-4 text-[rgba(185,154,99,0.85)]" />
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all",
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(223,255,87,0.12)]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 px-4 py-2 text-sm text-muted-foreground">
              71 ПК, 5 уровней посадки
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-12 rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 px-5 text-sm text-foreground outline-none transition-colors focus:border-[rgba(223,255,87,0.45)]"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {sortedZones.map((zone) => {
            const selectedPrice = getSelectedPrice(zone)
            const totalPrice = getTotalPrice(zone)
            const Icon = iconMap[zone.icon]

            return (
              <div
                key={zone.name}
                className={cn(
                  "premium-panel rounded-[1.9rem] p-5 backdrop-blur-xl transition-all hover:-translate-y-1",
                  zone.featured && "border-[rgba(223,255,87,0.28)] shadow-[0_24px_54px_rgba(0,0,0,0.32)]",
                )}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.06)]",
                        zone.bgColor,
                        zone.color,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{zone.name}</h3>
                      <p className="text-xs uppercase tracking-[0.18em] text-[rgba(185,154,99,0.85)]">{zone.pcs}</p>
                    </div>
                  </div>
                  {zone.featured && (
                    <div className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>

                <p className="mb-5 min-h-12 text-sm leading-6 text-muted-foreground">{zone.description}</p>

                <div className="space-y-2.5">
                  {zone.prices.map((price) => {
                    const isBestDeal = price.type === "package" && price.discount
                    const isSelected = selectedPriceByZone[zone.name] === price.label
                    const pricePerHour = getPricePerHour(price)

                    return (
                      <button
                        key={price.label}
                        type="button"
                        onClick={() =>
                          setSelectedPriceByZone((prev) => ({
                            ...prev,
                            [zone.name]: price.label,
                          }))
                        }
                        className={cn(
                          "w-full rounded-[1.2rem] border px-3.5 py-3 text-left transition-all",
                          isSelected
                            ? "border-[rgba(223,255,87,0.42)] bg-[rgba(223,255,87,0.08)]"
                            : "border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] hover:bg-secondary/70",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">{price.label}</span>
                              {isBestDeal && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(223,255,87,0.12)] px-1.5 py-0.5 text-[11px] font-medium text-primary">
                                  <Percent className="h-3 w-3" />
                                  -{price.discount}%
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{price.unit}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-lg font-semibold text-foreground">{formatPrice(price.value)}</div>
                            {price.type !== "hour" && (
                              <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[rgba(185,154,99,0.86)]">
                                {formatPrice(Math.round(pricePerHour))}/час
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-5 rounded-[1.3rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4">
                  {selectedPrice.type === "hour" ? (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Количество часов</span>
                        <span className="font-mono text-base font-semibold text-foreground">{hoursByZone[zone.name] ?? 1}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() =>
                            setHoursByZone((prev) => ({
                              ...prev,
                              [zone.name]: Math.max(1, (prev[zone.name] ?? 1) - 1),
                            }))
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 text-foreground transition-colors hover:bg-secondary"
                        >
                          -
                        </button>
                        <div className="flex-1 rounded-full bg-secondary/70 px-4 py-2 text-center text-sm text-muted-foreground">
                          Почасовой тариф
                        </div>
                        <button
                          onClick={() =>
                            setHoursByZone((prev) => ({
                              ...prev,
                              [zone.name]: Math.min(12, (prev[zone.name] ?? 1) + 1),
                            }))
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 text-foreground transition-colors hover:bg-secondary"
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm leading-6 text-muted-foreground">
                      Выбран фиксированный пакет. Цена не меняется и уже оптимальна для этого формата.
                    </div>
                  )}

                  <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[rgba(185,154,99,0.86)]">Итого</div>
                      <div className="mt-1 text-sm text-muted-foreground">{selectedPrice.label}</div>
                    </div>
                    <div className="font-mono text-2xl font-semibold text-primary">{formatPrice(totalPrice)}</div>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    setSelectedZone({
                      name: `${zone.name} · ${selectedPrice.label}`,
                      price: formatPrice(totalPrice),
                    })
                  }
                  className={cn(
                    "mt-5 h-12 w-full rounded-full",
                    zone.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  Забронировать
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <BookingModal
        isOpen={!!selectedZone}
        onClose={() => setSelectedZone(null)}
        category={selectedZone?.name}
        price={selectedZone?.price}
        targetPhone={siteContent.contacts.phones[0].phoneRaw}
      />
    </section>
  )
}
