import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import type {
  AchievementId,
  GameStats,
  ItemId,
  KingdomEventId,
  PlayerSetup,
  PlayerState,
  TriviaQuestion,
  HistoryEvent,
  BoardTile,
} from '../types'
import { BOARD_SIZE, getTile } from '../data/boardTiles'
import { getTriviaByChapter } from '../data/triviaQuestions'
import { getHistoryEventById } from '../data/historyEvents'
import { randomItemId } from '../data/items'
import { randomKingdomEventId } from '../data/kingdomEvents'
import { CHARACTERS } from '../data/characters'
import { getAchievementById } from '../data/achievements'
import { useCollection, type CollectionContextValue } from './CollectionContext'
import * as sound from '../utils/sound'

const ROLL_MS = 650
const STEP_MS = 240

export type GamePhase = 'idle' | 'rolling' | 'moving' | 'trivia' | 'history' | 'item' | 'event' | 'victory'

interface TriviaAnswer {
  selectedIndex: number
  correct: boolean
}

export interface ToastItem {
  id: string
  message: string
  emoji: string
}

export interface GameState {
  players: PlayerState[]
  currentPlayerIndex: number
  turnCount: number
  phase: GamePhase
  diceValue: number | null
  pendingTile: BoardTile | null
  activeTriviaQuestion: TriviaQuestion | null
  triviaAnswer: TriviaAnswer | null
  activeHistoryEvent: HistoryEvent | null
  activeHistoryUnlockedCharacterIds: string[]
  activeItemGranted: ItemId | null
  itemInventoryFull: boolean
  activeKingdomEvent: KingdomEventId | null
  activeKingdomEventEffects: string[]
  usedTriviaQuestionIds: string[]
  winnerId: number | null
  gameStats: GameStats | null
  isPaused: boolean
  dealing: boolean
  toasts: ToastItem[]
}

