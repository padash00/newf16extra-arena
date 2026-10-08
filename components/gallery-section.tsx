"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Camera, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react"
import AutoScroll from "embla-carousel-auto-scroll"

const photos = [
  "/gallery/dscf9831.webp",
  "/gallery/dscf9832.webp",
  "/gallery/dscf9836.webp",
  "/gallery/dscf9841.webp",
  "/gallery/dscf9844.webp",
  "/gallery/dscf9845.webp",
  "/gallery/dscf9849.webp",
  "/gallery/dscf9850.webp",
  "/gallery/dscf9852.webp",
  "/gallery/dscf9855.webp",
  "/gallery/dscf9857.webp",
  "/gallery/dscf9860.webp",
  "/gallery/dscf9861.webp",
  "/gallery/dscf9867.webp",
  "/gallery/dscf9873.webp",
  "/gallery/dscf9879.webp",
  "/gallery/dscf9885.webp",
  "/gallery/dscf9894.webp",
  "/gallery/dscf9895.webp",
  "/gallery/dscf9897.webp",
  "/gallery/dscf9906.webp",
  "/gallery/dscf9910.webp",
  "/gallery/dscf9920.webp",
  "/gallery/dscf9924.webp",
  "/gallery/dscf9928.webp",
  "/gallery/dscf9929.webp",
  "/gallery/dscf9934.webp",
  "/gallery/dscf9940.webp",
  "/gallery/dscf9947.webp",
  "/gallery/dscf9950.webp",
  "/gallery/dscf9959.webp",
  "/gallery/dscf9969.webp",
  "/gallery/dscf9983.webp",
  "/gallery/dscf9987.webp",
  "/gallery/dscf9995.webp",
  "/gallery/dscf9997.webp",
  "/gallery/dscf9998.webp",
  "/gallery/img-7155.webp",
  "/gallery/img-7157.webp",
  "/gallery/img-7158.webp",
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null)
  const autoScroll = React.useRef(
    AutoScroll({
      speed: 0.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      startDelay: 1000,
    }),
  )

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % photos.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)

  const toggleAutoPlay = () => {
    if (!emblaApi) return
    if (isAutoPlaying) {
      autoScroll.current.stop()
    } else {
      autoScroll.current.play()
    }
    setIsAutoPlaying(!isAutoPlaying)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <>
      <section id="gallery" className="section-shell py-24">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
              <Camera className="h-4 w-4" />
              Атмосфера клуба
            </div>
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Живой интерьер,
              <span className="block text-primary">а не шаблонный рендер</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Реальные фото клуба, света, посадок и зон, чтобы человек сразу почувствовал место ещё до приезда.
            </p>
          </div>

          <div className="premium-panel overflow-hidden rounded-[2rem] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[rgba(185,154,99,0.9)]">F16 Atmosphere</div>
                <div className="mt-2 text-xl font-semibold text-foreground">Интерьер, зоны и вайб клуба</div>
              </div>

              <button
                onClick={toggleAutoPlay}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(185,154,99,0.18)] bg-card/70 text-foreground transition-colors hover:bg-secondary"
                aria-label={isAutoPlaying ? "Пауза" : "Автопрокрутка"}
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            <Carousel
              opts={{
                loop: true,
                align: "start",
                dragFree: true,
              }}
              plugins={[autoScroll.current]}
              className="w-full"
              setApi={(api) => setEmblaApi(api)}
            >
              <CarouselContent className="-ml-2">
                {photos.map((src, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[86%] pl-2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      aria-label={`Открыть фото ${index + 1}`}
                      className="group relative block h-[300px] w-full cursor-pointer overflow-hidden rounded-[1.6rem] border border-[rgba(185,154,99,0.14)] bg-secondary/20 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Image
                        src={src}
                        alt={`Интерьер F16 Arena - фото ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,7,0.72),rgba(8,7,7,0.08))]" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-[rgba(185,154,99,0.95)]">F16 Arena</div>
                          <div className="mt-1 text-sm font-medium text-foreground">Фото {index + 1}</div>
                        </div>
                        <div className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                          Открыть
                        </div>
                      </div>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="absolute left-4 top-4 z-50 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {photos.length}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Следующее фото"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative m-4 h-full max-h-[90vh] w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[currentIndex]}
              alt={`Интерьер F16 Arena - фото ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
