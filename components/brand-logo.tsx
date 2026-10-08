import Image from "next/image"
import { cn } from "@/lib/utils"

// Official F16 Arena logo (transparent PNG, 760×445).
export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/f16-arena-logo.png"
      alt="F16 Arena"
      width={760}
      height={445}
      priority={priority}
      sizes="160px"
      className={cn("h-11 w-auto select-none", className)}
    />
  )
}
