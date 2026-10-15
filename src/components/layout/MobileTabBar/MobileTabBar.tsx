import {
  Heart,
  House,
  Scan,
  ShoppingCart,
  UserRound,
} from "lucide-react";

type MobileTabBarProps = {
  onCreateClick?: () => void;
};

export function MobileTabBar({
  onCreateClick,
}: MobileTabBarProps) {
  return (
    <nav
      aria-label="Navegação principal mobile"
      className="
        fixed inset-x-0 bottom-0 z-40
        h-31.5 lg:hidden
      "
    >
      {/* Fundo com recorte central */}
      <svg
        aria-hidden="true"
        viewBox="0 0 414 126"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute inset-0 h-full w-full
          drop-shadow-[0_-10px_30px_rgba(10,6,4,0.45)]
        "
      >
        <path
          d="
            M 30 31
            H 155
            C 166 31 169 37 174 47
            C 182 64 193 72 207 72
            C 221 72 232 64 240 47
            C 245 37 248 31 259 31
            H 384
            Q 414 31 414 61
            V 96
            Q 414 126 384 126
            H 30
            Q 0 126 0 96
            V 61
            Q 0 31 30 31
            Z
          "
          fill="#241612"
        />
      </svg>

      {/* Ícones da navegação */}
      <div
        className="
          absolute inset-x-0 top-12
          mx-auto flex max-w-103.5
          items-center justify-between
          px-6
        "
      >
        <a
          href="/"
          aria-label="Início"
          aria-current="page"
          className="
            flex size-11 items-center
            justify-center text-[#E89B55]
          "
        >
          <House
            size={24}
            fill="currentColor"
            strokeWidth={1.8}
          />
        </a>

        <button
          type="button"
          disabled
          aria-label="Favoritos indisponível"
          className="
            flex size-11 items-center
            justify-center text-[#CFB28C]
          "
        >
          <Heart
            size={24}
            fill="currentColor"
            strokeWidth={1.8}
          />
        </button>

        {/* Espaço para o botão central */}
        <div
          className="size-16 shrink-0"
          aria-hidden="true"
        />

        <button
          type="button"
          disabled
          aria-label="Carrinho indisponível"
          className="
            flex size-11 items-center
            justify-center text-[#CFB28C]
          "
        >
          <ShoppingCart
            size={24}
            fill="currentColor"
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          disabled
          aria-label="Perfil indisponível"
          className="
            flex size-11 items-center
            justify-center text-[#CFB28C]
          "
        >
          <UserRound
            size={24}
            fill="currentColor"
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Botão central de 65px */}
      <button
        type="button"
        disabled={!onCreateClick}
        onClick={onCreateClick}
        aria-label="Criar NFT"
        className="
          absolute top-0 left-1/2
          flex size-16.25
          -translate-x-1/2
          items-center justify-center
          rounded-full
          bg-[linear-gradient(180deg,rgba(210,138,76,0.4)_0%,#D28A4C_100%)]
          text-[#F5F1EB]
          shadow-[0_4px_15px_rgba(210,138,76,0.25)]
          transition-transform
          enabled:hover:scale-105
        "
      >
        <Scan size={27} strokeWidth={1.8} />
      </button>
    </nav>
  );
}
