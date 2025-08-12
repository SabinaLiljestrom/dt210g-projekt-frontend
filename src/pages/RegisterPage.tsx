import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import woodTexture from "../assets/woodTexture.png";
import "./AuthForms.css";

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
      setTimeout(() => nav("/login"), 1000);
    } catch {
      setError("Kunde inte skapa konto (användarnamn upptaget?).");
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
        <form onSubmit={onSubmit} className="auth-form">
          <h1>Skapa konto</h1>
          {ok && <p className="success-message">{ok}</p>}
          {error && <p className="error-message">{error}</p>}
          <label>
            Användarnamn
            <input
              value={username}
              onChange={(e) => setU(e.target.value)}
              required
            />
          </label>
          <label>
            E-post
            <input
              type="email"
              value={email}
              onChange={(e) => setE(e.target.value)}
              required
            />
          </label>
          <label>
            Lösenord
            <input
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
              required
            />
          </label>
          <button type="submit">Skapa konto</button>
          <p className="auth-switch">
            Har du redan ett konto? <Link to="/login">Logga in här</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
