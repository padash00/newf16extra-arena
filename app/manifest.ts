import type { MetadataRoute } from "next"
import { siteContent } from "@/lib/site-content"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteContent.brand.name} — компьютерный клуб в ${siteContent.brand.city}`,
    short_name: siteContent.brand.name,
    description: siteContent.seo.description,
    lang: "ru",
    start_url: "/",
    display: "standalone",
    background_color: "#080707",
    theme_color: "#080707",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
