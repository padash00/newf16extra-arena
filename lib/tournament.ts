// Shared (server + client) helpers for the tournament platform integration.
// The platform lives at tournament.f16-arena.kz and exposes a public, CORS-open
// JSON endpoint with the currently featured tournament.

export const TOURNAMENT_SITE_URL = "https://tournament.f16-arena.kz"

export const TOURNAMENT_API_URL =
  process.env.NEXT_PUBLIC_TOURNAMENT_API || `${TOURNAMENT_SITE_URL}/api/public/featured`

export type TournamentStatus = "registration" | "registration_closed" | "checkin" | "live"

export type LiveMatch = {
  id: string
  team1: string
  team2: string
  score1: number
  score2: number
  map: string | null
  stage: string | null
  url: string
}

export type FeaturedTournament = {
  slug: string
  name: string
  status: TournamentStatus
  mode: string
  format: string
  starts_at: string | null
  registration_closes_at: string | null
  location: string | null
  prize_pool: string | null
  cover_url: string | null
  teams: number
  max_teams: number
  url: string
  register_url: string
  watch_url: string
  live: { matches: LiveMatch[] } | null
}

const STATUSES: TournamentStatus[] = ["registration", "registration_closed", "checkin", "live"]

const str = (v: unknown): string | null => (typeof v === "string" && v.trim() !== "" ? v : null)
const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0)
const httpUrl = (v: unknown): string | null => {
  const s = str(v)
  if (!s) return null
  try {
    const u = new URL(s)
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null
  } catch {
    return null
  }
}

/** Defensive parser: anything unexpected → null, so the club site never breaks. */
export function parseFeatured(json: unknown): FeaturedTournament | null {
  if (!json || typeof json !== "object") return null
  const t = (json as { tournament?: unknown }).tournament
  if (!t || typeof t !== "object") return null
  const r = t as Record<string, unknown>

  const name = str(r.name)
  const status = r.status as TournamentStatus
  const url = httpUrl(r.url)
  if (!name || !STATUSES.includes(status) || !url) return null

  const liveRaw = r.live as { matches?: unknown } | null | undefined
  const matches: LiveMatch[] = Array.isArray(liveRaw?.matches)
    ? liveRaw.matches
        .filter((m): m is Record<string, unknown> => !!m && typeof m === "object")
        .map((m) => ({
          id: String(m.id ?? `${m.team1}-${m.team2}`),
          team1: str(m.team1) ?? "TBD",
          team2: str(m.team2) ?? "TBD",
          score1: num(m.score1),
          score2: num(m.score2),
          map: str(m.map),
          stage: str(m.stage),
          url: httpUrl(m.url) ?? url,
        }))
    : []

  return {
    slug: str(r.slug) ?? "",
    name,
    status,
    mode: str(r.mode) ?? "",
    format: str(r.format) ?? "",
    starts_at: str(r.starts_at),
    registration_closes_at: str(r.registration_closes_at),
    location: str(r.location),
    prize_pool: str(r.prize_pool),
    cover_url: httpUrl(r.cover_url),
    teams: num(r.teams),
    max_teams: num(r.max_teams),
    url,
    register_url: httpUrl(r.register_url) ?? url,
    watch_url: httpUrl(r.watch_url) ?? url,
    live: liveRaw ? { matches } : null,
  }
}

/** Adds `?from=f16-arena` so the platform can see where visitors come from. */
export function withFrom(href: string): string {
  try {
    const u = new URL(href)
    u.searchParams.set("from", "f16-arena")
    return u.toString()
  } catch {
    return href
  }
}

/** "1000000" → "1 000 000 ₸"; free-form strings ("300 000 ₸ + призы") pass through. */
export function formatPrizePool(prize: string | null): string | null {
  if (!prize) return null
  const trimmed = prize.trim()
  if (/^\d+$/.test(trimmed)) return `${trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`
  return trimmed
}

export const isLiveLike = (t: FeaturedTournament | null) => t?.status === "live" || t?.status === "checkin"

const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Asia/Almaty",
  weekday: "short",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
})
const timeFmt = new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Almaty", hour: "2-digit", minute: "2-digit" })

export function formatTournamentDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : dateFmt.format(d)
}

export function formatTournamentTime(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : timeFmt.format(d)
}

export async function fetchFeaturedClient(signal?: AbortSignal): Promise<FeaturedTournament | null | undefined> {
  try {
    const res = await fetch(TOURNAMENT_API_URL, { signal, headers: { accept: "application/json" } })
    if (!res.ok) return undefined
    return parseFeatured(await res.json())
  } catch {
    return undefined // network error: keep whatever we already show
  }
}
