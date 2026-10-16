
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface CheckoutSummaryProps {
  onConfirm?: () => void;
}

const NETWORK_FEE = 0.016;

type WalletType = "metamask" | "walletconnect" | "coinbase";

export function CheckoutSummary({ onConfirm }: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();

  const [wallet, setWallet] = useState<WalletType>("coinbase");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const discount = 0;
  const networkFee = items.length > 0 ? NETWORK_FEE : 0;
  const total = Math.max(0, subtotal - discount + networkFee);

  const applyPromo = () => {
    setPromoMessage(
      promoCode.trim()
        ? "Código promocional ainda não disponível."
        : "Digite um código promocional.",
    );
  };

  const handleConfirm = () => {
    if (items.length === 0) return;

    const form = document.getElementById("checkout-form");

    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
      return;
    }

    onConfirm?.();
  };

  return (
    <aside className="font-mono text-[#F5F1EB]">
      <h2 className="mb-3 text-base font-bold">
        Seus NFTs
      </h2>

      <div className="mb-2 flex justify-between border-b border-primary pb-2 text-sm font-bold">
        <span>NFTs</span>
        <span>Subtotal</span>
      </div>

      {/* NFTs */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-[#291914] p-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {item.name}
              </p>

              <p className="text-xs text-[#B39463]">
                ID do token: {item.tokenId}
              </p>
            </div>

            <span className="shrink-0 text-xs text-[#CFB28C]">
              (x {item.quantity})
            </span>

            <span className="shrink-0 text-sm font-bold text-primary">
              {(item.price * item.quantity).toFixed(2)} ETH
            </span>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-6 text-sm text-[#CFB28C]">
          Seu carrinho está vazio.
        </p>
      )}

      {/* Promoção */}
      <div className="mt-4">
        <button
          type="button"
          onClick={applyPromo}
          className="text-xs hover:text-primary"
        >
          Tem um código promocional? Aplique aqui
        </button>

        <input
          type="text"
          value={promoCode}
          onChange={(event) => {
            setPromoCode(event.target.value);
            setPromoMessage("");
          }}
          placeholder="Código promocional"
          aria-label="Código promocional"
          className="mt-2 h-9 w-full border border-[#3F2319] bg-transparent px-3 text-xs outline-none focus:border-primary"
        />

        {promoMessage && (
          <p
            role="status"
            className="mt-1 text-xs text-[#CFB28C]"
          >
            {promoMessage}
          </p>
        )}
      </div>

      {/* Totais */}
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)} ETH</span>
        </div>

        <div className="flex justify-between gap-3">
          <span>Desconto do lançamento</span>
          <span>(-) {discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span>Taxa de rede</span>

          <div className="text-right">
            <p>{networkFee.toFixed(3)} ETH</p>
            <p className="mt-1 text-xs text-primary">
              Taxa estimada
            </p>
          </div>
        </div>

        <div className="flex justify-between border-t border-[#3F2319] pt-3 font-bold">
          <span>Total</span>
          <span className="text-primary">
            {total.toFixed(3)} ETH
          </span>
        </div>
      </div>

      {/* Carteira */}
      <div className="mt-5">
        <h3 className="mb-3 text-center text-sm font-bold">
          Carteira e rede
        </h3>

        <div className="space-y-3">
          {(
            [
              ["walletconnect", "WalletConnect"],
              ["metamask", "MetaMask"],
              ["coinbase", "Coinbase Wallet"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-3 text-sm ${
                wallet === value
                  ? "border-primary"
                  : "border-[#3F2319]"
              }`}
            >
              <input
                type="radio"
                name="checkoutWallet"
                value={value}
                checked={wallet === value}
                onChange={() => setWallet(value)}
                className="accent-primary"
              />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirmar compra */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={items.length === 0}
        className="mt-5 h-11 w-full rounded-md bg-primary font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar compra
      </button>
    </aside>
  );
}
