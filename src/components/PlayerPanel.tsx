import { useGame } from '../context/GameContext'
import { getAvatar, getColor } from '../data/players'
import { getItemById } from '../data/items'
import { BOARD_SIZE } from '../data/boardTiles'
import Dice from './Dice'
import { getCharacterById } from '../data/characters'
import CharacterPortrait from './CharacterPortrait'

export default function PlayerPanel() {
  const { state } = useGame()

  return (
    <div className="side-panel">
      <Dice />
      {state.players.map((player, index) => {
        const avatar = getAvatar(player.avatar)
        const color = getColor(player.color)
        const isActive = index === state.currentPlayerIndex
        return (
          <div
            className={`player-card ${isActive ? 'active' : ''}`}
            key={player.id}
            style={{ borderColor: isActive ? undefined : 'transparent' }}
          >
            <div className="avatar-chip" style={{ background: color.hex }}>
              {avatar.emoji}
            </div>
            <div className="player-card-info">
              <div className="name">{player.name}</div>
              {getCharacterById(player.characterId) && (
                <div className="pos">
                  <span className="mini-portrait">
                    <CharacterPortrait id={player.characterId} />
                  </span>
                  {getCharacterById(player.characterId)?.name}
                </div>
              )}
              <div className="pos">
                Casillero {Math.min(player.position, BOARD_SIZE)} / {BOARD_SIZE} · ✅ {player.correctAnswers} · ❌{' '}
                {player.wrongAnswers}
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((player.position / BOARD_SIZE) * 100, 100)}%`,
                    background: color.hex,
                  }}
                />
              </div>
              {player.items.length > 0 && (
                <div className="player-items">
                  {player.items.map((itemId, i) => {
                    const item = getItemById(itemId)
                    return (
                      <span className="item-chip" key={`${itemId}-${i}`} title={item?.name}>
                        {item?.emoji}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div className="board-legend">
        <h4>Casilleros</h4>
        <span>❓ Trivia</span>
        <span>📖 Historia</span>
        <span>⭐ Bonus +2</span>
        <span>⚠️ Retroceso -2</span>
        <span>🎁 Objeto</span>
        <span>📯 Evento</span>
      </div>
    </div>
  )
}
