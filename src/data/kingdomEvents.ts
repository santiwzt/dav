import type { KingdomEventDef } from '../types'

// Eventos del reino: se disparan automaticamente al caer en un casillero de evento (📯).
// Son puro azar / gestion de recursos, sin decisiones narrativas.
export const KINGDOM_EVENTS: KingdomEventDef[] = [
  {
    id: 'consejo-real',
    name: 'Consejo real',
    emoji: '📯',
    description: 'Se convoca un consejo urgente: todos los demás jugadores retroceden 1 casillero.',
  },
  {
    id: 'bendicion-pueblo',
    name: 'Bendición del pueblo',
    emoji: '🙌',
    description: 'El pueblo celebra: vos y el siguiente jugador en turno avanzan 1 casillero.',
  },
  {
    id: 'tributo-egipto',
    name: 'Tributo de Egipto',
    emoji: '🐫',
    description: 'Llega un tributo desde Egipto: avanzás 1 casillero por cada personaje ya desbloqueado (máx. 3).',
  },
  {
    id: 'anio-sequia',
    name: 'Año de sequía',
    emoji: '🌵',
    description: 'Un año de sequía afecta al reino: todos los jugadores retroceden 1 casillero.',
  },
]

export function getKingdomEventById(id: string): KingdomEventDef | undefined {
  return KINGDOM_EVENTS.find((e) => e.id === id)
}

export function randomKingdomEventId(): KingdomEventDef['id'] {
  return KINGDOM_EVENTS[Math.floor(Math.random() * KINGDOM_EVENTS.length)].id
}
