import { useEffect, useRef, useState } from 'react'
import type { PlayerState } from '../types'
import { getTileCenter, TOKEN_OFFSETS } from '../utils/boardLayout'
import { getAvatar, getColor } from '../data/players'
import { BOARD_SIZE } from '../data/boardTiles'

interface Props {
  player: PlayerState
  index: number
  isCurrent?: boolean
}

const STEP_INTERVAL_MS = 190

export default function PlayerToken({ player, isCurrent }: Props) {
  const target = Math.min(player.position, BOARD_SIZE)
  // Posicion "visible": la ficha recorre casillero por casillero hasta llegar al destino.
  const [shown, setShown] = useState(target)
  const shownRef = useRef(target)

  useEffect(() => {
    if (shownRef.current === target) return
    const id = setInterval(() => {
      const current = shownRef.current
      if (current === target) {
        clearInterval(id)
        return
      }
      const next = current + Math.sign(target - current)
      shownRef.current = next
      setShown(next)
      if (next === target) clearInterval(id)
    }, STEP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [target])

  const center = getTileCenter(shown)
  const offset = TOKEN_OFFSETS[player.id % TOKEN_OFFSETS.length]
  const avatar = getAvatar(player.avatar)
  const color = getColor(player.color)

  return (
    <div
      className={`token ${isCurrent ? 'current-turn' : ''}`}
      style={{
        left: `calc(${center.x}% + ${offset.x}cqw)`,
        top: `calc(${center.y}% + ${offset.y}cqw)`,
      }}
      title={player.name}
    >
      <span className="token-body" key={shown} style={{ background: color.hex }}>
        {avatar.emoji}
      </span>
    </div>
  )
}
