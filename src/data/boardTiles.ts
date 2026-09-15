import type { BoardTile, Chapter, TileType } from '../types'

// Tablero de 40 casilleros en 3 zonas (una por capitulo).
// Distribucion total: 10 historia, 12 trivia, 3 bonus, 3 penalty, 4 objeto, 4 evento, 4 normal (40 en total).
// Zona 1 (cap. 1): casilleros 1-14  | Zona 2 (cap. 2): casilleros 15-27 | Zona 3 (cap. 3): casilleros 28-40

interface TileSpec {
  type: TileType
  historyEventId?: string
}

function chapterOf(position: number): Chapter {
  if (position <= 14) return 1
  if (position <= 27) return 2
  return 3
}

const SPECS: TileSpec[] = [
  // Zona 1 - Capitulo 1 (1-14)
  { type: 'start' },
  { type: 'trivia' },
  { type: 'history', historyEventId: 'david-anciano' },
  { type: 'normal' },
  { type: 'bonus' },
  { type: 'trivia' },
  { type: 'item' },
  { type: 'history', historyEventId: 'conspiracion-adonia' },
  { type: 'penalty' },
  { type: 'trivia' },
  { type: 'event' },
  { type: 'history', historyEventId: 'batsheba-natan' },
  { type: 'trivia' },
  { type: 'history', historyEventId: 'coronacion-guijon' },

  // Zona 2 - Capitulo 2 (15-27)
  { type: 'trivia' },
  { type: 'history', historyEventId: 'testamento-david' },
  { type: 'item' },
  { type: 'trivia' },
  { type: 'bonus' },
  { type: 'history', historyEventId: 'pedido-abishag' },
  { type: 'trivia' },
  { type: 'item' },
  { type: 'penalty' },
  { type: 'history', historyEventId: 'consolidacion-reino' },
  { type: 'trivia' },
  { type: 'event' },
  { type: 'normal' },

  // Zona 3 - Capitulo 3 (28-40)
  { type: 'trivia' },
  { type: 'event' },
  { type: 'history', historyEventId: 'vinculo-egipto' },
  { type: 'trivia' },
  { type: 'item' },
  { type: 'bonus' },
  { type: 'history', historyEventId: 'sueno-guibon' },
  { type: 'trivia' },
  { type: 'penalty' },
  { type: 'event' },
  { type: 'history', historyEventId: 'juicio-dos-mujeres' },
  { type: 'trivia' },
  { type: 'normal' },
]

export const BOARD_SIZE = SPECS.length // 40

export const BOARD_TILES: BoardTile[] = SPECS.map((spec, idx) => {
  const position = idx + 1
  return {
    position,
    type: spec.type,
    chapter: chapterOf(position),
    historyEventId: spec.historyEventId,
  }
})

export function getTile(position: number): BoardTile {
  const clamped = Math.min(Math.max(position, 1), BOARD_SIZE)
  return BOARD_TILES[clamped - 1]
}

export function zoneOf(position: number): Chapter {
  return chapterOf(Math.min(Math.max(position, 1), BOARD_SIZE))
}
