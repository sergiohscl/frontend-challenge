
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, Search, ShoppingCart } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

// Rotas existentes no TanStack Router
const navigation = [
  { label: "Início", href: "/" },
  { label: "Mercado", href: "/checkout" },
] as const;

// Páginas que ainda serão implementadas
const futureNavigation = [
  { label: "Criadores" },
  { label: "Aprenda" },
] as const;

export function DesktopHeader() {
  const { cartCount } = useCart();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <header className="hidden bg-background lg:block">
      <div className="mx-auto flex h-11.25 w-full max-w-300 items-center justify-between border-b border-border-custom">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-bold tracking-widest text-text-primary"
        >
          KURIO
        </Link>

        {/* Navegação */}
        <nav
          aria-label="Navegação principal"
          className="flex h-full items-center gap-9"
        >
          {/* Links com rotas existentes */}
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
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
              </Link>
            );
          })}

          {/* Páginas futuras */}
          {futureNavigation.map((item) => (
            <span
              key={item.label}
              className="flex h-full items-center font-mono text-sm text-text-primary"
            >
              {item.label}
            </span>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-5">
          {/* Buscar */}
          <button
            type="button"
            aria-label="Buscar"
            className="text-text-primary transition-colors hover:text-primary"
          >
            <Search size={20} />
          </button>

          {/* Carrinho */}
          <Link
            to="/cart"
            aria-label={`Carrinho com ${cartCount} itens`}
            className="relative text-text-primary transition-colors hover:text-primary"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-background">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Entrar */}
          <button
            type="button"
            disabled
            title="Autenticação em desenvolvimento"
            className="flex h-8 items-center gap-2 rounded-md bg-primary px-3 font-mono text-sm font-semibold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
