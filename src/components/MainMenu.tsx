import type { GameScreen } from '../types'
import SoundToggle from './SoundToggle'
import { useCollection } from '../context/CollectionContext'
import { CHARACTERS } from '../data/characters'

interface Props {
  onNavigate: (screen: GameScreen) => void
  soundOn: boolean
  onToggleSound: () => void
}

// Textura de fondo: una trama geometrica sutil de dos triangulos superpuestos
// (motivo clasico, sin ilustrar escenas), en un solo tono dorado muy tenue.
function HomeScenery() {
  return (
    <svg className="home-scenery" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="starTile" width="66" height="76" patternUnits="userSpaceOnUse">
          <g stroke="#c9a24a" strokeWidth="0.6" fill="none" opacity="0.5">
            <polygon points="33,4 60,50 6,50" />
            <polygon points="33,72 6,26 60,26" />
          </g>
        </pattern>
        <radialGradient id="heroGlow" cx="50%" cy="0%" r="75%">
          <stop offset="0" stopColor="#3a4a7a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3a4a7a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#starTile)" />
      <rect width="400" height="260" fill="url(#heroGlow)" />
    </svg>
  )
}

function Emblem() {
  return (
    <svg className="home-emblem" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <polygon points="24,6 40,34 8,34" stroke="currentColor" strokeWidth="1.6" />
      <polygon points="24,42 8,14 40,14" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
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
      <section className="home-hero">
        <HomeScenery />
        <div className="home-sound">
          <SoundToggle soundOn={soundOn} onToggle={onToggleSound} />
        </div>

        <div className="home-content">
          <Emblem />
          <p className="home-kicker">Melajim I · 1 Reyes · Capítulos 1–3</p>
          <h1 className="home-title">
            El Reino <span>en Juego</span>
          </h1>
          <div className="home-rule" />
          <p className="home-sub">
            Un juego de tablero sobre la sucesión de David y la sabiduría de Shlomó. Tirá el dado, respondé la
            trivia y sé el primero en llegar al trono.
          </p>

          <button className="home-cta" onClick={() => onNavigate('setup')}>
            <span className="home-cta-icon">▸</span> Jugar
          </button>
          <p className="home-meta">2 a 4 jugadores · en la misma pantalla</p>
        </div>
      </section>

      <section className="home-below">
        <div className="home-grid">
          {cards.map((c) => (
            <button key={c.screen} className="home-card" onClick={() => onNavigate(c.screen)}>
              <span className="home-card-emoji">{c.emoji}</span>
              <span className="home-card-title">{c.title}</span>
              <span className="home-card-sub">{c.sub}</span>
            </button>
          ))}
        </div>
      </section>

      <p className="home-footer">Proyecto de Cultura Judía · 4.º año</p>
    </div>
  )
}
