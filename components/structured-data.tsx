import { siteContent } from "@/lib/site-content"
import { getSiteUrl } from "@/lib/site-metadata"

const formatTenge = (value: number) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`

/** schema.org InternetCafe (LocalBusiness) JSON-LD for the club. */
export function StructuredData() {
  const siteUrl = getSiteUrl()
  const abs = (path: string) => new URL(path, siteUrl).toString()

  const prices = [
    ...siteContent.pricing.zones.flatMap((zone) => zone.prices.map((price) => price.value)),
    ...siteContent.extra.items.flatMap((group) => group.items.map((item) => item.price)),
  ]
  const priceRange = `${formatTenge(Math.min(...prices))} – ${formatTenge(Math.max(...prices))}`

  const data = {
    "@context": "https://schema.org",
    "@type": "InternetCafe",
    "@id": `${abs("/")}#club`,
    name: siteContent.brand.name,
    description: siteContent.seo.description,
    url: abs("/"),
    logo: abs("/brand/f16-arena-logo.png"),
    image: [abs(siteContent.seo.ogImage), abs("/hero-simracing-elite.webp")],
    email: siteContent.brand.email,
    telephone: `+${siteContent.contacts.phones[0].phoneRaw}`,
    contactPoint: siteContent.contacts.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: `+${phone.phoneRaw}`,
      contactType: "reservations",
      name: phone.label,
      availableLanguage: ["ru", "kk"],
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContent.brand.address,
      addressLocality: siteContent.brand.city,
      addressCountry: "KZ",
    },
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange,
    currenciesAccepted: "KZT",
    paymentAccepted: "Cash, Credit Card, Kaspi",
    sameAs: siteContent.contacts.socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output; "<" escaped so the payload can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
