"use client";

import "./BuilderCard.css";

import BuilderBody from "./body/BuilderBody";

import BuilderFooter, {
  ProofPin,
} from "./footer/BuilderFooter";

interface BuilderCardProps {
  name: string;
  role: string;
  mode: string;
  builderId: string;
  photo?: string;

  selectedPins?: ProofPin[];
}

export default function BuilderCard({
  name,
  role,
  mode,
  builderId,
  photo,
  selectedPins = [],
}: BuilderCardProps) {
  return (
    <div className="builder-card">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="builder-card-header">

        <div className="card-hole" />


        {/* =================================================
            TOP LEFT — HH / GOA / '26
        ================================================= */}

        <div className="header-brand">
  <span>HH</span>

  <span className="header-goa-year">
    <span>GOA</span>
    <span>'26</span>
  </span>
</div>


        {/* =================================================
            TOP RIGHT — DATE
        ================================================= */}

        <div className="header-date">
          <span>28 — 31</span>
          <span>OCT</span>
          <span>2026</span>
        </div>


        {/* =================================================
            LOCATION
        ================================================= */}

        <div className="header-location">
          GOA,
          <br />
          INDIA
        </div>


        {/* =================================================
            MAIN TITLE
        ================================================= */}

        <div className="header-title">

          {/* HACKER */}

          <div className="title-line title-hacker">
            {"HACKER".split("").map((letter, index) => (
              <span key={index}>
                {letter}
              </span>
            ))}
          </div>


          {/* HOUSE */}

          <div className="title-line title-house">
            {"HOUSE".split("").map((letter, index) => (
              <span key={index}>
                {letter}
              </span>
            ))}
          </div>


          {/* GOA 2026 STICKER */}

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
        selectedPins={selectedPins}
      />

    </div>
  );
}