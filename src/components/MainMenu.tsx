import type { GameScreen } from '../types'
import SoundToggle from './SoundToggle'

interface Props {
  onNavigate: (screen: GameScreen) => void
  soundOn: boolean
  onToggleSound: () => void
}

export default function MainMenu({ onNavigate, soundOn, onToggleSound }: Props) {
  return (
    <div className="menu-screen">
      <div className="menu-sound-toggle">
        <SoundToggle soundOn={soundOn} onToggle={onToggleSound} />
      </div>
      <div className="menu-crown">👑</div>
      <h1 className="menu-title">
        El Reino <span>en Juego</span>
      </h1>
      <p className="menu-subtitle">
        Un juego de tablero sobre Melajim I (1 Reyes), capítulos 1 a 3: la sucesión de David, la coronación de
        Shlomó y su famosa sabiduría.
      </p>
      <div className="menu-buttons">
        <button className="btn btn-primary" onClick={() => onNavigate('setup')}>
          🎲 Jugar
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('rules')}>
          📋 Reglas
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('content')}>
          🧠 Contenido
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('story')}>
          📖 Historia
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('characters')}>
          🗂️ Personajes
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate('credits')}>
          ✨ Créditos
        </button>
      </div>
    </div>
  )
}
