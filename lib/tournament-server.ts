import { TOURNAMENT_API_URL, parseFeatured, type FeaturedTournament } from "@/lib/tournament"

export const TOURNAMENT_REVALIDATE_SECONDS = 30

/**
 * Server-side fetch of the featured tournament. Cached for 30 s (ISR) and
 * time-limited to 3 s; any failure resolves to null so the page always renders.
 */
export async function getFeaturedTournament(): Promise<FeaturedTournament | null> {
  try {
    const res = await fetch(TOURNAMENT_API_URL, {
      next: { revalidate: TOURNAMENT_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(3000),
      headers: { accept: "application/json" },
    })
    if (!res.ok) return null
    return parseFeatured(await res.json())
  } catch {
    return null
  }
}
