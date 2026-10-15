
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { queryClient } from "@/lib/queryClient";
import { router } from "@/router";

import "./index.css";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  await worker.start();
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(
      document.getElementById("root")!,
    ).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error("Erro ao inicializar a aplicação:", error);
  });
