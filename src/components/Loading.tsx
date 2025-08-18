export default function Loading({ text = "Laddar…" }: { text?: string }) {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        opacity: 0.8,
        backgroundColor: "white",
      }}
    >
      {text}
    </div>
  );
}
