import { useState } from 'react'
import type { ReactNode } from 'react'

// Retratos ilustrados (SVG original, estilo cartoon) para cada personaje.
// Si existe un archivo public/portraits/<id>.png (ej: public/portraits/david.png) se usa esa imagen
// en lugar del dibujo. Asi se pueden reemplazar los retratos sin tocar el codigo.

type HairStyle = 'none' | 'short' | 'curly' | 'long'
type Beard = 'none' | 'short' | 'long'
type Head = 'none' | 'crown' | 'circlet' | 'helmet' | 'turban' | 'mitre' | 'veil' | 'cloth' | 'headband'
type Prop = 'none' | 'scroll' | 'spear' | 'sword' | 'jar'

interface Look {
  skin: string
  hair: string
  hairStyle: HairStyle
  beard: Beard
  beardColor?: string
  head: Head
  headColor?: string
  robe: string
  robe2: string
  bg: string
  woman?: boolean
  prop?: Prop
}

const GOLD = '#f2b632'
const GOLD_DARK = '#c98a12'

const LOOKS: Record<string, Look> = {
  david: { skin: '#f0c9a0', hair: '#f4f4f4', hairStyle: 'short', beard: 'long', head: 'crown', robe: '#b3282d', robe2: '#e8b84a', bg: '#cfe8f7' },
  shlomo: { skin: '#e6b48a', hair: '#3a2418', hairStyle: 'curly', beard: 'short', head: 'crown', robe: '#2f4fa8', robe2: '#e8b84a', bg: '#fde3b8' },
  natan: { skin: '#e2b287', hair: '#cfcfd4', hairStyle: 'short', beard: 'long', head: 'none', robe: '#8a5a3a', robe2: '#b98252', bg: '#e4d5f5', prop: 'scroll' },
  batsheba: { skin: '#eebd96', hair: '#2b1a14', hairStyle: 'long', beard: 'none', head: 'veil', headColor: '#f6f1e6', robe: '#1f7a7a', robe2: '#e8b84a', bg: '#fbd6d0', woman: true },
  adonia: { skin: '#e6b48a', hair: '#2b1a14', hairStyle: 'short', beard: 'short', head: 'circlet', robe: '#7a1f2b', robe2: '#e8b84a', bg: '#f7d2c8' },
  yoab: { skin: '#d9a273', hair: '#241812', hairStyle: 'none', beard: 'short', head: 'helmet', headColor: '#b98a4a', robe: '#5b6473', robe2: '#b3282d', bg: '#d8dde8', prop: 'sword' },
  ebiatar: { skin: '#e8bd94', hair: '#ececec', hairStyle: 'short', beard: 'long', head: 'turban', headColor: '#f6f1e6', robe: '#2f4fa8', robe2: '#f6f1e6', bg: '#dfe6f5' },
  tzadok: { skin: '#e8bd94', hair: '#bfbfc4', hairStyle: 'short', beard: 'short', beardColor: '#bfbfc4', head: 'mitre', headColor: '#f6f1e6', robe: '#f6f1e6', robe2: '#2f6fbf', bg: '#cfe8f7' },
  abishag: { skin: '#f0c4a0', hair: '#4a2a1a', hairStyle: 'long', beard: 'none', head: 'headband', headColor: '#45b787', robe: '#3f9a6e', robe2: '#f6f1e6', bg: '#d9f5e9', woman: true },
  benaia: { skin: '#d9a273', hair: '#241812', hairStyle: 'short', beard: 'short', head: 'headband', headColor: GOLD, robe: '#9c2b34', robe2: '#5b6473', bg: '#f3dfc6', prop: 'spear' },
  shimhi: { skin: '#d9a877', hair: '#3a2c22', hairStyle: 'short', beard: 'short', beardColor: '#7b7268', head: 'cloth', headColor: '#a98c6a', robe: '#7d6a55', robe2: '#a98c6a', bg: '#e6dfd2' },
}

