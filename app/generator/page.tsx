"use client";

import { useState } from "react";
import BuilderCard from "@/components/card/BuilderCard";
import "./generator.css";

export default function GeneratorPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mode, setMode] = useState("NIGHT OWL");
  const [modeOpen, setModeOpen] = useState(false);

  const [builderId] = useState("HH-GOA-26-0000");
  const [photo, setPhoto] = useState<string | undefined>();

  const builderModes = [
    "NIGHT OWL",
    "MAVERICK",
    "CODE NOMAD",
    "CHAOS BUILDER",
    "IDEA MACHINE",
    "BREAK → FIX → SHIP",
  ];

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
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
                      setModeOpen((open) => !open)
                    }
                  >

                    <span className="mode-symbol">
                      ◈
                    </span>

                    <span className="mode-selected">
                      {mode}
                    </span>

                    <span className="mode-arrow">
                      {modeOpen ? "▴" : "▾"}
                    </span>

                  </button>


                  {modeOpen && (
                    <div className="builder-mode-options">

                      {builderModes.map((builderMode) => (

                        <button
                          key={builderMode}
                          type="button"
                          className={`builder-mode-option ${
                            mode === builderMode
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            setMode(builderMode);
                            setModeOpen(false);
                          }}
                        >

                          <span className="mode-option-symbol">
                            ◈
                          </span>

                          <span>
                            {builderMode}
                          </span>

                        </button>

                      ))}

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
                  onChange={handlePhotoUpload}
                  hidden
                />

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
              />


              <p className="preview-note">
                Your identity card updates live as you build.
              </p>

            </section>

          </div>

        </section>

      </div>

    </main>
  );
}