import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import woodTexture from "../assets/woodTexture.png";
import type { Review } from "../types/Review";
import { useAuth } from "../hooks/useAuth";
import { getMyReviews, updateReview, deleteReview } from "../api/reviews";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";

export default function MyReviewsPage() {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // edit-state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setErr("Du måste vara inloggad för att se dina recensioner.");
      return;
    }
    (async () => {
      try {
        const list = await getMyReviews();
        setReviews(list);
      } catch {
        setErr("Kunde inte hämta dina recensioner.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const startEdit = (r: Review) => {
    setEditingId(r._id);
    setContent(r.content);
    setRating(r.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setContent("");
    setRating(5);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!content.trim() || rating < 1 || rating > 5) return;

    setSaving(true);
    setErr("");
    try {
      await updateReview(editingId, { content, rating });
      // uppdatera lokalt
      setReviews((prev) =>
        prev.map((r) => (r._id === editingId ? { ...r, content, rating } : r))
      );
      cancelEdit();
    } catch {
      setErr("Kunde inte uppdatera recensionen.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Ta bort recensionen?")) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setErr("Kunde inte ta bort recensionen.");
    }
  };

  if (loading) return <Loading text="Hämtar dina recensioner…" />;

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
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Mina recensioner</h1>
        {err && <ErrorBanner message={err} />}

        {(!token || reviews.length === 0) && !err ? (
          <p>Du har inga recensioner ännu.</p>
        ) : null}

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {reviews.map((r) => {
            const isEditing = editingId === r._id;
            return (
              <div
                key={r._id}
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ opacity: 0.8, fontSize: 14 }}>
                      Bok:&nbsp;
                      <Link to={`/book/${r.bookId}`}>{r.bookTitle}</Link>
                    </div>
                    {r.bookThumbnail ? (
                      <img
                        src={r.bookThumbnail}
                        alt={r.bookTitle}
                        style={{
                          width: 40,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 4,
                          marginTop: 6,
                        }}
                      />
                    ) : null}
                    {!isEditing ? (
                      <>
                        <div style={{ marginTop: 6 }}>
                          <strong>Betyg:</strong> {r.rating}/5
                        </div>
                        <p style={{ marginTop: 6 }}>{r.content}</p>
                      </>
                    ) : (
                      <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
                        <label style={{ display: "grid", gap: 6 }}>
                          Betyg (1–5)
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            style={{
                              padding: "0.4rem",
                              borderRadius: 8,
                              border: "1px solid #ccc",
                              maxWidth: 120,
                            }}
                          />
                        </label>
                        <label style={{ display: "grid", gap: 6 }}>
                          Text
                          <textarea
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                              padding: "0.6rem",
                              borderRadius: 8,
                              border: "1px solid #ccc",
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                    {!isEditing ? (
                      <>
                        <button onClick={() => startEdit(r)}>Redigera</button>
                        <button onClick={() => remove(r._id)}>Ta bort</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={saveEdit}
                          disabled={saving || !content.trim()}
                        >
                          {saving ? "Sparar…" : "Spara"}
                        </button>
                        <button onClick={cancelEdit}>Avbryt</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: "1rem", fontSize: 18 }}>
          Tips: Gå till en bok via hyllan för att skriva en ny recension.
        </p>
      </div>
    </div>
  );
}
