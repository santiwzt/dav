import type { CollectionState, PlayerSetup } from '../types'

const KEYS = {
  collection: 'reino-en-juego:collection',
  config: 'reino-en-juego:config',
  sound: 'reino-en-juego:sound',
}

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage no disponible: seguimos sin persistir, sin romper el juego.
  }
}

export const EMPTY_COLLECTION: CollectionState = {
  unlockedCharacterIds: [],
  unlockedAchievements: [],
}

export function loadCollection(): CollectionState {
  const data = safeGet<CollectionState>(KEYS.collection, EMPTY_COLLECTION)
  return {
    unlockedCharacterIds: data.unlockedCharacterIds ?? [],
    unlockedAchievements: data.unlockedAchievements ?? [],
  }
}

export function saveCollection(state: CollectionState): void {
  safeSet(KEYS.collection, state)
}

export interface SavedConfig {
  playerCount: number
  players: PlayerSetup[]
}

export function loadConfig(): SavedConfig | null {
  return safeGet<SavedConfig | null>(KEYS.config, null)
}

export function saveConfig(config: SavedConfig): void {
  safeSet(KEYS.config, config)
}

export function loadSoundEnabled(): boolean {
  return safeGet<boolean>(KEYS.sound, true)
}

export function saveSoundEnabled(enabled: boolean): void {
  safeSet(KEYS.sound, enabled)
}
