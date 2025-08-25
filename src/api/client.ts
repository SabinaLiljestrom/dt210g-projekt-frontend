// Enkel funktion för att prata med backend-API:t
class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

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

  // Hjälpfunktion för att läsa svar som JSON eller text
  const readPayload = async () => {
    const ct = res.headers.get("content-type") || "";
    try {
      if (ct.includes("application/json")) return await res.json();
      const text = await res.text();
      return text ? { message: text } : {};
    } catch {
      return {};
    }
  };

  if (!res.ok) {
    // Fånga 401 med utgången token
    const payload = await readPayload();
    const msg =
      (typeof payload?.message === "string" && payload.message) ||
      `${res.status} ${res.statusText}`;

    if (res.status === 401 && msg.includes("Expired token")) {
      // rensa lokalt och skicka till login med orsak
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login?reason=expired";
      return Promise.reject(new ApiError("Expired token", 401));
    }

    throw new ApiError(msg, res.status);
  }

  // Hantera 204 No Content
  if (res.status === 204) return null;

  try {
    return await res.json();
  } catch {
    return {};
  }
}
