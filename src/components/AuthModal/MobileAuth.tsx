import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthMode = "login" | "register";

interface MobileAuthProps {
  initialMode?: AuthMode;
  onClose?: () => void;
}

export function MobileAuth({
  initialMode = "login",
}: MobileAuthProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [feedback, setFeedback] = useState("");

  const isRegister = mode === "register";

  const inputClass =
    "h-12 w-full rounded-xl border border-[#45271C] bg-transparent px-4 text-sm text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus:border-[#D18A4D]";

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      setFeedback("As senhas não coincidem.");
      return;
    }

    setFeedback(
      isRegister
        ? "Cadastro demonstrativo. Integração com backend pendente."
        : "Login demonstrativo. Integração com backend pendente.",
    );
  };

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-103.5 flex-col rounded-[40px] bg-[#140D0A] px-7 pt-30 pb-6 font-mono text-[#F5F1EB] lg:hidden">
      {/* Logo */}
      <div className="text-center">
        <span className="text-[32px] font-bold tracking-[0.12em]">
          KURIO
        </span>
      </div>

      {/* Título */}
      <h1 className="mt-20 text-center text-xl font-bold">
        {isRegister ? "Criar perfil de colecionador" : "Entrar"}
      </h1>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3"
      >
        {isRegister && (
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Nome de usuário"
            aria-label="Nome de usuário"
            autoComplete="username"
            required
            className={`${inputClass} text-center`}
          />
        )}

        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={
            isRegister
              ? "Digite seu e-mail"
              : "contato@email.com"
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
            placeholder={
              isRegister ? "Senha" : "************"
            }
            aria-label="Senha"
            autoComplete={
              isRegister ? "new-password" : "current-password"
            }
            minLength={6}
            required
            className={`${inputClass} pr-12 ${
              !isRegister ? "border-[#D18A4D]" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={
              showPassword ? "Ocultar senha" : "Mostrar senha"
            }
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8C5A36]"
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        </div>

        {/* Confirmar senha */}
        {isRegister && (
          <div className="relative">
            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirmar senha"
              aria-label="Confirmar senha"
              autoComplete="new-password"
              minLength={6}
              required
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((previous) => !previous)
              }
              aria-label={
                showConfirmPassword
                  ? "Ocultar confirmação de senha"
                  : "Mostrar confirmação de senha"
              }
              className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8C5A36]"
            >
              {showConfirmPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
        )}

        {/* Esqueceu a senha */}
        {!isRegister && (
          <button
            type="button"
            onClick={() =>
              setFeedback(
                "Recuperação de senha ainda não disponível.",
              )
            }
            className="self-end text-sm text-[#D18A4D] hover:underline"
          >
            Esqueceu a senha?
          </button>
        )}

        {/* Feedback */}
        {feedback && (
          <p
            role="status"
            className="text-center text-xs text-[#D18A4D]"
          >
            {feedback}
          </p>
        )}

        {/* Botão principal */}
        <button
          type="submit"
          className={`h-15 w-full rounded-xl bg-[#D18A4D] text-base font-bold text-[#140D0A] transition-opacity hover:opacity-90 ${
            isRegister ? "mt-7" : "mt-7"
          }`}
        >
          {isRegister ? "Criar perfil" : "Entrar"}
        </button>
      </form>

      {/* Separador */}
      <div className="mt-10 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#45271C]" />

        <span className="whitespace-nowrap text-xs">
          Ou continue com
        </span>

        <div className="h-px flex-1 bg-[#45271C]" />
      </div>

      {/* Login social */}
      <div className="mt-3 flex flex-col gap-4">
        <button
          type="button"
          onClick={() =>
            setFeedback("Login com Google ainda não disponível.")
          }
          className="flex h-10 items-center justify-center gap-3 rounded-md border border-[#45271C] text-sm text-[#CFB28C]"
        >
          <img
            src="/images/nfts/logotipo-google.png"
            alt=""
            className="h-5 w-5 object-contain"
          />
          Continuar com Google
        </button>

        <button
          type="button"
          onClick={() =>
            setFeedback("Login com Facebook ainda não disponível.")
          }
          className="flex h-10 items-center justify-center gap-3 rounded-md border border-[#45271C] text-sm text-[#CFB28C]"
        >
          <span className="text-xl font-bold text-[#4267B2]">
            f
          </span>
          Continuar com Facebook
        </button>
      </div>

      {/* Alternar Login / Cadastro */}
      <div className="mt-auto pt-10 text-center text-sm text-[#CFB28C]">
        {isRegister ? (
          <>
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => changeMode("login")}
              className="hover:text-primary"
            >
              Entre
            </button>
          </>
        ) : (
          <>
            Novo na Kurio?{" "}
            <button
              type="button"
              onClick={() => changeMode("register")}
              className="hover:text-primary"
            >
              Crie uma conta
            </button>
          </>
        )}
      </div>
    </section>
  );
}
