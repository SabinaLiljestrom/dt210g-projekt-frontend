// src/context/AuthContext.tsx
import { createContext } from "react";

// ---- Typer ----
type AuthState = {
  token: string | null; // JWT-token
  username: string | null; // Visningsnamn/användarnamn
};

export type AuthCtx = AuthState & {
  login: (token: string, username?: string) => void;
  logout: () => void;
};

// ---- Context ----
export const AuthContext = createContext<AuthCtx | undefined>(undefined);
