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

interface BuilderFooterProps {
  builderId: string;
}

export default function BuilderFooter({
  builderId,
}: BuilderFooterProps) {
  return (
    <footer
      className={`builder-footer ${bebas.variable} ${space.variable}`}
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="builder-footer-bg" />

      <div className="builder-footer-content">

        {/* =================================================
            BUILDER ID PLATE
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
            <span>QR</span>
          </div>

        </div>


        {/* =================================================
            FRAME IN GOA WATERMARK
        ================================================= */}

        <div className="footer-watermark">
          #FRAMEINGOA 
        </div>


        {/* =================================================
            INFORMATION STRIP
        ================================================= */}

        <div className="footer-info-strip">

          <span className="footer-info-line" />

          <span className="footer-info-text">
            BUILDER
            <b>•</b>
            VERIFIED
            <b>•</b>
            GOA '26
          </span>

          <span className="footer-info-line" />

        </div>


        {/* =================================================
            AUTHENTICITY MARK
        ================================================= */}

        <div className="footer-auth-mark">

          <span className="auth-top">
            HH
          </span>

          <span className="auth-main">
            GOA
          </span>

          <span className="auth-bottom">
            2026
          </span>

        </div>

      </div>
    </footer>
  );
}