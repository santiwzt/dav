import { useState } from 'react'
import { useGame } from '../context/GameContext'
import { getCharacterById } from '../data/characters'
import { getAvatar, getColor } from '../data/players'
import * as sound from '../utils/sound'
import CharacterPortrait from './CharacterPortrait'

// Reparto inicial: a cada jugador le toca una tarjeta de personaje al azar (sin repetir).
// Es solo ambientacion: no cambia ninguna regla ni da ventajas.
export default function CharacterDeal() {
  const { state, finishDealing } = useGame()
  const [revealed, setRevealed] = useState<number[]>([])
  const allRevealed = revealed.length >= state.players.length

  function reveal(id: number) {
    if (revealed.includes(id)) return
    sound.playUnlock()
    setRevealed((prev) => [...prev, id])
  }

  function revealAll() {
    sound.playUnlock()
    setRevealed(state.players.map((p) => p.id))
  }

  return (
    <div className="deal-screen">
      <h1 className="deal-title">🃏 ¡Reparto de personajes!</h1>
      <p className="deal-sub">A cada jugador le toca una tarjeta. Tocá la tuya para darla vuelta.</p>

      <div className="deal-cards">
        {state.players.map((player) => {
          const character = getCharacterById(player.characterId)
          const isRevealed = revealed.includes(player.id)
          const color = getColor(player.color)
          if (!character) return null
          return (
            <div className="deal-slot" key={player.id}>
              <div className="deal-player" style={{ background: color.hex }}>
                {getAvatar(player.avatar).emoji} {player.name}
              </div>
              <button
                type="button"
                className={`deal-card ${isRevealed ? 'revealed' : ''}`}
                onClick={() => reveal(player.id)}
                aria-label={isRevealed ? `${player.name}: ${character.name}` : `Dar vuelta la tarjeta de ${player.name}`}
              >
                <span className="deal-card-inner">
                  <span className="deal-face deal-back">
                    <span className="deal-back-emoji">👑</span>
                    <span>El Reino en Juego</span>
                  </span>
                  <span className="deal-face deal-front" style={{ borderColor: character.color }}>
                    <span className="deal-portrait" style={{ borderColor: character.color }}>
                      <CharacterPortrait id={character.id} />
                    </span>
                    <strong className="deal-name">{character.name}</strong>
                    <span className="deal-role">{character.role}</span>
                    <span className="deal-bio">{character.bio}</span>
                    <em className="deal-quote">“{character.quote}”</em>
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </div>

      <div className="deal-actions">
        {!allRevealed && (
          <button className="btn btn-ghost" onClick={revealAll}>
            Dar vuelta todas
          </button>
        )}
        <button className="btn btn-primary" onClick={finishDealing} disabled={!allRevealed}>
          🎲 ¡A jugar!
        </button>
      </div>
    </div>
  )
}
