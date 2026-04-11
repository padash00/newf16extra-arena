"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Send, Users, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const getLocalDateValue = (date = new Date()) => {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return offsetDate.toISOString().split("T")[0]
}

const formatDateLabel = (dateString: string, options: Intl.DateTimeFormatOptions) => {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("ru-RU", options)
}

const SimpleCalendar = ({ selectedDate, onSelect }: { selectedDate: string; onSelect: (date: string) => void }) => {
  const today = new Date()
  const dates = []

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const formatted = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      weekday: "short",
    })
    dates.push({
      value: getLocalDateValue(date),
      label: formatted,
    })
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {dates.map((date) => (
        <button
          key={date.value}
          onClick={() => onSelect(date.value)}
          className={cn(
            "p-2 text-xs rounded-lg border transition-all",
            selectedDate === date.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/50 border-border hover:border-primary/50",
          )}
        >
          {date.label}
        </button>
      ))}
    </div>
  )
}

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
  "02:00",
]

const zoneOptions = [
  { value: "standart", label: "Standart", price: "900₸/час" },
  { value: "premium", label: "Standart Premium", price: "1 200₸/час" },
  { value: "vip", label: "VIP", price: "1 400₸/час" },
  { value: "pro", label: "PRO", price: "1 800₸/час" },
  { value: "elite", label: "Elite", price: "2 800₸/час" },
  { value: "ps5", label: "PS5", price: "1 200₸/час" },
  { value: "simracing", label: "SimRacing", price: "2 500₸/час" },
]

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  category?: string
  price?: string
  targetPhone?: string
}

