
import { Navigate, Outlet } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#140D0A]">
        <div className="flex flex-col items-center gap-4 text-[#D18A4D]">
          <LoaderCircle size={36} className="animate-spin" />

          <p className="font-mono text-sm">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
