import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PriceSection } from "@/components/price-section"
import { DevicesSection } from "@/components/devices-section"
import { ExtraSection } from "@/components/extra-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactsSection } from "@/components/contacts-section"
import { Footer } from "@/components/footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"
import { TournamentProvider } from "@/components/tournament/tournament-provider"
import { TournamentSection } from "@/components/tournament/tournament-section"
import { getFeaturedTournament } from "@/lib/tournament-server"
import type { FeaturedTournament } from "@/lib/tournament"

// ISR: the featured tournament is refreshed at most every 30 s.
export const revalidate = 30

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function HomePage({ searchParams }: PageProps) {
  let tournament: FeaturedTournament | null
  let poll = true

  // Dev-only: ?mockTournament=live|checkin|registration|closed|none.
  // searchParams is never read in production, so the page stays static (ISR).
  const mockKey = process.env.NODE_ENV !== "production" ? (await searchParams).mockTournament : undefined
  if (typeof mockKey === "string") {
    const { tournamentMocks } = await import("@/lib/tournament-mock")
    tournament = tournamentMocks[mockKey] ?? null
    poll = false
  } else {
    tournament = await getFeaturedTournament()
  }

  return (
    <TournamentProvider initial={tournament} poll={poll}>
      <main className="relative min-h-screen bg-background pb-28 selection:bg-primary selection:text-primary-foreground lg:pb-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(223,255,87,0.07),transparent_18%),radial-gradient(circle_at_85%_16%,rgba(185,154,99,0.08),transparent_18%)]" />
        <Navbar />
        <HeroSection />
        <TournamentSection />
        <PriceSection />
        <DevicesSection />
        <GallerySection />
        <ExtraSection />
        <ContactsSection />
        <Footer />
        <MobileCtaBar />
      </main>
    </TournamentProvider>
  )
}
