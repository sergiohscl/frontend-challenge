import { http, HttpResponse } from "msw";

import initialUsers from "../data/users.json";

import type {
  AuthUser,
  LoginData,
  RegisterData,
  StoredSession,
  StoredUser,
} from "@/types/auth.types";

const USERS_STORAGE_KEY = "kurio-mock-users";
const SESSIONS_STORAGE_KEY = "kurio-mock-sessions";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

function getUsers(): StoredUser[] {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);

  if (stored !== null) {
    return readStorage<StoredUser[]>(USERS_STORAGE_KEY, []);
  }

  return initialUsers as StoredUser[];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getSessions(): StoredSession[] {
  return readStorage<StoredSession[]>(
    SESSIONS_STORAGE_KEY,
    [],
  );
}

function saveSessions(sessions: StoredSession[]) {
  localStorage.setItem(
    SESSIONS_STORAGE_KEY,
    JSON.stringify(sessions),
  );
}

function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    avatar: user.avatar,
    role: user.role,
    ensName: user.ensName,
    walletNickname: user.walletNickname,
  };
}

function getToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7);
}

function getAuthenticatedUser(request: Request): StoredUser | null {
  const token = getToken(request);

  if (!token) {
    return null;
  }

  const session = getSessions().find(
    (item) => item.token === token,
  );

  if (!session) {
    return null;
  }

  return (
    getUsers().find((user) => user.id === session.userId) ??
    null
  );
}

export const authHandlers = [
  // POST /api/auth/register
  http.post("/api/auth/register", async ({ request }) => {
    const data = (await request.json()) as RegisterData;

    const username = data.username?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (!username || !email || !password || !confirmPassword) {
      return HttpResponse.json(
        { message: "Preencha todos os campos obrigatórios." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return HttpResponse.json(
        { message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return HttpResponse.json(
        { message: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return HttpResponse.json(
        { message: "As senhas não coincidem." },
        { status: 400 },
      );
    }

    const users = getUsers();

    if (users.some((user) => user.email.toLowerCase() === email)) {
      return HttpResponse.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    if (
      users.some(
        (user) =>
          user.username.toLowerCase() === username.toLowerCase(),
      )
    ) {
      return HttpResponse.json(
        { message: "Este nome de usuário já está em uso." },
        { status: 409 },
      );
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      username,
      email,
      displayName: username,
      avatar: null,
      role: "collector",
      mockPassword: password,
    };

    users.push(user);
    saveUsers(users);

    const token = crypto.randomUUID();

    saveSessions([
      ...getSessions(),
      {
        token,
        userId: user.id,
      },
    ]);

    return HttpResponse.json(
      {
        user: toAuthUser(user),
        token,
      },
      { status: 201 },
    );
  }),

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const data = (await request.json()) as LoginData;

    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    if (!email || !password) {
      return HttpResponse.json(
        { message: "Informe e-mail e senha." },
        { status: 400 },
      );
    }

    const user = getUsers().find(
      (item) =>
        item.email.toLowerCase() === email &&
        item.mockPassword === password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    const token = crypto.randomUUID();

    saveSessions([
      ...getSessions(),
      {
        token,
        userId: user.id,
      },
    ]);

    return HttpResponse.json({
      user: toAuthUser(user),
      token,
    });
  }),

  // GET /api/auth/me
  http.get("/api/auth/me", ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        { message: "Sessão inválida ou não autenticada." },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user: toAuthUser(user),
    });
  }),

  // POST /api/auth/logout
  http.post("/api/auth/logout", ({ request }) => {
    const token = getToken(request);

    if (!token) {
      return HttpResponse.json(
        { message: "Token não informado." },
        { status: 401 },
      );
    }

    const sessions = getSessions();
    const sessionExists = sessions.some(
      (session) => session.token === token,
    );

    if (!sessionExists) {
      return HttpResponse.json(
        { message: "Sessão inválida." },
        { status: 401 },
      );
    }

    saveSessions(
      sessions.filter((session) => session.token !== token),
    );

    return HttpResponse.json({
      message: "Logout realizado com sucesso.",
    });
  }),
];
