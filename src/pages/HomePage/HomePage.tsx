
import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { DesktopHeader } from "../../components/layout/DesktopHeader/DesktopHeader";
import { MobileSearchBar } from "../../components/layout/MobileSearchBar/MobileSearchBar";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DesktopHeader />

      <MobileSearchBar />

      <main className="mx-auto w-full max-w-300 px-6 py-8 lg:px-0">
         <HeroBanner
          eyebrow="Bem-vindo à Kurio"
          title="SEJA DONO DO FUTURO DA ARTE DIGITAL"
          description="Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet."
          imageDesktop="/images/nfts/emerald-ape.png"
          imageMobile="/images/nfts/emerald-ape.png"
          secondaryImageMobile="/images/nfts/sage-nomad.png"
          buttonText="EXPLORAR"
        />
      </main>
    </div>
  );
}
