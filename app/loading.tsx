export default function Loading() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl animate-paw-walk">🐾</div>
        <div className="mt-4 flex justify-center gap-1.5 text-2xl">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>🐾</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>🐾</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>🐾</span>
        </div>
      </div>
    </main>
  );
}
