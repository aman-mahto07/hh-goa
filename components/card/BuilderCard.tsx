"use client";

import "./BuilderCard.css";
import BuilderBody from "./body/BuilderBody";
import BuilderFooter from "./footer/BuilderFooter";

interface BuilderCardProps {
  name: string;
  role: string;
  mode: string;
  photo?: string;
}

function generateBuilderId(name: string): string {
  const normalizedName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  let hash = 2166136261;

  for (let i = 0; i < normalizedName.length; i++) {
    hash ^= normalizedName.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  hash >>>= 0;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  for (let i = 0; i < 4; i++) {
    id += chars[hash % chars.length];
    hash = Math.floor(hash / chars.length);
  }

  return `HH-GOA-26-${id}`;
}
export default function BuilderCard({
  name,
  role,
  mode,
  photo,
}: BuilderCardProps) {

  const builderId = generateBuilderId(name);

  return (
    <div className="builder-card">

      {/* =================================================
          HEADER
      ================================================= */}

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
            गोवा 2026
          </span>

        </div>

      </header>


      {/* =================================================
          BUILDER PASS
      ================================================= */}

      <div className="builder-pass-strip">

        <span>✦</span>

        OFFICIAL BUILDER PASS

        <span>✦</span>

      </div>


      {/* =================================================
          BODY
      ================================================= */}

      <BuilderBody
        name={name}
        role={role}
        mode={mode}
        builderId={builderId}
        photo={photo}
      />


      {/* =================================================
          FOOTER
      ================================================= */}

      <BuilderFooter
        builderId={builderId}
      />

    </div>
  );
}