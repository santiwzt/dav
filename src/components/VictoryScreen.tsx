import { useGame } from '../context/GameContext'
import { getAvatar, getColor } from '../data/players'
import Confetti from './Confetti'

interface Props {
  onRestart: () => void
  onExitToMenu: () => void
}

export default function VictoryScreen({ onRestart, onExitToMenu }: Props) {
  const { state } = useGame()
  if (!state.gameStats) return null
  const winner = state.players.find((p) => p.id === state.gameStats!.winnerId)
  if (!winner) return null

  const avatar = getAvatar(winner.avatar)
  const color = getColor(winner.color)
  const totalAnswers = winner.correctAnswers + winner.wrongAnswers
  const accuracy = totalAnswers > 0 ? Math.round((winner.correctAnswers / totalAnswers) * 100) : 0

  return (
    <div className="victory-screen">
      <Confetti />
      <div className="victory-trophy">🏆</div>
      <h1 className="menu-title">
        ¡Ganó <span style={{ color: color.hex }}>{winner.name}</span>!
      </h1>
      <p className="menu-subtitle">
        {avatar.emoji} Coronado tras {state.gameStats.turns} turnos de aventura por el reino de Israel.
      </p>

      <div className="victory-stats">
        <div className="stat-card">
          <div className="stat-value">{state.gameStats.turns}</div>
          <div className="stat-label">Turnos jugados</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{winner.correctAnswers}</div>
          <div className="stat-label">Trivias correctas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{winner.wrongAnswers}</div>
          <div className="stat-label">Trivias incorrectas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{accuracy}%</div>
          <div className="stat-label">Precisión en trivia</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{winner.historyVisited.length}</div>
          <div className="stat-label">Eventos históricos vistos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{winner.maxTriviaStreak}</div>
          <div className="stat-label">Mejor racha de aciertos</div>
        </div>
      </div>

      <div className="menu-buttons" style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={onRestart}>
          🔁 Jugar de nuevo
        </button>
        <button className="btn btn-ghost" onClick={onExitToMenu}>
          🏠 Volver al menú
        </button>
      </div>
    </div>
  )
}
