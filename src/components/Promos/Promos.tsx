import { PromoCard } from "./PromoCard";

export function Promos() {
  return (
    <section
      aria-label="Promoções e coleções em destaque"
      className="
        mx-auto hidden w-full max-w-300
        grid-cols-2 gap-7
        lg:grid
      "
    >
      <PromoCard
        title="Lançamentos gênesis de edição limitada"
        description="Colecione edições escassas diretamente dos criadores antes da revelação pública."
        image="/images/nfts/emerald-ape.png"
        imageAlt="Emerald Ape com óculos e jaqueta verde"
      />

      <PromoCard
        title="Arte digital selecionada e muito mais"
        description="Explore novos artistas, coleções verificadas e obras digitais que definem a"
        image="/images/nfts/neon-vessel.png"
        imageAlt="Neon Vessel com blazer claro"
      />
    </section>
  );
}
