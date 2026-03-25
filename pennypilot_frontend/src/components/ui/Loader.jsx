import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;700;900&display=swap');

  @keyframes pp-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pp-ring-pulse {
    0%   { opacity: 0.6; transform: scale(0.92); }
    60%  { opacity: 0.12; transform: scale(1); }
    100% { opacity: 0;   transform: scale(1.05); }
  }
  @keyframes pp-node {
    0%, 100% { opacity: 0.35; transform: scale(0.85); }
    50%       { opacity: 1;    transform: scale(1.15); }
  }
  @keyframes pp-badge-dot {
    0%, 100% { box-shadow: 0 0 4px 1px rgba(99,102,241,0.5); }
    50%       { box-shadow: 0 0 10px 3px rgba(99,102,241,0.9); }
  }
  @keyframes pp-coin-spin {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(360deg); }
  }
  @keyframes pp-fade-dots {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50%       { opacity: 1;   transform: scale(1); }
  }
  @keyframes pp-text-pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  .pp-loader-root {
    font-family: 'Outfit', sans-serif;
    background: #060D1A;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  /* ambient blobs */
  .pp-loader-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .pp-loader-blob-1 {
    width: 500px; height: 500px;
    top: -150px; left: -150px;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
  }
  .pp-loader-blob-2 {
    width: 400px; height: 400px;
    bottom: -100px; right: -50px;
    background: radial-gradient(circle, rgba(245,181,40,0.09) 0%, transparent 70%);
  }

  /* ── icon ── */
  .pp-loader-icon-wrap {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 32px;
  }

  .pp-loader-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(99,102,241,0.35);
    animation: pp-ring-pulse 2s ease-out infinite;
  }
  .pp-loader-ring-1 { inset: 0;     animation-delay: 0s; }
  .pp-loader-ring-2 { inset: -18px; animation-delay: 0.65s; }
  .pp-loader-ring-3 { inset: -36px; animation-delay: 1.3s; }

  /* spinning outer orbit track */
  .pp-loader-orbit-track {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    z-index: 4;
    animation: pp-spin 2.5s linear infinite;
  }
  .pp-loader-orbit-dot {
    position: absolute;
    width: 10px; height: 10px;
    background: #6366F1;
    border-radius: 50%;
    top: 5px;
    left: 50%;
    margin-left: -5px;
    box-shadow: 0 0 12px 4px rgba(99,102,241,0.8);
  }

  /* coin with Y-axis spin */
  .pp-loader-coin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 130deg, #111827, #1a2744, #0f2d52, #1a2744, #111827);
    border: 3px solid #F5B528;
    box-shadow:
      0 0 0 1px rgba(245,181,40,0.1),
      0 0 32px rgba(245,181,40,0.25),
      inset 0 0 28px rgba(245,181,40,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    animation: pp-coin-spin 2s ease-in-out infinite;
    transform-style: preserve-3d;
  }

  .pp-loader-node-dot {
    position: absolute;
    width: 7px; height: 7px;
    background: #6366F1;
    border-radius: 50%;
    z-index: 5;
    animation: pp-node 2.5s ease-in-out infinite;
  }

  /* ── wordmark ── */
  .pp-loader-wordmark {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 1;
  }
  .pp-loader-name {
    display: flex;
    align-items: baseline;
    gap: 6px;
    line-height: 1;
  }
  .pp-loader-penny {
    font-size: 52px;
    font-weight: 900;
    color: #F0E9D6;
    letter-spacing: -2px;
  }
  .pp-loader-pilot {
    font-size: 52px;
    font-weight: 300;
    color: #F5B528;
    letter-spacing: -1px;
  }

  /* loading dots */
  .pp-loader-dots {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }
  .pp-loader-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #6366F1;
    animation: pp-fade-dots 1.2s ease-in-out infinite;
  }
  .pp-loader-dot:nth-child(1) { animation-delay: 0s; }
  .pp-loader-dot:nth-child(2) { animation-delay: 0.2s; }
  .pp-loader-dot:nth-child(3) { animation-delay: 0.4s; }

  .pp-loader-text {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(240,233,214,0.35);
    animation: pp-text-pulse 2s ease-in-out infinite;
  }
`;

const NODE_DOTS = [
  { top: "8px",   left: "46px", delay: "0s"   },
  { top: "46px",  left: "105px", delay: "0.6s" },
  { top: "96px",  left: "62px", delay: "1.2s"  },
  { top: "54px",  left: "2px",  delay: "1.8s"  },
];

export default function Loader({ text = "Loading..." }) {
  const styleRef = useRef(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement("style");
      el.textContent = styles;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  return (
    <div className="pp-loader-root">
      <div className="pp-loader-blob pp-loader-blob-1" />
      <div className="pp-loader-blob pp-loader-blob-2" />

      {/* ── SPINNING COIN ICON ── */}
      <div className="pp-loader-icon-wrap">
        <div className="pp-loader-ring pp-loader-ring-1" />
        <div className="pp-loader-ring pp-loader-ring-2" />
        <div className="pp-loader-ring pp-loader-ring-3" />

        <div className="pp-loader-coin">
          <svg width="52" height="52" viewBox="0 0 62 62" fill="none">
            <path d="M10 31 L40 18 L50 31 L40 44 Z" fill="#F5B528" />
            <path d="M32 31 L40 44 L50 31 Z" fill="#0a1628" opacity="0.35" />
            <path d="M40 18 L57 30 L40 44 L46 31 Z" fill="#FFD766" />
            <path d="M10 31 L16 20 L25 31 Z" fill="#FFD766" opacity="0.9" />
            <path d="M10 31 L16 42 L25 31 Z" fill="#F5B528" opacity="0.5" />
            <rect x="26" y="26" width="14" height="4" rx="2" fill="#FFD766" opacity="0.35" />
            <line x1="5" y1="24" x2="10" y2="28" stroke="#6366F1" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
            <line x1="3" y1="31" x2="9"  y2="31" stroke="#6366F1" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            <line x1="5" y1="38" x2="10" y2="34" stroke="#6366F1" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
          </svg>
        </div>

        {NODE_DOTS.map((d, i) => (
          <div
            key={i}
            className="pp-loader-node-dot"
            style={{ top: d.top, left: d.left, animationDelay: d.delay }}
          />
        ))}

        <div className="pp-loader-orbit-track">
          <div className="pp-loader-orbit-dot" />
        </div>
      </div>

      {/* ── WORDMARK + DOTS ── */}
      <div className="pp-loader-wordmark">
        <div className="pp-loader-name">
          <span className="pp-loader-penny">Penny</span>
          <span className="pp-loader-pilot">Pilot</span>
        </div>

        <div className="pp-loader-dots">
          <div className="pp-loader-dot" />
          <div className="pp-loader-dot" />
          <div className="pp-loader-dot" />
        </div>

        <span className="pp-loader-text">{text}</span>
      </div>
    </div>
  );
}