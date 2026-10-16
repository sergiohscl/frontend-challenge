import { useState } from "react";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";

import { useCart } from "@/contexts/CartContext";

import { OrderConfirmation } from "@/components/OrderConfirmation/OrderConfirmation";
import { CollectorForm } from "@/components/Checkout/CollectorForm";
import { CheckoutSummary } from "@/components/Checkout/CheckoutSummary";
import { MobileCheckout } from "@/components/Checkout/MobileCheckout";

const NETWORK_FEE = 0.016;

export function CheckoutPage() {
  const { items } = useCart();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const networkFee = items.length > 0 ? NETWORK_FEE : 0;

  const handleConfirm = () => {
    if (items.length === 0) return;

    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileCheckout onConfirm={handleConfirm} />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopHeader />

        <main className="mx-auto w-full max-w-300 px-4 py-8">
          <nav
            aria-label="Navegação"
            className="mb-8 font-mono text-sm font-bold"
          >
            Início / Mercado / Pagamento
          </nav>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(350px,1fr)] lg:gap-8">
            <CollectorForm onSubmitSuccess={handleConfirm} />

            <CheckoutSummary onConfirm={handleConfirm} />
          </div>
        </main>

        <Footer />
      </div>

      {/* Confirmação do pedido */}
      {showConfirmation && (
        <OrderConfirmation
          items={items}
          walletName="Carteira demonstrativa"
          networkFee={networkFee}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
}
