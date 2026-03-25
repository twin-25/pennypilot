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
  @keyframes pp-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-4px); }
  }

  .pp-root {
    font-family: 'Outfit', sans-serif;
    background: #060D1A;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    min-width: unset;
    width:100%;
  }

  /* ambient blobs */
  .pp-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .pp-blob-1 {
    width: 380px; height: 380px;
    top: -120px; left: -80px;
    background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
  }
  .pp-blob-2 {
    width: 300px; height: 300px;
    bottom: -80px; right: 20px;
    background: radial-gradient(circle, rgba(245,181,40,0.10) 0%, transparent 70%);
  }

  /* lockup */
  .pp-lockup {
    position: relative;
    display: flex;
    align-items: center;
    gap: 24px;
    z-index: 1;
  }

  /* ── icon ── */
  .pp-icon-wrap {
    position: relative;
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    animation: pp-float 5s ease-in-out infinite;
  }

  .pp-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(99,102,241,0.35);
    animation: pp-ring-pulse 3s ease-out infinite;
  }
  .pp-ring-1 { inset: 0; animation-delay: 0s; }
  .pp-ring-2 { inset: -16px; animation-delay: 0.9s; }
  .pp-ring-3 { inset: -32px; animation-delay: 1.8s; }

  .pp-coin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 130deg, #111827, #1a2744, #0f2d52, #1a2744, #111827);
    border: 3px solid #F5B528;
    box-shadow:
      0 0 0 1px rgba(245,181,40,0.1),
      0 0 32px rgba(245,181,40,0.2),
      inset 0 0 28px rgba(245,181,40,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .pp-orbit-track {
    position: absolute;
    inset: -17px;
    border-radius: 50%;
    z-index: 4;
    animation: pp-spin 6s linear infinite;
  }
  .pp-orbit-dot {
    position: absolute;
    width: 10px; height: 10px;
    background: #6366F1;
    border-radius: 50%;
    top: 5px;
    left: 50%;
    margin-left: -5px;
    box-shadow: 0 0 12px 4px rgba(99,102,241,0.75);
  }

  .pp-node-dot {
    position: absolute;
    width: 7px; height: 7px;
    background: #6366F1;
    border-radius: 50%;
    z-index: 5;
    animation: pp-node 2.5s ease-in-out infinite;
  }

  /* ── wordmark ── */
  .pp-wordmark {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .pp-name {
    display: flex;
    align-items: baseline;
    line-height: 1;
    gap: 6px;
  }
  .pp-penny {
    font-size: 42px;
    font-weight: 900;
    color: #F0E9D6;
    letter-spacing: -3px;
    line-height: 1;
  }
  .pp-pilot {
    font-size: 42px;
    font-weight: 300;
    color: #F5B528;
    letter-spacing: -1px;
    line-height: 1;
  }
  .pp-sub {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    padding-left: 2px;
  }
  .pp-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.38);
    border-radius: 99px;
    padding: 4px 12px 4px 8px;
  }
  .pp-badge-dot {
    width: 7px; height: 7px;
    background: #6366F1;
    border-radius: 50%;
    animation: pp-badge-dot 1.8s ease-in-out infinite;
  }
  .pp-badge-text {
    font-size: 10.5px;
    font-weight: 700;
    color: #818CF8;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }
  .pp-tagline {
    font-size: 11.5px;
    font-weight: 300;
    color: rgba(240,233,214,0.35);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`;

// Node dot positions (top/left as % of 130px coin)
const NODE_DOTS = [
  { top: "9px",  left: "50px", delay: "0s"    },
  { top: "50px", left: "113px", delay: "0.6s" },
  { top: "103px", left: "68px", delay: "1.2s" },
  { top: "58px",  left: "3px",  delay: "1.8s" },
];

export default function PennyPilotLogo() {
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
    <div className="pp-root">
      {/* Ambient blobs */}
      <div className="pp-blob pp-blob-1" />
      <div className="pp-blob pp-blob-2" />

      <div className="pp-lockup">
        {/* ── ICON ── */}
        <div className="pp-icon-wrap">
          {/* Pulse rings */}
          <div className="pp-ring pp-ring-1" />
          <div className="pp-ring pp-ring-2" />
          <div className="pp-ring pp-ring-3" />

          {/* Coin */}
          <div className="pp-coin">
            <svg width="44" height="44" viewBox="0 0 62 62" fill="none">
              {/* Wing body */}
              <path d="M10 31 L40 18 L50 31 L40 44 Z" fill="#F5B528" />
              {/* Shadow on lower wing */}
              <path d="M32 31 L40 44 L50 31 Z" fill="#0a1628" opacity="0.35" />
              {/* Nose */}
              <path d="M40 18 L57 30 L40 44 L46 31 Z" fill="#FFD766" />
              {/* Tail up */}
              <path d="M10 31 L16 20 L25 31 Z" fill="#FFD766" opacity="0.9" />
              {/* Tail down */}
              <path d="M10 31 L16 42 L25 31 Z" fill="#F5B528" opacity="0.5" />
              {/* Engine stripe */}
              <rect x="26" y="26" width="14" height="4" rx="2" fill="#FFD766" opacity="0.35" />
              {/* AI sparks */}
              <line x1="5" y1="24" x2="10" y2="28" stroke="#6366F1" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
              <line x1="3" y1="31" x2="9"  y2="31" stroke="#6366F1" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              <line x1="5" y1="38" x2="10" y2="34" stroke="#6366F1" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
            </svg>
          </div>

          {/* Neural node dots */}
          {NODE_DOTS.map((d, i) => (
            <div
              key={i}
              className="pp-node-dot"
              style={{ top: d.top, left: d.left, animationDelay: d.delay }}
            />
          ))}

          {/* Orbit */}
          <div className="pp-orbit-track">
            <div className="pp-orbit-dot" />
          </div>
        </div>

        {/* ── WORDMARK ── */}
        <div className="pp-wordmark">
          <div className="pp-name">
            <span className="pp-penny">Penny</span>
            <span className="pp-pilot">Pilot</span>
          </div>
          <div className="pp-sub">
            <div className="pp-badge">
              <div className="pp-badge-dot" />
              <span className="pp-badge-text">AI Powered</span>
            </div>
            <span className="pp-tagline">Navigate your finances</span>
          </div>
        </div>
      </div>
    </div>
  );
}
