import { getTileCenter, smoothPath, STAGE_W, STAGE_H } from '../utils/boardLayout'
import { BOARD_SIZE } from '../data/boardTiles'

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => getTileCenter(from + i))

// Tramos del camino por capitulo (se solapan en un casillero para que no haya cortes).
const ROAD_SEGMENTS = [
  { d: smoothPath(range(1, 15)), color: '#2c5187' },
  { d: smoothPath(range(14, 28)), color: '#a9772f' },
  { d: smoothPath(range(27, BOARD_SIZE)), color: '#5f4a86' },
]

// Fondo: bandas de color solidas por capitulo, con una trama geometrica muy sutil
// (el mismo motivo del inicio) en vez de escenas ilustradas.
export default function BoardScenery() {
  return (
    <svg className="board-scenery" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="zone1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dde6f2" />
          <stop offset="1" stopColor="#eef2f8" />
        </linearGradient>
        <linearGradient id="zone2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0e4cc" />
          <stop offset="1" stopColor="#f8f0dd" />
        </linearGradient>
        <linearGradient id="zone3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6e0ef" />
          <stop offset="1" stopColor="#f2eef8" />
        </linearGradient>
        <pattern id="boardTile" width="72" height="83" patternUnits="userSpaceOnUse">
          <g stroke="#1b2233" strokeWidth="0.6" fill="none" opacity="0.35">
            <polygon points="36,4 65,54 7,54" />
            <polygon points="36,79 7,29 65,29" />
          </g>
        </pattern>
      </defs>

      <rect x="0" y="0" width={STAGE_W} height={STAGE_H * 0.33} fill="url(#zone1)" />
      <rect x="0" y={STAGE_H * 0.33} width={STAGE_W} height={STAGE_H * 0.34} fill="url(#zone2)" />
      <rect x="0" y={STAGE_H * 0.67} width={STAGE_W} height={STAGE_H * 0.33} fill="url(#zone3)" />
      <rect width={STAGE_W} height={STAGE_H} fill="url(#boardTile)" />

      {ROAD_SEGMENTS.map((seg) => (
        <path
          key={`o-${seg.color}`}
          d={seg.d}
          fill="none"
          stroke="#fff"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      ))}
      {ROAD_SEGMENTS.map((seg) => (
        <path
          key={`d-${seg.color}`}
          d={seg.d}
          fill="none"
          stroke={seg.color}
          strokeWidth="1.6"
          strokeDasharray="2 9"
          strokeLinecap="round"
          opacity="0.8"
        />
      ))}
    </svg>
  )
}
