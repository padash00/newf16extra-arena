"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Send } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  category?: string
  price?: string
  targetPhone?: string // НОВЫЙ ПРОП ДЛЯ НОМЕРА
}

export function BookingModal({ 
  isOpen, 
  onClose, 
  category, 
  price, 
  targetPhone = "77080161720" // Номер по умолчанию (Arena)
}: BookingModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [time, setTime] = useState("")
  const [comment, setComment] = useState("")

  const handleBooking = () => {
    // Формируем текст сообщения
    const text = `👋 Привет! Хочу забронировать:
🎮 Зона/Пакет: ${category || "Не выбрано"}
💰 Прайс: ${price || "По факту"}
👤 Имя: ${name}
📱 Тел: ${phone}
⏰ Время: ${time}
💬 Комментарий: ${comment}`

    // Используем переданный номер или дефолтный
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`
    
    window.open(url, "_blank")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-primary/20 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            Бронирование <span className="text-primary">{category}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заполните форму, и мы перекинем вас в WhatsApp для подтверждения.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Ваше Имя</Label>
            <Input 
              id="name" 
              placeholder="Олжас" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 border-border focus:ring-primary/50"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input 
              id="phone" 
              placeholder="+7 777 000 00 00" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-secondary/50 border-border focus:ring-primary/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Когда планируете прийти?</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="time" 
                placeholder="09:00" 
                className="pl-9 bg-secondary/50 border-border focus:ring-primary/50"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="comment">Комментарий (необязательно)</Label>
            <Textarea 
              id="comment" 
              placeholder="Доп. пожелания..." 
              className="bg-secondary/50 border-border focus:ring-primary/50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleBooking} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-bold">
            <Send className="w-4 h-4" /> Отправить в WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}