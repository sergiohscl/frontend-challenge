
import { useState } from "react";

export function CollectorForm() {
  const [useOtherWallet, setUseOtherWallet] = useState(false);

  const inputClass =
    "h-10 w-full rounded-sm border border-[#3F2319] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none focus:border-primary";

  const labelClass = "mb-1 block text-xs text-[#F5F1EB]";

  return (
    <section className="font-mono text-[#F5F1EB]">
      <h2 className="mb-4 text-base font-bold">
        Perfil do colecionador
      </h2>

      <form
        id="checkout-form"
        className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label htmlFor="displayName" className={labelClass}>
            Nome de exibição<span className="text-primary">*</span>
          </label>
          <input
            id="displayName"
            name="displayName"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="username" className={labelClass}>
            Nome de usuário<span className="text-primary">*</span>
          </label>
          <input
            id="username"
            name="username"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="network" className={labelClass}>
            Rede <span className="text-primary">*</span>
          </label>
          <select
            id="network"
            name="network"
            required
            defaultValue=""
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

        <div>
          <label htmlFor="profileName" className={labelClass}>
            Nome do perfil<span className="text-primary">*</span>
          </label>
          <input
            id="profileName"
            name="profileName"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="walletAddress" className={labelClass}>
            Endereço da carteira<span className="text-primary">*</span>
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            placeholder="Endereço 0x da carteira"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="secondaryWallet" className={labelClass}>
            Carteira secundária
          </label>
          <input
            id="secondaryWallet"
            name="secondaryWallet"
            placeholder="ENS ou carteira secundária (opcional)"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="walletType" className={labelClass}>
            Tipo de carteira<span className="text-primary">*</span>
          </label>
          <select
            id="walletType"
            name="walletType"
            required
            defaultValue=""
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

        <div>
          <label htmlFor="referralCode" className={labelClass}>
            Código de indicação<span className="text-primary">*</span>
          </label>
          <input
            id="referralCode"
            name="referralCode"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail<span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="ensName" className={labelClass}>
            Nome ENS <span className="text-primary">*</span>
          </label>

          <div className="flex items-center gap-2">
            <input
              id="ensName"
              name="ensName"
              placeholder=".eth"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useOtherWallet}
              onChange={(event) =>
                setUseOtherWallet(event.target.checked)
              }
              className="accent-primary"
            />
            Usar outra carteira?
          </label>

          {useOtherWallet && (
            <input
              name="otherWallet"
              placeholder="Endereço da outra carteira"
              aria-label="Endereço da outra carteira"
              className={`${inputClass} mt-3`}
            />
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Observação do colecionador (opcional)
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            className="w-full max-w-80 resize-none rounded-sm border border-[#3F2319] bg-transparent p-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </form>
    </section>
  );
}
