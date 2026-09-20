import { BOARD_SIZE, BOARD_TILES } from '../data/boardTiles'
import { getTileCenter } from '../utils/boardLayout'
import { useGame } from '../context/GameContext'
import PlayerToken from './PlayerToken'
import BoardScenery from './BoardScenery'

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

const TILE_LABEL: Record<string, string> = {
  start: 'Salida',
  normal: 'Casillero normal',
  trivia: 'Trivia: acertás +3, fallás -3',
  history: 'Momento histórico',
  bonus: 'Bonus: avanzás 2',
  penalty: 'Contratiempo: retrocedés 2',
  item: 'Objeto especial',
  event: 'Evento del reino',
}

const CHAPTER_FLAGS = [
  { position: 1, chapter: 1, text: 'Cap. 1 · La sucesión al trono' },
  { position: 15, chapter: 2, text: 'Cap. 2 · El reino se consolida' },
  { position: 28, chapter: 3, text: 'Cap. 3 · La sabiduría de Shlomó' },
]

export default function GameBoard() {
  const { state } = useGame()

  return (
    <div className="board-wrap">
      <div className="board-stage">
        <BoardScenery />

        {CHAPTER_FLAGS.map((f) => {
          const c = getTileCenter(f.position)
          return (
            <div
              key={f.position}
              className={`chapter-flag ch-${f.chapter}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              {f.text}
            </div>
          )
        })}

        {BOARD_TILES.map((tile) => {
          const c = getTileCenter(tile.position)
          const isFinish = tile.position === BOARD_SIZE
          const emoji = isFinish ? '👑' : TILE_EMOJI[tile.type]
          return (
            <div
              key={tile.position}
              className={`tile tile-${tile.type} ch-${tile.chapter} ${isFinish ? 'tile-finish' : ''}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              title={`Casillero ${tile.position} · ${isFinish ? 'Meta' : TILE_LABEL[tile.type]}`}
            >
              {emoji ? <span className="tile-icon">{emoji}</span> : <span className="tile-big-num">{tile.position}</span>}
              {emoji && <span className="tile-num">{tile.position}</span>}
            </div>
          )
        })}

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
  )
}
