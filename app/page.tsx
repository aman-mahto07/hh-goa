export default function Home() {
  return (
    <main
      className="hero"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/images/goa-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-title">
        <span>HACKER</span>
        <span>HOUSE</span>
      </div>
    </main>
  );
}