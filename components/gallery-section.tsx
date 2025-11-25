"use client"

import * as React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Camera } from "lucide-react"
import AutoScroll from "embla-carousel-auto-scroll"

// Исправленные ссылки (i.ibb.co)
const photos = [
  "https://i.ibb.co/xqM1FSyf/DSCF9831.png",
  "https://i.ibb.co/pBnzVKSg/DSCF9832.png",
  "https://i.ibb.co/xtMy8xcj/DSCF9836.png",
  "https://i.ibb.co/6c21xgPb/DSCF9838.png",
  "https://i.ibb.co/MxBLQMzp/DSCF9839.png",
  "https://i.ibb.co/1tDZyrmJ/DSCF9841.png",
  "https://i.ibb.co/7x2jw7bZ/DSCF9844.png",
  "https://i.ibb.co/qYk3LHbB/DSCF9845.png",
  "https://i.ibb.co/9mNL8n0g/DSCF9849.png",
  "https://i.ibb.co/6RyBVn0B/DSCF9850.png",
  "https://i.ibb.co/Zpt97Nnz/DSCF9852.png",
  "https://i.ibb.co/KzVwnJ13/DSCF9855.png",
  "https://i.ibb.co/PvzB82B3/DSCF9857.png",
  "https://i.ibb.co/xSwd1VwJ/DSCF9860.png",
  "https://i.ibb.co/svNPNXdj/DSCF9861.png",
  "https://i.ibb.co/Q7rwZWMF/DSCF9867.png",
  "https://i.ibb.co/m5L9bncY/DSCF9873.png",
  "https://i.ibb.co/YwC88YS/DSCF9879.png",
  "https://i.ibb.co/FbV2cb72/DSCF9885.png",
  "https://i.ibb.co/DHvf6Gtq/DSCF9894.png",
  "https://i.ibb.co/tTdmWvZ2/DSCF9895.png",
  "https://i.ibb.co/DDz2kFYV/DSCF9897.png",
  "https://i.ibb.co/PZHZ6jZr/DSCF9906.png",
  "https://i.ibb.co/3xng2kD/DSCF9910.png",
  "https://i.ibb.co/0RDv4fYg/DSCF9920.png",
  "https://i.ibb.co/s9VS3c9R/DSCF9924.png",
  "https://i.ibb.co/PGzkBZCf/DSCF9928.png",
  "https://i.ibb.co/wZGv0Kpp/DSCF9929.png",
  "https://i.ibb.co/MxQGs3Y1/DSCF9934.png",
  "https://i.ibb.co/PsRnT5pn/DSCF9940.png",
  "https://i.ibb.co/fdhy31PP/DSCF9947.png",
  "https://i.ibb.co/knwTTBY/DSCF9950.png",
  "https://i.ibb.co/7dbjfpVm/DSCF9959.png",
  "https://i.ibb.co/RGFBn7jC/DSCF9969.png",
  "https://i.ibb.co/SwppZn7V/DSCF9983.png",
  "https://i.ibb.co/Y72P8LG2/DSCF9987.png",
  "https://i.ibb.co/4gtDh6db/DSCF9995.png",
  "https://i.ibb.co/tpsmptjV/DSCF9997.png",
  "https://i.ibb.co/S7v2SJKf/DSCF9998.png",
  "https://i.ibb.co/C5X03Qqx/IMG-7155.png",
  "https://i.ibb.co/nMTsJKk7/IMG-7157.png",
  "https://i.ibb.co/BH28FNNm/IMG-7158.png",
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-bold text-secondary/30 pointer-events-none select-none whitespace-nowrap blur-sm z-0">
        ATMOSPHERE
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <Camera className="w-4 h-4" />
            Интерьер
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Атмосфера <span className="text-primary">F16</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Почувствуй вайб реального гейминга
          </p>
        </div>

        <div className="w-full">
          <Carousel
            opts={{
              loop: true,
              align: "start",
              dragFree: true,
            }}
            plugins={[
              AutoScroll({
                speed: 1, 
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {photos.map((src, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-1 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="h-[300px] sm:h-[400px] relative group overflow-hidden bg-secondary/20">
                    <Image 
                      src={src} 
                      alt={`F16 Arena ${index}`} 
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110" 
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />
                    <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}