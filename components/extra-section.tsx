"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2, Car, Package, Sparkles, Star } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { siteContent } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const extraIcons = {
  gamepad: Gamepad2,
  car: Car,
}

const filters = [...siteContent.extra.filters]
const extraItems = siteContent.extra.items.map((item) => ({
  ...item,
  items: item.items.map((subItem) => ({ ...subItem })),
}))
const packages = [...siteContent.extra.packages]

export function ExtraSection() {
  const [selectedExtra, setSelectedExtra] = useState<{ name: string; price: string } | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [hours, setHours] = useState<Record<string, number>>(Object.fromEntries(extraItems.map((item) => [item.category, 1])))
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<Record<string, string>>(
    Object.fromEntries(extraItems.map((item) => [item.category, item.items[0].name])),
  )

  const filteredItems = extraItems.filter((item) => {
    if (activeFilter === "all") return true
    if (activeFilter === "ps5") return item.category === "PS5"
    if (activeFilter === "simracing") return item.category === "SimRacing"
    return true
  })

  const getSelectedItem = (category: string) => {
    const currentCategory = extraItems.find((item) => item.category === category)
    if (!currentCategory) return null
    return currentCategory.items.find((item) => item.name === selectedItemByCategory[category]) ?? currentCategory.items[0]
  }

  const calculatePrice = (category: string) => {
    const selectedItem = getSelectedItem(category)
    if (!selectedItem) return 0
    return selectedItem.billing === "hourly" ? selectedItem.price * (hours[category] || 1) : selectedItem.price
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₸"
  }

  return (
    <section id="extra" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Развлечения нового уровня
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            F16 Extra — <span className="text-primary">PS5 и SimRacing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите формат отдыха: консоли или полный драйв за рулём
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="rounded-full"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredItems.map((item) => {
            const selectedItem = getSelectedItem(item.category)
            const totalPrice = calculatePrice(item.category)

            return (
              <div
                key={item.category}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("p-3 rounded-xl", item.bgColor, item.color)}>
                    {(() => {
                      const Icon = extraIcons[item.icon]
                      return <Icon className="w-6 h-6" />
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-xl">{item.category}</h3>
                  </div>
                  {item.popular && (
                    <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Star className="w-3 h-3" />
                      Популярное
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6">{item.description}</p>

                <div className="space-y-3 mb-6">
                  {item.items.map((subItem) => {
                    const isSelected = selectedItemByCategory[item.category] === subItem.name

                    return (
                      <button
                        key={subItem.name}
                        type="button"
                        onClick={() =>
                          setSelectedItemByCategory((prev) => ({
                            ...prev,
                            [item.category]: subItem.name,
                          }))
                        }
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left",
                          isSelected
                            ? "bg-primary/10 border border-primary"
                            : "bg-secondary/20 hover:bg-secondary/30 border border-transparent",
                        )}
                      >
                        <div>
                          <span className="text-foreground font-medium">{subItem.name}</span>
                          <p className="text-xs text-muted-foreground mt-1">{subItem.note}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-primary font-bold text-lg">{formatPrice(subItem.price)}</div>
                          <div className="text-xs text-muted-foreground">{subItem.priceStr}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {selectedItem?.billing === "hourly" && (
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Количество часов: <span className="text-primary font-bold">{hours[item.category] || 1}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={hours[item.category] || 1}
                      onChange={(e) =>
                        setHours((prev) => ({
                          ...prev,
                          [item.category]: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1 час</span>
                      <span>3 часа</span>
                      <span>6 часов</span>
                    </div>
                  </div>
                )}

                <div className="mb-4 rounded-xl bg-secondary/20 p-3">
                  <div className="text-sm text-muted-foreground">К оплате</div>
                  <div className="text-2xl font-bold text-primary font-mono">{formatPrice(totalPrice)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedItem?.billing === "hourly"
                      ? "Сумма зависит от выбранного количества часов."
                      : "Фиксированная стоимость пакета."}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    setSelectedExtra({
                      name: `${item.category} · ${selectedItem?.name || "тариф"}`,
                      price: formatPrice(totalPrice),
                    })
                  }
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  Забронировать
                </Button>
              </div>
            )
          })}
        </div>

        <div className="relative">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-xl">Пакеты аренды</h3>
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
                  className={cn(
                    "rounded-xl p-4 text-center transition-all cursor-pointer relative",
                    pkg.popular
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-secondary/30 border border-border hover:border-primary/30",
                  )}
                >
                  {pkg.discount && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      -
                      {Math.round(
                        (1 -
                          parseInt(pkg.price.replace(/\D/g, ""), 10) /
                            parseInt(pkg.oldPrice?.replace(/\D/g, "") || "0", 10)) *
                          100,
                      )}
                      %
                    </div>
                  )}
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      Лучший выбор
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mb-2">{pkg.duration}</div>
                  <div className="font-semibold text-foreground mb-2">{pkg.name}</div>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-primary font-mono">{pkg.price}</div>
                    {pkg.oldPrice && <div className="text-sm text-muted-foreground line-through">{pkg.oldPrice}</div>}
                  </div>

                  {pkg.subtitle && <div className="text-xs text-muted-foreground leading-relaxed">{pkg.subtitle}</div>}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={() => setSelectedExtra({ name: "Пакетное предложение", price: "Уточнить" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
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
        targetPhone={siteContent.contacts.phones[1].phoneRaw}
      />
    </section>
  )
}
