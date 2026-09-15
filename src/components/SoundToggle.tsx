interface Props {
  soundOn: boolean
  onToggle: () => void
}

export default function SoundToggle({ soundOn, onToggle }: Props) {
  return (
    <button
      className="icon-btn"
      onClick={onToggle}
      aria-label={soundOn ? 'Silenciar sonido' : 'Activar sonido'}
      title={soundOn ? 'Silenciar sonido' : 'Activar sonido'}
    >
      {soundOn ? '🔊' : '🔇'}
    </button>
  )
}
