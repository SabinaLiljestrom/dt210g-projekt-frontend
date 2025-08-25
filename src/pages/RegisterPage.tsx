import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { Eye, EyeOff } from "lucide-react";
import woodTexture from "../assets/woodTexture.png";
import ErrorBanner from "../components/ErrorBanner";
import Loading from "../components/Loading";
import "./AuthForms.css";

export default function RegisterPage() {
  const [username, setU] = useState("");
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [confirmPassword, setCP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      setLoading(true);
      await api("/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      setSuccess("Konto skapat! Du kan logga in nu.");
      setTimeout(() => nav("/login"), 1500);
    } catch (err: any) {
      if (err?.status === 400 || err?.status === 409) {
        setError(err.message);
      } else {
        setError(err?.message || "Serverfel – försök igen senare.");
      }
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
        <form onSubmit={onSubmit} className="auth-form">
          <h1>Skapa konto</h1>

          {error && <ErrorBanner message={error} />}
          {loading && <Loading />}
          {success && <p className="success-message">{success}</p>}

          <label className="input-label">
            Användarnamn
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setU(e.target.value);
                if (error) setError(""); // rensa fel så fort man börjar skriva igen
              }}
              required
            />
          </label>

          <label className="input-label">
            E-post
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setE(e.target.value);
                if (error) setError("");
              }}
              required
            />
          </label>

          <label className="input-label" style={{ position: "relative" }}>
            Lösenord
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setP(e.target.value);
                if (error) setError("");
              }}
              required
              style={{ paddingRight: "2rem" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#444",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </label>

          <label className="input-label" style={{ position: "relative" }}>
            Bekräfta lösenord
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setCP(e.target.value)}
              required
              style={{ paddingRight: "2rem" }}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#444",
              }}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </label>

          <button type="submit" disabled={loading}>
            Skapa konto
          </button>

          <p className="auth-switch">
            Har du redan ett konto? <Link to="/login">Logga in här</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
