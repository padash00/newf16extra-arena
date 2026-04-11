import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PriceSection } from "@/components/price-section"
import { DevicesSection } from "@/components/devices-section"
import { ExtraSection } from "@/components/extra-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactsSection } from "@/components/contacts-section"
import { Footer } from "@/components/footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background pb-28 selection:bg-primary selection:text-primary-foreground lg:pb-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(223,255,87,0.07),transparent_18%),radial-gradient(circle_at_85%_16%,rgba(185,154,99,0.08),transparent_18%)]" />
      <Navbar />
      <HeroSection />
      <PriceSection />
      <DevicesSection />
      <GallerySection />
      <ExtraSection />
      {/* FAQ убрали */}
      <ContactsSection />
      <Footer />
      <MobileCtaBar />
    </main>
  )
}
