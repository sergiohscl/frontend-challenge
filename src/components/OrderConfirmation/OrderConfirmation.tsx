
import { X, MailCheck, ExternalLink } from "lucide-react";

import type { CartNFT } from "@/components/DesktopCartNFTs";

interface OrderConfirmationProps {
  items: CartNFT[];
  transactionId?: string;
  transactionDate?: string;
  walletName: string;
  networkFee: number;
  onClose: () => void;
  explorerUrl?: string;
}

export function OrderConfirmation({
  items,
  transactionId,
  transactionDate,
  walletName,
  networkFee,
  onClose,
  explorerUrl,
}: OrderConfirmationProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal + networkFee;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#140D0A]/95 px-4 py-16"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
        className="w-full max-w-145 bg-[#241612] font-mono text-[#F5F1EB] shadow-2xl"
      >
        {/* Cabeçalho */}
        <div className="relative flex flex-col items-center px-6 pt-6 pb-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar confirmação"
            className="absolute top-4 right-4 text-primary transition-opacity hover:opacity-70"
          >
            <X size={18} />
          </button>

          <MailCheck
            size={58}
            strokeWidth={1.2}
            className="text-primary"
          />

          <h2
            id="order-confirmation-title"
            className="mt-3 text-center text-sm font-bold text-[#CFB28C]"
          >
            Resumo do pedido demonstrativo
          </h2>
        </div>

        {/* Informações da transação */}
        <div className="grid grid-cols-2 gap-4 border-y border-primary px-6 py-4 text-xs sm:grid-cols-4">
          <div>
            <p className="text-[#CFB28C]">ID da transação</p>
            <p className="mt-1 break-all">
              {transactionId ?? "Não disponível"}
            </p>
          </div>

          <div>
            <p className="text-[#CFB28C]">Data</p>
            <p className="mt-1">
              {transactionDate ?? "Não confirmada"}
            </p>
          </div>

          <div>
            <p className="text-[#CFB28C]">Total</p>
            <p className="mt-1">
              {total.toFixed(3)} ETH
            </p>
          </div>

          <div>
            <p className="text-[#CFB28C]">Carteira</p>
            <p className="mt-1">{walletName}</p>
          </div>
        </div>

        {/* Detalhes */}
        <div className="px-6 py-5">
          <h3 className="mb-3 text-sm font-bold">
            Detalhes do pedido
          </h3>

          <div className="grid grid-cols-[minmax(0,1fr)_60px_100px] gap-2 border-b border-[#3F2319] pb-2 text-xs font-bold">
            <span>NFTs</span>
            <span className="text-center">Edições</span>
            <span className="text-right">Subtotal</span>
          </div>

          <div className="mt-3 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_60px_100px] items-center gap-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 shrink-0 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">
                      {item.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#B39463]">
                      ID do token: {item.tokenId}
                    </p>
                  </div>
                </div>

                <span className="text-center text-xs text-[#CFB28C]">
                  (x {item.quantity})
                </span>

                <span className="text-right text-sm font-bold text-primary">
                  {(item.price * item.quantity).toFixed(2)} ETH
                </span>
              </div>
            ))}
          </div>

          {/* Totais */}
          <div className="mt-5 space-y-2 border-b border-[#3F2319] pb-3 text-sm">
            <div className="flex justify-end gap-10">
              <span>Taxa de rede</span>
              <span>{networkFee.toFixed(3)} ETH</span>
            </div>

            <div className="flex justify-end gap-10 font-bold">
              <span>Total</span>
              <span className="text-primary">
                {total.toFixed(3)} ETH
              </span>
            </div>
          </div>

          {/* Informação */}
          <p className="mx-auto mt-4 max-w-100 text-center text-xs leading-5 text-[#CFB28C]">
            Esta é uma visualização demonstrativa do pedido.
            Nenhuma transação blockchain foi executada.
          </p>

          {/* Explorador */}
          {explorerUrl && (
            <div className="mt-5 flex justify-center">
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90"
              >
                <ExternalLink size={16} />
                Ver no explorador
              </a>
            </div>
          )}
        </div>

        <div className="h-2 bg-primary" />
      </section>
    </div>
  );
}
