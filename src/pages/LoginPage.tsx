import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import woodTexture from "../assets/woodTexture.png";
import ErrorBanner from "../components/ErrorBanner";
import "./AuthForms.css";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });

      login(data.token, identifier);
      nav("/");
    } catch {
      setError("Fel användarnamn/e-post eller lösenord.");
    } finally {
      setLoading(false);
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
        {error && <ErrorBanner message={error} />}

        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Användarnamn eller e-post
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="sabina eller sabina@exempel.se"
              required
            />
          </label>

          <label>
            Lösenord
            <input
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Loggar in…" : "Logga in"}
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Har du inget konto? <Link to="/register">Registrera dig</Link>
        </p>
      </div>
    </div>
  );
}
