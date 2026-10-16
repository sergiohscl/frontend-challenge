import { http, HttpResponse } from "msw";

import initialUsers from "../data/users.json";

import type {
  AuthUser,
  LoginData,
  RegisterData,
  StoredSession,
  StoredUser,
} from "@/types/auth.types";

import type { UpdateProfileData } from "@/types/profile.types";

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

function saveUsers(users: StoredUser[]): boolean {
  try {
    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(users),
    );

    return true;
  } catch {
    return false;
  }
}

function getSessions(): StoredSession[] {
  return readStorage<StoredSession[]>(
    SESSIONS_STORAGE_KEY,
    [],
  );
}

function saveSessions(sessions: StoredSession[]): boolean {
  try {
    localStorage.setItem(
      SESSIONS_STORAGE_KEY,
      JSON.stringify(sessions),
    );

    return true;
  } catch {
    return false;
  }
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
  const authorization =
    request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice(7).trim() || null;
}

function getAuthenticatedUser(
  request: Request,
): StoredUser | null {
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
    getUsers().find(
      (user) => user.id === session.userId,
    ) ?? null
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAvatar(
  avatar: unknown,
): avatar is string | null {
  if (avatar === null) {
    return true;
  }

  if (typeof avatar !== "string") {
    return false;
  }

  if (
    !/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(
      avatar,
    )
  ) {
    return false;
  }

  // Limite aproximado de 500 KB em Base64.
  return avatar.length <= 700_000;
}

export const authHandlers = [
  // =====================================================
  // POST /api/auth/register
  // =====================================================
  http.post("/api/auth/register", async ({ request }) => {
    const data = (await request.json()) as RegisterData;

    const username = data.username?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return HttpResponse.json(
        {
          message:
            "Preencha todos os campos obrigatórios.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return HttpResponse.json(
        { message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return HttpResponse.json(
        {
          message:
            "A senha deve ter pelo menos 6 caracteres.",
        },
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

    if (
      users.some(
        (user) =>
          user.email.toLowerCase() === email,
      )
    ) {
      return HttpResponse.json(
        {
          message: "Este e-mail já está cadastrado.",
        },
        { status: 409 },
      );
    }

    if (
      users.some(
        (user) =>
          user.username.toLowerCase() ===
          username.toLowerCase(),
      )
    ) {
      return HttpResponse.json(
        {
          message:
            "Este nome de usuário já está em uso.",
        },
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

    const updatedUsers = [...users, user];

    if (!saveUsers(updatedUsers)) {
      return HttpResponse.json(
        {
          message:
            "Não foi possível salvar o cadastro.",
        },
        { status: 507 },
      );
    }

    const token = crypto.randomUUID();

    const updatedSessions = [
      ...getSessions(),
      {
        token,
        userId: user.id,
      },
    ];

    if (!saveSessions(updatedSessions)) {
      return HttpResponse.json(
        {
          message:
            "Cadastro criado, mas não foi possível iniciar a sessão. Tente fazer login.",
        },
        { status: 507 },
      );
    }

    return HttpResponse.json(
      {
        user: toAuthUser(user),
        token,
      },
      { status: 201 },
    );
  }),

  // =====================================================
  // POST /api/auth/login
  // =====================================================
  http.post("/api/auth/login", async ({ request }) => {
    const data = (await request.json()) as LoginData;

    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    if (!email || !password) {
      return HttpResponse.json(
        {
          message: "Informe e-mail e senha.",
        },
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
        {
          message: "E-mail ou senha inválidos.",
        },
        { status: 401 },
      );
    }

    const token = crypto.randomUUID();

    const updatedSessions = [
      ...getSessions(),
      {
        token,
        userId: user.id,
      },
    ];

    if (!saveSessions(updatedSessions)) {
      return HttpResponse.json(
        {
          message:
            "Não foi possível iniciar a sessão.",
        },
        { status: 507 },
      );
    }

    return HttpResponse.json({
      user: toAuthUser(user),
      token,
    });
  }),

  // =====================================================
  // GET /api/auth/me
  // =====================================================
  http.get("/api/auth/me", ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        {
          message:
            "Sessão inválida ou não autenticada.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user: toAuthUser(user),
    });
  }),

  // =====================================================
  // POST /api/auth/logout
  // =====================================================
  http.post("/api/auth/logout", ({ request }) => {
    const token = getToken(request);

    if (!token) {
      return HttpResponse.json(
        {
          message: "Token não informado.",
        },
        { status: 401 },
      );
    }

    const sessions = getSessions();

    const sessionExists = sessions.some(
      (session) => session.token === token,
    );

    if (!sessionExists) {
      return HttpResponse.json(
        {
          message: "Sessão inválida.",
        },
        { status: 401 },
      );
    }

    const remainingSessions = sessions.filter(
      (session) => session.token !== token,
    );

    if (!saveSessions(remainingSessions)) {
      return HttpResponse.json(
        {
          message:
            "Não foi possível encerrar a sessão.",
        },
        { status: 507 },
      );
    }

    return HttpResponse.json({
      message: "Logout realizado com sucesso.",
    });
  }),

  // =====================================================
  // GET /api/users/me
  // =====================================================
  http.get("/api/users/me", ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        {
          message:
            "Sessão inválida ou não autenticada.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user: toAuthUser(user),
    });
  }),

  // =====================================================
  // PATCH /api/users/me
  // =====================================================
  http.patch("/api/users/me", async ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        {
          message:
            "Sessão inválida ou não autenticada.",
        },
        { status: 401 },
      );
    }

    let data: Partial<UpdateProfileData>;

    try {
      const body: unknown = await request.json();

      if (
        body === null ||
        typeof body !== "object" ||
        Array.isArray(body)
      ) {
        return HttpResponse.json(
          { message: "Dados do perfil inválidos." },
          { status: 400 },
        );
      }

      data = body as Partial<UpdateProfileData>;
    } catch {
      return HttpResponse.json(
        { message: "JSON inválido." },
        { status: 400 },
      );
    }

    if (
      (data.displayName !== undefined &&
        typeof data.displayName !== "string") ||
      (data.username !== undefined &&
        typeof data.username !== "string") ||
      (data.email !== undefined &&
        typeof data.email !== "string") ||
      (data.ensName !== undefined &&
        typeof data.ensName !== "string") ||
      (data.walletNickname !== undefined &&
        typeof data.walletNickname !== "string") ||
      (data.currentPassword !== undefined &&
        typeof data.currentPassword !== "string") ||
      (data.newPassword !== undefined &&
        typeof data.newPassword !== "string")
    ) {
      return HttpResponse.json(
        { message: "Dados do perfil inválidos." },
        { status: 400 },
      );
    }

    const displayName =
      data.displayName?.trim() ?? user.displayName;

    const username =
      data.username?.trim() ?? user.username;

    const email =
      data.email?.trim().toLowerCase() ?? user.email;

    if (!displayName || !username || !email) {
      return HttpResponse.json(
        {
          message:
            "Preencha os campos obrigatórios.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return HttpResponse.json(
        {
          message: "Informe um e-mail válido.",
        },
        { status: 400 },
      );
    }

    const users = getUsers();

    // Verificar e-mail duplicado.
    if (
      users.some(
        (item) =>
          item.id !== user.id &&
          item.email.toLowerCase() === email,
      )
    ) {
      return HttpResponse.json(
        {
          message: "Este e-mail já está cadastrado.",
        },
        { status: 409 },
      );
    }

    // Verificar nome de usuário duplicado.
    if (
      users.some(
        (item) =>
          item.id !== user.id &&
          item.username.toLowerCase() ===
            username.toLowerCase(),
      )
    ) {
      return HttpResponse.json(
        {
          message:
            "Este nome de usuário já está em uso.",
        },
        { status: 409 },
      );
    }

    // Validar avatar, quando enviado.
    if (
      data.avatar !== undefined &&
      !isValidAvatar(data.avatar)
    ) {
      return HttpResponse.json(
        {
          message:
            "Avatar inválido. Utilize PNG, JPEG, WEBP ou GIF de até 500 KB.",
        },
        { status: 400 },
      );
    }

    // Validar alteração de senha.
    if (data.newPassword !== undefined) {
      if (!data.currentPassword) {
        return HttpResponse.json(
          {
            message: "Informe a senha atual.",
          },
          { status: 400 },
        );
      }

      if (
        user.mockPassword !== data.currentPassword
      ) {
        return HttpResponse.json(
          {
            message: "Senha atual incorreta.",
          },
          { status: 400 },
        );
      }

      if (data.newPassword.length < 6) {
        return HttpResponse.json(
          {
            message:
              "A nova senha deve ter pelo menos 6 caracteres.",
          },
          { status: 400 },
        );
      }
    } else if (data.currentPassword !== undefined) {
      return HttpResponse.json(
        {
          message: "Informe a nova senha.",
        },
        { status: 400 },
      );
    }

    // Atualizar apenas os campos enviados.
    const updatedUser: StoredUser = {
      ...user,
      displayName,
      username,
      email,
      ensName:
        data.ensName === undefined
          ? user.ensName
          : data.ensName.trim() || undefined,
      walletNickname:
        data.walletNickname === undefined
          ? user.walletNickname
          : data.walletNickname.trim() || undefined,
      avatar:
        data.avatar === undefined
          ? user.avatar
          : data.avatar,
      mockPassword:
        data.newPassword ?? user.mockPassword,
    };

    const updatedUsers = users.map((item) =>
      item.id === user.id ? updatedUser : item,
    );

    if (!saveUsers(updatedUsers)) {
      return HttpResponse.json(
        {
          message:
            "Não foi possível salvar o perfil. Verifique o espaço disponível no navegador.",
        },
        { status: 507 },
      );
    }

    return HttpResponse.json({
      user: toAuthUser(updatedUser),
    });
  }),
];
