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
  { id: 'azul', label: 'Azul', hex: '#3dabdb', soft: '#d9f0fa' },
  { id: 'naranja', label: 'Naranja', hex: '#f2a93b', soft: '#fdecd2' },
  { id: 'violeta', label: 'Violeta', hex: '#8a5fbf', soft: '#ece1f7' },
  { id: 'verde', label: 'Verde', hex: '#45b787', soft: '#d9f5e9' },
]

export function getAvatar(id: string): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]
}

export function getColor(id: string): PlayerColorDef {
  return PLAYER_COLORS.find((c) => c.id === id) ?? PLAYER_COLORS[0]
}
