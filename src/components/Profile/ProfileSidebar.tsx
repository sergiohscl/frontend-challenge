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

import { Link, useRouterState } from "@tanstack/react-router";

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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const baseClass =
    "flex h-11 w-full items-center gap-4 px-4 text-left text-sm transition-colors";

  const activeClass =
    "border-l-6 border-primary bg-[#291914] text-primary";

  const inactiveClass =
    "border-l-6 border-transparent text-[#D18A4D] hover:bg-[#291914]";

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

          // Itens com rotas implementadas
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

          // Funcionalidades futuras
          return (
            <div
              key={item.label}
              aria-disabled="true"
              className={`${baseClass} border-l-6 border-transparent opacity-70`}
              title="Funcionalidade em desenvolvimento"
            >
              <Icon size={18} strokeWidth={1.5} />

              <span>{item.label}</span>
            </div>
          );
        })}

        {/* Sair */}
        <div className="mt-1 border-t border-[#45271C]">
          <button
            type="button"
            disabled
            title="Disponível após a implementação da autenticação"
            className="flex h-12 w-full cursor-not-allowed items-center gap-4 px-4 text-left text-sm font-bold opacity-60"
          >
            <LogOut size={18} strokeWidth={1.5} />

            <span>Sair</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
