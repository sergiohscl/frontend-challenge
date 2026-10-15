import type { FooterBenefit } from "../../types/footer.types";

const benefits: FooterBenefit[] = [
  {
    id: "security",
    icon: "W",
    title: "Segurança da carteira",
    description:
      "Proteja sua carteira e colecione arte digital verificada com confiança.",
  },
  {
    id: "creators",
    icon: "C",
    title: "Criadores em destaque",
    description:
      "Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.",
  },
  {
    id: "launches",
    icon: "D",
    title: "Alertas de lançamentos",
    description:
      "Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.",
  },
];

export function FooterBenefits() {
  return (
    <div className="grid min-w-0 grid-cols-3">
      {benefits.map((benefit, index) => (
        <div
          key={benefit.id}
          className={`
            flex min-w-0 flex-col
            gap-3 px-4
            ${index !== 0 ? "border-l border-[#8D5936]" : ""}
          `}
        >
          <div
            aria-hidden="true"
            className="
              flex size-16 items-center
              justify-center rounded-full
              bg-[#D28A4C]
              font-mono text-xl font-bold
              text-background
            "
          >
            {benefit.icon}
          </div>

          <h3 className="font-mono text-sm font-bold text-[#F5F1EB]">
            {benefit.title}
          </h3>

          <p className="font-mono text-xs leading-5 text-[#CFB28C]">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
}
