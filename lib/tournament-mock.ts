import type { FeaturedTournament } from "@/lib/tournament"

// Dev-only fixtures for `?mockTournament=live|checkin|registration|closed|none`.
// Never used when NODE_ENV === "production".

const base = "https://tournament.f16-arena.kz/t/f16-autumn-cup"
const inDays = (d: number, hour: number) => {
  const t = new Date()
  t.setUTCDate(t.getUTCDate() + d)
  t.setUTCHours(hour - 5, 0, 0, 0) // hour in UTC+5
  return t.toISOString()
}

const common = {
  slug: "f16-autumn-cup",
  name: "F16 Autumn Cup 2026",
  mode: "5×5",
  format: "Single Elimination",
  location: "F16 Arena, Усть-Каменогорск",
  prize_pool: "300 000 ₸",
  cover_url: null,
  max_teams: 16,
  url: base,
  register_url: `${base}/register`,
  watch_url: `${base}/matches`,
} satisfies Partial<FeaturedTournament>

export const tournamentMocks: Record<string, FeaturedTournament | null> = {
  none: null,
  registration: {
    ...common,
    status: "registration",
    starts_at: inDays(5, 18),
    registration_closes_at: inDays(4, 23),
    teams: 11,
    live: null,
  },
  closed: {
    ...common,
    status: "registration_closed",
    starts_at: inDays(1, 18),
    registration_closes_at: inDays(0, 23),
    teams: 16,
    live: null,
  },
  checkin: {
    ...common,
    status: "checkin",
    starts_at: inDays(0, 19),
    registration_closes_at: inDays(-1, 23),
    teams: 16,
    live: null,
  },
  live: {
    ...common,
    status: "live",
    starts_at: inDays(0, 15),
    registration_closes_at: inDays(-1, 23),
    teams: 16,
    live: {
      matches: [
        { id: "m1", team1: "Ulba Rush", team2: "Irtysh Five", score1: 9, score2: 7, map: "Mirage", stage: "1/4 финала", url: `${base}/m/1` },
        { id: "m2", team1: "Altai Wolves", team2: "Oskemen Esports", score1: 12, score2: 12, map: "Inferno", stage: "1/4 финала", url: `${base}/m/2` },
        { id: "m3", team1: "Vostok", team2: "F16 Academy", score1: 3, score2: 5, map: "Ancient", stage: "1/4 финала", url: `${base}/m/3` },
      ],
    },
  },
}
