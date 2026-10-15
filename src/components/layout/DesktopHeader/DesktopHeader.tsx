
import { LogIn, Search, ShoppingCart } from "lucide-react";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Mercado", href: "/marketplace" },
  { label: "Criadores", href: "/creators" },
  { label: "Aprenda", href: "/learn" },
];

export function DesktopHeader() {
  return (
    <header className="hidden bg-background lg:block">
     <div className="mx-auto flex h-11.25 w-full max-w-300 items-center justify-between border-b border-border-custom">
        {/* Logo */}
        <a
          href="/"
          className="font-mono text-sm font-bold tracking-widest text-text-primary"
        >
          KURIO
        </a>

        {/* Navegação */}
        <nav
          aria-label="Navegação principal"
          className="flex h-full items-center gap-9"
        >
          {navigation.map((item) => {
            const isActive = item.href === "/";

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-full items-center font-mono text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-text-primary hover:text-primary"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Buscar"
            className="text-text-primary transition-colors hover:text-primary"
          >
            <Search size={20} />
          </button>

          <a
            href="/cart"
            aria-label="Carrinho"
            className="relative text-text-primary transition-colors hover:text-primary"
          >
            <ShoppingCart size={20} />

            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-background">
              6
            </span>
          </a>

          <a
            href="/login"
            className="flex h-8 items-center gap-2 rounded-md bg-primary px-3 font-mono text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
          >
            <LogIn size={16} />
            Entrar
          </a>
        </div>
      </div>
    </header>
  );
}
