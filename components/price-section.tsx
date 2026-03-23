"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Crown, Star, Zap, TrendingUp, Percent, Filter } from "lucide-react"
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

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₸"
  }

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

  const getSelectedPrice = (zone: Zone) => {
    return zone.prices.find((price) => price.label === selectedPriceByZone[zone.name]) ?? zone.prices[0]
  }

  const getTotalPrice = (zone: Zone) => {
    const selectedPrice = getSelectedPrice(zone)
    const hours = hoursByZone[zone.name] ?? 1
    return selectedPrice.type === "hour" ? selectedPrice.value * hours : selectedPrice.value
  }

  return (
    <section id="price" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Цены и тарифы
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Прайс <span className="text-primary">F16 Arena</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Прозрачные цены на все зоны клуба</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-card border border-border rounded-full p-1">
              <Filter className="w-4 h-4 text-muted-foreground ml-2" />
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-all",
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedZones.map((zone) => {
            const selectedPrice = getSelectedPrice(zone)
            const totalPrice = getTotalPrice(zone)

            return (
              <div
                key={zone.name}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2.5 rounded-xl", zone.bgColor, zone.color)}>
                      {(() => {
                        const Icon = iconMap[zone.icon]
                        return <Icon className="w-5 h-5" />
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{zone.name}</h3>
                      <p className="text-xs text-muted-foreground">{zone.pcs}</p>
                    </div>
                  </div>
                  {zone.featured && (
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Популярный</div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">{zone.description}</p>

                <div className="space-y-2 mb-6">
                  {zone.prices.map((price) => {
                    const isBestDeal = price.type === "package" && price.discount
                    const pricePerHour = getPricePerHour(price)
                    const isSelected = selectedPriceByZone[zone.name] === price.label

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
                          "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left",
                          isSelected
                            ? "bg-primary/10 border border-primary"
                            : "bg-secondary/20 hover:bg-secondary/30 border border-transparent",
                        )}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-medium">{price.label}</span>
                            {isBestDeal && (
                              <span className="text-xs bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <Percent className="w-2 h-2" />
                                -{price.discount}%
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{price.unit}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground font-mono">{formatPrice(price.value)}</div>
                          {price.type !== "hour" && (
                            <div className="text-xs text-muted-foreground">{formatPrice(pricePerHour)}/час</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="mb-4 p-3 bg-secondary/20 rounded-lg">
                  {selectedPrice.type === "hour" ? (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Часов:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setHoursByZone((prev) => ({
                                ...prev,
                                [zone.name]: Math.max(1, (prev[zone.name] ?? 1) - 1),
                              }))
                            }
                            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{hoursByZone[zone.name] ?? 1}</span>
                          <button
                            onClick={() =>
                              setHoursByZone((prev) => ({
                                ...prev,
                                [zone.name]: Math.min(12, (prev[zone.name] ?? 1) + 1),
                              }))
                            }
                            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Сумма пересчитывается только для почасового тарифа.</div>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">Фиксированная цена за выбранный тариф.</div>
                  )}

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
                    <span className="text-sm font-medium">Итого:</span>
                    <span className="text-xl font-bold text-primary font-mono">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    setSelectedZone({
                      name: `${zone.name} · ${selectedPrice.label}`,
                      price: formatPrice(totalPrice),
                    })
                  }
                  className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
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
