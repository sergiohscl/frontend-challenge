import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, ShoppingCart, UserRound } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

export function MobileTabBar() {
  const { cartCount } = useCart();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHome = pathname === "/";
  const isCart = pathname === "/cart";
  const isProfile = pathname === "/auth";

  const baseClass =
    "relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors";

  const activeClass = "text-[#E79B57]";
  const inactiveClass = "text-[#CFB28C] hover:text-[#E79B57]";

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-24 w-full max-w-125 items-center justify-around rounded-t-4xl bg-[#241612] px-5 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {/* Início */}
      <Link
        to="/"
        aria-label="Início"
        aria-current={isHome ? "page" : undefined}
        className={`${baseClass} ${isHome ? activeClass : inactiveClass}`}
      >
        <Home size={24} fill={isHome ? "currentColor" : "none"} />
      </Link>

      {/* Favoritos - futura implementação */}
      <button
        type="button"
        disabled
        aria-label="Favoritos (em breve)"
        title="Favoritos em breve"
        className={`${baseClass} cursor-not-allowed opacity-50 ${inactiveClass}`}
      >
        <Heart size={24} fill="currentColor" />
      </button>

      {/* Carrinho */}
      <Link
        to="/cart"
        aria-label={`Carrinho com ${cartCount} itens`}
        aria-current={isCart ? "page" : undefined}
        className={`${baseClass} ${isCart ? activeClass : inactiveClass}`}
      >
        <ShoppingCart size={24} fill="currentColor" />

        {cartCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-[#140D0A]">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Perfil / Login */}
      <Link
        to="/auth"
        aria-label="Perfil - Entrar ou criar conta"
        aria-current={isProfile ? "page" : undefined}
        className={`${baseClass} ${isProfile ? activeClass : inactiveClass}`}
      >
        <UserRound size={24} fill={isProfile ? "currentColor" : "none"} />
      </Link>
    </nav>
  );
}
