export type UserRole = "collector" | "creator";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string | null;
  role: UserRole;
  ensName?: string;
  walletNickname?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface ApiError {
  message: string;
}

export interface StoredUser extends AuthUser { 
  mockPassword?: string;
}

export interface StoredSession {
  token: string;
  userId: string;
}
