import { useState } from 'react'

// Retrato de cada personaje: un emblema geometrico (no una ilustracion de rostro),
// en linea con el resto del diseño — un color por personaje y un icono simple que
// representa su rol. Si existe public/portraits/<id>.png esa imagen se usa en su
// lugar (ver mas abajo), asi se puede reemplazar sin tocar el codigo.

type IconId = 'crown' | 'star' | 'scroll' | 'diadem' | 'wheel' | 'swords' | 'lamp' | 'altar' | 'flame' | 'shield' | 'stone' | 'scales'

interface Emblem {
  color: string
  colorDeep: string
  icon: IconId
}

const EMBLEMS: Record<string, Emblem> = {
  david: { color: '#2c5187', colorDeep: '#1c3766', icon: 'crown' },
  shlomo: { color: '#a9772f', colorDeep: '#7d5a22', icon: 'star' },
  natan: { color: '#5f4a86', colorDeep: '#453465', icon: 'scroll' },
  batsheba: { color: '#a53b32', colorDeep: '#7c2c25', icon: 'diadem' },
  adonia: { color: '#8a4a2e', colorDeep: '#66371f', icon: 'wheel' },
  yoab: { color: '#4a5568', colorDeep: '#333c49', icon: 'swords' },
  ebiatar: { color: '#3a6b6b', colorDeep: '#294c4c', icon: 'lamp' },
  tzadok: { color: '#2f7a5c', colorDeep: '#215941', icon: 'altar' },
  abishag: { color: '#b3872e', colorDeep: '#8a6a24', icon: 'flame' },
  benaia: { color: '#2c5187', colorDeep: '#1c3766', icon: 'shield' },
  shimhi: { color: '#5a6274', colorDeep: '#40465a', icon: 'stone' },
  'dos-mujeres': { color: '#5f4a86', colorDeep: '#453465', icon: 'scales' },
}

function Icon({ id }: { id: IconId }) {
  const p = { fill: 'none', stroke: '#f6f1e6', strokeWidth: 4.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'crown':
      return (
        <path {...p} d="M22 66 L26 34 L42 50 L50 26 L58 50 L74 34 L78 66 Z M22 66 L78 66" />
      )
    case 'star':
      return (
        <g {...p}>
          <polygon points="50,22 61,42 84,42 65,55 73,77 50,63 27,77 35,55 16,42 39,42" />
        </g>
      )
    case 'scroll':
      return (
        <g {...p}>
          <rect x="28" y="30" width="44" height="40" rx="4" />
          <line x1="38" y1="42" x2="62" y2="42" />
          <line x1="38" y1="52" x2="62" y2="52" />
          <line x1="38" y1="62" x2="54" y2="62" />
        </g>
      )
    case 'diadem':
      return (
        <g {...p}>
          <path d="M22 62 Q50 32 78 62" />
          <circle cx="50" cy="40" r="5" fill="#f6f1e6" stroke="none" />
          <circle cx="34" cy="52" r="3.2" fill="#f6f1e6" stroke="none" />
          <circle cx="66" cy="52" r="3.2" fill="#f6f1e6" stroke="none" />
        </g>
      )
    case 'wheel':
      return (
        <g {...p}>
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="6" fill="#f6f1e6" stroke="none" />
          <line x1="50" y1="24" x2="50" y2="76" />
          <line x1="24" y1="50" x2="76" y2="50" />
          <line x1="32" y1="32" x2="68" y2="68" />
          <line x1="68" y1="32" x2="32" y2="68" />
        </g>
      )
    case 'swords':
      return (
        <g {...p}>
          <line x1="28" y1="28" x2="72" y2="72" />
          <line x1="72" y1="28" x2="28" y2="72" />
          <line x1="24" y1="76" x2="34" y2="66" />
          <line x1="76" y1="76" x2="66" y2="66" />
        </g>
      )
    case 'lamp':
      return (
        <g {...p}>
          <path d="M32 58 Q32 76 50 76 Q68 76 68 58 Q68 44 50 40 Q32 44 32 58Z" />
          <line x1="50" y1="40" x2="50" y2="24" />
          <path d="M42 26 Q50 16 58 26" />
        </g>
      )
    case 'altar':
      return (
        <g {...p}>
          <rect x="30" y="46" width="40" height="28" />
          <line x1="24" y1="74" x2="76" y2="74" />
          <path d="M40 46 Q50 26 60 46" />
        </g>
      )
    case 'flame':
      return <path {...p} d="M50 24 Q64 42 58 56 Q56 62 50 62 Q44 62 42 56 Q36 42 50 24Z M50 62 Q50 74 50 76" />
    case 'shield':
      return <path {...p} d="M50 24 L74 34 Q74 62 50 78 Q26 62 26 34 Z M40 50 L47 58 L62 40" />
    case 'stone':
      return <path {...p} d="M30 62 Q24 46 40 38 Q54 28 68 40 Q80 48 72 62 Q62 76 50 74 Q38 76 30 62Z" />
    case 'scales':
      return (
        <g {...p}>
          <line x1="50" y1="24" x2="50" y2="70" />
          <line x1="28" y1="32" x2="72" y2="32" />
          <line x1="28" y1="32" x2="20" y2="52" />
          <line x1="28" y1="32" x2="36" y2="52" />
          <line x1="72" y1="32" x2="64" y2="52" />
          <line x1="72" y1="32" x2="80" y2="52" />
          <line x1="38" y1="76" x2="62" y2="76" />
        </g>
      )
    default:
      return null
  }
}

const failedImages = new Set<string>()

export default function CharacterPortrait({ id, className }: { id: string; className?: string }) {
  const [failed, setFailed] = useState(failedImages.has(id))
  const emblem = EMBLEMS[id]

  if (!failed) {
    return (
      <img
        className={`portrait ${className ?? ''}`}
        src={`${import.meta.env.BASE_URL}portraits/${id}.png`}
        alt=""
        onError={() => {
          failedImages.add(id)
          setFailed(true)
        }}
      />
    )
  }

  if (!emblem) return <svg className={`portrait ${className ?? ''}`} viewBox="0 0 100 100" />

  return (
    <svg className={`portrait ${className ?? ''}`} viewBox="0 0 100 100" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={emblem.color} />
          <stop offset="1" stopColor={emblem.colorDeep} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#g-${id})`} />
      <Icon id={emblem.icon} />
    </svg>
  )
}
