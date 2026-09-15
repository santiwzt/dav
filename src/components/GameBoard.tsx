import { BOARD_TILES } from '../data/boardTiles'
import { getTileGridPosition } from '../utils/boardLayout'
import { useGame } from '../context/GameContext'
import PlayerToken from './PlayerToken'
import { ZoneArt1, ZoneArt2, ZoneArt3 } from './ZoneArt'

const TILE_EMOJI: Record<string, string> = {
  start: '🏁',
  normal: '',
  trivia: '❓',
  history: '📖',
  bonus: '⭐',
  penalty: '⚠️',
  item: '🎁',
  event: '📯',
}

export default function GameBoard() {
  const { state } = useGame()

  return (
    <div className="board-wrap">
      <div className="board-zones">
        <div className="board-zone-art board-zone-1">
          <ZoneArt1 />
        </div>
        <div className="board-zone-art board-zone-2">
          <ZoneArt2 />
        </div>
        <div className="board-zone-art board-zone-3">
          <ZoneArt3 />
        </div>
      </div>

      <div className="board-grid">
        {BOARD_TILES.map((tile) => {
          const { row, col } = getTileGridPosition(tile.position)
          return (
            <div
              key={tile.position}
              className={`board-tile tile-${tile.type}`}
              style={{ gridRow: row + 1, gridColumn: col + 1 }}
              title={`Casillero ${tile.position}`}
            >
              <span className="tile-number">{tile.position}</span>
              {TILE_EMOJI[tile.type] && (
                <span className="tile-badge">
                  <span className="tile-emoji">{TILE_EMOJI[tile.type]}</span>
                </span>
              )}
            </div>
          )
        })}

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {state.players.map((player, index) => (
            <PlayerToken
              key={player.id}
              player={player}
              index={index}
              isCurrent={index === state.currentPlayerIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
