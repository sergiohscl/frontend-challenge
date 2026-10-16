
import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";

import { CollectorForm } from "@/components/Checkout/CollectorForm";
import { CheckoutSummary } from "@/components/Checkout/CheckoutSummary";

export function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      <DesktopHeader />

      <main className="mx-auto w-full max-w-300 px-4 py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação"
          className="mb-8 font-mono text-sm font-bold"
        >
          Início / Mercado / Pagamento
        </nav>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(350px,1fr)] lg:gap-8">
          <CollectorForm />
          <CheckoutSummary />
        </div>
      </main>

      <Footer />
    </div>
  );
}
