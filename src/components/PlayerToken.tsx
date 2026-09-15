import { useEffect, useRef, useState } from 'react'
import type { PlayerState } from '../types'
import { getTileGridPosition, TOKEN_OFFSETS } from '../utils/boardLayout'
import { getAvatar, getColor } from '../data/players'
import { BOARD_SIZE } from '../data/boardTiles'

interface Props {
  player: PlayerState
  index: number
  isCurrent?: boolean
}

export default function PlayerToken({ player, isCurrent }: Props) {
  const clampedPosition = Math.min(player.position, BOARD_SIZE)
  const { row, col } = getTileGridPosition(clampedPosition)
  const offset = TOKEN_OFFSETS[player.id % TOKEN_OFFSETS.length]
  const avatar = getAvatar(player.avatar)
  const color = getColor(player.color)

  const [hopping, setHopping] = useState(false)
  const prevPos = useRef(player.position)

  useEffect(() => {
    if (prevPos.current !== player.position) {
      setHopping(true)
      const t = setTimeout(() => setHopping(false), 520)
      prevPos.current = player.position
      return () => clearTimeout(t)
    }
  }, [player.position])

  const leftPct = ((col + 0.5) / 8) * 100
  const topPct = ((row + 0.5) / 5) * 100

  return (
    <div
      className={`player-token ${hopping ? 'hopping' : ''} ${isCurrent ? 'current-turn' : ''}`}
      style={{
        left: `calc(${leftPct}% + ${offset.x}px)`,
        top: `calc(${topPct}% + ${offset.y}px)`,
        transform: 'translate(-50%, -50%)',
        background: color.hex,
      }}
      title={player.name}
    >
      {avatar.emoji}
    </div>
  )
}
