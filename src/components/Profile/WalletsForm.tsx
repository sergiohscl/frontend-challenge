import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { walletService } from "@/services/walletService";
import type { Wallet, WalletFormData, WalletNetwork, WalletType } from "@/types/wallet.types";

type EditableForm = Omit<WalletFormData, "network" | "walletType"> & {
  network: WalletNetwork | "";
  walletType: WalletType | "";
};

const emptyForm: EditableForm = {
  displayName: "", walletNickname: "", network: "", profileName: "",
  walletAddress: "", secondaryAddress: "", walletType: "",
  referralCode: "", email: "", ensName: "", sameAsPrimary: false,
};

const addressPattern = /^0x[a-fA-F0-9]{40}$/;
const ensPattern = /^[a-z0-9-]+\.eth$/i;

export function WalletsForm() {
  const { user } = useAuth();
  const [form, setForm] = useState<EditableForm>({ ...emptyForm });
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [secondaryEnabled, setSecondaryEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "h-10 w-full rounded-sm border border-[#45271C] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus:border-primary";
  const labelClass = "mb-1 block text-sm text-[#F5F1EB]";

  const loadWallets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setWallets(await walletService.getAll());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar carteiras.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) void loadWallets();
    else {
      setWallets([]);
      setLoading(false);
    }
  }, [user?.id, loadWallets]);

  const updateField = (field: keyof EditableForm, value: string | boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setFeedback("");
    setError("");
  };

  const resetForm = () => {
    setForm({ ...emptyForm, displayName: user?.displayName ?? "", email: user?.email ?? "" });
    setEditingId(null);
    setSecondaryEnabled(false);
    setFeedback("");
    setError("");
  };

  const startEditing = (wallet: Wallet) => {
    setEditingId(wallet.id);
    setForm({
      displayName: wallet.displayName,
      walletNickname: wallet.walletNickname,
      network: wallet.network,
      profileName: wallet.profileName,
      walletAddress: wallet.walletAddress,
      secondaryAddress: wallet.sameAsPrimary ? "" : wallet.secondaryAddress,
      walletType: wallet.walletType,
      referralCode: wallet.referralCode,
      email: wallet.email,
      ensName: wallet.ensName,
      sameAsPrimary: wallet.sameAsPrimary,
    });
    setSecondaryEnabled(Boolean(wallet.secondaryAddress) || wallet.sameAsPrimary);
    setFeedback("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    if (!form.network || !form.walletType) {
      setError("Selecione a rede e o tipo da carteira.");
      return;
    }
    if (!addressPattern.test(form.walletAddress.trim())) {
      setError("Endereço principal inválido. Informe 0x seguido de 40 caracteres hexadecimais.");
      return;
    }

    const secondaryAddress = secondaryEnabled
      ? form.sameAsPrimary ? form.walletAddress.trim() : form.secondaryAddress.trim()
      : "";

    if (secondaryAddress && !form.sameAsPrimary &&
        !addressPattern.test(secondaryAddress) && !ensPattern.test(secondaryAddress)) {
      setError("O endereço secundário deve ser um endereço 0x válido ou um ENS .eth.");
      return;
    }

    const payload: WalletFormData = {
      ...form,
      network: form.network,
      walletType: form.walletType,
      secondaryAddress,
      sameAsPrimary: secondaryEnabled && form.sameAsPrimary,
      ensName: form.ensName.trim(),
    };

    try {
      setSaving(true);
      setError("");
      setFeedback("");
      if (editingId) {
        await walletService.update(editingId, payload);
      } else {
        await walletService.create(payload);
      }
      await loadWallets();
      resetForm();
      setFeedback(editingId ? "Carteira atualizada com sucesso!" : "Carteira cadastrada com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar a carteira.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (wallet: Wallet) => {
    if (!window.confirm(`Deseja excluir a carteira "${wallet.walletNickname}"?`)) return;
    try {
      setDeletingId(wallet.id);
      setError("");
      setFeedback("");
      await walletService.remove(wallet.id);
      await loadWallets();
      if (editingId === wallet.id) resetForm();
      setFeedback("Carteira removida com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível excluir a carteira.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="w-full font-mono text-[#F5F1EB]">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base font-bold">{editingId ? "Editar carteira" : "Carteira principal"}</h1>
          <p className="mt-1 text-sm text-[#CFB28C]">
            Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
          </p>
        </div>
        <button type="button" onClick={resetForm} className="text-sm font-bold text-primary hover:underline">
          Adicionar
        </button>
      </div>

      <form onSubmit={(event) => void handleSubmit(event)}>
        <div className="grid grid-cols-1 gap-x-7 gap-y-7 md:grid-cols-2">
          <div>
            <label htmlFor="displayName" className={labelClass}>Nome de exibição<span className="text-primary">*</span></label>
            <input id="displayName" required value={form.displayName} onChange={(e) => updateField("displayName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="walletNickname" className={labelClass}>Apelido da carteira<span className="text-primary">*</span></label>
            <input id="walletNickname" required value={form.walletNickname} onChange={(e) => updateField("walletNickname", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="network" className={labelClass}>Rede <span className="text-primary">*</span></label>
            <select id="network" required value={form.network} onChange={(e) => updateField("network", e.target.value)} className={inputClass}>
              <option value="" disabled>Selecione uma rede</option>
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="base">Base</option>
            </select>
          </div>
          <div>
            <label htmlFor="profileName" className={labelClass}>Nome do perfil<span className="text-primary">*</span></label>
            <input id="profileName" required value={form.profileName} onChange={(e) => updateField("profileName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="walletAddress" className={labelClass}>Endereço da carteira<span className="text-primary">*</span></label>
            <input id="walletAddress" required placeholder="Endereço 0x da carteira" value={form.walletAddress} onChange={(e) => updateField("walletAddress", e.target.value)} className={inputClass} />
          </div>
          <div className="flex items-end">
            <input aria-label="ENS ou carteira secundária" placeholder="ENS ou carteira secundária (opcional)" disabled={form.sameAsPrimary} value={form.sameAsPrimary ? form.walletAddress : form.secondaryAddress} onChange={(e) => { updateField("secondaryAddress", e.target.value); setSecondaryEnabled(true); }} className={`${inputClass} disabled:opacity-60`} />
          </div>
          <div>
            <label htmlFor="walletType" className={labelClass}>Tipo de carteira<span className="text-primary">*</span></label>
            <select id="walletType" required value={form.walletType} onChange={(e) => updateField("walletType", e.target.value)} className={inputClass}>
              <option value="" disabled>Selecione uma carteira</option>
              <option value="metamask">MetaMask</option>
              <option value="walletconnect">WalletConnect</option>
              <option value="coinbase">Coinbase Wallet</option>
            </select>
          </div>
          <div>
            <label htmlFor="referralCode" className={labelClass}>Código de indicação<span className="text-primary">*</span></label>
            <input id="referralCode" required value={form.referralCode} onChange={(e) => updateField("referralCode", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="walletEmail" className={labelClass}>E-mail<span className="text-primary">*</span></label>
            <input id="walletEmail" type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="ensName" className={labelClass}>Nome ENS <span className="text-primary">*</span></label>
            <div className="flex gap-2">
              <select aria-label="Domínio ENS" defaultValue=".eth" className="h-10 rounded-sm border border-[#45271C] bg-transparent px-3 text-sm outline-none"><option value=".eth">.eth</option></select>
              <input id="ensName" required value={form.ensName} onChange={(e) => updateField("ensName", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={saving} className="h-10 min-w-33 rounded-sm bg-primary px-4 text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Salvando..." : editingId ? "Atualizar carteira" : "Salvar carteira"}
          </button>
          {editingId && <button type="button" onClick={resetForm} className="text-sm text-[#CFB28C] hover:text-primary">Cancelar edição</button>}
        </div>
      </form>

      {feedback && <p role="status" className="mt-4 text-sm text-primary">{feedback}</p>}
      {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold">Carteira secundária</h2>
            <p className="mt-1 text-sm text-[#CFB28C]">{secondaryEnabled ? "Configure sua carteira secundária." : "Você ainda não adicionou uma carteira secundária."}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={form.sameAsPrimary} onChange={(e) => { updateField("sameAsPrimary", e.target.checked); if (e.target.checked) setSecondaryEnabled(true); }} className="accent-primary" />
              Igual à carteira principal
            </label>
            <button type="button" onClick={() => setSecondaryEnabled(true)} className="text-sm font-bold text-primary hover:underline">Adicionar</button>
          </div>
        </div>
        {secondaryEnabled && (
          <div className="mt-5 max-w-104">
            <label htmlFor="secondaryWallet" className={labelClass}>Endereço da carteira secundária</label>
            <input id="secondaryWallet" placeholder="Endereço 0x ou ENS .eth" disabled={form.sameAsPrimary} value={form.sameAsPrimary ? form.walletAddress : form.secondaryAddress} onChange={(e) => updateField("secondaryAddress", e.target.value)} className={`${inputClass} disabled:opacity-60`} />
            {!form.sameAsPrimary && <button type="button" onClick={() => { setSecondaryEnabled(false); updateField("secondaryAddress", ""); }} className="mt-2 text-xs text-[#CFB28C] hover:text-primary">Remover endereço secundário</button>}
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-[#45271C] pt-6">
        <h2 className="text-base font-bold">Carteiras cadastradas</h2>
        {loading ? <p className="mt-4 text-sm text-[#CFB28C]">Carregando carteiras...</p> : wallets.length === 0 ? (
          <p className="mt-4 text-sm text-[#CFB28C]">Nenhuma carteira cadastrada.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {wallets.map((wallet) => (
              <li key={wallet.id} className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#45271C] p-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold">{wallet.walletNickname} <span className="font-normal text-[#CFB28C]">· {wallet.network}</span></p>
                  <p className="mt-1 break-all text-xs text-[#CFB28C]">{wallet.walletAddress}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <button type="button" onClick={() => startEditing(wallet)} className="text-primary hover:underline">Editar</button>
                  <button type="button" disabled={deletingId === wallet.id} onClick={() => void handleDelete(wallet)} className="text-red-400 hover:underline disabled:opacity-50">{deletingId === wallet.id ? "Excluindo..." : "Excluir"}</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
