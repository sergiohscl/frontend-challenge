
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

const menuItems = [
  { label: "Dados do perfil", icon: UserRound },
  { label: "Carteiras", icon: MapPin },
  { label: "Atividade", icon: ShoppingCart },
  { label: "Lista de interesse", icon: Heart },
  { label: "Ofertas", icon: Image },
  { label: "Arquivos baixados", icon: Download },
  { label: "Suporte", icon: AlertTriangle },
];

export function ProfileSidebar() {
  return (
    <aside className="w-full bg-[#241612] font-mono text-[#D18A4D]">
      <h2 className="px-3 pt-4 pb-2 text-base font-bold text-[#F5F1EB]">
        Meu perfil
      </h2>

      <nav aria-label="Menu do perfil">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <div
              key={item.label}
              className={`flex h-11 items-center gap-4 px-4 text-sm ${
                isActive
                  ? "border-l-[6px] border-[#D18A4D] bg-[#291914]"
                  : ""
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </div>
          );
        })}

        <div className="mt-1 border-t border-[#45271C]">
          <button
            type="button"
            className="flex h-12 w-full items-center gap-4 px-4 text-sm font-bold"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </nav>
    </aside>
  );
}
