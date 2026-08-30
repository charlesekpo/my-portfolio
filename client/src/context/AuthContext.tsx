import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (
    token: string,
    user: User
  ) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children
}: AuthProviderProps) {
  const [token, setToken] =
    useState<string | null>(
      () =>
        localStorage.getItem(
          "admin_token"
        )
    );

  const [user, setUser] =
    useState<User | null>(() => {
      const stored =
        localStorage.getItem(
          "admin_user"
        );

      if (!stored) {
        return null;
      }

      try {
        return JSON.parse(stored) as User;
      } catch {
        localStorage.removeItem(
          "admin_user"
        );

        return null;
      }
    });

  function loginUser(
    newToken: string,
    newUser: User
  ) {
    localStorage.setItem(
      "admin_token",
      newToken
    );

    localStorage.setItem(
      "admin_user",
      JSON.stringify(newUser)
    );

    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_user"
    );

    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated:
        Boolean(token && user),
      loginUser,
      logout
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
