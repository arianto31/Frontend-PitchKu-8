"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as authApi from "@/lib/api/auth";
import { clearToken, getToken, setToken } from "@/lib/api/token";
import { ApiRequestError } from "@/lib/api/types";

type AuthUser = { id: string; email: string };

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    fullName: string,
    companyName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Effect (bukan lazy initializer) sengaja dipakai: localStorage tidak
    // tersedia saat render server, jadi tidak bisa dibaca sinkron di
    // initial state tanpa memicu hydration mismatch. Restore setelah
    // mount adalah cara aman standar untuk kasus ini.
    const token = getToken();
    const savedEmail = window.localStorage.getItem("pitchku_user_email");
    if (token && savedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ id: "", email: savedEmail });
    }
    setIsLoading(false);
  }, []);

  const persistSession = useCallback((session: authApi.AuthSession) => {
    setToken(session.accessToken);
    window.localStorage.setItem("pitchku_user_email", session.email);
    setUser({ id: session.userId, email: session.email });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const session = await authApi.login(email, password);
      persistSession(session);
    },
    [persistSession],
  );

  const signup = useCallback(
    async (email: string, password: string, fullName: string, companyName: string) => {
      const session = await authApi.signup(email, password);
      persistSession(session);
      await authApi.syncProfile(fullName, companyName);
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      if (!(error instanceof ApiRequestError)) throw error;
    } finally {
      clearToken();
      window.localStorage.removeItem("pitchku_user_email");
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