function Face({ look }: { look: Look }) {
  const w = look.woman ? 31 : 34
  const beardColor = look.beardColor ?? look.hair
  const skinShade = 'rgba(120,60,20,0.25)'
  const browColor = look.hair === '#f4f4f4' || look.hair === '#ececec' || look.hair === '#cfcfd4' ? '#a9a9ae' : look.hair
  return (
    <g>
      {/* pelo de atras */}
      {look.hairStyle === 'long' && (
        <path d="M58 92 Q46 150 62 176 L138 176 Q154 150 142 92 Q100 30 58 92Z" fill={look.hair} />
      )}
      {/* tunica y hombros */}
      <path d="M14 200 Q24 148 100 142 Q176 148 186 200Z" fill={look.robe} />
      <path d="M14 200 Q24 148 100 142 Q176 148 186 200 L172 200 Q166 158 100 152 Q34 158 28 200Z" fill={look.robe2} opacity="0.9" />
      {/* cuello */}
      <rect x="86" y="118" width="28" height="34" fill={look.skin} />
      <rect x="86" y="118" width="28" height="12" fill={skinShade} />
      <path d="M82 146 L100 170 L118 146Z" fill={look.skin} />
      {/* orejas y rostro */}
      <circle cx={100 - w} cy="100" r="6.5" fill={look.skin} />
      <circle cx={100 + w} cy="100" r="6.5" fill={look.skin} />
      <ellipse cx="100" cy="98" rx={w} ry="39" fill={look.skin} />
      {/* mejillas */}
      <circle cx="80" cy="110" r="6" fill="#f08a7a" opacity="0.35" />
      <circle cx="120" cy="110" r="6" fill="#f08a7a" opacity="0.35" />
      {/* barba */}
      {look.beard === 'short' && (
        <path d="M67 104 Q68 146 100 148 Q132 146 133 104 Q124 124 100 124 Q76 124 67 104Z" fill={beardColor} />
      )}
      {look.beard === 'long' && (
        <path d="M65 102 Q56 172 100 188 Q144 172 135 102 Q122 128 100 128 Q78 128 65 102Z" fill={beardColor} />
      )}
      {/* pelo de adelante */}
      {look.hairStyle === 'short' && <path d="M64 96 Q60 52 100 50 Q140 52 136 96 Q130 70 100 68 Q70 70 64 96Z" fill={look.hair} />}
      {look.hairStyle === 'long' && <path d="M64 96 Q62 54 100 52 Q138 54 136 96 Q128 72 100 70 Q72 72 64 96Z" fill={look.hair} />}
      {look.hairStyle === 'curly' && (
        <g fill={look.hair}>
          {[
            [68, 84],
            [72, 66],
            [86, 55],
            [102, 51],
            [118, 55],
            [130, 66],
            [134, 84],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="12" />
          ))}
        </g>
      )}
      {/* ojos, cejas, nariz y boca */}
      <g fill="#1f2a44">
        <circle cx="87" cy="96" r="3.6" />
        <circle cx="113" cy="96" r="3.6" />
      </g>
      <g fill="#fff">
        <circle cx="88.2" cy="94.8" r="1.2" />
        <circle cx="114.2" cy="94.8" r="1.2" />
      </g>
      <g stroke={browColor} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M79 86 Q87 82 95 86" />
        <path d="M105 86 Q113 82 121 86" />
      </g>
      {look.woman && (
        <g stroke="#1f2a44" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M82 92 l-4 -3 M84 90 l-2 -4 M118 92 l4 -3 M116 90 l2 -4" />
        </g>
      )}
      <path d="M100 100 Q94 112 100 114" stroke="rgba(120,60,20,0.55)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M91 121 Q100 129 109 121" stroke={look.woman ? '#c2455a' : '#8a3b2a'} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function HeadGear({ look }: { look: Look }) {
  const c = look.headColor ?? GOLD
  switch (look.head) {
    case 'crown':
      return (
        <g>
          <path d="M68 66 L70 38 L86 54 L100 30 L114 54 L130 38 L132 66Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="68" y="62" width="64" height="9" rx="3" fill={GOLD_DARK} />
          <circle cx="100" cy="47" r="4" fill="#d6304a" />
          <circle cx="82" cy="66" r="2.6" fill="#3dabdb" />
          <circle cx="118" cy="66" r="2.6" fill="#3dabdb" />
        </g>
      )
    case 'circlet':
      return (
        <g>
          <path d="M66 70 Q100 50 134 70" stroke={GOLD} strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="100" cy="58" r="4" fill="#d6304a" />
        </g>
      )
    case 'helmet':
      return (
        <g>
          <path d="M60 86 Q58 40 100 38 Q142 40 140 86 L140 80 Q100 62 60 80Z" fill={c} stroke="#7a5a26" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M100 38 Q108 24 100 14 Q92 24 100 38Z" fill="#b3282d" />
          <rect x="60" y="76" width="80" height="7" rx="3" fill="#7a5a26" />
        </g>
      )
    case 'turban':
      return (
        <g>
          <path d="M60 78 Q60 40 100 38 Q140 40 140 78 Q100 62 60 78Z" fill={c} stroke="#cfc8b8" strokeWidth="2" />
          <path d="M66 70 Q100 54 134 70" stroke="#2f4fa8" strokeWidth="5" fill="none" />
          <path d="M72 52 Q100 40 128 52" stroke="#cfc8b8" strokeWidth="2" fill="none" />
        </g>
      )
    case 'mitre':
      return (
        <g>
          <path d="M66 74 Q66 34 100 26 Q134 34 134 74 Q100 62 66 74Z" fill={c} stroke="#cfc8b8" strokeWidth="2" />
          <rect x="66" y="64" width="68" height="8" rx="3" fill="#2f6fbf" />
          <rect x="91" y="42" width="18" height="16" rx="3" fill={GOLD} stroke={GOLD_DARK} strokeWidth="2" />
        </g>
      )
    case 'veil':
      return (
        <g>
          <path d="M56 96 Q44 36 100 34 Q156 36 144 96 Q142 66 100 60 Q58 66 56 96Z" fill={c} stroke="#dcd3bf" strokeWidth="2" />
          <path d="M56 92 Q42 140 50 178 L68 178 Q62 140 68 104Z" fill={c} stroke="#dcd3bf" strokeWidth="2" />
          <path d="M144 92 Q158 140 150 178 L132 178 Q138 140 132 104Z" fill={c} stroke="#dcd3bf" strokeWidth="2" />
          <path d="M68 68 Q100 54 132 68" stroke={GOLD} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'cloth':
      return (
        <g>
          <path d="M58 96 Q50 40 100 38 Q150 40 142 96 Q140 66 100 62 Q60 66 58 96Z" fill={c} stroke="#7d6a55" strokeWidth="2" />
          <path d="M66 70 Q100 58 134 70" stroke="#7d6a55" strokeWidth="4" fill="none" />
        </g>
      )
    case 'headband':
      return <path d="M64 78 Q100 62 136 78" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
    default:
      return null
  }
}

function PropArt({ prop }: { prop?: Prop }) {
  switch (prop) {
    case 'scroll':
      return (
        <g transform="translate(140 150) rotate(-18)">
          <rect x="0" y="0" width="40" height="20" rx="5" fill="#f6ead0" stroke="#b98a4a" strokeWidth="2" />
          <rect x="-4" y="-2" width="7" height="24" rx="3" fill="#b98a4a" />
          <rect x="37" y="-2" width="7" height="24" rx="3" fill="#b98a4a" />
        </g>
      )
    case 'spear':
      return (
        <g>
          <line x1="30" y1="20" x2="30" y2="200" stroke="#7a5a26" strokeWidth="5" />
          <polygon points="30,4 38,26 22,26" fill="#c9ccd6" stroke="#7a7f8c" strokeWidth="2" />
        </g>
      )
    case 'sword':
      return (
        <g transform="translate(150 60) rotate(30)">
          <rect x="-3" y="-30" width="6" height="70" fill="#c9ccd6" stroke="#7a7f8c" strokeWidth="1.5" />
          <rect x="-12" y="38" width="24" height="6" rx="2" fill={GOLD_DARK} />
          <rect x="-3" y="44" width="6" height="16" fill="#7a5a26" />
        </g>
      )
    case 'jar':
      return (
        <g transform="translate(148 148)">
          <path d="M6 0 h22 q14 12 8 34 h-38 q-6 -22 8 -34z" fill="#c2703a" stroke="#8a4a22" strokeWidth="2" />
        </g>
      )
    default:
      return null
  }
}

function TwoWomen() {
  const woman = (dx: number, veil: string, robe: string): ReactNode => (
    <g transform={`translate(${dx} 20) scale(0.62)`}>
      <Face look={{ ...LOOKS.batsheba, robe, robe2: '#f6f1e6', hair: '#3a2418' }} />
      <HeadGear look={{ ...LOOKS.batsheba, headColor: veil }} />
    </g>
  )
  return (
    <g>
      {woman(-14, '#f6f1e6', '#2f6fbf')}
      {woman(72, '#e9d7f7', '#8a5fbf')}
      {/* balanza al centro */}
      <g transform="translate(78 8) scale(0.55)" stroke="#6f45a0" strokeWidth="4" fill="none" strokeLinecap="round">
        <line x1="20" y1="20" x2="20" y2="70" />
        <line x1="-10" y1="30" x2="50" y2="30" />
        <path d="M-10 30 l-8 22 h16z M50 30 l-8 22 h16z" fill="#ffcf4a" />
      </g>
    </g>
  )
}

const failedImages = new Set<string>()

export default function CharacterPortrait({ id, className }: { id: string; className?: string }) {
  const [failed, setFailed] = useState(failedImages.has(id))
  const look = LOOKS[id]

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

  const bg = id === 'dos-mujeres' ? '#fde3b8' : look?.bg ?? '#e8eaf2'
  return (
    <svg className={`portrait ${className ?? ''}`} viewBox="0 0 200 200" role="img" aria-hidden="true">
      <rect width="200" height="200" fill={bg} />
      <circle cx="100" cy="90" r="80" fill="#fff" opacity="0.35" />
      {id === 'dos-mujeres' ? (
        <TwoWomen />
      ) : look ? (
        <g>
          <PropArt prop={look.prop === 'spear' || look.prop === 'sword' ? look.prop : undefined} />
          <Face look={look} />
          <HeadGear look={look} />
          <PropArt prop={look.prop === 'scroll' || look.prop === 'jar' ? look.prop : undefined} />
        </g>
      ) : null}
    </svg>
  )
}