export function BookingModal({
  isOpen,
  onClose,
  category: initialCategory,
  price,
  targetPhone = "77080161720",
}: BookingModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(1)
  const [category, setCategory] = useState(initialCategory || "")
  const [comment, setComment] = useState("")

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSuccess(false)
      setErrors({})
      setCategory(initialCategory || "")
      setDate(getLocalDateValue())
      setTime("")
      setComment("")
      setGuests(1)
      setShowCalendar(false)
      setShowTimePicker(false)
    }
  }, [isOpen, initialCategory])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 0) {
      if (value.startsWith("7")) {
        value = value.slice(1)
      }
      if (value.length > 10) {
        value = value.slice(0, 10)
      }

      let formatted = "+7 "
      if (value.length > 0) {
        formatted += "(" + value.slice(0, 3)
      }
      if (value.length > 3) {
        formatted += ") " + value.slice(3, 6)
      }
      if (value.length > 6) {
        formatted += "-" + value.slice(6, 8)
      }
      if (value.length > 8) {
        formatted += "-" + value.slice(8, 10)
      }
      setPhone(formatted)
    } else {
      setPhone("")
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = "Введите имя"
    }

    if (!phone.trim()) {
      newErrors.phone = "Введите телефон"
    } else if (phone.replace(/\D/g, "").length < 11) {
      newErrors.phone = "Неполный номер"
    }

    if (!date) {
      newErrors.date = "Выберите дату"
    }

    if (!time) {
      newErrors.time = "Выберите время"
    }

    if (!category.trim()) {
      newErrors.category = "Выберите зону"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBooking = async () => {
    if (!validateForm()) {
      setIsSubmitting(true)
      setTimeout(() => setIsSubmitting(false), 500)
      return
    }

    setIsSubmitting(true)

    const formattedDate = date
      ? formatDateLabel(date, {
          day: "numeric",
          month: "long",
        })
      : ""

    const text = `🎮 НОВОЕ БРОНИРОВАНИЕ

👤 Имя: ${name}
📱 Телефон: ${phone}
📅 Дата: ${formattedDate}
⏰ Время: ${time}
👥 Гостей: ${guests}
🕹️ Зона: ${category || "Не выбрано"}
💰 Прайс: ${price || "По прайсу"}
💬 Комментарий: ${comment || "Нет"}

#бронь #f16arena`

    await new Promise((resolve) => setTimeout(resolve, 800))

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`
    const popup = window.open(url, "_blank", "noopener,noreferrer")
    if (!popup) {
      window.location.href = url
    }

    setSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      onClose()
      setName("")
      setPhone("")
      setDate(getLocalDateValue())
      setTime("")
      setComment("")
      setGuests(1)
      setCategory(initialCategory || "")
    }, 2000)
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setDate(getLocalDateValue())
    setTime("")
    setComment("")
    setGuests(1)
    setCategory(initialCategory || "")
    setShowCalendar(false)
    setShowTimePicker(false)
    setErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-primary/20 text-foreground max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Заявка отправлена!</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Мы перенаправили вас в WhatsApp для подтверждения
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Бронирование
                {category && <span className="text-primary">· {category}</span>}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Заполните все поля — мы сразу пришлем подтверждение в WhatsApp
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  Ваше Имя <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Олжас"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn("bg-secondary/50 border-border", errors.name && "border-destructive ring-destructive/50")}
                />
                {errors.name && (
                  <p className="text-destructive text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  Телефон <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="+7 (777) 000-00-00"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="tel"
                  className={cn(
                    "bg-secondary/50 border-border",
                    errors.phone && "border-destructive ring-destructive/50",
                  )}
                />
                {errors.phone && (
                  <p className="text-destructive text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-1">
                  Дата <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-secondary/50 border-border",
                      !date && "text-muted-foreground",
                      errors.date && "border-destructive",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date
                      ? formatDateLabel(date, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Выберите дату"}
                  </Button>
                </div>
                {errors.date && (
                  <p className="text-destructive text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.date}
                  </p>
                )}

                {showCalendar && (
                  <SimpleCalendar
                    selectedDate={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setShowCalendar(false)
                      setErrors((prev) => ({ ...prev, date: "" }))
                    }}
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-1">
                  Время <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-secondary/50 border-border",
                      !time && "text-muted-foreground",
                      errors.time && "border-destructive",
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time || "Выберите время"}
                  </Button>
                </div>
                {errors.time && (
                  <p className="text-destructive text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.time}
                  </p>
                )}

                {showTimePicker && (
                  <div className="grid grid-cols-4 gap-2 mt-2 max-h-40 overflow-y-auto p-2 bg-secondary/30 rounded-lg">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setTime(slot)
                          setShowTimePicker(false)
                          setErrors((prev) => ({ ...prev, time: "" }))
                        }}
                        className={cn(
                          "p-2 text-xs rounded-lg border transition-all",
                          time === slot
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary/50 border-border hover:border-primary/50",
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Количество гостей</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="bg-secondary/50 border-border"
                  >
                    <X className="w-4 h-4 rotate-45" />
                  </Button>
                  <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {guests} {guests === 1 ? "человек" : guests < 5 ? "человека" : "человек"}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="bg-secondary/50 border-border"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {!category && (
                <div className="grid gap-2">
                  <Label>
                    Выберите зону <span className="text-destructive">*</span>
                  </Label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setErrors((prev) => ({ ...prev, category: "" }))
                    }}
                    className={cn(
                      "w-full p-2 bg-secondary/50 border border-border rounded-lg text-foreground",
                      errors.category && "border-destructive",
                    )}
                  >
                    <option value="">-- Выберите зону --</option>
                    {zoneOptions.map((zone) => (
                      <option key={zone.value} value={zone.label}>
                        {zone.label} ({zone.price})
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-destructive text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.category}
                    </p>
                  )}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="comment">Комментарий (необязательно)</Label>
                <Textarea
                  id="comment"
                  placeholder="Доп. пожелания..."
                  className="bg-secondary/50 border-border focus:ring-primary/50"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={resetForm} className="sm:flex-1 border-border">
                Очистить
              </Button>
              <Button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="sm:flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-bold"
              >
                {isSubmitting ? (
                  <>Отправка...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Отправить
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
