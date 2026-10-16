import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { Eye, EyeOff, Image as ImageIcon } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";

import type { UpdateProfileData } from "@/types/profile.types";

type PasswordField = "current" | "new" | "confirm";

interface ProfileFormData {
  displayName: string;
  username: string;
  email: string;
  ensName: string;
  walletNickname: string;
}

const emptyProfile: ProfileFormData = {
  displayName: "",
  username: "",
  email: "",
  ensName: "",
  walletNickname: "",
};

const emptyPasswords: Record<PasswordField, string> = {
  current: "",
  new: "",
  confirm: "",
};

export function CollectorProfileForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, refreshUser } = useAuth();

  const [profile, setProfile] =
    useState<ProfileFormData>(emptyProfile);

  const [avatar, setAvatar] = useState<string | null>(null);

  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] =
    useState<Record<PasswordField, string>>(
      emptyPasswords,
    );

  const inputClass =
    "h-10 w-full rounded-sm border border-[#45271C] bg-transparent px-3 text-sm text-[#F5F1EB] outline-none focus:border-primary";

  const labelClass =
    "mb-3 block text-sm text-[#F5F1EB]";

  // Carregar dados do usuário autenticado.
  useEffect(() => {
    let active = true;

    async function loadProfile() {
      setIsLoading(true);
      setFeedback("");

      try {
        const data = await profileService.getMe();

        if (!active) return;

        setProfile({
          displayName: data.displayName,
          username: data.username,
          email: data.email,
          ensName: data.ensName ?? "",
          walletNickname: data.walletNickname ?? "",
        });

        setAvatar(data.avatar);
      } catch (error) {
        if (!active) return;

        setFeedback(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar o perfil.",
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, [user?.id]);

  // Atualizar campos do perfil.
  const handleProfileChange = (
    field: keyof ProfileFormData,
    value: string,
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFeedback("");
  };

  // Mostrar ou ocultar senhas.
  const togglePassword = (field: PasswordField) => {
    setVisiblePasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  // Selecionar avatar.
  const handleAvatarChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback("Selecione um arquivo de imagem válido.");
      event.target.value = "";
      return;
    }

    if (file.size > 500 * 1024) {
      setFeedback(
        "O avatar deve ter no máximo 500 KB.",
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
        setFeedback("");
      }
    };

    reader.onerror = () => {
      setFeedback(
        "Não foi possível carregar a imagem selecionada.",
      );
    };

    reader.readAsDataURL(file);
  };

  // Remover avatar.
  const handleRemoveAvatar = () => {
    setAvatar(null);
    setFeedback("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Salvar perfil no MSW.
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSaving || isLoading) return;

    setFeedback("");

    const wantsPasswordChange =
      Object.values(passwords).some(Boolean);

    if (wantsPasswordChange) {
      if (
        !passwords.current ||
        !passwords.new ||
        !passwords.confirm
      ) {
        setFeedback(
          "Preencha todos os campos para alterar a senha.",
        );
        return;
      }

      if (passwords.new !== passwords.confirm) {
        setFeedback(
          "A nova senha e a confirmação não coincidem.",
        );
        return;
      }

      if (passwords.new.length < 6) {
        setFeedback(
          "A nova senha deve ter pelo menos 6 caracteres.",
        );
        return;
      }
    }

    const payload: UpdateProfileData = {
      displayName: profile.displayName.trim(),
      username: profile.username.trim(),
      email: profile.email.trim(),
      ensName: profile.ensName.trim(),
      walletNickname: profile.walletNickname.trim(),
      avatar,

      ...(wantsPasswordChange
        ? {
            currentPassword: passwords.current,
            newPassword: passwords.new,
          }
        : {}),
    };

    setIsSaving(true);

    try {
      const updatedUser =
        await profileService.updateMe(payload);

      setProfile({
        displayName: updatedUser.displayName,
        username: updatedUser.username,
        email: updatedUser.email,
        ensName: updatedUser.ensName ?? "",
        walletNickname:
          updatedUser.walletNickname ?? "",
      });

      setAvatar(updatedUser.avatar);

      // Atualiza o AuthContext e o DesktopHeader.
      await refreshUser();

      // Limpa os campos de senha após salvar.
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      });

      setVisiblePasswords({
        current: false,
        new: false,
        confirm: false,
      });

      setFeedback(
        "Perfil atualizado com sucesso!",
      );
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o perfil.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="w-full font-mono text-[#F5F1EB]">
      <h1 className="mb-8 text-base font-bold">
        Perfil do colecionador
      </h1>

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={isLoading || isSaving}
          className="min-w-0 disabled:opacity-70"
        >
          <div className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2">
            {/* Nome de exibição */}
            <div>
              <label
                htmlFor="displayName"
                className={labelClass}
              >
                Nome de exibição
                <span className="text-primary">*</span>
              </label>

              <input
                id="displayName"
                name="displayName"
                value={profile.displayName}
                onChange={(event) =>
                  handleProfileChange(
                    "displayName",
                    event.target.value,
                  )
                }
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>

            {/* Nome de usuário */}
            <div>
              <label
                htmlFor="username"
                className={labelClass}
              >
                Nome de usuário
                <span className="text-primary">*</span>
              </label>

              <input
                id="username"
                name="username"
                value={profile.username}
                onChange={(event) =>
                  handleProfileChange(
                    "username",
                    event.target.value,
                  )
                }
                required
                autoComplete="username"
                className={inputClass}
              />
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className={labelClass}
              >
                E-mail
                <span className="text-primary">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={(event) =>
                  handleProfileChange(
                    "email",
                    event.target.value,
                  )
                }
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            {/* Nome ENS */}
            <div>
              <label
                htmlFor="ensName"
                className={labelClass}
              >
                Nome ENS
              </label>

              <div className="flex gap-2">
                <select
                  aria-label="Domínio ENS"
                  defaultValue=".eth"
                  className="h-10 rounded-sm border border-[#45271C] bg-transparent px-3 text-sm outline-none focus:border-primary"
                >
                  <option value=".eth">.eth</option>
                </select>

                <input
                  id="ensName"
                  name="ensName"
                  value={profile.ensName}
                  onChange={(event) =>
                    handleProfileChange(
                      "ensName",
                      event.target.value,
                    )
                  }
                  className={`${inputClass} min-w-0`}
                />
              </div>
            </div>

            {/* Apelido da carteira */}
            <div>
              <label
                htmlFor="walletNickname"
                className={labelClass}
              >
                Apelido da carteira
              </label>

              <input
                id="walletNickname"
                name="walletNickname"
                value={profile.walletNickname}
                onChange={(event) =>
                  handleProfileChange(
                    "walletNickname",
                    event.target.value,
                  )
                }
                className={inputClass}
              />
            </div>

            {/* Avatar */}
            <div>
              <span className={labelClass}>
                Avatar
              </span>

              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#45271C] bg-[#291914] text-primary">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar do usuário"
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
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="h-10 rounded-sm bg-primary px-6 text-sm font-bold text-[#140D0A]"
                >
                  Alterar
                </button>

                <button
                  type="button"
                  onClick={handleRemoveAvatar}
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
                <label
                  htmlFor={field}
                  className={labelClass}
                >
                  {label}
                </label>

                <div className="relative">
                  <input
                    id={field}
                    type={
                      visiblePasswords[field]
                        ? "text"
                        : "password"
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
                    minLength={
                      field === "new" ? 6 : undefined
                    }
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePassword(field)
                    }
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
        </fieldset>

        {/* Feedback */}
        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className="mt-5 text-sm text-primary"
          >
            {feedback}
          </p>
        )}

        {/* Salvar */}
        <button
          type="submit"
          disabled={isLoading || isSaving}
          className="mt-8 h-10 min-w-33 rounded-sm bg-primary px-8 text-sm font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading
            ? "Carregando..."
            : isSaving
              ? "Salvando..."
              : "Salvar"}
        </button>
      </form>
    </section>
  );
}
