import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Enkel hook för att använda AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth måste användas inne i AuthProvider");
  }
  return ctx;
}