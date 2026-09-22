import { getTileCenter, smoothPath, STAGE_W, STAGE_H } from '../utils/boardLayout'
import { BOARD_SIZE } from '../data/boardTiles'

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => getTileCenter(from + i))

// Tramos del camino por capitulo (se solapan en un casillero para que no haya cortes).
const ROAD_SEGMENTS = [
  { d: smoothPath(range(1, 15)), color: '#3dabdb', light: '#bfe6f7' },
  { d: smoothPath(range(14, 28)), color: '#f2a93b', light: '#fde3b8' },
  { d: smoothPath(range(27, BOARD_SIZE)), color: '#8a5fbf', light: '#dccaf3' },
]

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity="0.9">
      <ellipse cx="0" cy="0" rx="34" ry="14" />
      <ellipse cx="-20" cy="-8" rx="18" ry="13" />
      <ellipse cx="12" cy="-12" rx="22" ry="16" />
    </g>
  )
}

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q6 -30 2 -62" stroke="#8a5a3a" strokeWidth="7" fill="none" strokeLinecap="round" />
      <g fill="#45b787">
        <path d="M2 -62 Q-30 -80 -46 -56 Q-20 -64 2 -62Z" />
        <path d="M2 -62 Q34 -82 50 -58 Q24 -66 2 -62Z" />
        <path d="M2 -62 Q-14 -96 -32 -90 Q-10 -80 2 -62Z" />
        <path d="M2 -62 Q20 -98 38 -90 Q14 -80 2 -62Z" />
      </g>
      <circle cx="0" cy="-60" r="4" fill="#8a5a3a" />
    </g>
  )
}

function Tent({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="-34,0 0,-46 34,0" fill="#e6573f" />
      <polygon points="-34,0 0,-46 0,0" fill="#c23f2a" />
      <polygon points="-10,0 0,-22 10,0" fill="#fff8ec" />
      <line x1="0" y1="-46" x2="0" y2="-60" stroke="#1f2a44" strokeWidth="2" />
      <polygon points="0,-60 16,-55 0,-50" fill="#ffcf4a" />
    </g>
  )
}

function Column({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-13" y="0" width="26" height="8" rx="2" fill="#d98d1f" />
      <rect x="-9" y="8" width="18" height={h} fill="#f5c26b" />
      <rect x="-9" y="8" width="5" height={h} fill="#fbe2ae" opacity="0.7" />
      <rect x="-13" y={8 + h} width="26" height="8" rx="2" fill="#d98d1f" />
    </g>
  )
}

