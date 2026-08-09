'use client';

import { useState } from 'react';
import BuilderCard from '@/components/card/BuilderCard';
import './generator.css';

export default function GeneratorPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [mode, setMode] = useState('FULL STACK BUILDER');
  const [builderId] = useState('HH-GOA-26-0000');
  const [photo, setPhoto] = useState<string | undefined>();

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
  };

  return (
    <main className="generator-page">

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


              {/* NAME */}

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


              {/* ROLE */}

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


              {/* BUILDER MODE */}

              <div className="form-field">

                <label htmlFor="builder-mode">
                  BUILDER MODE
                </label>

                <select
                  id="builder-mode"
                  value={mode}
                  onChange={(event) =>
                    setMode(event.target.value)
                  }
                >

                  <option value="FULL STACK BUILDER">
                    FULL STACK BUILDER
                  </option>

                  <option value="AI BUILDER">
                    AI BUILDER
                  </option>

                  <option value="FRONTEND BUILDER">
                    FRONTEND BUILDER
                  </option>

                  <option value="BACKEND BUILDER">
                    BACKEND BUILDER
                  </option>

                  <option value="HARDWARE BUILDER">
                    HARDWARE BUILDER
                  </option>

                  <option value="PRODUCT BUILDER">
                    PRODUCT BUILDER
                  </option>

                </select>

              </div>


              {/* PHOTO */}

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


              {/* GENERATE */}

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


              <BuilderCard/>


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