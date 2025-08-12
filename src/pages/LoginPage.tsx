import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import woodTexture from "../assets/woodTexture.png";
import "./AuthForms.css";

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
      const data = await api("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      login(data.token, username);
      nav("/");
    } catch {
      setError("Fel användarnamn eller lösenord.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="auth-form-container">
        <h2>Logga in</h2>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Användarnamn
            <input
              value={username}
              onChange={(e) => setU(e.target.value)}
              placeholder="Ditt användarnamn"
            />
          </label>

          <label>
            Lösenord
            <input
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button type="submit">Logga in</button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Har du inget konto? <Link to="/register">Registrera dig</Link>
        </p>
      </div>
    </div>
  );
}
