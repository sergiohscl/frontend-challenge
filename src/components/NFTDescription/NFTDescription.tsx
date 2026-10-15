
import { useState } from "react";

type NFTDescriptionProps = {
  description: string;
  network?: string;
  contract?: string;
  royalties?: string;
  reviewsCount?: number;
};

export function NFTDescription({
  description,
  network,
  contract,
  royalties,
  reviewsCount = 0,
}: NFTDescriptionProps) {
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews"
  >("details");

  return (
   <section className="w-full min-w-0">
      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto border-b border-primary">
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          aria-selected={activeTab === "details"}
          className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
            activeTab === "details"
              ? "border-primary text-primary"
              : "border-transparent text-[#F5F1EB]"
          }`}
        >
          Detalhes do NFT
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          aria-selected={activeTab === "reviews"}
          className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
            activeTab === "reviews"
              ? "border-primary text-primary"
              : "border-transparent text-[#F5F1EB]"
          }`}
        >
          Avaliações de colecionadores ({reviewsCount})
        </button>
      </div>

      {/* Content */}
      <div className="pt-4 text-sm leading-6">
        {activeTab === "details" ? (
          <div className="flex flex-col gap-3">
            <p className="whitespace-pre-line text-[#CFB28C]">
              {description}
            </p>

            {network && (
              <div>
                <h3 className="font-bold text-[#F5F1EB]">
                  Rede:
                </h3>
                <p className="text-[#CFB28C]">
                  {network}
                </p>
              </div>
            )}

            {contract && (
              <div>
                <h3 className="font-bold text-[#F5F1EB]">
                  Contrato:
                </h3>
                <p className="text-[#CFB28C]">
                  {contract}
                </p>
              </div>
            )}

            {royalties && (
              <div>
                <h3 className="font-bold text-[#F5F1EB]">
                  Direitos autorais:
                </h3>
                <p className="text-[#CFB28C]">
                  {royalties}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[#CFB28C]">
            As avaliações dos colecionadores serão
            exibidas aqui.
          </p>
        )}
      </div>
    </section>
  );
}
