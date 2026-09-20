import { useState } from 'react'
import type { AvatarId, PlayerColorId, PlayerSetup } from '../types'
import { AVATARS, PLAYER_COLORS, getAvatar, getColor } from '../data/players'
import { loadConfig, saveConfig } from '../utils/storage'
import * as sound from '../utils/sound'

interface Props {
  onBack: () => void
  onStart: (setups: PlayerSetup[]) => void
}

// Arma la lista inicial: usa lo ultimo guardado y evita repetir color o avatar entre jugadores.
function buildPlayers(count: number, base: PlayerSetup[] = []): PlayerSetup[] {
  const saved = loadConfig()
  const players: PlayerSetup[] = []
  for (let i = 0; i < count; i++) {
    const candidate = base[i] ?? saved?.players[i]
    const usedColors = players.map((p) => p.color)
    const usedAvatars = players.map((p) => p.avatar)
    const color =
      candidate?.color && !usedColors.includes(candidate.color)
        ? candidate.color
        : (PLAYER_COLORS.find((c) => !usedColors.includes(c.id))?.id ?? PLAYER_COLORS[0].id)
    const avatar =
      candidate?.avatar && !usedAvatars.includes(candidate.avatar)
        ? candidate.avatar
        : (AVATARS.find((a) => !usedAvatars.includes(a.id))?.id ?? AVATARS[0].id)
    players.push({ name: candidate?.name ?? `Jugador ${i + 1}`, avatar, color })
  }
  return players
}

export default function GameSetup({ onBack, onStart }: Props) {
  const initialCount = Math.min(Math.max(loadConfig()?.playerCount ?? 2, 2), 4)
  const [playerCount, setPlayerCount] = useState(initialCount)
  const [players, setPlayers] = useState<PlayerSetup[]>(() => buildPlayers(initialCount))

  const allNamed = players.every((p) => p.name.trim().length > 0)

  function chooseCount(next: number) {
    sound.playClick()
    setPlayerCount(next)
    setPlayers((current) => buildPlayers(next, current))
  }

  function updatePlayer(index: number, patch: Partial<PlayerSetup>) {
    setPlayers((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)))
  }

  // Si otro jugador ya tiene ese color/avatar, se intercambian (nunca quedan repetidos).
  function pick<K extends 'color' | 'avatar'>(index: number, key: K, value: PlayerSetup[K]) {
    sound.playClick()
    setPlayers((prev) => {
      const takenBy = prev.findIndex((p, i) => i !== index && p[key] === value)
      return prev.map((p, i) => {
        if (i === index) return { ...p, [key]: value }
        if (i === takenBy) return { ...p, [key]: prev[index][key] }
        return p
      })
    })
  }

  function handleStart() {
    if (!allNamed) return
    const finalPlayers = players.map((p) => ({ ...p, name: p.name.trim() }))
    saveConfig({ playerCount, players: finalPlayers })
    sound.playClick()
    onStart(finalPlayers)
  }

  return (
    <div className="setup">
      <div className="setup-inner">
        <div className="setup-header">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            ← Volver
          </button>
          <div className="setup-heading">
            <h2>Preparar partida</h2>
            <p>Elegí cuántos juegan y armá a cada jugador.</p>
          </div>
          <span className="setup-header-spacer" />
        </div>

        <section className="setup-section" aria-labelledby="count-label">
          <h3 id="count-label">¿Cuántos jugadores?</h3>
          <div className="setup-count" role="radiogroup" aria-labelledby="count-label">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={playerCount === n}
                className={`setup-count-btn ${playerCount === n ? 'selected' : ''}`}
                onClick={() => chooseCount(n)}
              >
                <span className="setup-count-num">{n}</span>
                <span className="setup-count-people">{'🧑'.repeat(n)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="setup-cards">
          {players.map((player, index) => {
            const color = getColor(player.color)
            const avatar = getAvatar(player.avatar)
            const empty = player.name.trim().length === 0
            return (
              <div className="setup-card" key={index} style={{ ['--pc' as string]: color.hex }}>
                <div className="setup-card-top">
                  <span className="setup-card-label">Jugador {index + 1}</span>
                  <span className="setup-preview" aria-hidden="true">
                    {avatar.emoji}
                  </span>
                </div>

                <div className="setup-card-body">
                  <label className="setup-field">
                    <span>Nombre</span>
                    <input
                      type="text"
                      value={player.name}
                      maxLength={14}
                      placeholder={`Jugador ${index + 1}`}
                      aria-invalid={empty}
                      onChange={(e) => updatePlayer(index, { name: e.target.value })}
                    />
                    {empty && <em className="setup-error">Escribí un nombre para jugar</em>}
                  </label>

                  <div className="setup-field">
                    <span>Ficha</span>
                    <div className="setup-avatars">
                      {AVATARS.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          className={`setup-avatar ${player.avatar === a.id ? 'selected' : ''}`}
                          title={a.label}
                          aria-label={`${a.label}${player.avatar === a.id ? ' (elegida)' : ''}`}
                          aria-pressed={player.avatar === a.id}
                          onClick={() => pick(index, 'avatar', a.id as AvatarId)}
                        >
                          {a.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="setup-field">
                    <span>Color</span>
                    <div className="setup-colors">
                      {PLAYER_COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          className={`setup-color ${player.color === c.id ? 'selected' : ''}`}
                          style={{ background: c.hex }}
                          title={c.label}
                          aria-label={`${c.label}${player.color === c.id ? ' (elegido)' : ''}`}
                          aria-pressed={player.color === c.id}
                          onClick={() => pick(index, 'color', c.id as PlayerColorId)}
                        >
                          {player.color === c.id ? '✓' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <div className="setup-bar">
          <button className="home-cta setup-start" onClick={handleStart} disabled={!allNamed}>
            <span className="home-cta-icon">🎲</span> ¡Empezar partida!
          </button>
        </div>
      </div>
    </div>
  )
}
