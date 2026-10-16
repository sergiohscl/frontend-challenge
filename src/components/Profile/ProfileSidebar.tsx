
import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import {
  UserRound,
  MapPin,
  ShoppingCart,
  Heart,
  Image,
  Download,
  AlertTriangle,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    label: "Dados do perfil",
    icon: UserRound,
    href: "/profile",
  },
  {
    label: "Carteiras",
    icon: MapPin,
    href: "/profile/wallets",
  },
  {
    label: "Atividade",
    icon: ShoppingCart,
  },
  {
    label: "Lista de interesse",
    icon: Heart,
  },
  {
    label: "Ofertas",
    icon: Image,
  },
  {
    label: "Arquivos baixados",
    icon: Download,
  },
  {
    label: "Suporte",
    icon: AlertTriangle,
  },
] as const;

export function ProfileSidebar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const baseClass =
    "flex h-11 w-full items-center gap-4 px-4 text-left text-sm transition-colors";

  const activeClass =
    "border-l-6 border-primary bg-[#291914] text-primary";

  const inactiveClass =
    "border-l-6 border-transparent text-[#D18A4D] hover:bg-[#291914]";

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
    } finally {
      setIsLoggingOut(false);
      await navigate({ to: "/" });
    }
  };

  return (
    <aside className="w-full bg-[#241612] font-mono text-[#D18A4D]">
      {/* Título */}
      <h2 className="px-3 pt-4 pb-2 text-base font-bold text-[#F5F1EB]">
        Meu perfil
      </h2>

      {/* Navegação */}
      <nav aria-label="Menu do perfil">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const href = "href" in item ? item.href : undefined;
          const isActive = href === pathname;

          if (href === "/profile" || href === "/profile/wallets") {
            return (
              <Link
                key={item.label}
                to={href}
                aria-current={isActive ? "page" : undefined}
                className={`${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            );
          }

          return (
            <div
              key={item.label}
              aria-disabled="true"
              title="Funcionalidade em desenvolvimento"
              className={`${baseClass} border-l-6 border-transparent opacity-70`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </div>
          );
        })}

        {/* Logout */}
        <div className="mt-1 border-t border-[#45271C]">
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={!isAuthenticated || isLoggingOut}
            className="flex h-12 w-full items-center gap-4 px-4 text-left text-sm font-bold transition-colors hover:bg-[#291914] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} strokeWidth={1.5} />

            <span>
              {isLoggingOut ? "Saindo..." : "Sair"}
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
