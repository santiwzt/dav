import { useEffect } from 'react'
import type { PlayerSetup } from '../types'
import { useGame } from '../context/GameContext'
import GameBoard from './GameBoard'
import PlayerPanel from './PlayerPanel'
import TriviaModal from './TriviaModal'
import HistoryPopup from './HistoryPopup'
import ItemPopup from './ItemPopup'
import KingdomEventPopup from './KingdomEventPopup'
import VictoryScreen from './VictoryScreen'
import PauseMenu from './PauseMenu'
import ToastContainer from './ToastContainer'
import { getAvatar } from '../data/players'

interface Props {
  setups: PlayerSetup[]
  onExitToMenu: () => void
}

export default function GameScreenView({ setups, onExitToMenu }: Props) {
  const { state, startGame, pauseGame, resumeGame, restartSameSetup } = useGame()

  useEffect(() => {
    startGame(setups)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state.players.length === 0) return null

  const currentPlayer = state.players[state.currentPlayerIndex]

  if (state.phase === 'victory') {
    return <VictoryScreen onRestart={restartSameSetup} onExitToMenu={onExitToMenu} />
  }

  return (
    <div className="game-screen">
      <ToastContainer toasts={state.toasts} />

      <div className="game-topbar">
        <div className="game-title">👑 El Reino en Juego</div>
        <div className="turn-banner">
          {getAvatar(currentPlayer.avatar).emoji} Turno de <span>{currentPlayer.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={pauseGame}>
            ⏸️ Pausa
          </button>
        </div>
      </div>

      <div className="game-layout">
        <GameBoard />
        <PlayerPanel />
      </div>

      {state.phase === 'trivia' && <TriviaModal />}
      {state.phase === 'history' && <HistoryPopup />}
      {state.phase === 'item' && <ItemPopup />}
      {state.phase === 'event' && <KingdomEventPopup />}

      {state.isPaused && <PauseMenu onResume={resumeGame} onExitToMenu={onExitToMenu} />}
    </div>
  )
}
