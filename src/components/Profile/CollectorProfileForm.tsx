
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff, Image as ImageIcon } from "lucide-react";

type PasswordField = "current" | "new" | "confirm";

export function CollectorProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const inputClass =
    "h-10 w-full rounded-sm border border-[#45271C] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none focus:border-primary";

  const labelClass = "mb-3 block text-sm text-[#F5F1EB]";

  const togglePassword = (field: PasswordField) => {
    setVisiblePasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback("Selecione um arquivo de imagem válido.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const wantsPasswordChange = Object.values(passwords).some(Boolean);

    if (wantsPasswordChange) {
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        setFeedback("Preencha todos os campos para alterar a senha.");
        return;
      }

      if (passwords.new !== passwords.confirm) {
        setFeedback("A nova senha e a confirmação não coincidem.");
        return;
      }
    }

    setFeedback(
      "Perfil validado. A persistência dos dados será integrada ao backend posteriormente.",
    );
  };

  return (
    <section className="w-full font-mono text-[#F5F1EB]">
      <h1 className="mb-8 text-base font-bold">
        Perfil do colecionador
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-7 gap-y-7">
          {/* Nome de exibição */}
          <div>
            <label htmlFor="displayName" className={labelClass}>
              Nome de exibição
              <span className="text-primary">*</span>
            </label>
            <input
              id="displayName"
              name="displayName"
              required
              className={inputClass}
            />
          </div>

          {/* Nome de usuário */}
          <div>
            <label htmlFor="username" className={labelClass}>
              Nome de usuário
              <span className="text-primary">*</span>
            </label>
            <input
              id="username"
              name="username"
              required
              className={inputClass}
            />
          </div>

          {/* E-mail */}
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

          {/* Nome ENS */}
          <div>
            <label htmlFor="ensName" className={labelClass}>
              Nome ENS <span className="text-primary">*</span>
            </label>

            <div className="flex gap-2">
              <select
                aria-label="Domínio ENS"
                className="h-10 rounded-sm border border-[#45271C] bg-transparent px-3 text-sm outline-none focus:border-primary"
              >
                <option value=".eth">.eth</option>
              </select>

              <input
                id="ensName"
                name="ensName"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Apelido da carteira */}
          <div>
            <label htmlFor="walletNickname" className={labelClass}>
              Apelido da carteira
              <span className="text-primary">*</span>
            </label>
            <input
              id="walletNickname"
              name="walletNickname"
              required
              className={inputClass}
            />
          </div>

          {/* Avatar */}
          <div>
            <span className={labelClass}>Avatar</span>

            <div className="flex items-center gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#45271C] bg-[#291914] text-primary">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar selecionado"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon size={20} />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                aria-label="Selecionar avatar"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-10 rounded-sm bg-primary px-6 text-sm font-bold text-[#140D0A]"
              >
                Alterar
              </button>

              <button
                type="button"
                onClick={() => {
                  setAvatar(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="text-sm text-[#F5F1EB]"
              >
                Remover
              </button>
            </div>
          </div>
        </div>

        {/* Alteração de senha */}
        <h2 className="mt-8 mb-5 text-base font-bold">
          Alterar senha
        </h2>

        <div className="grid max-w-104 gap-5">
          {(
            [
              ["current", "Senha atual"],
              ["new", "Nova senha"],
              ["confirm", "Confirmar nova senha"],
            ] as const
          ).map(([field, label]) => (
            <div key={field}>
              <label htmlFor={field} className={labelClass}>
                {label}
              </label>

              <div className="relative">
                <input
                  id={field}
                  type={
                    visiblePasswords[field] ? "text" : "password"
                  }
                  value={passwords[field]}
                  onChange={(event) =>
                    setPasswords((previous) => ({
                      ...previous,
                      [field]: event.target.value,
                    }))
                  }
                  autoComplete={
                    field === "current"
                      ? "current-password"
                      : "new-password"
                  }
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => togglePassword(field)}
                  aria-label={
                    visiblePasswords[field]
                      ? `Ocultar ${label.toLowerCase()}`
                      : `Mostrar ${label.toLowerCase()}`
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#B39463]"
                >
                  {visiblePasswords[field] ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {feedback && (
          <p role="status" className="mt-5 text-sm text-primary">
            {feedback}
          </p>
        )}

        {/* Salvar */}
        <button
          type="submit"
          className="mt-8 h-10 min-w-33 rounded-sm bg-primary px-8 text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90"
        >
          Salvar
        </button>
      </form>
    </section>
  );
}
