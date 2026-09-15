import type { ToastItem } from '../context/GameContext'

interface Props {
  toasts: ToastItem[]
}

export default function ToastContainer({ toasts }: Props) {
  if (toasts.length === 0) return null
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <span>{t.emoji}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
