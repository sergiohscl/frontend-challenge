import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "register";

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFeedback("");

    if (mode === "register" && password !== confirmPassword) {
      setFeedback("As senhas não coincidem.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register({
          username: username.trim(),
          email: email.trim(),
          password,
          confirmPassword,
        });
      } else {
        await login({ email: email.trim(), password });
      }

      setPassword("");
      setConfirmPassword("");
      onClose();
      await navigate({ to: "/" });
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível autenticar. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-10 w-full rounded-md border border-[#45271C] bg-transparent px-4 text-sm text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus:border-[#D18A4D]";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative flex max-h-[95dvh] min-h-150 w-full max-w-125 flex-col overflow-y-auto border-b-10 border-[#D18A4D] bg-[#241612] px-5 pt-11 pb-14 font-mono text-[#F5F1EB] shadow-[0_0_20px_0_#0A060473] sm:px-20"
      >
        {/* Fechar */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-[#D18A4D] transition-opacity hover:opacity-70"
        >
          <X size={19} strokeWidth={1.5} />
        </button>

        {/* Abas */}
        <h2
          id="auth-modal-title"
          className="flex items-center justify-center gap-2 whitespace-nowrap text-xl font-bold"
        >
          <button
            type="button"
            onClick={() => changeMode("login")}
            disabled={isSubmitting}
            className={mode === "login" ? "text-[#D18A4D]" : "text-[#F5F1EB]"}
          >
            Entrar
          </button>

          <span>|</span>

          <button
            type="button"
            onClick={() => changeMode("register")}
            disabled={isSubmitting}
            className={
              mode === "register" ? "text-[#D18A4D]" : "text-[#F5F1EB]"
            }
          >
            Criar conta
          </button>
        </h2>

        {/* Descrição */}
        <p className="mt-9 text-center text-[13px] leading-4">
          {mode === "login"
            ? "Entre para gerenciar sua carteira, coleção e perfil de criador."
            : "Crie seu perfil de colecionador e conecte uma carteira quando quiser."}
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          {/* Nome de usuário: somente cadastro */}
          {mode === "register" && (
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Nome de usuário"
              aria-label="Nome de usuário"
              autoComplete="username"
              required
              className={inputClass}
            />
          )}

          {/* E-mail */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={
              mode === "register" ? "Digite seu e-mail" : "contato@email.com"
            }
            aria-label="E-mail"
            autoComplete="email"
            required
            className={inputClass}
          />

          {/* Senha */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "register" ? "Senha" : "************"}
              aria-label="Senha"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              minLength={mode === "register" ? 6 : undefined}
              required
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B39463]"
            >
              {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
            </button>
          </div>

          {/* Confirmar senha: somente cadastro */}
          {mode === "register" && (
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmar senha"
              aria-label="Confirmar senha"
              autoComplete="new-password"
              minLength={6}
              required
              className={inputClass}
            />
          )}

          {/* Recuperar senha: somente login */}
          {mode === "login" && (
            <button
              type="button"
              onClick={() =>
                setFeedback("Recuperação de senha ainda não disponível.")
              }
              className="self-end text-sm text-[#D18A4D] hover:underline"
            >
              Esqueceu a senha?
            </button>
          )}

          {/* Feedback */}
          {feedback && (
            <p
              role="alert"
              className="text-center text-xs leading-5 text-[#D18A4D]"
            >
              {feedback}
            </p>
          )}

          {/* Botão principal */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 h-11 w-full rounded-md bg-[#D18A4D] text-base font-bold text-[#140D0A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {/* Separador */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#45271C]" />

          <span className="whitespace-nowrap text-xs">Ou continue com</span>

          <div className="h-px flex-1 bg-[#45271C]" />
        </div>

        {/* Login social */}
        <div className="mt-3 flex flex-col gap-4">
          <button
            type="button"
            onClick={() =>
              setFeedback("Login com Google ainda não disponível.")
            }
            className="flex h-10 items-center justify-center gap-3 rounded-md border border-[#45271C] text-sm text-[#CFB28C] transition-colors hover:border-[#D18A4D]"
          >
            <img
              src="/images/nfts/logotipo-google.png"
              alt=""
              aria-hidden="true"
              className="h-9 w-9 shrink-0 object-contain"
            />

            <span>Continuar com Google</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setFeedback("Login com Facebook ainda não disponível.")
            }
            className="flex h-10 items-center justify-center gap-3 rounded-md border border-[#45271C] text-sm text-[#CFB28C] transition-colors hover:border-[#D18A4D]"
          >
            <span className="text-xl font-bold text-[#4267B2]">f</span>
            Continuar com Facebook
          </button>
        </div>
      </section>
    </div>
  );
}
