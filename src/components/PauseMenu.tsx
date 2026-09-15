interface Props {
  onResume: () => void
  onExitToMenu: () => void
}

export default function PauseMenu({ onResume, onExitToMenu }: Props) {
  return (
    <div className="pause-overlay">
      <div className="pause-card">
        <h2>⏸️ Pausa</h2>
        <button className="btn btn-primary" onClick={onResume}>
          ▶️ Continuar
        </button>
        <button className="btn btn-danger" onClick={onExitToMenu}>
          🚪 Salir al menú
        </button>
      </div>
    </div>
  )
}
