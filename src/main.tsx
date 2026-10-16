import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { queryClient } from "@/lib/queryClient";
import { router } from "@/router";
import { CartProvider } from "@/contexts/CartContext";

import "./index.css";

async function enableMocking(): Promise<void> {
  if (!import.meta.env.DEV) {
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");

    await worker.start();
  } catch (error) {
    console.error("Erro ao inicializar o MSW:", error);
  }
}

function renderApp(): void {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Elemento #root não encontrado.");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

void enableMocking().then(renderApp);
