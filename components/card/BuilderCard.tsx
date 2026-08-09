import './BuilderCard.css';

export default function BuilderCard() {
  return (
    <div className="builder-card">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="builder-card-header">

        {/* Lanyard slot */}
        <div className="card-hole" />

        {/* Top-left identity */}
        <div className="header-brand">
          <span>HH</span>
          <span>GOA</span>
          <span>'26</span>
        </div>

        {/* Top-right date */}
        <div className="header-date">
          <span>28 — 31</span>
          <span>OCT</span>
          <span>2026</span>
        </div>

        {/* Location */}
        <div className="header-location">
          GOA,
          <br />
          INDIA
        </div>

        {/* Main title */}
        <div className="header-title">

          <div>HACKER</div>

          <div>HOUSE</div>

          {/* Goa sticker */}
          <span className="header-goa">
            गोवा 2026
          </span>

        </div>

      </header>

      <div className="builder-pass-strip">
  <span className="pass-star">✦</span>

  <span className="pass-text">
    OFFICIAL BUILDER PASS
  </span>

  <span className="pass-star">✦</span>
</div>

    </div>
  );
}