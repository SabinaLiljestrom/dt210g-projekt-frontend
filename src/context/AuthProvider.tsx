import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// ---- Provider ----
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Läs in ev. sparad token vid sidladdning
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("username");
    if (t) setToken(t);
    if (u) setUsername(u);
  }, []);

  // Spara token + namn
  const login = (t: string, u?: string) => {
    setToken(t);
    setUsername(u ?? null);
    localStorage.setItem("token", t);
    if (u) localStorage.setItem("username", u);
  };

  // Ta bort token + namn
  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
