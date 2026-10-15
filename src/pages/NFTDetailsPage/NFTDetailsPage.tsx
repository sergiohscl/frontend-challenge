
import { useParams } from "@tanstack/react-router";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";

export function NFTDetailsPage() {
  const { id } = useParams({
    from: "/nft/$id",
  });

  return (
    <div className="min-h-screen bg-[#140D0A]">
      <DesktopHeader />

      <main
        className="
          mx-auto flex w-full max-w-300
          flex-col gap-24 py-6
        "
      >
        <section aria-labelledby="nft-details-title">
          <h1
            id="nft-details-title"
            className="font-mono text-3xl font-bold text-[#F5F1EB]"
          >
            Detalhes do NFT
          </h1>

          <p className="mt-4 font-mono text-sm text-[#CFB28C]">
            NFT selecionado: {id}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
