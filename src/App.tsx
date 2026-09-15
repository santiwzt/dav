import { useEffect, useState } from 'react'
import type { GameScreen, PlayerSetup } from './types'
import { CollectionProvider } from './context/CollectionContext'
import { GameProvider } from './context/GameContext'
import { loadSoundEnabled, saveSoundEnabled } from './utils/storage'
import * as sound from './utils/sound'

import MainMenu from './components/MainMenu'
import RulesScreen from './components/RulesScreen'
import ContentScreen from './components/ContentScreen'
import StoryScreen from './components/StoryScreen'
import CreditsScreen from './components/CreditsScreen'
import CollectionScreen from './components/CollectionScreen'
import GameSetup from './components/GameSetup'
import GameScreenView from './components/GameScreenView'

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('menu')
  const [soundOn, setSoundOn] = useState(true)
  const [pendingSetup, setPendingSetup] = useState<PlayerSetup[] | null>(null)
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    const enabled = loadSoundEnabled()
    setSoundOn(enabled)
    sound.setSoundEnabled(enabled)
  }, [])

  function toggleSound() {
    setSoundOn((prev) => {
      const next = !prev
      sound.setSoundEnabled(next)
      saveSoundEnabled(next)
      return next
    })
  }

  function goTo(next: GameScreen) {
    sound.playClick()
    setScreen(next)
  }

  function handleStartGame(setups: PlayerSetup[]) {
    setPendingSetup(setups)
    setGameKey((k) => k + 1)
    setScreen('playing')
  }

  return (
    <CollectionProvider>
      <div className="app-shell">
        {screen === 'menu' && <MainMenu onNavigate={goTo} soundOn={soundOn} onToggleSound={toggleSound} />}
        {screen === 'rules' && <RulesScreen onBack={() => goTo('menu')} />}
        {screen === 'content' && <ContentScreen onBack={() => goTo('menu')} />}
        {screen === 'story' && <StoryScreen onBack={() => goTo('menu')} />}
        {screen === 'credits' && <CreditsScreen onBack={() => goTo('menu')} />}
        {screen === 'characters' && <CollectionScreen onBack={() => goTo('menu')} />}
        {screen === 'setup' && <GameSetup onBack={() => goTo('menu')} onStart={handleStartGame} />}
        {screen === 'playing' && pendingSetup && (
          <GameProvider key={gameKey}>
            <GameScreenView setups={pendingSetup} onExitToMenu={() => goTo('menu')} />
          </GameProvider>
        )}
      </div>
    </CollectionProvider>
  )
}
