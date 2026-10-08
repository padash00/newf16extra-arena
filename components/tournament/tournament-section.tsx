"use client"

import { ArrowUpRight, CalendarDays, Instagram, MapPin, Radio, Swords, Trophy, Users } from "lucide-react"
import { useTournament } from "@/components/tournament/tournament-provider"
import { TOURNAMENT_SITE_URL, formatTournamentDate, withFrom, type FeaturedTournament } from "@/lib/tournament"
import { siteContent } from "@/lib/site-content"

const statusLabel: Record<FeaturedTournament["status"], string> = {
  registration: "Открыта регистрация",
  registration_closed: "Регистрация закрыта",
  checkin: "Идёт чек-ин",
  live: "Турнир идёт",
}

const instagram = siteContent.contacts.socials.find((s) => s.name === "Instagram")?.href

export function TournamentSection() {
  const t = useTournament()

  if (!t) {
    return (
      <section id="tournaments" aria-labelledby="tournaments-title" className="relative z-10 scroll-mt-28 py-10">
        <div className="container mx-auto px-4">
          <div className="premium-panel flex flex-col gap-5 rounded-[1.8rem] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(223,255,87,0.12)] text-primary">
                <Trophy className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 id="tournaments-title" className="text-xl font-bold tracking-tight text-foreground">
                  Турниры F16 Arena
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Проводим турниры по CS2 прямо в клубе. Следите за анонсами — регистрация и сетка на турнирной платформе.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={withFrom(TOURNAMENT_SITE_URL)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Все турниры
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[rgba(185,154,99,0.26)] bg-card/70 px-5 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Instagram className="h-4 w-4 text-pink-500" aria-hidden />
                  Анонсы в Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const date = formatTournamentDate(t.starts_at)
  const regCloses = formatTournamentDate(t.registration_closes_at)
  const fill = t.max_teams > 0 ? Math.min(100, Math.round((t.teams / t.max_teams) * 100)) : 0
  const live = t.status === "live" || t.status === "checkin"

  const cta =
    t.status === "registration"
      ? { href: t.register_url, label: "Зарегистрироваться", icon: Trophy }
      : live
        ? { href: t.watch_url, label: "Смотреть матчи", icon: Radio }
        : { href: t.url, label: "Подробнее о турнире", icon: ArrowUpRight }

  const facts = [
    date && { icon: CalendarDays, label: "Старт", value: date },
    (t.mode || t.format) && { icon: Swords, label: "Формат", value: [t.mode, t.format].filter(Boolean).join(" · ") },
    t.location && { icon: MapPin, label: "Где", value: t.location },
  ].filter(Boolean) as { icon: typeof Trophy; label: string; value: string }[]

  return (
    <section id="tournaments" aria-labelledby="tournaments-title" className="relative z-10 scroll-mt-28 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="premium-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[rgba(185,154,99,0.96)]">
            <Trophy className="h-4 w-4" aria-hidden />
            {live ? "Турнир сейчас" : "Ближайший турнир"}
          </span>
        </div>

        <article className="premium-panel grid overflow-hidden rounded-[2rem] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[220px] overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(223,255,87,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(185,154,99,0.25),transparent_45%),#0d0b0a] lg:min-h-full">
            {t.cover_url ? (
              // Cover lives on the tournament platform (arbitrary host), so a plain lazy <img>.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.cover_url} alt={`Обложка турнира ${t.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-start justify-center pt-8 sm:items-center sm:pt-0">
                <Trophy className="h-16 w-16 sm:h-24 sm:w-24 text-primary/70 drop-shadow-[0_0_40px_rgba(223,255,87,0.35)]" aria-hidden />
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,7,0.75),transparent_55%)]" />
            {t.prize_pool && (
              <div className="absolute bottom-4 left-4 rounded-2xl border border-[rgba(223,255,87,0.3)] bg-black/60 px-4 py-2 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[rgba(246,240,231,0.75)]">Призовой фонд</div>
                <div className="font-mono text-2xl font-semibold text-primary">{t.prize_pool}</div>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <div
              className={
                live
                  ? "inline-flex items-center gap-2 rounded-full bg-[rgba(255,59,48,0.15)] px-3 py-1 text-xs font-semibold text-[#ff6b61]"
                  : t.status === "registration"
                    ? "inline-flex items-center gap-2 rounded-full bg-[rgba(223,255,87,0.12)] px-3 py-1 text-xs font-semibold text-primary"
                    : "inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-[rgba(246,240,231,0.8)]"
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {statusLabel[t.status]}
            </div>

            <h2 id="tournaments-title" className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.name}
            </h2>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-3.5">
                  <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[rgba(185,154,99,0.95)]">{f.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-foreground" suppressHydrationWarning>
                      {f.value}
                    </dd>
                  </div>
                </div>
              ))}
              {t.max_teams > 0 && (
                <div className="rounded-[1.2rem] border border-[rgba(185,154,99,0.14)] bg-[rgba(255,255,255,0.02)] p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[rgba(185,154,99,0.95)]">
                      <Users className="h-4 w-4 text-primary" aria-hidden />
                      Команды
                    </dt>
                    <dd className="font-mono text-sm font-semibold text-foreground">
                      {t.teams}/{t.max_teams}
                    </dd>
                  </div>
                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8"
                    role="progressbar"
                    aria-label="Заполненность турнира"
                    aria-valuemin={0}
                    aria-valuemax={t.max_teams}
                    aria-valuenow={t.teams}
                  >
                    <div className="h-full rounded-full bg-primary" style={{ width: `${fill}%` }} />
                  </div>
                </div>
              )}
            </dl>

            {t.status === "registration" && regCloses && (
              <p className="mt-4 text-sm text-muted-foreground" suppressHydrationWarning>
                Регистрация до {regCloses}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={withFrom(cta.href)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_18px_38px_rgba(223,255,87,0.15)] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <cta.icon className="h-4 w-4" aria-hidden />
                {cta.label}
              </a>
              <a
                href={withFrom(t.url)}
                className="inline-flex h-12 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {live ? "Сетка и результаты" : "Правила и сетка"}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
