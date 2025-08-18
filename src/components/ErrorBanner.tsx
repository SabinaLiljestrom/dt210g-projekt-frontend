export default function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        margin: "0.5rem 0",
        padding: "0.75rem 1rem",
        borderRadius: 8,
        background: "#ffe8e8",
        color: "#7a0b0b",
        border: "1px solid #f3b7b7",
      }}
    >
      {message}
    </div>
  );
}
