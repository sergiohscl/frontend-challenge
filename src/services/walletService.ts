import { authService } from "@/services/authService";

import type {
  Wallet,
  CreateWalletData,
  UpdateWalletData,
  WalletListResponse,
  WalletResponse,
} from "@/types/wallet.types";

const API_URL = "/api/wallets";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = authService.getToken();

  if (!token) {
    throw new Error(
      "Faça login para gerenciar suas carteiras.",
    );
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ??
        "Não foi possível processar a solicitação.",
    );
  }

  return result as T;
}

export const walletService = {
  async getAll(): Promise<Wallet[]> {
    const result =
      await request<WalletListResponse>(API_URL);

    return result.wallets;
  },

  async create(
    data: CreateWalletData,
  ): Promise<Wallet> {
    const result = await request<WalletResponse>(
      API_URL,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return result.wallet;
  },

  async update(
    id: string,
    data: UpdateWalletData,
  ): Promise<Wallet> {
    const result = await request<WalletResponse>(
      `${API_URL}/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    return result.wallet;
  },

  async remove(id: string): Promise<void> {
    await request<{ message: string }>(
      `${API_URL}/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );
  },
};
