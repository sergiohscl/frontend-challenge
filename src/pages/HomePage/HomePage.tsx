
import { DesktopHeader } from "../../components/layout/DesktopHeader/DesktopHeader";
import { MobileSearchBar } from "../../components/layout/MobileSearchBar/MobileSearchBar";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DesktopHeader />

      <MobileSearchBar />

      <main className="mx-auto w-full max-w-300 px-6 py-8 lg:px-0">
        {/* HeroBanner será integrado aqui */}
      </main>
    </div>
  );
}
