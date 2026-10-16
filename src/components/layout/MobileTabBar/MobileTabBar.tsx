
import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Heart,
  Home,
  ShoppingCart,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";

export function MobileTabBar() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const navigate = useNavigate();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [feedback, setFeedback] = useState("");

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHome = pathname === "/";
  const isCart = pathname === "/cart";
  const isProfile =
    pathname === "/auth" || isAccountMenuOpen;

  useEffect(() => {
    setIsAccountMenuOpen(false);
    setFeedback("");
  }, [pathname]);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isAccountMenuOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setFeedback("");

    try {
      await logout();
    } catch {
      // O AuthContext limpa a sessão local mesmo
      // quando a API simulada falha.
    } finally {
      setIsLoggingOut(false);
    }

    setIsAccountMenuOpen(false);
    await navigate({ to: "/" });
  };

  const baseClass =
    "relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors";

  const activeClass = "text-[#E79B57]";
  const inactiveClass = "text-[#CFB28C] hover:text-[#E79B57]";

  return (
    <>
      {/* Painel da conta */}
      {isAccountMenuOpen && isAuthenticated && user && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Fundo escuro */}
          <button
            type="button"
            aria-label="Fechar menu da conta"
            onClick={() => setIsAccountMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          {/* Menu mobile */}
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-account-title"
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-125 rounded-t-4xl border-t border-[#45271C] bg-[#241612] px-6 pt-6 pb-[calc(2rem+env(safe-area-inset-bottom))] font-mono text-[#F5F1EB] shadow-[0_0_20px_0_#0A060473]"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
              <h2
                id="mobile-account-title"
                className="text-lg font-bold"
              >
                Minha conta
              </h2>

              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(false)}
                aria-label="Fechar"
                className="text-[#D18A4D]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Usuário autenticado */}
            <div className="mt-6 flex items-center gap-4 border-b border-[#45271C] pb-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#45271C] text-[#D18A4D]">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={28} strokeWidth={1.5} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-bold">
                  {user.displayName}
                </p>

                <p className="mt-1 truncate text-xs text-[#CFB28C]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Informação do perfil */}
            <div className="mt-5 rounded-xl border border-[#45271C] p-4">
              <div className="flex items-center gap-3 text-[#D18A4D]">
                <UserRound size={20} />

                <span className="text-sm font-bold">
                  Meu perfil
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[#CFB28C]">
                A página de perfil mobile estará disponível
                em breve.
              </p>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#D18A4D] text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={19} />

              {isLoggingOut ? "Saindo..." : "Sair da conta"}
            </button>

            {feedback && (
              <p
                role="status"
                className="mt-3 text-center text-xs text-[#D18A4D]"
              >
                {feedback}
              </p>
            )}
          </section>
        </div>
      )}

      {/* Barra inferior mobile */}
      <nav
        aria-label="Navegação inferior"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-24 w-full max-w-125 items-center justify-around rounded-t-4xl bg-[#241612] px-5 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {/* Início */}
        <Link
          to="/"
          aria-label="Início"
          aria-current={isHome ? "page" : undefined}
          className={`${baseClass} ${
            isHome ? activeClass : inactiveClass
          }`}
        >
          <Home
            size={24}
            fill={isHome ? "currentColor" : "none"}
          />
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
          className={`${baseClass} ${
            isCart ? activeClass : inactiveClass
          }`}
        >
          <ShoppingCart size={24} fill="currentColor" />

          {cartCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-[#140D0A]">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Perfil / Login */}
        {isLoading ? (
          <span
            aria-label="Carregando sessão"
            className={`${baseClass} ${inactiveClass} opacity-50`}
          >
            <UserRound size={24} />
          </span>
        ) : isAuthenticated ? (
          <button
            type="button"
            onClick={() => {
              setFeedback("");
              setIsAccountMenuOpen(true);
            }}
            aria-label="Abrir minha conta"
            aria-haspopup="dialog"
            aria-expanded={isAccountMenuOpen}
            className={`${baseClass} ${
              isProfile ? activeClass : inactiveClass
            }`}
          >
            <UserRound
              size={24}
              fill={isProfile ? "currentColor" : "none"}
            />
          </button>
        ) : (
          <Link
            to="/auth"
            aria-label="Perfil - Entrar ou criar conta"
            aria-current={pathname === "/auth" ? "page" : undefined}
            className={`${baseClass} ${
              isProfile ? activeClass : inactiveClass
            }`}
          >
            <UserRound
              size={24}
              fill={isProfile ? "currentColor" : "none"}
            />
          </Link>
        )}
      </nav>
    </>
  );
}
