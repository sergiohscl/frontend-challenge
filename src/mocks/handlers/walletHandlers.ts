
import { http, HttpResponse } from "msw";

import type {
  Wallet,
  WalletFormData,
} from "@/types/wallet.types";

import type {
  StoredSession,
  StoredUser,
} from "@/types/auth.types";

const WALLETS_KEY = "kurio-mock-wallets";
const USERS_KEY = "kurio-mock-users";
const SESSIONS_KEY = "kurio-mock-sessions";

const networks = [
  "ethereum",
  "polygon",
  "base",
];

const walletTypes = [
  "metamask",
  "walletconnect",
  "coinbase",
];

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

function readStorage<T>(
  key: string,
  fallback: T,
): T {
  try {
    const stored = localStorage.getItem(key);

    return stored
      ? (JSON.parse(stored) as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function getWallets(): Wallet[] {
  return readStorage<Wallet[]>(
    WALLETS_KEY,
    [],
  );
}

function saveWallets(wallets: Wallet[]): boolean {
  try {
    localStorage.setItem(
      WALLETS_KEY,
      JSON.stringify(wallets),
    );

    return true;
  } catch {
    return false;
  }
}

function getAuthenticatedUser(
  request: Request,
): StoredUser | null {
  const authorization =
    request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();

  const sessions = readStorage<StoredSession[]>(
    SESSIONS_KEY,
    [],
  );

  const session = sessions.find(
    (item) => item.token === token,
  );

  if (!session) {
    return null;
  }

  const users = readStorage<StoredUser[]>(
    USERS_KEY,
    [],
  );

  return (
    users.find(
      (item) => item.id === session.userId,
    ) ?? null
  );
}

function validateWallet(
  data: unknown,
): string | null {
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return "Dados da carteira inválidos.";
  }

  const wallet = data as Record<string, unknown>;

  const requiredFields = [
    "displayName",
    "walletNickname",
    "network",
    "profileName",
    "walletAddress",
    "walletType",
    "referralCode",
    "email",
    "ensName",
  ];

  for (const field of requiredFields) {
    if (
      typeof wallet[field] !== "string" ||
      !(wallet[field] as string).trim()
    ) {
      return "Preencha todos os campos obrigatórios.";
    }
  }

  if (
    !networks.includes(wallet.network as string)
  ) {
    return "Selecione uma rede válida.";
  }

  if (
    !walletTypes.includes(wallet.walletType as string)
  ) {
    return "Selecione um tipo de carteira válido.";
  }

  if (
    !ADDRESS_REGEX.test(
      wallet.walletAddress as string,
    )
  ) {
    return "Informe um endereço de carteira válido (0x + 40 caracteres hexadecimais).";
  }

  if (
    wallet.secondaryAddress !== undefined &&
    typeof wallet.secondaryAddress !== "string"
  ) {
    return "Endereço secundário inválido.";
  }

  if (
    wallet.sameAsPrimary !== undefined &&
    typeof wallet.sameAsPrimary !== "boolean"
  ) {
    return "Opção de carteira secundária inválida.";
  }

  if (
    wallet.secondaryAddress &&
    !wallet.sameAsPrimary &&
    !ADDRESS_REGEX.test(
      wallet.secondaryAddress as string,
    ) &&
    !/^[a-z0-9-]+\.eth$/i.test(
      wallet.secondaryAddress as string,
    )
  ) {
    return "Endereço secundário ou ENS inválido.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      wallet.email as string,
    )
  ) {
    return "Informe um e-mail válido.";
  }

  return null;
}

function normalizeWallet(
  data: WalletFormData,
): WalletFormData {
  return {
    displayName: data.displayName.trim(),
    walletNickname: data.walletNickname.trim(),
    network: data.network,
    profileName: data.profileName.trim(),
    walletAddress: data.walletAddress.trim(),
    secondaryAddress: data.sameAsPrimary
      ? data.walletAddress.trim()
      : (data.secondaryAddress ?? "").trim(),
    walletType: data.walletType,
    referralCode: data.referralCode.trim(),
    email: data.email.trim().toLowerCase(),
    ensName: data.ensName.trim(),
    sameAsPrimary: Boolean(data.sameAsPrimary),
  };
}

export const walletHandlers = [
  // GET /api/wallets
  http.get("/api/wallets", ({ request }) => {

    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        { message: "Sessão inválida." },
        { status: 401 },
      );
    }

    const wallets = getWallets().filter(
      (wallet) => wallet.userId === user.id,
    );

    return HttpResponse.json({ wallets });
  }),

  // POST /api/wallets
  http.post(
    "/api/wallets",
    async ({ request }) => {
      const user = getAuthenticatedUser(request);

      if (!user) {
        return HttpResponse.json(
          { message: "Sessão inválida." },
          { status: 401 },
        );
      }

      let data: WalletFormData;

      try {
        data =
          (await request.json()) as WalletFormData;
      } catch {
        return HttpResponse.json(
          { message: "JSON inválido." },
          { status: 400 },
        );
      }

      const error = validateWallet(data);

      if (error) {
        return HttpResponse.json(
          { message: error },
          { status: 400 },
        );
      }

      const normalized = normalizeWallet(data);
      const wallets = getWallets();

      const duplicate = wallets.some(
        (item) =>
          item.userId === user.id &&
          item.network === normalized.network &&
          item.walletAddress.toLowerCase() ===
            normalized.walletAddress.toLowerCase(),
      );

      if (duplicate) {
        return HttpResponse.json(
          {
            message:
              "Esta carteira já está cadastrada nesta rede.",
          },
          { status: 409 },
        );
      }

      const now = new Date().toISOString();

      const wallet: Wallet = {
        ...normalized,
        id: crypto.randomUUID(),
        userId: user.id,
        createdAt: now,
        updatedAt: now,
      };

      if (!saveWallets([...wallets, wallet])) {
        return HttpResponse.json(
          {
            message:
              "Não foi possível armazenar a carteira.",
          },
          { status: 507 },
        );
      }

      return HttpResponse.json(
        { wallet },
        { status: 201 },
      );
    },
  ),

  // PATCH /api/wallets/:id
  http.patch(
    "/api/wallets/:id",
    async ({ request, params }) => {
      const user = getAuthenticatedUser(request);

      if (!user) {
        return HttpResponse.json(
          { message: "Sessão inválida." },
          { status: 401 },
        );
      }

      const wallets = getWallets();

      const current = wallets.find(
        (item) =>
          item.id === params.id &&
          item.userId === user.id,
      );

      if (!current) {
        return HttpResponse.json(
          { message: "Carteira não encontrada." },
          { status: 404 },
        );
      }

      let changes: Partial<WalletFormData>;

      try {
        const body: unknown = await request.json();

        if (
          !body ||
          typeof body !== "object" ||
          Array.isArray(body)
        ) {
          return HttpResponse.json(
            { message: "Dados inválidos." },
            { status: 400 },
          );
        }

        changes = body as Partial<WalletFormData>;
      } catch {
        return HttpResponse.json(
          { message: "JSON inválido." },
          { status: 400 },
        );
      }

      const data = {
        displayName:
          changes.displayName ?? current.displayName,
        walletNickname:
          changes.walletNickname ??
          current.walletNickname,
        network:
          changes.network ?? current.network,
        profileName:
          changes.profileName ?? current.profileName,
        walletAddress:
          changes.walletAddress ??
          current.walletAddress,
        secondaryAddress:
          changes.secondaryAddress ??
          current.secondaryAddress,
        walletType:
          changes.walletType ?? current.walletType,
        referralCode:
          changes.referralCode ??
          current.referralCode,
        email:
          changes.email ?? current.email,
        ensName:
          changes.ensName ?? current.ensName,
        sameAsPrimary:
          changes.sameAsPrimary ??
          current.sameAsPrimary,
      };

      const error = validateWallet(data);

      if (error) {
        return HttpResponse.json(
          { message: error },
          { status: 400 },
        );
      }

      const normalized = normalizeWallet(data);

      const duplicate = wallets.some(
        (item) =>
          item.id !== current.id &&
          item.userId === user.id &&
          item.network === normalized.network &&
          item.walletAddress.toLowerCase() ===
            normalized.walletAddress.toLowerCase(),
      );

      if (duplicate) {
        return HttpResponse.json(
          {
            message:
              "Esta carteira já está cadastrada nesta rede.",
          },
          { status: 409 },
        );
      }

      const updated: Wallet = {
        ...current,
        ...normalized,
        updatedAt: new Date().toISOString(),
      };

      if (
        !saveWallets(
          wallets.map((item) =>
            item.id === current.id
              ? updated
              : item,
          ),
        )
      ) {
        return HttpResponse.json(
          {
            message:
              "Não foi possível atualizar a carteira.",
          },
          { status: 507 },
        );
      }

      return HttpResponse.json({
        wallet: updated,
      });
    },
  ),

  // DELETE /api/wallets/:id
  http.delete(
    "/api/wallets/:id",
    ({ request, params }) => {
      const user = getAuthenticatedUser(request);

      if (!user) {
        return HttpResponse.json(
          { message: "Sessão inválida." },
          { status: 401 },
        );
      }

      const wallets = getWallets();

      const walletExists = wallets.some(
        (item) =>
          item.id === params.id &&
          item.userId === user.id,
      );

      if (!walletExists) {
        return HttpResponse.json(
          { message: "Carteira não encontrada." },
          { status: 404 },
        );
      }

      const remaining = wallets.filter(
        (item) =>
          !(
            item.id === params.id &&
            item.userId === user.id
          ),
      );

      if (!saveWallets(remaining)) {
        return HttpResponse.json(
          {
            message:
              "Não foi possível remover a carteira.",
          },
          { status: 507 },
        );
      }

      return HttpResponse.json({
        message: "Carteira removida com sucesso.",
      });
    },
  ),
];
