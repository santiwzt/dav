import { useState } from 'react'
import { CHARACTERS } from '../data/characters'
import { ACHIEVEMENTS } from '../data/achievements'
import { useCollection } from '../context/CollectionContext'
import CharacterModal from './CharacterModal'
import CharacterPortrait from './CharacterPortrait'
import type { CharacterDef } from '../types'

interface Props {
  onBack: () => void
}

type Tab = 'personajes' | 'logros'

export default function CollectionScreen({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('personajes')
  const [selected, setSelected] = useState<CharacterDef | null>(null)
  const collection = useCollection()

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>🗂️ Colección</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="tabs-row">
          <button className={`tab-btn ${tab === 'personajes' ? 'active' : ''}`} onClick={() => setTab('personajes')}>
            Personajes ({collection.unlockedCharacterIds.length}/{CHARACTERS.length})
          </button>
          <button className={`tab-btn ${tab === 'logros' ? 'active' : ''}`} onClick={() => setTab('logros')}>
            Logros ({collection.unlockedAchievements.length}/{ACHIEVEMENTS.length})
          </button>
        </div>

        {tab === 'personajes' && (
          <div className="character-grid">
            {CHARACTERS.map((c) => {
              const unlocked = collection.isCharacterUnlocked(c.id)
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`character-card ${unlocked ? '' : 'locked'}`}
                  onClick={() => unlocked && setSelected(c)}
                >
                  <div className="card-avatar" style={{ background: unlocked ? c.color : undefined }}>
                    {unlocked ? <CharacterPortrait id={c.id} /> : '❔'}
                  </div>
                  <div className="card-title">{unlocked ? c.name : '???'}</div>
                  <div className="card-role">{unlocked ? c.role : 'Bloqueado'}</div>
                </button>
              )
            })}
          </div>
        )}

        {tab === 'logros' && (
          <div className="achievements-list">
            {ACHIEVEMENTS.map((a) => {
              const unlockedEntry = collection.unlockedAchievements.find((u) => u.id === a.id)
              const unlocked = Boolean(unlockedEntry)
              return (
                <div className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`} key={a.id}>
                  <div className="ach-emoji">{a.emoji}</div>
                  <div>
                    <h3>{a.name}</h3>
                    <p>{a.description}</p>
                    {unlocked && unlockedEntry && (
                      <div className="achievement-date">
                        Desbloqueado el {new Date(unlockedEntry.unlockedAt).toLocaleDateString('es-AR')}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
