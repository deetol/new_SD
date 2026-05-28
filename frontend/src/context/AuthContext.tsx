"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginApi, logoutApi, getMeApi, type User } from "@/lib/api";
import { getToken, removeToken, setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  // Restore session dari cookie saat pertama load
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setState({ user: null, token: null, isLoading: false });
      return;
    }

    getMeApi(token)
      .then((user) => setState({ user, token, isLoading: false }))
      .catch(() => {
        removeToken();
        setState({ user: null, token: null, isLoading: false });
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await loginApi(email, password);
    setToken(token);
    setState({ user, token, isLoading: false });
    router.push("/admin");
  }, [router]);

  const logout = useCallback(async () => {
    const token = state.token ?? getToken();
    if (token) await logoutApi(token).catch(() => {});
    removeToken();
    setState({ user: null, token: null, isLoading: false });
    router.push("/admin/login");
  }, [state.token, router]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
