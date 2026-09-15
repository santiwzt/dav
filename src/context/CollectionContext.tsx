import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { AchievementId, CollectionState } from '../types'
import { CHARACTERS } from '../data/characters'
import { loadCollection, saveCollection } from '../utils/storage'

export interface CollectionContextValue {
  unlockedCharacterIds: string[]
  unlockedAchievements: { id: AchievementId; unlockedAt: string }[]
  isCharacterUnlocked: (id: string) => boolean
  isAchievementUnlocked: (id: AchievementId) => boolean
  /** Devuelve true si el personaje se desbloqueo recien ahora (no estaba antes) */
  unlockCharacter: (id: string) => boolean
  /** Devuelve true si el logro se desbloqueo recien ahora */
  unlockAchievement: (id: AchievementId) => boolean
  allCharactersUnlocked: boolean
}

const CollectionContext = createContext<CollectionContextValue | null>(null)

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CollectionState>(() => loadCollection())

  const isCharacterUnlocked = useCallback(
    (id: string) => state.unlockedCharacterIds.includes(id),
    [state.unlockedCharacterIds],
  )

  const isAchievementUnlocked = useCallback(
    (id: AchievementId) => state.unlockedAchievements.some((a) => a.id === id),
    [state.unlockedAchievements],
  )

  const unlockCharacter = useCallback((id: string): boolean => {
    let didUnlock = false
    setState((prev) => {
      if (prev.unlockedCharacterIds.includes(id)) return prev
      didUnlock = true
      const next: CollectionState = {
        ...prev,
        unlockedCharacterIds: [...prev.unlockedCharacterIds, id],
      }
      saveCollection(next)
      return next
    })
    return didUnlock
  }, [])

  const unlockAchievement = useCallback((id: AchievementId): boolean => {
    let didUnlock = false
    setState((prev) => {
      if (prev.unlockedAchievements.some((a) => a.id === id)) return prev
      didUnlock = true
      const next: CollectionState = {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, { id, unlockedAt: new Date().toISOString() }],
      }
      saveCollection(next)
      return next
    })
    return didUnlock
  }, [])

  const allCharactersUnlocked = state.unlockedCharacterIds.length >= CHARACTERS.length

  const value = useMemo<CollectionContextValue>(
    () => ({
      unlockedCharacterIds: state.unlockedCharacterIds,
      unlockedAchievements: state.unlockedAchievements,
      isCharacterUnlocked,
      isAchievementUnlocked,
      unlockCharacter,
      unlockAchievement,
      allCharactersUnlocked,
    }),
    [state, isCharacterUnlocked, isAchievementUnlocked, unlockCharacter, unlockAchievement, allCharactersUnlocked],
  )

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext)
  if (!ctx) throw new Error('useCollection debe usarse dentro de CollectionProvider')
  return ctx
}
