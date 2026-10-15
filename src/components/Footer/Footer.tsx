import { FooterBenefits } from "./FooterBenefits";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterLinks } from "./FooterLinks";

import type { FooterLinkGroup } from "../../types/footer.types";

const footerGroups: FooterLinkGroup[] = [
  {
    title: "Meu perfil",
    links: [
      { label: "Meu perfil" },
      { label: "Minha coleção" },
      { label: "Atividade" },
      { label: "Estúdio do criador" },
      { label: "Lista de interesse" },
    ],
  },
  {
    title: "Central de ajuda",
    links: [
      { label: "Central de ajuda" },
      { label: "Como comprar NFTs" },
      { label: "Carteira e segurança" },
      { label: "Política do mercado" },
      { label: "Denunciar item" },
    ],
  },
  {
    title: "Coleções",
    links: [
      { label: "Arte digital" },
      { label: "Fotografia" },
      { label: "Música" },
      { label: "Arte 3D" },
      { label: "Utilidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      aria-label="Rodapé do Kurio"
      className="
        mx-auto hidden w-full max-w-300
        overflow-hidden bg-[#241612]
        lg:block
      "
    >
      {/* Benefícios e newsletter */}
      <div
        className="
          grid min-h-62.5 grid-cols-[3fr_1fr]
          items-start gap-4
          px-8 py-8
        "
      >
        <FooterBenefits />
        <FooterNewsletter />
      </div>

      {/* Faixa institucional */}
      <div
        className="
          grid min-h-22 grid-cols-4
          items-center gap-6
          bg-[#35200F] px-8
          font-mono text-xs
          text-[#F5F1EB]
        "
      >
        <strong className="tracking-widest">KURIO</strong>

        <span>Feito para colecionadores, criadores e cultura</span>

        <span>contato@email.com</span>

        <span>+55 11 4002 8922</span>
      </div>

      {/* Card de links — 236px */}
      <FooterLinks groups={footerGroups} />

      {/* Copyright — fora do card */}
      <div
        className="
            flex h-7.5 w-full
            items-center justify-center
            bg-background
            font-mono text-sm
            leading-7.5 text-text-primary
        "
      >
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}
