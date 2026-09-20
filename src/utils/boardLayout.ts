// Layout del tablero: 40 casilleros en recorrido serpiente (5 filas x 8 columnas)
// dibujados como piedras sobre un camino sinuoso.
// Fila 0: 1-8 (izq->der) | Fila 1: 9-16 (der->izq) | Fila 2: 17-24 | Fila 3: 25-32 | Fila 4: 33-40
// Las coordenadas son porcentajes del escenario (proporcion fija 5:3).

export const COLS = 8
export const ROWS = 5
export const STAGE_W = 1000
export const STAGE_H = 600

export interface Point {
  x: number // % del ancho
  y: number // % del alto
}

export function getTileCenter(position: number): Point {
  const p = position - 1
  const row = Math.floor(p / COLS)
  const indexInRow = p % COLS
  const col = row % 2 === 1 ? COLS - 1 - indexInRow : indexInRow
  const x = 9 + col * 11.7
  const wave = Math.sin(col * 1.15) * 1.8
  const y = 17 + row * 16.8 + wave
  return { x, y }
}

// Desplazamientos (en unidades cqw) para ubicar hasta 4 fichas en un mismo casillero.
export const TOKEN_OFFSETS: { x: number; y: number }[] = [
  { x: -1.15, y: -1.15 },
  { x: 1.15, y: -1.15 },
  { x: -1.15, y: 1.15 },
  { x: 1.15, y: 1.15 },
]

/** Curva suave (Catmull-Rom -> Bezier) que pasa por todos los puntos, en coordenadas del SVG. */
export function smoothPath(points: Point[]): string {
  const pts = points.map((p) => ({ x: (p.x / 100) * STAGE_W, y: (p.y / 100) * STAGE_H }))
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}
