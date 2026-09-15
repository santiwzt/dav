import type { AchievementDef } from '../types'

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'coleccionista',
    name: 'Coleccionista',
    description: 'Desbloqueá los 12 personajes de la colección.',
    emoji: '🗂️',
  },
  {
    id: 'sabio-de-israel',
    name: 'Sabio de Israel',
    description: 'Ganá una partida con 80% o más de aciertos en trivia.',
    emoji: '🦉',
  },
  {
    id: 'corredor-veloz',
    name: 'Corredor veloz',
    description: 'Ganá una partida en 20 turnos o menos.',
    emoji: '⚡',
  },
  {
    id: 'historiador',
    name: 'Historiador',
    description: 'Visitá los 10 casilleros de historia en una sola partida.',
    emoji: '📖',
  },
  {
    id: 'superviviente',
    name: 'Superviviente',
    description: 'Ganá una partida habiendo retrocedido 3 o más veces por trivia.',
    emoji: '🐫',
  },
  {
    id: 'perfeccionista',
    name: 'Perfeccionista',
    description: 'Lográ una racha de 10 trivias correctas seguidas en una partida.',
    emoji: '💎',
  },
]

export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id)
}
