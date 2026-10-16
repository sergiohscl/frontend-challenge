import type {
  AuthResponse,
  AuthUser,
  LoginData,
  RegisterData,
} from "@/types/auth.types";

const API_URL = "/api/auth";

const TOKEN_KEY = "kurio-token";
const USER_KEY = "kurio-user";

interface MeResponse {
  user: AuthUser;
}

async function handleResponse<T>(
  response: Response,
): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? "Erro ao processar a solicitação.",
    );
  }

  return response.json() as Promise<T>;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse<AuthResponse>(response);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse<AuthResponse>(response);
  },

  async getMe(token: string): Promise<AuthUser> {
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await handleResponse<MeResponse>(response);

    return result.user;
  },

  async logout(token: string): Promise<void> {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await handleResponse<{ message: string }>(response);
  },

  saveSession(data: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredUser(): AuthUser | null {
    try {
      const stored = localStorage.getItem(USER_KEY);

      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
