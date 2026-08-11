"use client";

import "./BuilderBody.css";

interface BuilderBodyProps {
  name: string;
  role: string;
  mode: string;
  builderId: string;
  photo?: string;
}

export default function BuilderBody({
  name,
  role,
  mode,
  photo,
}: BuilderBodyProps) {
  return (
    <section className="builder-body">

      {/* =================================================
          PHOTO
      ================================================= */}

      <div className="builder-photo">

        {photo && (
          <img
            src={photo}
            alt="Builder"
            className="builder-photo-image"
          />
        )}

      </div>


      {/* =================================================
          APPROVED STAMP
      ================================================= */}

      <img
        src="/images/approved-stamp.png"
        alt=""
        className="approved-stamp"
      />


      {/* =================================================
          IDENTITY
      ================================================= */}

      <div className="builder-identity">

        <div className="identity-row">

          <span className="identity-label">
            BUILDER NAME
          </span>

          <span className="identity-value identity-name">
            {name || "BUILDER NAME"}
          </span>

        </div>


        <div className="identity-row">

          <span className="identity-label">
            STACK / ROLE
          </span>

          <span className="identity-value">
            {role || "BUILDER ROLE"}
          </span>

        </div>


        <div className="identity-row">

          <span className="identity-label">
            BUILDER MODE
          </span>

          <span className="identity-value identity-mode">
            {mode || "NIGHT OWL"}
          </span>

        </div>


        <div className="identity-row identity-vibe">

          <span className="identity-label">
            VIBE
          </span>

          <span className="identity-value">
            SHIP <b>•</b> BUILD <b>•</b> REPEAT
          </span>

        </div>

      </div>


      {/* =================================================
          PHOTO HASHTAG
      ================================================= */}

      <div className="photo-hashtag">
        #FRAMEINGOA
      </div>

    </section>
  );
}