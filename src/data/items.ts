import type { ItemDef } from '../types'

// Objetos especiales: se asignan al azar en casilleros de objeto (🎁) y se consumen
// automaticamente cuando corresponde, sin que el jugador elija usarlos.
export const ITEMS: ItemDef[] = [
  {
    id: 'pergamino-natan',
    name: 'Pergamino de Natán',
    emoji: '📜',
    description: 'Anula la próxima respuesta incorrecta de trivia: esa vez no retrocedés.',
  },
  {
    id: 'bendicion-shlomo',
    name: 'Bendición de Shlomó',
    emoji: '✨',
    description: 'La próxima trivia correcta te da +5 casilleros en vez de +3.',
  },
  {
    id: 'escudo-benaia',
    name: 'Escudo de Benaiá',
    emoji: '🛡️',
    description: 'Cancela el efecto del próximo casillero de retroceso (⚠️).',
  },
]

export function getItemById(id: string): ItemDef | undefined {
  return ITEMS.find((i) => i.id === id)
}

export function randomItemId(): ItemDef['id'] {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)].id
}
