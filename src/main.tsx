
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { queryClient } from "@/lib/queryClient";
import { router } from "@/router";

import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

import "./index.css";

// Inicializa o MSW apenas em desenvolvimento
async function enableMocking(): Promise<void> {
  if (!import.meta.env.DEV) {
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");

    await worker.start();

    console.info("MSW inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o MSW:", error);
  }
}

// Renderiza a aplicação
function renderApp(): void {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Elemento #root não encontrado.");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

// Aguarda o MSW antes de renderizar a aplicação
void enableMocking().then(renderApp);
