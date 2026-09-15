import { useGame } from '../context/GameContext'
import { getKingdomEventById } from '../data/kingdomEvents'

export default function KingdomEventPopup() {
  const { state, closeEventModal } = useGame()
  const eventDef = state.activeKingdomEvent ? getKingdomEventById(state.activeKingdomEvent) : null
  if (!eventDef) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-emoji-row">
          <span className="big-emoji">{eventDef.emoji}</span>
          <h2>{eventDef.name}</h2>
        </div>
        <p>{eventDef.description}</p>

        {state.activeKingdomEventEffects.length > 0 && (
          <ul style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {state.activeKingdomEventEffects.map((line, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                • {line}
              </li>
            ))}
          </ul>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={closeEventModal}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
