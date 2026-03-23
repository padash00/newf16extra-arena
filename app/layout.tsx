import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { siteContent } from "@/lib/site-content"
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
  title: `${siteContent.brand.name} — Компьютерный клуб, PS5 и SimRacing в ${siteContent.brand.city}`,
  description:
    `Топовое железо, PS5, SimRacing и бронирование через WhatsApp 24/7. Актуальные тарифы и контакты ${siteContent.brand.name} в ${siteContent.brand.city}.`,
  keywords: ["компьютерный клуб", "F16", "киберспорт", "PS5", "SimRacing", siteContent.brand.city, "игровой клуб"],
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
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
