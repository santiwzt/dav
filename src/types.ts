// Tipos centrales de "El Reino en Juego"

export type AvatarId =
  | 'corona'
  | 'leon'
  | 'shofar'
  | 'pergamino'
  | 'escudo'
  | 'lampara'
  | 'estrella'
  | 'palmera'

export interface AvatarDef {
  id: AvatarId
  label: string
  emoji: string
}

export type PlayerColorId = 'azul' | 'naranja' | 'violeta' | 'verde'

export interface PlayerColorDef {
  id: PlayerColorId
  label: string
  hex: string
  soft: string
}

export type Chapter = 1 | 2 | 3

export type TileType =
  | 'start'
  | 'normal'
  | 'trivia'
  | 'history'
  | 'bonus'
  | 'penalty'
  | 'item'
  | 'event'

export interface BoardTile {
  /** Posicion 1..40 (1-indexed, tal como se muestra al jugador) */
  position: number
  type: TileType
  chapter: Chapter
  /** Solo para casilleros de historia: id del evento asociado */
  historyEventId?: string
}

export type ItemId = 'pergamino-natan' | 'bendicion-shlomo' | 'escudo-benaia'

export interface ItemDef {
  id: ItemId
  name: string
  emoji: string
  description: string
}

export type KingdomEventId = 'consejo-real' | 'bendicion-pueblo' | 'tributo-egipto' | 'anio-sequia'

export interface KingdomEventDef {
  id: KingdomEventId
  name: string
  emoji: string
  description: string
}

export interface TriviaQuestion {
  id: string
  chapter: Chapter
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface HistoryEvent {
  id: string
  chapter: Chapter
  title: string
  text: string
  characterIds: string[]
}

export interface CharacterDef {
  id: string
  name: string
  role: string
  chapters: Chapter[]
  emoji: string
  color: string
  bio: string
  quote: string
}

export type AchievementId =
  | 'coleccionista'
  | 'sabio-de-israel'
  | 'corredor-veloz'
  | 'historiador'
  | 'superviviente'
  | 'perfeccionista'

export interface AchievementDef {
  id: AchievementId
  name: string
  description: string
  emoji: string
}

export interface UnlockedAchievement {
  id: AchievementId
  unlockedAt: string // ISO date
}

export interface CollectionState {
  unlockedCharacterIds: string[]
  unlockedAchievements: UnlockedAchievement[]
}

export interface PlayerSetup {
  name: string
  avatar: AvatarId
  color: PlayerColorId
}

export interface PlayerState extends PlayerSetup {
  id: number
  characterId: string
  position: number // 1..40+
  items: ItemId[]
  correctAnswers: number
  wrongAnswers: number
  triviaStreak: number
  maxTriviaStreak: number
  retreatsFromTrivia: number
  historyVisited: string[]
  turnsPlayed: number
}

export type GameScreen =
  | 'menu'
  | 'rules'
  | 'content'
  | 'characters'
  | 'story'
  | 'credits'
  | 'setup'
  | 'playing'
  | 'victory'

export interface GameStats {
  winnerId: number
  turns: number
}
