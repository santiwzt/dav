import { useState } from 'react'
import type { AvatarId, PlayerColorId, PlayerSetup } from '../types'
import { AVATARS, PLAYER_COLORS } from '../data/players'
import { loadConfig, saveConfig } from '../utils/storage'
import * as sound from '../utils/sound'

interface Props {
  onBack: () => void
  onStart: (setups: PlayerSetup[]) => void
}

function defaultPlayers(count: number): PlayerSetup[] {
  const saved = loadConfig()
  const players: PlayerSetup[] = []
  for (let i = 0; i < count; i++) {
    const savedPlayer = saved?.players[i]
    players.push({
      name: savedPlayer?.name || `Jugador ${i + 1}`,
      avatar: savedPlayer?.avatar || AVATARS[i % AVATARS.length].id,
      color: savedPlayer?.color || PLAYER_COLORS[i % PLAYER_COLORS.length].id,
    })
  }
  return players
}

export default function GameSetup({ onBack, onStart }: Props) {
  const initialCount = Math.min(Math.max(loadConfig()?.playerCount ?? 2, 2), 4)
  const [playerCount, setPlayerCount] = useState(initialCount)
  const [players, setPlayers] = useState<PlayerSetup[]>(() => defaultPlayers(initialCount))

  function updateCount(delta: number) {
    setPlayerCount((prev) => {
      const next = Math.min(Math.max(prev + delta, 2), 4)
      setPlayers((currentPlayers) => {
        if (next > currentPlayers.length) {
          const extra = defaultPlayers(next).slice(currentPlayers.length)
          return [...currentPlayers, ...extra]
        }
        return currentPlayers.slice(0, next)
      })
      return next
    })
  }

  function updatePlayer(index: number, patch: Partial<PlayerSetup>) {
    setPlayers((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)))
  }

  function pickColor(index: number, color: PlayerColorId) {
    // Evita que dos jugadores compartan exactamente el mismo color.
    setPlayers((prev) => {
      const takenBy = prev.findIndex((p, i) => i !== index && p.color === color)
      if (takenBy !== -1) {
        const swapped = [...prev]
        swapped[takenBy] = { ...swapped[takenBy], color: prev[index].color }
        swapped[index] = { ...swapped[index], color }
        return swapped
      }
      return prev.map((p, i) => (i === index ? { ...p, color } : p))
    })
  }

  function handleStart() {
    const finalPlayers = players.map((p, i) => ({
      ...p,
      name: p.name.trim() || `Jugador ${i + 1}`,
    }))
    saveConfig({ playerCount, players: finalPlayers })
    sound.playClick()
    onStart(finalPlayers)
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>⚙️ Configurar partida</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="player-count-row">
          <strong>Jugadores:</strong>
          <button className="btn btn-ghost btn-sm" onClick={() => updateCount(-1)} disabled={playerCount <= 2}>
            −
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>
            {playerCount}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={() => updateCount(1)} disabled={playerCount >= 4}>
            +
          </button>
        </div>

        <div className="setup-players">
          {players.map((player, index) => (
            <div
              className="player-config-card"
              key={index}
              style={{ borderColor: PLAYER_COLORS.find((c) => c.id === player.color)?.hex }}
            >
              <label>
                <input
                  type="text"
                  value={player.name}
                  maxLength={16}
                  placeholder={`Jugador ${index + 1}`}
                  onChange={(e) => updatePlayer(index, { name: e.target.value })}
                />
              </label>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '0.3rem' }}>Avatar</div>
                <div className="avatar-picker">
                  {AVATARS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      className={`avatar-btn ${player.avatar === a.id ? 'selected' : ''}`}
                      title={a.label}
                      onClick={() => updatePlayer(index, { avatar: a.id as AvatarId })}
                    >
                      {a.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '0.3rem' }}>Color</div>
                <div className="color-picker">
                  {PLAYER_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`color-swatch ${player.color === c.id ? 'selected' : ''}`}
                      style={{ background: c.hex }}
                      title={c.label}
                      onClick={() => pickColor(index, c.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="setup-actions">
          <button className="btn btn-primary" onClick={handleStart}>
            🎲 Comenzar partida
          </button>
        </div>
      </div>
    </div>
  )
}
