interface LogoGlyphProps {
  size?: number;
  className?: string;
}

/**
 * VAELKODE gear glyph, ported verbatim from the wireframe SVG.
 * The `.outer-ring` and `.inner-gear` groups are animated via global CSS
 * (`gear-spin`) when the consumer applies the matching class names.
 */
export function LogoGlyph({ size = 44, className }: LogoGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="VAELKODE"
    >
      <g className="outer-ring" style={{ transformOrigin: "50px 50px" }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#b87333" strokeWidth="1.5" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(184,115,51,0.3)"
          strokeWidth="0.5"
          strokeDasharray="4 3"
        />
        <g fill="#b87333">
          <rect x="47" y="3" width="6" height="10" rx="1" />
          <rect x="47" y="87" width="6" height="10" rx="1" />
          <rect x="3" y="47" width="10" height="6" rx="1" />
          <rect x="87" y="47" width="10" height="6" rx="1" />
          <rect x="20" y="12" width="6" height="9" rx="1" transform="rotate(45 23 16.5)" />
          <rect x="74" y="12" width="6" height="9" rx="1" transform="rotate(-45 77 16.5)" />
          <rect x="20" y="79" width="6" height="9" rx="1" transform="rotate(-45 23 83.5)" />
          <rect x="74" y="79" width="6" height="9" rx="1" transform="rotate(45 77 83.5)" />
        </g>
      </g>
      <g className="inner-gear" style={{ transformOrigin: "50px 50px" }}>
        <line x1="50" y1="20" x2="50" y2="35" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="65" x2="50" y2="80" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="50" x2="35" y2="50" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <line x1="65" y1="50" x2="80" y2="50" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="10" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" fill="#00d4ff" opacity="0.9" />
      </g>
      <g fontSize="5" fill="rgba(184,115,51,0.5)" textAnchor="middle" fontFamily="serif">
        <text x="50" y="10">
          {"\u{10330}"}
        </text>
        <text x="90" y="53">
          {"\u{1033D}"}
        </text>
        <text x="50" y="97">
          {"\u{1033A}"}
        </text>
        <text x="10" y="53">
          {"\u{10332}"}
        </text>
      </g>
    </svg>
  );
}
