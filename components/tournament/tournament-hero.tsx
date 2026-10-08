"use client"

import { ArrowUpRight, Radio, Trophy } from "lucide-react"
import { useTournament } from "@/components/tournament/tournament-provider"
import { formatTournamentTime, withFrom } from "@/lib/tournament"

/** Prominent first-screen banner while a tournament is live or in check-in. */
export function TournamentHeroBanner() {
  const t = useTournament()
  if (!t || (t.status !== "live" && t.status !== "checkin")) return null

  const isLive = t.status === "live"
  const matches = (t.live?.matches ?? []).slice(0, 3)
  const startTime = formatTournamentTime(t.starts_at)

  return (
    <div
      role="region"
      aria-label="Турнир идёт сейчас"
      className="mb-7 overflow-hidden rounded-[1.6rem] border border-[rgba(255,77,77,0.35)] bg-[linear-gradient(135deg,rgba(40,10,10,0.92),rgba(18,16,15,0.9)_55%)] shadow-[0_0_0_1px_rgba(255,77,77,0.08),0_24px_60px_rgba(255,60,60,0.12)] backdrop-blur-xl"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className={
              isLive
                ? "inline-flex items-center gap-2 rounded-full bg-[#ff3b30] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-white"
                : "inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-black"
            }
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
            {isLive ? "LIVE · Идёт турнир" : `Чек-ин${startTime ? ` · старт в ${startTime}` : ""}`}
          </span>
          <span className="text-xs text-[rgba(246,240,231,0.7)]">
            {[t.mode, t.format].filter(Boolean).join(" · ")}
          </span>
        </div>

        <div className="mt-3 flex items-start gap-3">
          <Trophy className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">{t.name}</div>
        </div>

        {matches.length > 0 && (
          <ul className="mt-4 grid gap-2">
            {matches.map((m) => {
              const lead1 = m.score1 > m.score2
              const lead2 = m.score2 > m.score1
              return (
                <li key={m.id}>
                  <a
                    href={withFrom(m.url)}
                    className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm transition-colors hover:border-[rgba(255,77,77,0.4)] hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className={`truncate text-right font-medium ${lead1 ? "text-foreground" : "text-[rgba(246,240,231,0.72)]"}`}>
                      {m.team1}
                    </span>
                    <span className="flex flex-col items-center">
                      <span className="font-mono text-base font-semibold tabular-nums text-foreground">
                        <span className={lead1 ? "text-primary" : undefined}>{m.score1}</span>
                        <span className="px-1 text-[rgba(246,240,231,0.5)]">:</span>
                        <span className={lead2 ? "text-primary" : undefined}>{m.score2}</span>
                      </span>
                      {(m.map || m.stage) && (
                        <span className="text-[11px] leading-4 text-[rgba(246,240,231,0.62)]">
                          {[m.stage, m.map].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </span>
                    <span className={`truncate font-medium ${lead2 ? "text-foreground" : "text-[rgba(246,240,231,0.72)]"}`}>
                      {m.team2}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={withFrom(t.watch_url)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_16px_34px_rgba(223,255,87,0.16)] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Radio className="h-4 w-4" aria-hidden />
            Смотреть
          </a>
          <a
            href={withFrom(t.url)}
            className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Сетка и результаты
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}

/** Compact hero CTA while registration is open (or details when it's closed). */
export function TournamentHeroCta() {
  const t = useTournament()
  if (!t || (t.status !== "registration" && t.status !== "registration_closed")) return null

  const open = t.status === "registration"
  return (
    <a
      href={withFrom(open ? t.register_url : t.url)}
      className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[rgba(223,255,87,0.4)] bg-[rgba(223,255,87,0.08)] px-6 text-base font-semibold text-primary transition-colors hover:bg-[rgba(223,255,87,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Trophy className="h-4 w-4" aria-hidden />
      {open ? "Турнир: зарегистрироваться" : "Турнир: подробнее"}
    </a>
  )
}
