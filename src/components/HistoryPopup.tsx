import { useGame } from '../context/GameContext'
import { getCharacterById } from '../data/characters'

export default function HistoryPopup() {
  const { state, closeHistoryModal } = useGame()
  const event = state.activeHistoryEvent
  if (!event) return null

  const unlockedCharacters = state.activeHistoryUnlockedCharacterIds
    .map((id) => getCharacterById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-emoji-row">
          <span className="big-emoji">📖</span>
          <h2>{event.title}</h2>
        </div>
        <p>{event.text}</p>

        {unlockedCharacters.length > 0 && (
          <div className="unlock-flip-section">
            <p style={{ fontWeight: 700, textAlign: 'center', marginBottom: '0.4rem' }}>
              ¡Nuevo{unlockedCharacters.length > 1 ? 's' : ''} personaje{unlockedCharacters.length > 1 ? 's' : ''}{' '}
              desbloqueado{unlockedCharacters.length > 1 ? 's' : ''}!
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {unlockedCharacters.map((c) => (
                <div className="flip-card-scene" key={c.id}>
                  <div className="flip-card-inner">
                    <div className="flip-card-face back">
                      <span className="card-emoji">❔</span>
                    </div>
                    <div className="flip-card-face" style={{ background: c.color, transform: 'rotateY(0deg)' }}>
                      <span className="card-emoji">{c.emoji}</span>
                      <span className="card-name">{c.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={closeHistoryModal}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
