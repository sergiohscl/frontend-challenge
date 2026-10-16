import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart } from "lucide-react";

import { AuthModal } from "@/components/AuthModal/AuthModal";
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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      {/* Header Desktop */}
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
              onClick={handleOpenAuthModal}
              aria-haspopup="dialog"
              aria-expanded={isAuthModalOpen}
              className="rounded-md border border-primary px-5 py-2 font-mono text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-[#140D0A]"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Login / Criar conta */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
      />
    </>
  );
}
