"use client";

import { useState } from "react";

import BuilderCard from "@/components/card/BuilderCard";
import type { ProofPin } from "@/components/card/footer/BuilderFooter";

import "./generator.css";


/* =========================================================
   PROOF-OF-WORK PINS
========================================================= */

const PROOF_PINS: ProofPin[] = [
  {
    id: "hackathon-vet",
    label: "HACKATHON VET",
    icon: "⚡",
  },
  {
    id: "community-builder",
    label: "COMMUNITY BUILDER",
    icon: "✦",
  },
  {
    id: "open-source",
    label: "OPEN SOURCE",
    icon: "⌘",
  },
  {
    id: "technical-storyteller",
    label: "TECHNICAL STORYTELLER",
    icon: "◈",
  },
];


/* =========================================================
   NAME → BUILDER ID
========================================================= */

function generateBuilderId(name: string): string {
  const normalizedName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (!normalizedName) {
    return "HH-GOA-26-0000";
  }

  let hash = 0;

  for (let i = 0; i < normalizedName.length; i++) {
    hash =
      (hash << 5) -
      hash +
      normalizedName.charCodeAt(i);

    hash |= 0;
  }

  const positiveHash = Math.abs(hash);

  const suffix = positiveHash
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(-4);

  return `HH-GOA-26-${suffix}`;
}


