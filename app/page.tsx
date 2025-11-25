import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PriceSection } from "@/components/price-section"
import { DevicesSection } from "@/components/devices-section"
import { ExtraSection } from "@/components/extra-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactsSection } from "@/components/contacts-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <HeroSection />
      <PriceSection />
      <DevicesSection />
      <GallerySection />
      <ExtraSection />
      {/* FAQ убрали */}
      <ContactsSection />
      <Footer />
    </main>
  )
}