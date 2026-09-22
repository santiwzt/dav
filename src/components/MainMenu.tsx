import type { GameScreen } from '../types'
import SoundToggle from './SoundToggle'
import { useCollection } from '../context/CollectionContext'
import { CHARACTERS } from '../data/characters'

interface Props {
  onNavigate: (screen: GameScreen) => void
  soundOn: boolean
  onToggleSound: () => void
}

const BUILDINGS: [number, number, number, string][] = [
  [180, 70, 90, '#e9dcc4'],
  [250, 54, 130, '#f3e8d2'],
  [304, 80, 100, '#e9dcc4'],
  [384, 46, 150, '#f3e8d2'],
  [430, 90, 84, '#e2d3b6'],
  [1010, 60, 110, '#f3e8d2'],
  [1250, 70, 96, '#e9dcc4'],
  [1320, 50, 132, '#f3e8d2'],
]

function HomeScenery() {
  return (
    <svg className="home-scenery" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fc3f0" />
          <stop offset="0.55" stopColor="#cdeefb" />
          <stop offset="0.82" stopColor="#fff0cf" />
        </linearGradient>
        <radialGradient id="hSun">
          <stop offset="0" stopColor="#fff2a8" stopOpacity="1" />
          <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#hSky)" />
      <circle cx="1180" cy="150" r="150" fill="url(#hSun)" />
      <circle cx="1180" cy="150" r="58" fill="#ffe27a" />

      <g className="home-cloud c1" fill="#fff" opacity="0.92">
        <ellipse cx="200" cy="120" rx="70" ry="24" />
        <ellipse cx="160" cy="104" rx="36" ry="24" />
        <ellipse cx="236" cy="100" rx="44" ry="28" />
      </g>
      <g className="home-cloud c2" fill="#fff" opacity="0.85">
        <ellipse cx="700" cy="70" rx="60" ry="20" />
        <ellipse cx="672" cy="56" rx="30" ry="20" />
        <ellipse cx="730" cy="52" rx="36" ry="22" />
      </g>
      <g className="home-cloud c3" fill="#fff" opacity="0.8">
        <ellipse cx="1000" cy="230" rx="52" ry="17" />
        <ellipse cx="978" cy="218" rx="26" ry="17" />
        <ellipse cx="1030" cy="214" rx="30" ry="19" />
      </g>

      <path d="M0 660 L170 570 L330 640 L520 548 L720 650 L940 566 L1140 640 L1300 578 L1440 630 V900 H0Z" fill="#c7b6ec" opacity="0.7" />

      {/* Ciudad */}
      <g>
        {BUILDINGS.map(([x, w, h, c], i) => (
          <g key={i}>
            <rect x={x} y={720 - h} width={w} height={h + 40} fill={c} />
            {Array.from({ length: Math.floor(w / 14) }, (_, k) => (
              <rect key={k} x={x + 2 + k * 14} y={720 - h - 8} width="9" height="8" fill={c} />
            ))}
            <rect x={x + w / 2 - 5} y={720 - h + 22} width="10" height="16" rx="5" fill="#b79a68" opacity="0.7" />
          </g>
        ))}
        <polygon points="384,570 407,536 430,570" fill="#e6573f" />
        <polygon points="250,590 277,552 304,590" fill="#e6573f" />
        <polygon points="1320,588 1345,552 1370,588" fill="#e6573f" />
        {/* Templo */}
        <g transform="translate(1090 560)">
          <polygon points="0,52 80,0 160,52" fill="#f2b632" stroke="#c98a12" strokeWidth="3" />
          <rect x="6" y="52" width="148" height="12" fill="#fff6e0" />
          {[14, 42, 70, 98, 126].map((x) => (
            <rect key={x} x={x} y="64" width="16" height="96" fill="#fff6e0" stroke="#e9c47a" strokeWidth="2" />
          ))}
          <rect x="0" y="160" width="160" height="12" fill="#e9c47a" />
        </g>
      </g>

      <path d="M0 740 C240 690 480 730 720 716 S1200 690 1440 728 V900 H0Z" fill="#7fd1a6" />
      <path d="M0 810 C300 760 600 812 900 786 S1300 776 1440 806 V900 H0Z" fill="#45b787" />

      {/* Camino que llega al centro */}
      <path d="M720 900 C640 850 800 810 720 770 C670 745 740 730 720 716" fill="none" stroke="#fff8ec" strokeWidth="44" strokeLinecap="round" opacity="0.85" />
      <path d="M720 900 C640 850 800 810 720 770 C670 745 740 730 720 716" fill="none" stroke="#f2a93b" strokeWidth="4" strokeDasharray="6 16" strokeLinecap="round" />

      {/* Palmeras */}
      {[
        [92, 830, 1.3],
        [1352, 836, 1.2],
        [200, 850, 0.9],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0 Q10 -60 4 -124" stroke="#8a5a3a" strokeWidth="12" fill="none" strokeLinecap="round" />
          <g fill="#2f9f74">
            <path d="M4 -124 Q-56 -156 -92 -110 Q-40 -126 4 -124Z" />
            <path d="M4 -124 Q66 -160 100 -112 Q48 -128 4 -124Z" />
            <path d="M4 -124 Q-26 -190 -62 -180 Q-24 -160 4 -124Z" />
            <path d="M4 -124 Q34 -192 72 -182 Q30 -160 4 -124Z" />
          </g>
        </g>
      ))}
    </svg>
  )
}