export default function GeneratorPage() {

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [mode, setMode] = useState("NIGHT OWL");
  const [modeOpen, setModeOpen] = useState(false);

  const [photo, setPhoto] =
    useState<string | undefined>();


  /* =================================================
     BUILDER ID
  ================================================= */

  const builderId = generateBuilderId(name);


  /* =================================================
     PROOF-OF-WORK PINS
  ================================================= */

  const [selectedPins, setSelectedPins] =
    useState<ProofPin[]>([]);


  /* =================================================
     BUILDER MODES
  ================================================= */

  const builderModes = [
    "NIGHT OWL",
    "MAVERICK",
    "CODE NOMAD",
    "CHAOS BUILDER",
    "IDEA MACHINE",
    "BREAK → FIX → SHIP",
  ];


  /* =================================================
     PHOTO UPLOAD
  ================================================= */

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setPhoto(imageUrl);
  };


  /* =================================================
     PIN TOGGLE
  ================================================= */

  const toggleProofPin = (pin: ProofPin) => {

    const alreadySelected =
      selectedPins.some(
        (selectedPin) =>
          selectedPin.id === pin.id
      );


    /* REMOVE */

    if (alreadySelected) {

      setSelectedPins(
        selectedPins.filter(
          (selectedPin) =>
            selectedPin.id !== pin.id
        )
      );

      return;
    }


    /* MAX 4 */

    if (selectedPins.length >= 4) {
      return;
    }


    /* ADD */

    setSelectedPins([
      ...selectedPins,
      pin,
    ]);
  };


  return (
    <main>

      {/* =================================================
          FIXED BACKGROUND
      ================================================= */}

      <div className="generator-background" />


      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="generator-navbar">

        <div className="generator-nav-left">

          <a
            href="/"
            className="generator-brand"
          >
            HH / GOA '26
          </a>

        </div>


        <div className="generator-nav-right">

          <a href="/">
            HOME
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


      {/* =================================================
          SCROLLING CONTENT
      ================================================= */}

      <div className="generator-content">

        <section className="generator-container">


          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <header className="generator-header">

            <p className="generator-eyebrow">
              BUILDER REGISTRY · GOA, INDIA · 2026
            </p>

            <h1 className="generator-title">
              CREATE YOUR
              <span>BUILDER ID</span>
            </h1>

            <p className="generator-description">
              Build your identity. Ship your pass.
            </p>

          </header>


          {/* =================================================
              WORKSPACE
          ================================================= */}

          <div className="generator-workspace">


            {/* =================================================
                LEFT — FORM
            ================================================= */}

            <section className="builder-panel">

              <div className="panel-header">

                <span className="panel-number">
                  01
                </span>

                <span className="panel-title">
                  YOUR DETAILS
                </span>

              </div>


              {/* =================================================
                  NAME
              ================================================= */}

              <div className="form-field">

                <label htmlFor="builder-name">
                  BUILDER NAME
                </label>

                <input
                  id="builder-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="ENTER YOUR NAME"
                />

              </div>


              {/* =================================================
                  ROLE
              ================================================= */}

              <div className="form-field">

                <label htmlFor="builder-role">
                  STACK / ROLE
                </label>

                <input
                  id="builder-role"
                  type="text"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                  placeholder="E.G. BACKEND DEVELOPER"
                />

              </div>


              {/* =================================================
                  BUILDER MODE
              ================================================= */}

              <div className="form-field builder-mode-field">

                <label>
                  BUILDER MODE
                </label>

                <div className="builder-mode-select">

                  <button
                    type="button"
                    className={`builder-mode-trigger ${
                      modeOpen ? "is-open" : ""
                    }`}
                    onClick={() =>
                      setModeOpen(
                        (open) => !open
                      )
                    }
                  >

                    <span className="mode-symbol">
                      ◈
                    </span>

                    <span className="mode-selected">
                      {mode}
                    </span>

                    <span className="mode-arrow">
                      {modeOpen
                        ? "▴"
                        : "▾"}
                    </span>

                  </button>


                  {modeOpen && (

                    <div className="builder-mode-options">

                      {builderModes.map(
                        (builderMode) => (

                          <button
                            key={builderMode}
                            type="button"
                            className={`builder-mode-option ${
                              mode === builderMode
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {

                              setMode(
                                builderMode
                              );

                              setModeOpen(
                                false
                              );

                            }}
                          >

                            <span className="mode-option-symbol">
                              ◈
                            </span>

                            <span>
                              {builderMode}
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>


              {/* =================================================
                  PHOTO
              ================================================= */}

              <div className="form-field">

                <label htmlFor="builder-photo">
                  YOUR PHOTO
                </label>

                <label
                  htmlFor="builder-photo"
                  className="photo-dropzone"
                >

                  <div className="upload-icon">
                    ↑
                  </div>

                  <span className="upload-title">
                    DROP YOUR PHOTO HERE
                  </span>

                  <span className="upload-subtitle">
                    OR CLICK TO UPLOAD
                  </span>

                  <span className="upload-formats">
                    JPG · PNG · WEBP
                  </span>

                </label>

                <input
                  id="builder-photo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    handlePhotoUpload
                  }
                  hidden
                />

              </div>


              {/* =================================================
                  PROOF-OF-WORK
              ================================================= */}

              <div className="form-field">

                <div className="proof-selection-header">

                  <span>
                    PROOF OF WORK
                  </span>

                  <span>
                    {selectedPins.length}/4
                  </span>

                </div>


                <div className="proof-selection-grid">

                  {PROOF_PINS.map((pin) => {

                    const isSelected =
                      selectedPins.some(
                        (selectedPin) =>
                          selectedPin.id ===
                          pin.id
                      );

                    return (

                      <button
                        key={pin.id}
                        type="button"
                        className={`proof-option ${
                          isSelected
                            ? "proof-option-selected"
                            : ""
                        }`}
                        onClick={() =>
                          toggleProofPin(pin)
                        }
                      >

                        <span className="proof-option-icon">
                          {pin.icon}
                        </span>

                        <span className="proof-option-label">
                          {pin.label}
                        </span>

                        {isSelected && (

                          <span className="proof-option-check">
                            ✓
                          </span>

                        )}

                      </button>

                    );

                  })}

                </div>

              </div>


              {/* =================================================
                  GENERATE
              ================================================= */}

              <button
                type="button"
                className="generate-id-button"
              >
                GENERATE YOUR ID
                <span>↗</span>
              </button>

            </section>


            {/* =================================================
                RIGHT — LIVE PREVIEW
            ================================================= */}

            <section className="preview-panel">

              <div className="panel-header">

                <span className="panel-number">
                  02
                </span>

                <span className="panel-title">
                  LIVE PREVIEW
                </span>

              </div>


              {/* BUILDER CARD */}

              <BuilderCard
                name={name}
                role={role}
                mode={mode}
                builderId={builderId}
                photo={photo}
                selectedPins={selectedPins}
              />


              <p className="preview-note">
                Your identity card updates live
                as you build.
              </p>

            </section>

          </div>

        </section>

      </div>

    </main>
  );
}