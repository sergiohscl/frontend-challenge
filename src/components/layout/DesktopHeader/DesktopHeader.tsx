import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  LogOut,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";

import { AuthModal } from "@/components/AuthModal/AuthModal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Mercado", href: "/checkout" },
] as const;

const futureNavigation = [
  { label: "Criadores" },
  { label: "Aprenda" },
] as const;

export function DesktopHeader() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const authMode = useRouterState({
    select: (state) => {
      const search = state.location.search as {
        auth?: "login" | "register";
      };

      return search.auth;
    },
  });

  const isAuthModalOpen =
    pathname === "/" &&
    !isAuthenticated &&
    (authMode === "login" || authMode === "register");

  const closeAuthModal = () => {
    void navigate({
      to: "/",
      search: {},
      replace: true,
    });
  };

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsUserMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
    } catch {
      // AuthContext encerra a sessão local mesmo se a API falhar.
      setLogoutError("A sessão local foi encerrada, mas houve um erro na API.");
    } finally {
      setIsLoggingOut(false);
      setIsUserMenuOpen(false);
      await navigate({ to: "/" });
    }
  };

  return (
    <>
      <header className="hidden bg-background lg:block">
        <div className="mx-auto flex h-11.25 w-full max-w-300 items-center justify-between border-b border-border-custom">
          <Link
            to="/"
            className="font-mono text-sm font-bold tracking-widest text-text-primary"
          >
            KURIO
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex h-full items-center gap-9"
          >
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

            {futureNavigation.map((item) => (
              <span
                key={item.label}
                className="flex h-full items-center font-mono text-sm text-text-primary"
              >
                {item.label}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Buscar"
              className="text-text-primary transition-colors hover:text-primary"
            >
              <Search size={20} />
            </button>

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

            {isLoading ? (
              <div
                className="h-9 w-25 animate-pulse rounded-md bg-[#45271C]"
                aria-label="Carregando sessão"
              />
            ) : isAuthenticated && user ? (
              <div ref={menuRef} className="relative font-mono">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((previous) => !previous)}
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                  aria-label={`Menu da conta de ${user.displayName}`}
                  className="flex max-w-48 items-center gap-2 rounded-md border border-primary px-3 py-1.5 text-sm text-primary transition-colors hover:bg-[#291914]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#45271C]">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`Avatar de ${user.displayName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={16} />
                    )}
                  </span>
                  <span className="truncate">{user.displayName}</span>
                  <ChevronDown size={15} className="shrink-0" />
                </button>

                {isUserMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Opções da conta"
                    className="absolute top-full right-0 z-50 mt-2 w-64 border border-[#45271C] bg-[#241612] p-3 text-[#F5F1EB] shadow-[0_0_20px_0_#0A060473]"
                  >
                    <div className="border-b border-[#45271C] px-2 pb-3">
                      <p className="truncate text-sm font-bold">
                        {user.displayName}
                      </p>
                      <p className="truncate text-xs text-[#CFB28C]">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="mt-2 flex items-center gap-3 rounded-md px-2 py-2 text-sm text-[#D18A4D] hover:bg-[#291914]"
                    >
                      <UserRound size={18} /> Meu perfil
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={isLoggingOut}
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-[#D18A4D] hover:bg-[#291914] disabled:opacity-50"
                    >
                      <LogOut size={18} /> {isLoggingOut ? "Saindo..." : "Sair"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  void navigate({
                    to: "/",
                    search: { auth: "login" },
                  });
                }}
                aria-haspopup="dialog"
                aria-expanded={isAuthModalOpen}
                className="rounded-md border border-primary px-5 py-2 font-mono text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-[#140D0A]"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </header>

      {logoutError && (
        <p role="alert" className="sr-only">
          {logoutError}
        </p>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode === "register" ? "register" : "login"}
      />
    </>
  );
}
