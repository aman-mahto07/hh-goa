export default function Home() {
  return (
    <main className="hero">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        {/* LEFT SIDE */}
        <div className="nav-left">

          <img
            src="/images/studio-logo.png"
            alt="2:47PM Studio"
            className="studio-logo"
          />

          <div className="nav-brand">
            HH GOA '26
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="nav-right">

          <a href="#generator">
            BUILD YOUR ID ↗
          </a>

          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            HHGOA.COM ↗
          </a>

        </div>

      </nav>


      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="hero-content">

        {/* Top eyebrow */}
        <p className="hero-eyebrow">
          BUILDER REGISTRY · GOA, INDIA · 2026
        </p>


        {/* =========================
            MAIN TITLE
        ========================= */}

        <div className="hero-title">

          <div className="title-word hacker">
            HACKER
          </div>

          <div className="title-word house">
            HOUSE

            <span className="goa-badge">
              गोवा 2026
            </span>

          </div>

        </div>


        {/* =========================
            LOCATION / DATE / HASHTAG
        ========================= */}

        <div className="hero-meta">

          <span>GOA, INDIA</span>

          <span>·</span>

          <span>28 — 31 OCT 2026</span>

          <span>·</span>

          <span>#FrameInGoa</span>

        </div>


        <div className="hero-cta">
  <button className="pass-button">
    GET YOUR PASS <span>↗</span>
  </button>
</div>
      </div>

    </main>
  );
}