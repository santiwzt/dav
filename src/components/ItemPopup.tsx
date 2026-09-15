import { useGame } from '../context/GameContext'
import { getItemById } from '../data/items'

export default function ItemPopup() {
  const { state, closeItemModal } = useGame()
  if (state.phase !== 'item') return null

  const item = state.activeItemGranted ? getItemById(state.activeItemGranted) : null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-emoji-row">
          <span className="big-emoji">🎁</span>
          <h2>Casillero de objeto</h2>
        </div>

        {item ? (
          <>
            <p style={{ fontWeight: 700 }}>
              {item.emoji} ¡Encontraste el {item.name}!
            </p>
            <p>{item.description}</p>
          </>
        ) : (
          <p>Ya tenés el máximo de 2 objetos guardados, así que esta vez no recibís ninguno nuevo.</p>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={closeItemModal}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
