"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Car, Gamepad2, Package, Sparkles, Star } from "lucide-react"
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

  const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₸"

  return (
    <section id="extra" className="section-shell py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
            <Sparkles className="h-4 w-4" />
            F16 Extra
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Отдельное пространство
            <span className="block text-primary">для PS5 и SimRacing</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Не только ПК-зоны: консоли, кокпиты и готовые пакеты для компании собраны в отдельный premium-блок.
          </p>

          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 p-1.5">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="rounded-full px-5"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredItems.map((item) => {
            const selectedItem = getSelectedItem(item.category)
            const totalPrice = calculatePrice(item.category)
            const Icon = extraIcons[item.icon]

            return (
              <article key={item.category} className="premium-panel rounded-[1.9rem] p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border border-white/6", item.bgColor, item.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">{item.category}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  {item.popular && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-medium text-primary">
                      <Star className="h-3.5 w-3.5" />
                      Популярно
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
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
                          "w-full rounded-[1.25rem] border px-4 py-4 text-left transition-all",
                          isSelected
                            ? "border-[rgba(223,255,87,0.42)] bg-[rgba(223,255,87,0.08)]"
                            : "border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] hover:bg-secondary/70",
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-base font-semibold text-foreground">{subItem.name}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{subItem.note}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xl font-semibold text-primary">{formatPrice(subItem.price)}</div>
                            <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[rgba(185,154,99,0.86)]">{subItem.priceStr}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {selectedItem?.billing === "hourly" && (
                  <div className="mt-6 rounded-[1.35rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Количество часов</span>
                      <span className="font-mono text-lg font-semibold text-foreground">{hours[item.category] || 1}</span>
                    </div>
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
                      className="mt-4 w-full cursor-pointer appearance-none rounded-lg accent-primary"
                    />
                    <div className="mt-2 flex justify-between text-xs uppercase tracking-[0.14em] text-[rgba(185,154,99,0.82)]">
                      <span>1 ч</span>
                      <span>3 ч</span>
                      <span>6 ч</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-end justify-between rounded-[1.35rem] bg-[rgba(223,255,87,0.07)] px-4 py-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[rgba(185,154,99,0.9)]">К оплате</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {selectedItem?.billing === "hourly" ? "Почасовой расчёт" : "Фиксированная цена пакета"}
                    </div>
                  </div>
                  <div className="font-mono text-3xl font-semibold text-primary">{formatPrice(totalPrice)}</div>
                </div>

                <Button
                  onClick={() =>
                    setSelectedExtra({
                      name: `${item.category} · ${selectedItem?.name || "тариф"}`,
                      price: formatPrice(totalPrice),
                    })
                  }
                  className="mt-5 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Забронировать
                </Button>
              </article>
            )
          })}
        </div>

        <div className="mt-10 premium-panel rounded-[2rem] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
                <Package className="h-4 w-4" />
                Готовые сценарии
              </div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Пакеты для компании и вечера</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                Если хочется не выбирать по отдельности, бери готовый набор под друзей, день рождения или короткий вечерний заход.
              </p>
            </div>
            <div className="rounded-full border border-[rgba(185,154,99,0.18)] bg-card/60 px-4 py-2 text-sm text-muted-foreground">
              Подтверждаем через WhatsApp
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg, index) => (
              <div
                key={`${pkg.name}-${index}`}
                onClick={() => setSelectedExtra({ name: `ПАКЕТ: ${pkg.name}`, price: pkg.price })}
                className={cn(
                  "relative cursor-pointer rounded-[1.45rem] border p-5 transition-all hover:-translate-y-1",
                  pkg.popular
                    ? "border-[rgba(223,255,87,0.36)] bg-[rgba(223,255,87,0.08)]"
                    : "border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] hover:bg-secondary/70",
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                    Лучший выбор
                  </div>
                )}
                <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(185,154,99,0.86)]">{pkg.duration}</div>
                <div className="mt-3 text-xl font-semibold text-foreground">{pkg.name}</div>
                <div className="mt-4 flex items-end gap-2">
                  <div className="font-mono text-3xl font-semibold text-primary">{pkg.price}</div>
                  {pkg.oldPrice && <div className="pb-1 text-sm text-muted-foreground line-through">{pkg.oldPrice}</div>}
                </div>
                {pkg.subtitle && <div className="mt-3 text-sm leading-6 text-muted-foreground">{pkg.subtitle}</div>}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => setSelectedExtra({ name: "Пакетное предложение", price: "Уточнить" })}
              className="h-[52px] rounded-full bg-secondary px-8 text-secondary-foreground hover:bg-secondary/80"
            >
              Забронировать пакет
            </Button>
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
