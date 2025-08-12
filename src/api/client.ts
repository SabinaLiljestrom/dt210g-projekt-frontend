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
  
    // Om fel → kasta fel
    if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  
    // Returnera svaret som JSON
    return res.json();
  }
  