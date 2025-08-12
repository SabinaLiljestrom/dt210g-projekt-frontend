import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

// Enkel registrering som pratar med /register
export default function RegisterPage() {
  const [username, setU] = useState("");
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      await api("/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      setOk("Konto skapat! Du kan logga in nu.");
      setTimeout(() => nav("/login"), 800);
    } catch {
      setError("Kunde inte skapa konto (användarnamn upptaget?).");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "2rem auto" }}>
      <h1>Skapa konto</h1>
      {ok && <p style={{ color: "green" }}>{ok}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Användarnamn
        <input value={username} onChange={(e) => setU(e.target.value)} />
      </label>
      <label>
        E-post
        <input
          type="email"
          value={email}
          onChange={(e) => setE(e.target.value)}
        />
      </label>
      <label>
        Lösenord
        <input
          type="password"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />
      </label>
      <button type="submit">Skapa konto</button>
    </form>
  );
}
