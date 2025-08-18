// Enkel funktion för att prata med backend-API:t
export async function api(path: string, options: RequestInit = {}) {
    const base = "http://localhost:3018"; // Backend-url
    const token = localStorage.getItem("token"); // Token om användaren är inloggad
  
    // Lägg till headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Lägg till token om den finns
    };
  
    // Skicka request till backend
    const res = await fetch(base + path, { ...options, headers });
    if (!res.ok) {
      // Fånga 401 med utgången token
      if (res.status === 401) {
        const text = await res.text().catch(() => "");
        if (text.includes("Expired token")) {
          // rensa lokalt och skicka till login med orsak
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "/login?reason=expired";
          return Promise.reject(new Error("Expired token"));
        }
      }
      throw new Error((await res.text().catch(() => res.statusText)) || "Error");
    }
  
    return res.json();
  }