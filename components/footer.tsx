const footerLinks = [
  { href: "#price", label: "Прайс" },
  { href: "#devices", label: "Девайсы" },
  { href: "#extra", label: "F16 Extra" },
  { href: "#contacts", label: "Контакты" },
]

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      {/* Фоновое свечение внизу */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-primary-foreground font-bold text-lg">F16</span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-semibold leading-none">F16 Arena</span>
              <span className="text-xs text-muted-foreground">Cyber Lounge</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium hover:underline underline-offset-4 decoration-primary/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">© 2025 F16 Arena</p>
            <p className="text-xs text-muted-foreground/50 mt-1">Усть-Каменогорск</p>
          </div>
        </div>
      </div>
    </footer>
  )
}