interface GameContextValue {
  state: GameState
  startGame: (setups: PlayerSetup[]) => void
  rollDice: () => void
  answerTrivia: (index: number) => void
  closeTriviaModal: () => void
  closeHistoryModal: () => void
  closeItemModal: () => void
  closeEventModal: () => void
  pauseGame: () => void
  resumeGame: () => void
  restartSameSetup: () => void
  finishDealing: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

// Reparto de tarjetas de personaje: al azar y sin repetir (la entrada conjunta de las dos mujeres no se reparte).
function dealCharacterIds(count: number): string[] {
  const pool = CHARACTERS.filter((c) => c.id !== 'dos-mujeres').map((c) => c.id)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

function createPlayers(setups: PlayerSetup[]): PlayerState[] {
  const dealt = dealCharacterIds(setups.length)
  return setups.map((s, i) => ({
    ...s,
    id: i,
    characterId: dealt[i],
    position: 1,
    items: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    triviaStreak: 0,
    maxTriviaStreak: 0,
    retreatsFromTrivia: 0,
    historyVisited: [],
    turnsPlayed: 0,
  }))
}

function emptyState(): GameState {
  return {
    players: [],
    currentPlayerIndex: 0,
    turnCount: 0,
    phase: 'idle',
    diceValue: null,
    pendingTile: null,
    activeTriviaQuestion: null,
    triviaAnswer: null,
    activeHistoryEvent: null,
    activeHistoryUnlockedCharacterIds: [],
    activeItemGranted: null,
    itemInventoryFull: false,
    activeKingdomEvent: null,
    activeKingdomEventEffects: [],
    usedTriviaQuestionIds: [],
    winnerId: null,
    gameStats: null,
    isPaused: false,
    dealing: false,
    toasts: [],
  }
}

function clampMin1(pos: number): number {
  return Math.max(1, pos)
}

function movePlayers(players: PlayerState[], index: number, delta: number): PlayerState[] {
  return players.map((p, i) => (i === index ? { ...p, position: clampMin1(p.position + delta) } : p))
}

function removeOneItem(items: ItemId[], id: ItemId): ItemId[] {
  const idx = items.indexOf(id)
  if (idx === -1) return items
  const next = [...items]
  next.splice(idx, 1)
  return next
}

function findWinnerIndex(players: PlayerState[]): number | null {
  for (let i = 0; i < players.length; i++) {
    if (players[i].position >= BOARD_SIZE) return i
  }
  return null
}

let toastCounter = 0
function makeToast(message: string, emoji: string): ToastItem {
  toastCounter += 1
  return { id: `toast-${toastCounter}-${makeId()}`, message, emoji }
}

// ---------------------------------------------------------------------------
// "Bolsa de efectos": las funciones de calculo de abajo son PURAS (solo leen
// `prev` y las funciones de LECTURA de CollectionContext) y jamas llaman a
// setState de otro componente, reproducir sonido o programar timers. En su
// lugar, acumulan esos efectos aca para que se ejecuten una unica vez, DESPUES
// de que el setState del tablero ya se resolvio. Esto evita bugs de doble
// ejecucion bajo React.StrictMode (que invoca los updaters de setState dos
// veces en desarrollo para detectar efectos impuros).
// ---------------------------------------------------------------------------
interface Effects {
  toasts: { message: string; emoji: string }[]
  unlockCharacterIds: string[]
  unlockAchievementIds: AchievementId[]
  sounds: Array<() => void>
}

function newEffects(): Effects {
  return { toasts: [], unlockCharacterIds: [], unlockAchievementIds: [], sounds: [] }
}

function computeHistoryUnlocks(characterIds: string[], collection: CollectionContextValue, effects: Effects): string[] {
  const newlyUnlocked = characterIds.filter((cid) => !collection.isCharacterUnlocked(cid))
  if (newlyUnlocked.length > 0) {
    effects.unlockCharacterIds.push(...newlyUnlocked)
    effects.sounds.push(() => sound.playUnlock())
    newlyUnlocked.forEach((cid) => {
      const c = CHARACTERS.find((ch) => ch.id === cid)
      if (c) effects.toasts.push({ message: `¡Nuevo personaje: ${c.name}!`, emoji: c.emoji })
    })
    const unionSize = new Set([...collection.unlockedCharacterIds, ...newlyUnlocked]).size
    if (unionSize >= CHARACTERS.length) {
      effects.unlockAchievementIds.push('coleccionista')
    }
  }
  return newlyUnlocked
}

function buildAdvanceTurnState(prev: GameState, players: PlayerState[]): GameState {
  const nextIndex = (prev.currentPlayerIndex + 1) % players.length
  return {
    ...prev,
    players,
    currentPlayerIndex: nextIndex,
    turnCount: prev.turnCount + 1,
    phase: 'idle',
    diceValue: null,
    pendingTile: null,
    activeTriviaQuestion: null,
    triviaAnswer: null,
    activeHistoryEvent: null,
    activeHistoryUnlockedCharacterIds: [],
    activeItemGranted: null,
    itemInventoryFull: false,
    activeKingdomEvent: null,
    activeKingdomEventEffects: [],
  }
}

function buildVictoryState(prev: GameState, players: PlayerState[], winnerIndex: number, effects: Effects): GameState {
  const winner = players[winnerIndex]
  effects.sounds.push(() => sound.playVictory())

  const totalAnswers = winner.correctAnswers + winner.wrongAnswers
  const accuracy = totalAnswers > 0 ? winner.correctAnswers / totalAnswers : 0
  if (totalAnswers > 0 && accuracy >= 0.8) effects.unlockAchievementIds.push('sabio-de-israel')
  if (prev.turnCount + 1 <= 20) effects.unlockAchievementIds.push('corredor-veloz')
  if (winner.retreatsFromTrivia >= 3) effects.unlockAchievementIds.push('superviviente')

  return {
    ...prev,
    players,
    phase: 'victory',
    winnerId: winner.id,
    gameStats: { winnerId: winner.id, turns: prev.turnCount + 1 },
  }
}

function computeResolveArrival(
  prev: GameState,
  rawPosition: number,
  collection: CollectionContextValue,
  effects: Effects,
): GameState {
  const idx = prev.currentPlayerIndex
  const players = prev.players

  // Regla 7: gana quien llega o supera el casillero 40 (no hace falta numero exacto).
  const winnerIdx = findWinnerIndex(players)
  if (winnerIdx !== null) return buildVictoryState(prev, players, winnerIdx, effects)

  const tile = getTile(rawPosition)

  switch (tile.type) {
    case 'start':
    case 'normal':
      return buildAdvanceTurnState(prev, players)

    case 'trivia': {
      const pool = getTriviaByChapter(tile.chapter)
      const unused = pool.filter((q) => !prev.usedTriviaQuestionIds.includes(q.id))
      const source = unused.length > 0 ? unused : pool
      const question = source[Math.floor(Math.random() * source.length)]
      return { ...prev, phase: 'trivia', pendingTile: tile, activeTriviaQuestion: question, triviaAnswer: null }
    }

    case 'history': {
      const event = getHistoryEventById(tile.historyEventId as string)
      if (!event) return buildAdvanceTurnState(prev, players)
      const player = players[idx]
      const alreadyVisited = player.historyVisited.includes(event.id)
      const newlyUnlocked = computeHistoryUnlocks(event.characterIds, collection, effects)
      effects.sounds.push(() => sound.playHistoryPopup())

      const updatedPlayers = alreadyVisited
        ? players
        : players.map((p, i) => (i === idx ? { ...p, historyVisited: [...p.historyVisited, event.id] } : p))

      if (!alreadyVisited && updatedPlayers[idx].historyVisited.length >= 10) {
        effects.unlockAchievementIds.push('historiador')
      }

      return {
        ...prev,
        players: updatedPlayers,
        phase: 'history',
        pendingTile: tile,
        activeHistoryEvent: event,
        activeHistoryUnlockedCharacterIds: newlyUnlocked,
      }
    }

    case 'bonus': {
      const movedPlayers = movePlayers(players, idx, 2)
      const w = findWinnerIndex(movedPlayers)
      if (w !== null) return buildVictoryState(prev, movedPlayers, w, effects)
      effects.toasts.push({ message: '¡Casillero de fortuna! Avanzás 2 casilleros.', emoji: '⭐' })
      return buildAdvanceTurnState(prev, movedPlayers)
    }

    case 'penalty': {
      const player = players[idx]
      if (player.items.includes('escudo-benaia')) {
        const guarded = players.map((p, i) =>
          i === idx ? { ...p, items: removeOneItem(p.items, 'escudo-benaia') } : p,
        )
        effects.toasts.push({ message: 'Tu Escudo de Benaiá canceló el contratiempo.', emoji: '🛡️' })
        return buildAdvanceTurnState(prev, guarded)
      }
      const movedPlayers = movePlayers(players, idx, -2)
      effects.toasts.push({ message: 'Casillero de contratiempo: retrocedés 2 casilleros.', emoji: '⚠️' })
      return buildAdvanceTurnState(prev, movedPlayers)
    }

    case 'item': {
      const player = players[idx]
      if (player.items.length >= 2) {
        return { ...prev, phase: 'item', pendingTile: tile, activeItemGranted: null, itemInventoryFull: true }
      }
      const itemId = randomItemId()
      effects.sounds.push(() => sound.playItem())
      const updatedPlayers = players.map((p, i) => (i === idx ? { ...p, items: [...p.items, itemId] } : p))
      return {
        ...prev,
        players: updatedPlayers,
        phase: 'item',
        pendingTile: tile,
        activeItemGranted: itemId,
        itemInventoryFull: false,
      }
    }

    case 'event': {
      const eventId = randomKingdomEventId()
      const nextIdx = (idx + 1) % players.length
      let updatedPlayers = players
      const eventEffectLines: string[] = []

      if (eventId === 'consejo-real') {
        updatedPlayers = players.map((p, i) => (i === idx ? p : { ...p, position: clampMin1(p.position - 1) }))
        players.forEach((p, i) => {
          if (i !== idx) eventEffectLines.push(`${p.name} retrocede 1 casillero.`)
        })
      } else if (eventId === 'bendicion-pueblo') {
        updatedPlayers = movePlayers(players, idx, 1)
        updatedPlayers = movePlayers(updatedPlayers, nextIdx, 1)
        eventEffectLines.push(`${players[idx].name} avanza 1 casillero.`)
        eventEffectLines.push(`${players[nextIdx].name} avanza 1 casillero.`)
      } else if (eventId === 'tributo-egipto') {
        const bonus = Math.min(collection.unlockedCharacterIds.length, 3)
        updatedPlayers = movePlayers(players, idx, bonus)
        eventEffectLines.push(`${players[idx].name} avanza ${bonus} casillero(s) por su colección de personajes.`)
      } else if (eventId === 'anio-sequia') {
        updatedPlayers = players.map((p) => ({ ...p, position: clampMin1(p.position - 1) }))
        eventEffectLines.push('Todos los jugadores retroceden 1 casillero.')
      }

      effects.sounds.push(() => sound.playKingdomEvent())
      const w = findWinnerIndex(updatedPlayers)
      if (w !== null) return buildVictoryState(prev, updatedPlayers, w, effects)

      return {
        ...prev,
        players: updatedPlayers,
        phase: 'event',
        pendingTile: tile,
        activeKingdomEvent: eventId,
        activeKingdomEventEffects: eventEffectLines,
      }
    }

    default:
      return buildAdvanceTurnState(prev, players)
  }
}

function computeAnswerTrivia(prev: GameState, selectedIndex: number, effects: Effects): GameState {
  if (!prev.activeTriviaQuestion || prev.triviaAnswer) return prev
  const question = prev.activeTriviaQuestion
  const correct = selectedIndex === question.correctIndex
  const idx = prev.currentPlayerIndex
  const players = prev.players.map((p, i) => {
    if (i !== idx) return p
    if (correct) {
      const streak = p.triviaStreak + 1
      return {
        ...p,
        correctAnswers: p.correctAnswers + 1,
        triviaStreak: streak,
        maxTriviaStreak: Math.max(p.maxTriviaStreak, streak),
      }
    }
    return { ...p, wrongAnswers: p.wrongAnswers + 1, triviaStreak: 0 }
  })

  effects.sounds.push(() => (correct ? sound.playCorrect() : sound.playWrong()))
  if (correct && players[idx].triviaStreak >= 10) {
    effects.unlockAchievementIds.push('perfeccionista')
  }

  return {
    ...prev,
    players,
    usedTriviaQuestionIds: [...prev.usedTriviaQuestionIds, question.id],
    triviaAnswer: { selectedIndex, correct },
  }
}

function computeCloseTriviaModal(prev: GameState, effects: Effects): GameState {
  if (!prev.triviaAnswer) return prev
  const idx = prev.currentPlayerIndex
  let players = prev.players
  const player = players[idx]

  if (prev.triviaAnswer.correct) {
    let gain = 3
    if (player.items.includes('bendicion-shlomo')) {
      players = players.map((p, i) => (i === idx ? { ...p, items: removeOneItem(p.items, 'bendicion-shlomo') } : p))
      gain = 5
      effects.toasts.push({ message: 'Tu Bendición de Shlomó te da +5 en vez de +3.', emoji: '✨' })
    }
    players = movePlayers(players, idx, gain)
  } else {
    if (player.items.includes('pergamino-natan')) {
      players = players.map((p, i) => (i === idx ? { ...p, items: removeOneItem(p.items, 'pergamino-natan') } : p))
      effects.toasts.push({ message: 'Tu Pergamino de Natán anuló el retroceso.', emoji: '📜' })
    } else {
      players = movePlayers(players, idx, -3)
      players = players.map((p, i) => (i === idx ? { ...p, retreatsFromTrivia: p.retreatsFromTrivia + 1 } : p))
    }
  }

  const w = findWinnerIndex(players)
  if (w !== null) return buildVictoryState(prev, players, w, effects)
  return buildAdvanceTurnState(prev, players)
}

// ---------------------------------------------------------------------------

export function GameProvider({ children }: { children: React.ReactNode }) {
  const collection = useCollection()
  const [state, setState] = useState<GameState>(emptyState)
  const lastSetupRef = useRef<PlayerSetup[]>([])
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

  function later(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms)
    timeouts.current.push(t)
  }

  // Elimina automaticamente los toasts luego de unos segundos.
  useEffect(() => {
    if (state.toasts.length === 0) return
    const oldest = state.toasts[0]
    const t = setTimeout(() => {
      setState((prev) => ({ ...prev, toasts: prev.toasts.filter((x) => x.id !== oldest.id) }))
    }, 3600)
    return () => clearTimeout(t)
  }, [state.toasts])

  function pushToast(message: string, emoji: string) {
    setState((prev) => ({ ...prev, toasts: [...prev.toasts, makeToast(message, emoji)] }))
  }

  // Ejecuta, UNA sola vez y fuera de cualquier updater de setState, todos los
  // efectos secundarios que la resolucion pura del turno haya acumulado.
  function runEffects(effects: Effects) {
    effects.unlockCharacterIds.forEach((id) => collection.unlockCharacter(id))
    effects.unlockAchievementIds.forEach((id) => {
      const didUnlock = collection.unlockAchievement(id)
      if (didUnlock) {
        const def = getAchievementById(id)
        sound.playAchievement()
        if (def) pushToast(`¡Logro desbloqueado: ${def.name}!`, def.emoji)
      }
    })
    effects.sounds.forEach((fn) => fn())
    effects.toasts.forEach((t) => pushToast(t.message, t.emoji))
  }

  function startGame(setups: PlayerSetup[]) {
    lastSetupRef.current = setups
    setState({ ...emptyState(), players: createPlayers(setups), dealing: true })
  }

  function restartSameSetup() {
    if (lastSetupRef.current.length === 0) return
    setState({ ...emptyState(), players: createPlayers(lastSetupRef.current), dealing: true })
  }

  function finishDealing() {
    setState((prev) => ({ ...prev, dealing: false }))
  }

  function pauseGame() {
    setState((prev) => ({ ...prev, isPaused: true }))
  }

  function resumeGame() {
    setState((prev) => ({ ...prev, isPaused: false }))
  }

  function rollDice() {
    if (state.phase !== 'idle' || state.isPaused || state.winnerId !== null) return
    const value = 1 + Math.floor(Math.random() * 6)
    setState((prev) => {
      if (prev.phase !== 'idle' || prev.isPaused || prev.winnerId !== null) return prev
      return { ...prev, phase: 'rolling', diceValue: value }
    })
    sound.playDiceRoll()
    later(() => startMove(value), ROLL_MS)
  }

  function startMove(value: number) {
    let rawNewPos = 0
    setState((prev) => {
      const idx = prev.currentPlayerIndex
      rawNewPos = prev.players[idx].position + value
      const players = movePlayers(prev.players, idx, value)
      return { ...prev, players, phase: 'moving' }
    })
    later(() => resolveArrival(rawNewPos), Math.min(value, 6) * STEP_MS + 120)
  }

  function resolveArrival(rawPosition: number) {
    let effects = newEffects()
    setState((prev) => {
      const localEffects = newEffects()
      const next = computeResolveArrival(prev, rawPosition, collection, localEffects)
      effects = localEffects
      return next
    })
    runEffects(effects)
  }

  function answerTrivia(index: number) {
    let effects = newEffects()
    setState((prev) => {
      const localEffects = newEffects()
      const next = computeAnswerTrivia(prev, index, localEffects)
      effects = localEffects
      return next
    })
    runEffects(effects)
  }

  function closeTriviaModal() {
    let effects = newEffects()
    setState((prev) => {
      const localEffects = newEffects()
      const next = computeCloseTriviaModal(prev, localEffects)
      effects = localEffects
      return next
    })
    runEffects(effects)
  }

  function closeHistoryModal() {
    setState((prev) => buildAdvanceTurnState(prev, prev.players))
  }

  function closeItemModal() {
    setState((prev) => buildAdvanceTurnState(prev, prev.players))
  }

  function closeEventModal() {
    setState((prev) => buildAdvanceTurnState(prev, prev.players))
  }

  const value: GameContextValue = {
    state,
    startGame,
    rollDice,
    answerTrivia,
    closeTriviaModal,
    closeHistoryModal,
    closeItemModal,
    closeEventModal,
    pauseGame,
    resumeGame,
    restartSameSetup,
    finishDealing,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider')
  return ctx
}