export default function BoardScenery() {
  const start = getTileCenter(1)
  const end = getTileCenter(BOARD_SIZE)
  return (
    <svg
      className="board-scenery"
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3f4" />
          <stop offset="1" stopColor="#e4f6fd" />
        </linearGradient>
        <linearGradient id="sand2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset="1" stopColor="#fff0d2" />
        </linearGradient>
        <linearGradient id="night3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9a2ea" />
          <stop offset="1" stopColor="#e6dbf8" />
        </linearGradient>
        <radialGradient id="goldGlow">
          <stop offset="0" stopColor="#ffe27a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="greenGlow">
          <stop offset="0" stopColor="#7fe0b3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7fe0b3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Zona 1 - Capitulo 1: cielo, tienda y palmeras */}
      <path d="M0 0 H1000 V250 C800 270 650 235 450 255 S150 240 0 258 Z" fill="url(#sky1)" />
      <circle cx="905" cy="46" r="26" fill="#ffe27a" />
      <circle cx="905" cy="46" r="40" fill="#ffe27a" opacity="0.28" />
      <Cloud x={170} y={42} />
      <Cloud x={470} y={30} s={0.8} />
      <Cloud x={720} y={62} s={1.1} />
      {/* muralla de la ciudad */}
      <g fill="#c9dff0" opacity="0.9">
        <rect x="520" y="196" width="230" height="46" />
        {[522, 548, 574, 600, 626, 652, 678, 704, 730].map((x) => (
          <rect key={x} x={x} y="188" width="16" height="10" />
        ))}
        <rect x="590" y="160" width="34" height="84" />
        <polygon points="590,160 607,138 624,160" fill="#a9c9e2" />
      </g>
      <path d="M0 230 C120 200 240 214 330 232 L330 260 L0 260Z" fill="#7fd1a6" opacity="0.85" />
      <path d="M700 240 C800 212 900 206 1000 228 L1000 262 L700 262Z" fill="#7fd1a6" opacity="0.85" />
      <Tent x={40} y={172} s={0.9} />
      <Palm x={967} y={196} s={1.05} />
      <Palm x={30} y={70} s={0.75} />

      {/* Zona 2 - Capitulo 2: atardecer, columnas y estandartes */}
      <path d="M0 258 C150 240 300 262 450 255 S800 270 1000 250 V452 C800 470 650 440 450 458 S150 445 0 462 Z" fill="url(#sand2)" />
      <circle cx="120" cy="300" r="34" fill="#ffb15c" opacity="0.55" />
      {[70, 200, 330, 460, 590, 720, 850, 950].map((x, i) => (
        <Column key={x} x={x} y={i % 2 ? 268 : 286} h={i % 2 ? 62 : 44} />
      ))}
      {[135, 395, 655, 915].map((x) => (
        <g key={x}>
          <path d={`M${x} 262 q30 22 60 0`} fill="none" stroke="#e6573f" strokeWidth="3" />
          <polygon points={`${x + 10},270 ${x + 22},270 ${x + 16},290`} fill="#ffcf4a" />
          <polygon points={`${x + 34},270 ${x + 46},270 ${x + 40},290`} fill="#e6573f" />
        </g>
      ))}
      <path d="M0 440 C150 420 260 445 380 430 S620 415 760 436 S900 430 1000 424 V470 H0Z" fill="#f2c07a" opacity="0.6" />

      {/* Zona 3 - Capitulo 3: templo, estrellas y balanza */}
      <path d="M0 462 C150 445 300 465 450 458 S800 440 1000 452 V600 H0 Z" fill="url(#night3)" />
      {[
        [70, 490],
        [180, 560],
        [330, 578],
        [520, 585],
        [700, 572],
        [840, 486],
        [960, 566],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z`} fill="#fff" opacity="0.8" />
      ))}
      <g transform="translate(400 470)" opacity="0.9">
        <polygon points="0,52 100,4 200,52" fill="#8a5fbf" />
        <rect x="10" y="52" width="180" height="16" fill="#6f45a0" />
        {[24, 58, 92, 126, 160].map((x) => (
          <rect key={x} x={x} y="68" width="16" height="58" fill="#ece1f7" />
        ))}
        <rect x="0" y="126" width="200" height="10" fill="#6f45a0" />
        <circle cx="100" cy="34" r="6" fill="#ffcf4a" />
      </g>
      <g transform="translate(70 508)" opacity="0.85">
        <rect x="46" y="10" width="6" height="70" fill="#6f45a0" />
        <rect x="6" y="10" width="86" height="5" fill="#6f45a0" />
        <line x1="14" y1="15" x2="6" y2="42" stroke="#6f45a0" strokeWidth="2" />
        <line x1="14" y1="15" x2="30" y2="42" stroke="#6f45a0" strokeWidth="2" />
        <line x1="84" y1="15" x2="70" y2="42" stroke="#6f45a0" strokeWidth="2" />
        <line x1="84" y1="15" x2="94" y2="42" stroke="#6f45a0" strokeWidth="2" />
        <path d="M2 42 h32 a16 12 0 0 1 -32 0z" fill="#ffcf4a" />
        <path d="M66 42 h32 a16 12 0 0 1 -32 0z" fill="#ffcf4a" />
        <polygon points="36,80 62,80 49,90" fill="#6f45a0" />
      </g>

      {/* Camino: borde, cinta de color por capitulo y linea central */}
      {ROAD_SEGMENTS.map((seg) => (
        <path key={`o-${seg.color}`} d={seg.d} fill="none" stroke="#ffffff" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      ))}
      {ROAD_SEGMENTS.map((seg) => (
        <path key={`c-${seg.color}`} d={seg.d} fill="none" stroke={seg.light} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {ROAD_SEGMENTS.map((seg) => (
        <path key={`d-${seg.color}`} d={seg.d} fill="none" stroke={seg.color} strokeWidth="3" strokeDasharray="4 12" strokeLinecap="round" opacity="0.9" />
      ))}

      {/* Resplandor de salida y llegada */}
      <circle cx={(start.x / 100) * STAGE_W} cy={(start.y / 100) * STAGE_H} r="62" fill="url(#greenGlow)" />
      <circle cx={(end.x / 100) * STAGE_W} cy={(end.y / 100) * STAGE_H} r="78" fill="url(#goldGlow)" />
    </svg>
  )
}
