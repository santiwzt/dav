import { useGame } from '../context/GameContext'

// Patrones de pips (puntos) para cada cara del dado, en una grilla de 3x3.
// Cada patrón lista las celdas activas (0-8, fila por fila).
const PIP_PATTERNS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

const ROLL_FLAVOR: Record<number, string> = {
  1: 'Pasito corto, pero seguimos.',
  2: 'De a poco se llega al trono.',
  3: '¡Buen avance!',
  4: '¡Eso es jugar bien!',
  5: '¡Casi un salto real!',
  6: '¡Tremenda tirada!',
}

export default function Dice() {
  const { state, rollDice } = useGame()
  const canRoll = state.phase === 'idle' && !state.isPaused && state.winnerId === null
  const isRolling = state.phase === 'rolling'
  const isMoving = state.phase === 'moving'

  const pips = state.diceValue ? PIP_PATTERNS[state.diceValue] : []

  return (
    <div className="dice-panel">
      <div className={`dice-cube ${isRolling ? 'rolling' : ''}`}>
        <div className="dice-face">
          {pips.length === 0 ? (
            <span className="dice-placeholder">🎲</span>
          ) : (
            Array.from({ length: 9 }, (_, i) => <span key={i} className={`pip ${pips.includes(i) ? 'on' : ''}`} />)
          )}
        </div>
      </div>

      <div className="dice-flavor" aria-live="polite">
        {!isRolling && !isMoving && state.diceValue ? ROLL_FLAVOR[state.diceValue] : ' '}
      </div>

      <button className="btn btn-primary btn-block" onClick={rollDice} disabled={!canRoll}>
        {isRolling || isMoving ? 'Moviendo...' : '🎲 Tirar dado'}
      </button>
    </div>
  )
}
