import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "F16 Arena — Компьютерный клуб и VR в Усть-Каменогорске",
  description:
    "Топовое железо, RTX 4070/5070, мониторы 540Hz. PS5, VR и SimRacing. Бронируйте онлайн 24/7!",
  generator: "v0.app",
  keywords: ["компьютерный клуб", "F16", "киберспорт", "VR", "PS5", "SimRacing", "Усть-Каменогорск", "игровой клуб"],
}

export const viewport: Viewport = {
  themeColor: "#cde901",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // ДОБАВИЛ: suppressHydrationWarning
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}