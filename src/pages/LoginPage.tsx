import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth";

// Enkel login-sida som pratar med /login
export default function LoginPage() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // anropa backend
      const data = await api("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      // spara token i context/localStorage
      login(data.token, username);
      // gå till startsidan
      nav("/");
    } catch {
      setError("Fel användarnamn eller lösenord.");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "2rem auto" }}>
      <h1>Logga in</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Användarnamn
        <input value={username} onChange={(e) => setU(e.target.value)} />
      </label>
      <label>
        Lösenord
        <input
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />
      </label>
      <button type="submit">Logga in</button>
    </form>
  );
}
