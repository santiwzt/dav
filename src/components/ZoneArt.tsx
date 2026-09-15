// Ilustraciones SVG simples de fondo para cada zona del tablero.
// Formas planas, sin fotos, pensadas para verse detras de los casilleros con opacidad baja.

export function ZoneArt1() {
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.5 }}>
      {/* Carpa / tienda */}
      <polygon points="90,170 150,80 210,170" fill="#2b8dbd" />
      <polygon points="115,170 150,110 185,170" fill="#d9f0fa" />
      <rect x="145" y="60" width="10" height="25" fill="#1f2a44" />
      {/* Palmeras */}
      <g transform="translate(600,0)">
        <rect x="30" y="90" width="10" height="80" fill="#8a5a3a" />
        <path d="M35 95 Q -10 60 -30 90 Q 0 85 35 95Z" fill="#45b787" />
        <path d="M35 95 Q 80 55 100 85 Q 65 82 35 95Z" fill="#45b787" />
        <path d="M35 95 Q 10 40 -5 55 Q 20 65 35 95Z" fill="#45b787" />
        <path d="M35 95 Q 60 40 75 55 Q 50 65 35 95Z" fill="#45b787" />
      </g>
      <g transform="translate(700,20)">
        <rect x="30" y="90" width="8" height="70" fill="#8a5a3a" />
        <path d="M34 95 Q 0 65 -15 88 Q 12 82 34 95Z" fill="#45b787" />
        <path d="M34 95 Q 68 60 85 82 Q 55 80 34 95Z" fill="#45b787" />
        <path d="M34 95 Q 20 45 5 55 Q 22 65 34 95Z" fill="#45b787" />
      </g>
    </svg>
  )
}

export function ZoneArt2() {
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.5 }}>
      {[80, 220, 360, 500, 640, 760].map((x, i) => (
        <g key={i}>
          <rect x={x} y={40} width="34" height="130" fill="#d98d1f" />
          <rect x={x - 8} y={30} width="50" height="14" fill="#c2790f" />
          <rect x={x - 8} y={168} width="50" height="14" fill="#c2790f" />
          <rect x={x + 4} y={45} width="4" height="120" fill="#f2c07a" opacity="0.6" />
          <rect x={x + 22} y={45} width="4" height="120" fill="#f2c07a" opacity="0.6" />
        </g>
      ))}
    </svg>
  )
}

export function ZoneArt3() {
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.5 }}>
      {/* Templo simple */}
      <g transform="translate(80,20)">
        <polygon points="0,60 90,10 180,60" fill="#6f45a0" />
        <rect x="10" y="60" width="160" height="90" fill="#8a5fbf" />
        {[20, 55, 90, 125, 150].map((x, i) => (
          <rect key={i} x={x} y={70} width="12" height="80" fill="#ece1f7" />
        ))}
      </g>
      {/* Balanza (juicio de Shlomo) */}
      <g transform="translate(560,20)">
        <rect x="58" y="10" width="6" height="120" fill="#6f45a0" />
        <rect x="20" y="10" width="100" height="6" fill="#6f45a0" />
        <line x1="30" y1="16" x2="10" y2="60" stroke="#6f45a0" strokeWidth="3" />
        <line x1="90" y1="16" x2="110" y2="60" stroke="#6f45a0" strokeWidth="3" />
        <circle cx="10" cy="70" r="18" fill="none" stroke="#6f45a0" strokeWidth="4" />
        <circle cx="110" cy="70" r="18" fill="none" stroke="#6f45a0" strokeWidth="4" />
        <polygon points="43,130 79,130 61,150" fill="#6f45a0" />
      </g>
    </svg>
  )
}
