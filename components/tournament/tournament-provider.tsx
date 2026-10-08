"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { fetchFeaturedClient, isLiveLike, type FeaturedTournament } from "@/lib/tournament"

const TournamentContext = createContext<FeaturedTournament | null>(null)

export const useTournament = () => useContext(TournamentContext)

/**
 * Holds the featured tournament (server-rendered initial value) and refreshes it
 * from the CORS-open platform endpoint: every 20 s while live/check-in (fresh
 * scores), every 2 min otherwise (to notice a tournament going live). Paused in
 * background tabs and disabled for dev mocks.
 */
export function TournamentProvider({
  initial,
  poll = true,
  children,
}: {
  initial: FeaturedTournament | null
  poll?: boolean
  children: ReactNode
}) {
  const [tournament, setTournament] = useState(initial)
  const live = isLiveLike(tournament)

  useEffect(() => {
    if (!poll) return
    let controller: AbortController | null = null

    const refresh = async () => {
      if (document.visibilityState !== "visible") return
      controller?.abort()
      controller = new AbortController()
      const timer = setTimeout(() => controller?.abort(), 5000)
      const next = await fetchFeaturedClient(controller.signal)
      clearTimeout(timer)
      if (next !== undefined) setTournament(next)
    }

    const id = setInterval(refresh, live ? 20_000 : 120_000)
    document.addEventListener("visibilitychange", refresh)
    return () => {
      clearInterval(id)
      document.removeEventListener("visibilitychange", refresh)
      controller?.abort()
    }
  }, [poll, live])

  return <TournamentContext.Provider value={tournament}>{children}</TournamentContext.Provider>
}
