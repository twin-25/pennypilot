import { useEffect, useRef } from "react"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;700;900&display=swap');

  @keyframes pp-coin-spin {
    from { transform: rotateY(0deg); }
    to   { transform: rotateY(360deg); }
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
  @keyframes pp-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .pp-logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .pp-logo-icon-wrap {
    position: relative;
    width: 120px;
    height: 120px;
  }
  .pp-logo-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(99,102,241,0.35);
    animation: pp-ring-pulse 2s ease-out infinite;
  }
  .pp-logo-ring-1 { inset: 0;     animation-delay: 0s; }
  .pp-logo-ring-2 { inset: -18px; animation-delay: 0.65s; }
  .pp-logo-ring-3 { inset: -36px; animation-delay: 1.3s; }
  .pp-logo-orbit-track {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    z-index: 4;
    animation: pp-spin 2.5s linear infinite;
  }
  .pp-logo-orbit-dot {
    position: absolute;
    width: 10px; height: 10px;
    background: #6366F1;
    border-radius: 50%;
    top: 5px; left: 50%;
    margin-left: -5px;
    box-shadow: 0 0 12px 4px rgba(99,102,241,0.8);
  }
  .pp-logo-coin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 130deg, #111827, #1a2744, #0f2d52, #1a2744, #111827);
    border: 3px solid #F5B528;
    box-shadow: 0 0 32px rgba(245,181,40,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    animation: pp-coin-spin 2s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  .pp-logo-node-dot {
    position: absolute;
    width: 7px; height: 7px;
    background: #6366F1;
    border-radius: 50%;
    z-index: 5;
    animation: pp-node 2.5s ease-in-out infinite;
  }
  .pp-logo-name {
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: baseline;
    gap: 6px;
    line-height: 1;
  }
  .pp-logo-penny {
    font-size: 52px;
    font-weight: 900;
    color: #F0E9D6;
    letter-spacing: -2px;
  }
  .pp-logo-pilot {
    font-size: 52px;
    font-weight: 300;
    color: #F5B528;
    letter-spacing: -1px;
  }
`

const NODE_DOTS = [
  { top: "8px",  left: "46px", delay: "0s"   },
  { top: "46px", left: "105px", delay: "0.6s" },
  { top: "96px", left: "62px", delay: "1.2s"  },
  { top: "54px", left: "2px",  delay: "1.8s"  },
]

const LogoAnimation = () => {
  const styleRef = useRef(null)

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement("style")
      el.textContent = styles
      document.head.appendChild(el)
      styleRef.current = el
    }
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current)
        styleRef.current = null
      }
    }
  }, [])

  return (
    <div className="pp-logo-wrap">
      {/* Spinning coin */}
      <div className="pp-logo-icon-wrap">
        <div className="pp-logo-ring pp-logo-ring-1" />
        <div className="pp-logo-ring pp-logo-ring-2" />
        <div className="pp-logo-ring pp-logo-ring-3" />

        <div className="pp-logo-coin">
          <svg width="52" height="52" viewBox="0 0 62 62" fill="none">
            <path d="M10 31 L40 18 L50 31 L40 44 Z" fill="#F5B528" />
            <path d="M32 31 L40 44 L50 31 Z" fill="#0a1628" opacity="0.35" />
            <path d="M40 18 L57 30 L40 44 L46 31 Z" fill="#FFD766" />
            <path d="M10 31 L16 20 L25 31 Z" fill="#FFD766" opacity="0.9" />
            <path d="M10 31 L16 42 L25 31 Z" fill="#F5B528" opacity="0.5" />
          </svg>
        </div>

        {NODE_DOTS.map((d, i) => (
          <div
            key={i}
            className="pp-logo-node-dot"
            style={{ top: d.top, left: d.left, animationDelay: d.delay }}
          />
        ))}

        <div className="pp-logo-orbit-track">
          <div className="pp-logo-orbit-dot" />
        </div>
      </div>

      {/* Name */}
      <div className="pp-logo-name">
        <span className="pp-logo-penny">Penny</span>
        <span className="pp-logo-pilot">Pilot</span>
      </div>
    </div>
  )
}

export default LogoAnimation