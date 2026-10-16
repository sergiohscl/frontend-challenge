import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

interface UserMenuProps {
  variant?: "desktop" | "mobile";
  onClose?: () => void;
}

export function UserMenu({
  variant = "desktop",
  onClose,
}: UserMenuProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setError("");

    try {
      await logout();
    } catch {
        setError("Erro ao sair. Tente novamente.");      
    } finally {
      setIsLoggingOut(false);
    }

    onClose?.();
    await navigate({ to: "/" });
  };

  return (
    <div className="w-full bg-[#241612] p-4 font-mono text-[#F5F1EB]">
      <div className="flex items-center gap-3 border-b border-[#45271C] pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#45271C] text-[#D18A4D]">
          <UserRound size={22} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold">
            {user.displayName}
          </p>

          <p className="truncate text-xs text-[#CFB28C]">
            {user.email}
          </p>
        </div>
      </div>

      {variant === "desktop" && (
        <button
          type="button"
          onClick={() => {
            onClose?.();
            void navigate({ to: "/profile" });
          }}
          className="mt-3 flex w-full items-center gap-3 rounded-md px-2 py-3 text-left text-sm text-[#D18A4D] hover:bg-[#291914]"
        >
          <UserRound size={18} />
          Meu perfil
        </button>
      )}

      <button
        type="button"
        onClick={() => void handleLogout()}
        disabled={isLoggingOut}
        className="mt-2 flex w-full items-center gap-3 rounded-md px-2 py-3 text-left text-sm text-[#D18A4D] hover:bg-[#291914] disabled:opacity-50"
      >
        <LogOut size={18} />
        {isLoggingOut ? "Saindo..." : "Sair"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
