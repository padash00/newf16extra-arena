const resolveRawSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000"

export const getSiteUrl = () => {
  const rawSiteUrl = resolveRawSiteUrl()

  if (rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")) {
    return new URL(rawSiteUrl)
  }

  return new URL(`https://${rawSiteUrl}`)
}
