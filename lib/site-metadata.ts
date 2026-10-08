export const PRODUCTION_SITE_URL = "https://f16-arena.kz"

/** True only for Vercel preview deployments (they must not be indexed). */
export const isPreviewDeployment = () => process.env.VERCEL_ENV === "preview"

const resolveRawSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (isPreviewDeployment() && process.env.VERCEL_URL) return process.env.VERCEL_URL
  if (process.env.NODE_ENV === "development") return "http://localhost:3000"
  // Vercel production and any other production build: the real domain,
  // never the *.vercel.app alias.
  return PRODUCTION_SITE_URL
}

export const getSiteUrl = () => {
  const rawSiteUrl = resolveRawSiteUrl()

  if (rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")) {
    return new URL(rawSiteUrl)
  }

  return new URL(`https://${rawSiteUrl}`)
}
