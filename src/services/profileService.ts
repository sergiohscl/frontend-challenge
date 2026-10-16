import { authService } from "@/services/authService";
import type { AuthUser } from "@/types/auth.types";
import type { UpdateProfileData } from "@/types/profile.types";

const API_URL = "/api/users/me";

async function request<T>(
  method: "GET" | "PATCH",
  data?: UpdateProfileData,
): Promise<T> {
  const token = authService.getToken();

  if (!token) {
    throw new Error("Faça login para acessar seu perfil.");
  }

  const response = await fetch(API_URL, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(data ? { "Content-Type": "application/json" } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ?? "Não foi possível atualizar o perfil.",
    );
  }

  return result as T;
}

export const profileService = {
  async getMe(): Promise<AuthUser> {
    const result = await request<{ user: AuthUser }>("GET");
    return result.user;
  },

  async updateMe(data: UpdateProfileData): Promise<AuthUser> {
    const result = await request<{ user: AuthUser }>(
      "PATCH",
      data,
    );

    return result.user;
  },
};
