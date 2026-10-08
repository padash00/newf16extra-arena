import type { MetadataRoute } from "next"
import { getSiteUrl, isPreviewDeployment } from "@/lib/site-metadata"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  if (isPreviewDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.host,
  }
}
