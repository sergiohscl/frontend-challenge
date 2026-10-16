import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService } from "@/services/authService";

import type {
  AuthUser,
  LoginData,
  RegisterData,
  AuthResponse,
} from "@/types/auth.types";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applySession = useCallback(
    (data: AuthResponse) => {
      authService.saveSession(data);
      setUser(data.user);
    },
    [],
  );

  const refreshUser = useCallback(async () => {
    const token = authService.getToken();

    if (!token) {
      authService.clearSession();
      setUser(null);
      return;
    }

    try {
      const authenticatedUser =
        await authService.getMe(token);

      authService.saveSession({
        token,
        user: authenticatedUser,
      });

      setUser(authenticatedUser);
    } catch {
      authService.clearSession();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const token = authService.getToken();

      if (!token) {
        authService.clearSession();

        if (active) {
          setUser(null);
          setIsLoading(false);
        }

        return;
      }

      try {
        const authenticatedUser =
          await authService.getMe(token);

        if (!active) return;

        authService.saveSession({
          token,
          user: authenticatedUser,
        });

        setUser(authenticatedUser);
      } catch {
        if (!active) return;

        authService.clearSession();
        setUser(null);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(
    async (data: LoginData) => {
      const response = await authService.login(data);

      applySession(response);
    },
    [applySession],
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const response = await authService.register(data);

      applySession(response);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    const token = authService.getToken();

    try {
      if (token) {
        await authService.logout(token);
      }
    } finally {
      authService.clearSession();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
