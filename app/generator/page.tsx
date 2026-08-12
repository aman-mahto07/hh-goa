"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

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


/* =========================================================
   BUILDER CARD NATIVE DIMENSIONS
========================================================= */

const CARD_NATIVE_WIDTH = 520;
const CARD_NATIVE_HEIGHT = 650;


export default function GeneratorPage() {

  /* =================================================
     BASIC FORM STATE
  ================================================= */

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [mode, setMode] =
    useState("NIGHT OWL");

  const [modeOpen, setModeOpen] =
    useState(false);


  /* =================================================
     PHOTO STATE
  ================================================= */

  const [photo, setPhoto] =
    useState<string | undefined>();

  const [isDragging, setIsDragging] =
    useState(false);


  /* =================================================
     BUILDER TRAITS
  ================================================= */

  const [selectedPins, setSelectedPins] =
    useState<ProofPin[]>([]);


  /* =================================================
     CARD EXPORT REF
  ================================================= */

  const cardExportRef =
    useRef<HTMLDivElement>(null);


  /* =================================================
     RESPONSIVE CARD SCALING
     =================================================
     The Builder Card keeps its native 520x650 size
     internally (so nothing inside it has to know
     about responsiveness), and we visually scale the
     whole thing down to fit the available width using
     a live-measured ResizeObserver instead of a CSS
     calc() trick — calc() can't produce the unitless
     number that transform: scale() requires from a
     viewport-width length, so a pure-CSS version of
     this silently fails on some screens.
  ================================================= */

  const previewStageRef =
    useRef<HTMLDivElement>(null);

  const [cardScale, setCardScale] =
    useState(1);

  useEffect(() => {

    const stageNode =
      previewStageRef.current;

    if (!stageNode) return;


    const updateScale = () => {

      const availableWidth =
        stageNode.clientWidth;

      if (!availableWidth) return;

      const nextScale = Math.min(
        1,
        availableWidth / CARD_NATIVE_WIDTH
      );

      setCardScale(nextScale);
    };


    updateScale();


    const resizeObserver =
      new ResizeObserver(updateScale);

    resizeObserver.observe(stageNode);


    return () => {
      resizeObserver.disconnect();
    };

  }, []);


  /* =================================================
     BUILDER ID
  ================================================= */

  const builderId =
    generateBuilderId(name);


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
     PHOTO FILE HANDLER
  ================================================= */

  const handlePhotoFile = async (file?: File) => {

    if (!file) return;


    const fileName =
      file.name.toLowerCase();


    const isHEIC =
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      fileName.endsWith(".heic") ||
      fileName.endsWith(".heif");


    try {

      /* =================================================
         HEIC → JPEG
      ================================================= */

      if (isHEIC) {

        const heic2any =
          (await import("heic2any")).default;


        const converted =
          await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.92,
          });


        /*
          heic2any can return
          a Blob or Blob[].
        */

        const jpegBlob =
          Array.isArray(converted)
            ? converted[0]
            : converted;


        const reader =
          new FileReader();


        reader.onload = () => {

          const result =
            reader.result;


          if (typeof result === "string") {
            setPhoto(result);
          }

        };


        reader.onerror = () => {

          console.error(
            "Failed to read converted HEIC photo."
          );

        };


        reader.readAsDataURL(jpegBlob);

        return;
      }


      /* =================================================
         NORMAL IMAGE FORMATS
      ================================================= */

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
      ];


      if (!allowedTypes.includes(file.type)) {

        console.warn(
          "Unsupported image format:",
          file.type || file.name
        );

        return;
      }


      const reader =
        new FileReader();


      reader.onload = () => {

        const result =
          reader.result;


        if (typeof result === "string") {
          setPhoto(result);
        }

      };


      reader.onerror = () => {

        console.error(
          "Failed to read uploaded photo."
        );

      };


      reader.readAsDataURL(file);

    } catch (error) {

      console.error(
        "Failed to process uploaded photo:",
        error
      );

    }

  };


  /* =================================================
     FILE INPUT UPLOAD
  ================================================= */

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];


    handlePhotoFile(file);


    event.target.value = "";
  };


  /* =================================================
     DRAG ENTER
  ================================================= */

  const handlePhotoDragEnter = (
    event: React.DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };


  /* =================================================
     DRAG OVER
  ================================================= */

  const handlePhotoDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect =
      "copy";

    setIsDragging(true);
  };


  /* =================================================
     DRAG LEAVE
  ================================================= */

  const handlePhotoDragLeave = (
    event: React.DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault();
    event.stopPropagation();


    if (
      event.currentTarget ===
      event.target
    ) {
      setIsDragging(false);
    }

  };


  /* =================================================
     DROP
  ================================================= */

  const handlePhotoDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);


    const file =
      event.dataTransfer.files?.[0];


    handlePhotoFile(file);
  };


  /* =================================================
     PIN TOGGLE
  ================================================= */

  const toggleProofPin = (
    pin: ProofPin
  ) => {

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


  /* =================================================
     DOWNLOAD BUILDER ID
  ================================================= */

  const handleDownload = async () => {

    if (!cardExportRef.current) {

      console.error(
        "Builder Card export container not found."
      );

      return;
    }


    try {

      /* WAIT FOR FONTS */

      if ("fonts" in document) {
        await document.fonts.ready;
      }


      /* WAIT FOR ALL IMAGES */

      const images =
        Array.from(
          document.images
        );


      await Promise.all(
        images.map((image) => {

          if (image.complete) {
            return Promise.resolve();
          }


          return new Promise<void>(
            (resolve) => {

              image.onload = () =>
                resolve();

              image.onerror = () =>
                resolve();

            }
          );

        })
      );


      /* WAIT FOR FINAL RENDER */

      await new Promise<void>(
        (resolve) => {

          requestAnimationFrame(() => {

            requestAnimationFrame(() => {
              resolve();
            });

          });

        }
      );


      /* FIND ACTUAL BUILDER CARD */

      const cardElement =
        cardExportRef.current.querySelector(
          ".builder-card"
        ) as HTMLElement | null;


      if (!cardElement) {

        console.error(
          "Actual .builder-card element was not found."
        );

        return;
      }


      /*
        DOWNLOAD AT FULL NATIVE RESOLUTION

        Instead of changing the transform on the live wrapper
        (which causes visual flicker), we pass transform-origin
        and scale hints to toPng in the style object. This way,
        html-to-image handles the scaling internally without
        touching the DOM.
      */

      /* GENERATE PNG */

      const dataUrl =
        await toPng(
          cardElement,
          {
            cacheBust: true,

            pixelRatio: 2,

            skipFonts: false,

            width: CARD_NATIVE_WIDTH,
            height: CARD_NATIVE_HEIGHT,

            backgroundColor:
              "#f3e6c4",

            style: {
              margin: "0",
              transform: "scale(1) !important",
              transformOrigin: "top left !important",
            },
          }
        );


      /* DOWNLOAD */

      const link =
        document.createElement("a");


      link.download =
        `${builderId}.png`;


      link.href =
        dataUrl;


      document.body.appendChild(link);


      link.click();


      document.body.removeChild(link);

    } catch (error) {

      console.error(
        "Failed to download Builder ID:",
        error
      );


      if (error instanceof Error) {

        console.error(
          "Download error message:",
          error.message
        );


        console.error(
          "Download error stack:",
          error.stack
        );

      }

    }

  };


  /* =================================================
     SHARE TO X
  ================================================= */

  const handleShareToX = () => {

    const displayName =
      name.trim() || "BUILDER";


    const shareText =
      `🌴 Built my Hacker House Goa '26 Builder Card!

👤 ${displayName}
🪪 Builder ID: ${builderId}

Ready to build, ship, break things and meet some incredible builders in Goa. 🚀

Create your own Builder Card:
https://hh-goa-builderid.vercel.app/

#FrameInGoa #HackerHouseGoa`;


    const xUrl =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`;


    window.open(
      xUrl,
      "_blank"
    );

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

              <span>
                BUILDER ID
              </span>

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
                    setName(
                      event.target.value
                    )
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
                    setRole(
                      event.target.value
                    )
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
                      modeOpen
                        ? "is-open"
                        : ""
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

              <div className="form-field photo-field">

                <label className="form-field-label">
                  YOUR PHOTO
                </label>


                <div
                  className={`photo-uploader ${
                    photo
                      ? "photo-uploader-has-image"
                      : ""
                  } ${
                    isDragging
                      ? "photo-uploader-dragging"
                      : ""
                  }`}
                  onDragEnter={
                    handlePhotoDragEnter
                  }
                  onDragOver={
                    handlePhotoDragOver
                  }
                  onDragLeave={
                    handlePhotoDragLeave
                  }
                  onDrop={
                    handlePhotoDrop
                  }
                >


                  <input
                    id="builder-photo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif"
                    onChange={
                      handlePhotoUpload
                    }
                    className="photo-input"
                  />


                  <label
                    htmlFor="builder-photo"
                    className="photo-uploader-content"
                  >

                    {photo ? (

                      <>

                        <img
                          src={photo}
                          alt="Builder preview"
                          className="photo-upload-preview"
                        />


                        <div className="photo-upload-overlay">

                          <span className="photo-upload-status">

                            {isDragging
                              ? "DROP TO REPLACE PHOTO ↓"
                              : "PHOTO UPLOADED ✓"}

                          </span>


                          <span className="photo-upload-change">

                            {isDragging
                              ? "RELEASE TO UPDATE"
                              : "CLICK TO CHANGE · OR DROP A NEW PHOTO"}

                          </span>

                        </div>

                      </>

                    ) : (

                      <>

                        <div className="photo-upload-icon">

                          {isDragging
                            ? "↓"
                            : "↑"}

                        </div>


                        <span className="photo-upload-title">

                          {isDragging
                            ? "DROP IT LIKE YOU MEAN IT"
                            : "DROP YOUR PHOTO HERE"}

                        </span>


                        <span className="photo-upload-subtitle">

                          {isDragging
                            ? "RELEASE TO UPLOAD"
                            : "OR CLICK TO BROWSE"}

                        </span>


                        <span className="photo-upload-formats">
                          JPG · PNG · WEBP · HEIC
                        </span>

                      </>

                    )}

                  </label>

                </div>

              </div>


              {/* =================================================
                  BUILDER TRAITS
              ================================================= */}

              <div className="form-field">

                <div className="proof-selection-header">

                  <span>
                    BUILDER TRAITS
                  </span>


                  <span>
                    {selectedPins.length === 4
                      ? "4/4 · FULL LOAD"
                      : `${selectedPins.length}/4`}
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
                  EXPORT ACTIONS
              ================================================= */}

              <div className="export-actions">


                <button
                  type="button"
                  className="download-id-button"
                  onClick={handleDownload}
                >

                  <span className="export-icon">
                    ↓
                  </span>


                  <span>
                    DOWNLOAD BUILDER PASS
                  </span>

                </button>


                <button
                  type="button"
                  className="share-x-button"
                  onClick={handleShareToX}
                >

                  <span className="export-x-icon">

                    <img
                      src="/images/X.png"
                      alt="X"
                    />

                  </span>


                  <span>
                    SHARE TO X
                  </span>


                  <span className="export-arrow">
                    ↗
                  </span>

                </button>

              </div>

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


              {/* =================================================
                  RESPONSIVE STAGE
                  Reserves the correctly scaled amount of
                  space so nothing below it (the preview
                  note) overlaps or gets clipped.
              ================================================= */}

              <div
                ref={previewStageRef}
                className="preview-stage"
                style={{
                  height:
                    CARD_NATIVE_HEIGHT * cardScale,
                }}
              >

                {/* =================================================
                    CARD EXPORT TARGET
                ================================================= */}

                <div
                  ref={cardExportRef}
                  className="builder-card-export"
                  style={{
                    transform: `scale(${cardScale})`,
                  }}
                >

                  <BuilderCard
                    name={name}
                    role={role}
                    mode={mode}
                    builderId={builderId}
                    photo={photo}
                    selectedPins={selectedPins}
                  />

                </div>

              </div>


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
