export function DesktopHeader() {
  const navigation = [
    { label: "Início", href: "/" },
    { label: "Mercado", href: "/marketplace" },
    { label: "Coleções", href: "/collections" },
    { label: "Artistas", href: "/artists" },
  ];

  return (
    <header className="hidden border-b border-border-custom bg-background lg:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="text-xl font-bold tracking-widest text-text-primary"
        >
          KURIO
        </a>

        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-8"
        >
          {navigation.map((item) => (
            <a
              href={item.href}
              className="text-sm text-text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
