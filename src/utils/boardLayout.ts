// Layout del tablero: recorrido en zigzag (serpiente) de 8 columnas x 5 filas = 40 casilleros.
// Fila 0: 1-8 (izq->der) | Fila 1: 9-16 (der->izq) | Fila 2: 17-24 (izq->der)
// Fila 3: 25-32 (der->izq) | Fila 4: 33-40 (izq->der)

export const COLS = 8
export const ROWS = 5

export interface GridCoord {
  row: number
  col: number
}

export function getTileGridPosition(position: number): GridCoord {
  const p = position - 1 // 0-indexed
  const row = Math.floor(p / COLS)
  const indexInRow = p % COLS
  const reversed = row % 2 === 1
  const col = reversed ? COLS - 1 - indexInRow : indexInRow
  return { row, col }
}

// Offsets dentro de un casillero para ubicar hasta 4 fichas sin superponerse.
export const TOKEN_OFFSETS: { x: number; y: number }[] = [
  { x: -13, y: -13 },
  { x: 13, y: -13 },
  { x: -13, y: 13 },
  { x: 13, y: 13 },
]