export default function MainMenu({ onNavigate, soundOn, onToggleSound }: Props) {
  const { unlockedCharacterIds } = useCollection()

  const cards: { screen: GameScreen; emoji: string; title: string; sub: string }[] = [
    { screen: 'rules', emoji: '📋', title: 'Reglas', sub: 'Cómo se juega' },
    { screen: 'content', emoji: '🧠', title: 'Contenido', sub: 'Qué se aprende' },
    { screen: 'story', emoji: '📖', title: 'Historia', sub: 'Melajim I, 1–3' },
    { screen: 'characters', emoji: '🗂️', title: 'Personajes', sub: `${unlockedCharacterIds.length}/${CHARACTERS.length} y logros` },
    { screen: 'credits', emoji: '✨', title: 'Créditos', sub: 'Quiénes lo hicieron' },
  ]

  return (
    <div className="home">
      <div
        style={{
          position: 'fixed',
          top: 4,
          left: 4,
          zIndex: 999,
          background: '#000',
          color: '#0f0',
          fontFamily: 'monospace',
          fontSize: 12,
          padding: '2px 6px',
          borderRadius: 4,
        }}
      >
        {typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight} (DPR ${window.devicePixelRatio})` : ''}
      </div>
      <HomeScenery />
      <div className="home-sound">
        <SoundToggle soundOn={soundOn} onToggle={onToggleSound} />
      </div>

      <main className="home-content">
        <div className="home-badge">👑</div>
        <p className="home-kicker">Melajim I · 1 Reyes · Capítulos 1 a 3</p>
        <h1 className="home-title">
          El Reino <span>en Juego</span>
        </h1>
        <p className="home-sub">
          Tirá el dado, respondé la trivia y recorré la sucesión de David y la sabiduría de Shlomó. ¡Gana quien
          llega primero al trono!
        </p>

        <button className="home-cta" onClick={() => onNavigate('setup')}>
          <span className="home-cta-icon">🎲</span> ¡Jugar!
        </button>
        <p className="home-meta">2 a 4 jugadores · en la misma pantalla</p>

        <div className="home-grid">
          {cards.map((c) => (
            <button key={c.screen} className="home-card" onClick={() => onNavigate(c.screen)}>
              <span className="home-card-emoji">{c.emoji}</span>
              <span className="home-card-title">{c.title}</span>
              <span className="home-card-sub">{c.sub}</span>
            </button>
          ))}
        </div>

      </main>
    </div>
  )
}
