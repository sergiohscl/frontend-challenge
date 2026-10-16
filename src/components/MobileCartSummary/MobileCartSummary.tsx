import { useState } from "react";

interface MobileCartSummaryProps {
  subtotal: number;
  discount: number;
  networkFee: number;
  total: number;
  disabled?: boolean;
  onCheckout?: () => void;
}

export function MobileCartSummary({
  subtotal,
  discount,
  networkFee,
  total,
  disabled = false,
  onCheckout,
}: MobileCartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoMessage("Digite um código promocional.");
      return;
    }

    setPromoMessage("Código promocional ainda não disponível.");
  };

  return (
    <section
      aria-label="Resumo do pedido"
      className="w-full rounded-t-[40px] bg-[#241612] px-4 pt-6 pb-9 font-mono text-[#F5F1EB] shadow-[0_0_20px_0_#0A060473]"
    >
      {/* Cupom promocional */}
      <div className="flex h-12.5 w-full min-w-0 items-center overflow-hidden rounded-[40px] border border-[#3F2319] bg-[#241612]">
        <input
          type="text"
          value={promoCode}
          onChange={(event) => {
            setPromoCode(event.target.value);
            setPromoMessage("");
          }}
          placeholder="Digite o código promocional..."
          aria-label="Código promocional"
          className="
      h-full min-w-0 flex-1
      bg-transparent px-4
      font-mono text-[13px] font-normal
      leading-5.5 text-[#F5F1EB]
      outline-none
      placeholder:text-[#B39463]
      placeholder:opacity-100
    "
        />

        <button
          type="button"
          onClick={handleApplyPromo}
          className="
      flex h-12.5 w-24.25 shrink-0
      items-center justify-center
      rounded-[40px]
      bg-linear-to-r
      from-[#D28A4C]/54
      to-[#D28A4C]
      font-mono text-[15px] font-bold
      leading-4 text-[#F5F1EB]
      transition-opacity hover:opacity-90
    "
        >
          Aplicar
        </button>
      </div>

      {promoMessage && (
        <p role="status" className="mt-2 text-xs text-[#CFB28C]">
          {promoMessage}
        </p>
      )}

      {/* Valores */}
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} ETH</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span>Desconto do lançamento</span>
          <span>(-) {discount.toFixed(2)}</span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <span>Taxa de rede</span>

          <div className="text-right">
            <p>{networkFee.toFixed(3)} ETH</p>
            <p className="mt-1 text-xs text-primary">Taxa estimada</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1 text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{total.toFixed(3)} ETH</span>
        </div>
      </div>

      {/* Finalização */}
      <button
        type="button"
        onClick={onCheckout}
        disabled={disabled || !onCheckout}
        className="mt-8 min-h-15 w-full rounded-full bg-primary px-4 text-base font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Conectar e finalizar
      </button>
    </section>
  );
}
