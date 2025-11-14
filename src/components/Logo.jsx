import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 select-none" aria-label="HomeHero">
      <svg width="28" height="28" viewBox="0 0 256 256" aria-hidden="true">
        <defs>
          <linearGradient id="hhg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb"/>
            <stop offset="1" stopColor="#22c55e"/>
          </linearGradient>
        </defs>
        <path d="M32 128 L128 48 L224 128 V224 H160 V160 H96 V224 H32 Z" fill="url(#hhg)"/>
        <path d="M152 100 L124 152 H152 L134 196 L188 128 H152 Z" fill="#fff"/>
      </svg>
      <span
        className="font-display text-xl md:text-2xl bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#2563eb,#22c55e)" }}
      >
        HomeHero
      </span>
    </Link>
  );
}