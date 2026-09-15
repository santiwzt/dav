import { useMemo } from 'react'

const COLORS = ['#3dabdb', '#f2a93b', '#8a5fbf', '#45b787', '#e6573f', '#ffcf4a']

export default function Confetti({ count = 60 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        duration: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 1.5,
      })),
    [count],
  )

  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  )
}
