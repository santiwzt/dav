import type { CharacterDef } from '../types'

interface Props {
  character: CharacterDef
  onClose: () => void
}

const CHAPTER_LABEL: Record<number, string> = { 1: 'Cap. 1', 2: 'Cap. 2', 3: 'Cap. 3' }

export default function CharacterModal({ character, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="character-modal-avatar" style={{ background: character.color }}>
          {character.emoji}
        </div>
        <h2 style={{ textAlign: 'center' }}>{character.name}</h2>
        <p style={{ textAlign: 'center', fontWeight: 700, color: 'var(--ink-soft)' }}>{character.role}</p>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          {character.chapters.map((c) => CHAPTER_LABEL[c]).join(' · ')}
        </p>
        <p style={{ marginTop: '1rem' }}>{character.bio}</p>
        <p className="character-quote">“{character.quote}”</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
