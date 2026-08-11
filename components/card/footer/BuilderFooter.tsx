import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./BuilderFooter.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
});

export interface ProofPin {
  id: string;
  label: string;
  icon: string;
}

interface BuilderFooterProps {
  builderId: string;
  selectedPins?: ProofPin[];
}

export default function BuilderFooter({
  builderId,
  selectedPins = [],
}: BuilderFooterProps) {
  return (
    <footer
      className={`builder-footer ${bebas.variable} ${space.variable}`}
    >
      {/* BACKGROUND */}

      <div className="builder-footer-bg" />

      <div className="builder-footer-content">

        {/* =================================================
            BUILDER ID
        ================================================= */}

        <div className="footer-id">

          <span className="footer-label">
            BUILDER ID
          </span>

          <span className="footer-number">
            {builderId}
          </span>

          <div className="footer-barcode">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

        </div>


        {/* =================================================
            PROOF OF WORK
        ================================================= */}

        {selectedPins.length > 0 && (
          <div
            className={`footer-proof footer-proof-${selectedPins.length}`}
          >

            <div className="proof-title">
              <span>✦</span>
              BUILDER TRAITS
              <span>✦</span>
            </div>

            <div className="proof-grid">

              {selectedPins.map((pin) => (
                <div
                  className="proof-pin"
                  key={pin.id}
                >
                  <span className="proof-pin-icon">
                    {pin.icon}
                  </span>

                  <span className="proof-pin-label">
                    {pin.label}
                  </span>
                </div>
              ))}

            </div>

          </div>
        )}


        {/* =================================================
            QR SECTION
        ================================================= */}

        <div className="footer-qr">

          <div className="qr-copy">
            <span>BUILDERS DON'T</span>
            <span>WAIT FOR CHANGE.</span>
            <span>WE COMMIT IT.</span>
          </div>

          <div className="qr-bolt">
            ⚡
          </div>

          <div className="qr-star">
            ✦
          </div>

          <div className="qr-scan">
            SCAN TO
            <br />
            CONNECT
          </div>

          <div className="qr-box">
  <img
    src="/images/qr.png"
    alt="Hacker House Goa QR Code"
    className="footer-qr-image"
  />
</div>

        </div>


        {/* =================================================
            FRAME IN GOA
        ================================================= */}

        <div className="footer-watermark">
          #FRAMEINGOA
        </div>

      </div>
    </footer>
  );
}