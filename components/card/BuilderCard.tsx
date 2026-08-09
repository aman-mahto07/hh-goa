"use client";

import "./BuilderCard.css";
import BuilderBody from "./body/BuilderBody";

interface BuilderCardProps {
  name: string;
  role: string;
  mode: string;
  builderId: string;
  photo?: string;
}

export default function BuilderCard({
  name,
  role,
  mode,
  builderId,
  photo,
}: BuilderCardProps) {
  return (
    <div className="builder-card">

      {/* HEADER */}
      <header className="builder-card-header">

        <div className="card-hole" />

        <div className="header-brand">
          <span>HH</span>
          <span>GOA</span>
          <span>'26</span>
        </div>

        <div className="header-date">
          <span>28 — 31</span>
          <span>OCT</span>
          <span>2026</span>
        </div>

        <div className="header-location">
          GOA,
          <br />
          INDIA
        </div>

        <div className="header-title">
          <div>HACKER</div>
          <div>HOUSE</div>

          <span className="header-goa">
            गोवा  2026
          </span>
        </div>

      </header>


      {/* BUILDER PASS */}
      <div className="builder-pass-strip">
        <span>✦</span>
        OFFICIAL BUILDER PASS
        <span>✦</span>
      </div>


      {/* BODY */}
      <BuilderBody
        name={name}
        role={role}
        mode={mode}
        builderId={builderId}
        photo={photo}
      />


      {/* FOOTER SPACE */}
      <div className="builder-card-footer-space" />

    </div>
  );
}