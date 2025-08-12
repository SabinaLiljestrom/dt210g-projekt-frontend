import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

// Komponent som skyddar sidor som kräver inloggning
export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { token } = useAuth(); // Hämta token
  return token ? children : <Navigate to="/login" replace />; // Om inte inloggad → gå till login
}
