
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MoreVertical, Wallet } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

interface MobileCheckoutProps {
  onConfirm?: () => void;
}

type WalletProvider = "walletconnect" | "metamask" | "coinbase";

type ConnectedWallet = {
  id: string;
  name: string;
  address: string;
  network: string;
};

const connectedWallets: ConnectedWallet[] = [
  {
    id: "reserve",
    name: "Reserva",
    address: "nova.kurio.eth",
    network: "Rede Polygon",
  },
  {
    id: "primary",
    name: "Principal",
    address: "0xA91F...E82C",
    network: "Rede principal Ethereum",
  },
];

const providers: {
  id: WalletProvider;
  name: string;
  icon: string;
}[] = [
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "W",
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "M",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "wallet",
  },
];

const NETWORK_FEE = 0.016;

export function MobileCheckout({
  onConfirm,
}: MobileCheckoutProps) {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  const [selectedWallet, setSelectedWallet] = useState("reserve");

  const [selectedProvider, setSelectedProvider] =
    useState<WalletProvider>("coinbase");

  const [showWallets, setShowWallets] = useState(true);

  const networkFee = items.length > 0 ? NETWORK_FEE : 0;
  const total = Math.max(0, subtotal + networkFee);

  const handleConfirm = () => {
    if (items.length === 0) return;

    // Abre a confirmação demonstrativa do pedido.
    // Nenhuma transação blockchain é executada.
    onConfirm?.();
  };

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-103.5 flex-col rounded-[40px] bg-[#140D0A] px-7 pt-8 pb-9 font-mono text-[#F5F1EB]">
      {/* Cabeçalho */}
      <header className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => void navigate({ to: "/cart" })}
          aria-label="Voltar para o carrinho"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3F2319] bg-[#291914] text-[#B39463] transition-colors hover:border-primary"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-lg font-bold">
          Pagamento com carteira
        </h1>
      </header>

      {/* Carteiras conectadas */}
      <div className="mt-7">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold">
            Carteira conectada
          </h2>

          <button
            type="button"
            onClick={() => setShowWallets((prev) => !prev)}
            aria-expanded={showWallets}
            className="text-xs font-bold text-primary transition-opacity hover:opacity-80"
          >
            Trocar carteira
          </button>
        </div>

        {showWallets && (
          <div className="mt-3 space-y-5">
            {connectedWallets.map((wallet) => {
              const isSelected = selectedWallet === wallet.id;

              return (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => setSelectedWallet(wallet.id)}
                  aria-pressed={isSelected}
                  className="flex min-h-23 w-full items-center gap-4 rounded-xl bg-[#241612] px-4 py-3 text-left transition-colors hover:bg-[#2F1D15]"
                >
                  {/* Radio */}
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-primary"
                        : "border-[#674027]"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </span>

                  {/* Informações */}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">
                      {wallet.name}
                    </span>

                    <span className="mt-1 block truncate text-xs text-[#CFB28C]">
                      {wallet.address}
                    </span>

                    <span className="mt-1 block text-xs text-[#CFB28C]">
                      {wallet.network}
                    </span>
                  </span>

                  <MoreVertical
                    size={18}
                    className="shrink-0 text-[#B39463]"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Provedores de carteira */}
      <div className="mt-5">
        <h2 className="mb-3 text-sm font-bold">
          Carteira e rede
        </h2>

        <div className="space-y-4">
          {providers.map((provider) => {
            const isSelected = selectedProvider === provider.id;

            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => setSelectedProvider(provider.id)}
                aria-pressed={isSelected}
                className="flex min-h-16 w-full items-center gap-3 rounded-xl bg-[#241612] px-3.5 text-left transition-colors hover:bg-[#2F1D15]"
              >
                {/* Ícone */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3F2319] bg-[#2F1D15] text-sm text-primary">
                  {provider.icon === "wallet" ? (
                    <Wallet size={20} />
                  ) : (
                    provider.icon
                  )}
                </span>

                {/* Nome */}
                <span className="flex-1 text-sm">
                  {provider.name}
                </span>

                {/* Radio */}
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-primary"
                      : "border-[#674027]"
                  }`}
                >
                  {isSelected && (
                    <span className="m-auto h-2 w-2 rounded-full bg-primary" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-end gap-7 text-base font-bold">
        <span>Total:</span>

        <span className="text-primary">
          {total.toFixed(3)} ETH
        </span>
      </div>

      {/* Espaço flexível */}
      <div className="min-h-12 flex-1" />

      {/* Confirmar compra */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={items.length === 0 || !onConfirm}
        className="flex min-h-15 w-full items-center justify-center rounded-full bg-linear-to-r from-[#D28A4C] to-[#B97C49] text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar compra
      </button>
    </section>
  );
}
