import type { AvatarDef, PlayerColorDef } from '../types'

export const AVATARS: AvatarDef[] = [
  { id: 'corona', label: 'Corona', emoji: '👑' },
  { id: 'leon', label: 'León', emoji: '🦁' },
  { id: 'shofar', label: 'Shofar', emoji: '📯' },
  { id: 'pergamino', label: 'Pergamino', emoji: '📜' },
  { id: 'escudo', label: 'Escudo', emoji: '🛡️' },
  { id: 'lampara', label: 'Lámpara', emoji: '🕯️' },
  { id: 'estrella', label: 'Estrella', emoji: '⭐' },
  { id: 'palmera', label: 'Palmera', emoji: '🌴' },
]

export const PLAYER_COLORS: PlayerColorDef[] = [
  { id: 'azul', label: 'Azul', hex: '#2c5187', soft: '#dde6f2' },
  { id: 'naranja', label: 'Bronce', hex: '#a9772f', soft: '#f0e4cc' },
  { id: 'violeta', label: 'Violeta', hex: '#5f4a86', soft: '#e6e0ef' },
  { id: 'verde', label: 'Verde', hex: '#2f7a5c', soft: '#dcece4' },
]

export function getAvatar(id: string): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]
}

export function getColor(id: string): PlayerColorDef {
  return PLAYER_COLORS.find((c) => c.id === id) ?? PLAYER_COLORS[0]
}
