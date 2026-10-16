
import { useState } from "react";
import type { FormEvent } from "react";

interface WalletFormData {
  displayName: string;
  walletNickname: string;
  network: string;
  profileName: string;
  walletAddress: string;
  secondaryAddress: string;
  walletType: string;
  referralCode: string;
  email: string;
  ensName: string;
}

const initialForm: WalletFormData = {
  displayName: "",
  walletNickname: "",
  network: "",
  profileName: "",
  walletAddress: "",
  secondaryAddress: "",
  walletType: "",
  referralCode: "",
  email: "",
  ensName: "",
};

export function WalletsForm() {
  const [form, setForm] = useState<WalletFormData>(initialForm);
  const [secondaryEnabled, setSecondaryEnabled] = useState(false);
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const [feedback, setFeedback] = useState("");

  const inputClass =
    "h-10 w-full rounded-sm border border-[#45271C] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus:border-primary";

  const labelClass = "mb-1 block text-sm text-[#F5F1EB]";

  const updateField = (
    field: keyof WalletFormData,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setFeedback("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeedback(
      "Dados validados. O salvamento de carteiras será integrado ao backend posteriormente.",
    );
  };

  return (
    <section className="w-full font-mono text-[#F5F1EB]">
      {/* Cabeçalho */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base font-bold">
            Carteira principal
          </h1>

          <p className="mt-1 text-sm text-[#CFB28C]">
            Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setFeedback("");
          }}
          className="text-sm font-bold text-primary hover:underline"
        >
          Adicionar
        </button>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-7 gap-y-7 md:grid-cols-2">
          {/* Nome de exibição */}
          <div>
            <label htmlFor="displayName" className={labelClass}>
              Nome de exibição<span className="text-primary">*</span>
            </label>

            <input
              id="displayName"
              required
              value={form.displayName}
              onChange={(event) =>
                updateField("displayName", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Apelido */}
          <div>
            <label htmlFor="walletNickname" className={labelClass}>
              Apelido da carteira<span className="text-primary">*</span>
            </label>

            <input
              id="walletNickname"
              required
              value={form.walletNickname}
              onChange={(event) =>
                updateField("walletNickname", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Rede */}
          <div>
            <label htmlFor="network" className={labelClass}>
              Rede <span className="text-primary">*</span>
            </label>

            <select
              id="network"
              required
              value={form.network}
              onChange={(event) =>
                updateField("network", event.target.value)
              }
              className={inputClass}
            >
              <option value="" disabled>
                Selecione uma rede
              </option>
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="base">Base</option>
            </select>
          </div>

          {/* Nome do perfil */}
          <div>
            <label htmlFor="profileName" className={labelClass}>
              Nome do perfil<span className="text-primary">*</span>
            </label>

            <input
              id="profileName"
              required
              value={form.profileName}
              onChange={(event) =>
                updateField("profileName", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Endereço */}
          <div>
            <label htmlFor="walletAddress" className={labelClass}>
              Endereço da carteira<span className="text-primary">*</span>
            </label>

            <input
              id="walletAddress"
              required
              placeholder="Endereço 0x da carteira"
              value={form.walletAddress}
              onChange={(event) =>
                updateField("walletAddress", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Endereço secundário */}
          <div className="flex items-end">
            <input
              aria-label="ENS ou carteira secundária"
              placeholder="ENS ou carteira secundária (opcional)"
              value={form.secondaryAddress}
              onChange={(event) =>
                updateField("secondaryAddress", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Tipo de carteira */}
          <div>
            <label htmlFor="walletType" className={labelClass}>
              Tipo de carteira<span className="text-primary">*</span>
            </label>

            <select
              id="walletType"
              required
              value={form.walletType}
              onChange={(event) =>
                updateField("walletType", event.target.value)
              }
              className={inputClass}
            >
              <option value="" disabled>
                Selecione uma carteira
              </option>
              <option value="metamask">MetaMask</option>
              <option value="walletconnect">WalletConnect</option>
              <option value="coinbase">Coinbase Wallet</option>
            </select>
          </div>

          {/* Código de indicação */}
          <div>
            <label htmlFor="referralCode" className={labelClass}>
              Código de indicação<span className="text-primary">*</span>
            </label>

            <input
              id="referralCode"
              required
              value={form.referralCode}
              onChange={(event) =>
                updateField("referralCode", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="walletEmail" className={labelClass}>
              E-mail<span className="text-primary">*</span>
            </label>

            <input
              id="walletEmail"
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* ENS */}
          <div>
            <label htmlFor="ensName" className={labelClass}>
              Nome ENS <span className="text-primary">*</span>
            </label>

            <div className="flex gap-2">
              <select
                aria-label="Domínio ENS"
                className="h-10 rounded-sm border border-[#45271C] bg-transparent px-3 text-sm outline-none"
              >
                <option value=".eth">.eth</option>
              </select>

              <input
                id="ensName"
                required
                value={form.ensName}
                onChange={(event) =>
                  updateField("ensName", event.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Salvar */}
        <button
          type="submit"
          className="mt-8 h-10 min-w-33 rounded-sm bg-primary px-4 text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90"
        >
          Salvar carteira
        </button>

        {feedback && (
          <p role="status" className="mt-4 text-sm text-primary">
            {feedback}
          </p>
        )}
      </form>

      {/* Carteira secundária */}
      <div className="mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold">
              Carteira secundária
            </h2>

            <p className="mt-1 text-sm text-[#CFB28C]">
              {secondaryEnabled
                ? "Configure sua carteira secundária."
                : "Você ainda não adicionou uma carteira secundária."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sameAsPrimary}
                onChange={(event) =>
                  setSameAsPrimary(event.target.checked)
                }
                className="accent-primary"
              />
              Igual à carteira principal
            </label>

            <button
              type="button"
              onClick={() => setSecondaryEnabled(true)}
              className="text-sm font-bold text-primary hover:underline"
            >
              Adicionar
            </button>
          </div>
        </div>

        {secondaryEnabled && (
          <div className="mt-5 max-w-104">
            <label htmlFor="secondaryWallet" className={labelClass}>
              Endereço da carteira secundária
            </label>

            <input
              id="secondaryWallet"
              placeholder="Endereço 0x da carteira"
              disabled={sameAsPrimary}
              value={
                sameAsPrimary
                  ? form.walletAddress
                  : form.secondaryAddress
              }
              onChange={(event) =>
                updateField("secondaryAddress", event.target.value)
              }
              className={`${inputClass} disabled:opacity-60`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
