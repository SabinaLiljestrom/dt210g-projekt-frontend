import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import woodTexture from "../assets/woodTexture.png";
import type { Book } from "../types/Book";
import type { Review } from "../types/Review";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Form-state
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [saving, setSaving] = useState(false);

  // Hämta bok + recensioner
  useEffect(() => {
    if (!id) return;
    const run = async () => {
      setLoading(true);
      setErr("");
      try {
        const b = await api(`/books/${id}`);
        const r = await api(`/reviews/${id}`);
        setBook(b);
        setReviews(r);
      } catch {
        setErr("Kunde inte hämta bokdata eller recensioner.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const onCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token) return;

    // enkel klientvalidering
    if (!content.trim()) {
      setErr("Recensionstext får inte vara tom.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setErr("Betyg måste vara mellan 1 och 5.");
      return;
    }

    setSaving(true);
    // rensa ev. gammalt fel
    setErr("");
    try {
      await api(`/reviews`, {
        method: "POST",
        body: JSON.stringify({ bookId: id, content, rating }),
      });
      // uppdatera listan efter lyckad skapning
      const r = await api(`/reviews/${id}`);
      setReviews(r);
      setContent("");
      setRating(5);
    } catch {
      setErr("Kunde inte spara din recension.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Felmeddelande överst */}
        <ErrorBanner message={err} />

        {/* Laddningsindikator */}
        {loading && <Loading text="Laddar bok och recensioner…" />}

        {/* Innehåll visas när vi inte laddar */}
        {!loading && (
          <>
            {!book ? (
              <p style={{ padding: "1rem" }}>Ingen bok hittades.</p>
            ) : (
              <>
                {/* Bokinfo */}
                <div
                  style={{
                    margin: "0 0 2rem 0",
                    display: "grid",
                    gridTemplateColumns: "128px 1fr",
                    gap: "1rem",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 12,
                    padding: "1rem",
                  }}
                >
                  <img
                    src={
                      book.thumbnail ||
                      "https://via.placeholder.com/128x192?text=Ingen+bild"
                    }
                    alt={book.title}
                    style={{
                      width: 128,
                      height: 192,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  <div>
                    <h1 style={{ margin: 0 }}>{book.title}</h1>
                    {book.authors?.length ? (
                      <p style={{ marginTop: 6, opacity: 0.8 }}>
                        <strong>Författare:</strong> {book.authors.join(", ")}
                      </p>
                    ) : null}
                    {book.description ? (
                      <p style={{ marginTop: 12 }}>{book.description}</p>
                    ) : (
                      <p style={{ marginTop: 12, opacity: 0.8 }}>
                        Ingen beskrivning.
                      </p>
                    )}
                  </div>
                </div>

                {/* Recensioner */}
                <div>
                  <h2 style={{ marginBottom: "0.5rem" }}>Recensioner</h2>

                  {reviews.length === 0 ? (
                    <p style={{ marginBottom: "1rem" }}>
                      Inga recensioner ännu.
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gap: "0.75rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {reviews.map((r) => (
                        <div
                          key={r._id}
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            border: "1px solid #e5e5e5",
                            borderRadius: 8,
                            padding: "0.75rem 1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>{r.userId?.username ?? "Anonym"}</strong>
                            <span>{r.rating}/5</span>
                          </div>
                          <p style={{ marginTop: 6 }}>{r.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skapa recension – endast inloggad */}
                  {token ? (
                    <form
                      onSubmit={onCreateReview}
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        border: "1px solid #e5e5e5",
                        borderRadius: 8,
                        padding: "1rem",
                        display: "grid",
                        gap: "0.75rem",
                      }}
                    >
                      <label style={{ display: "grid", gap: 6 }}>
                        Din recension
                        <textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={4}
                          placeholder="Skriv vad du tyckte…"
                          style={{
                            padding: "0.5rem",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            resize: "vertical",
                          }}
                          required
                        />
                      </label>

                      <label style={{ display: "grid", gap: 6, maxWidth: 200 }}>
                        Betyg (1–5)
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          style={{
                            padding: "0.5rem",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                          }}
                          required
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={saving}
                        style={{
                          justifySelf: "start",
                          padding: "0.6rem 1rem",
                          background: "#0077cc",
                          color: "#fff",
                          border: 0,
                          borderRadius: 8,
                          cursor: "pointer",
                          opacity: saving ? 0.7 : 1,
                        }}
                      >
                        {saving ? "Sparar…" : "Publicera recension"}
                      </button>
                    </form>
                  ) : (
                    <p
                      style={{
                        marginTop: "0.5rem",
                        background: "rgba(255,255,255,0.9)",
                        padding: "0.75rem 1rem",
                        borderRadius: 8,
                        border: "1px solid #e5e5e5",
                      }}
                    >
                      Du måste vara inloggad för att skriva en recension.{" "}
                      <Link to="/login">Logga in</Link> eller{" "}
                      <Link to="/register">skapa konto</Link>.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
