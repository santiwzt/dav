import { HISTORY_EVENTS } from '../data/historyEvents'

interface Props {
  onBack: () => void
}

const CHAPTER_TITLES: Record<number, string> = {
  1: 'Capítulo 1 — La sucesión al trono',
  2: 'Capítulo 2 — El testamento y la consolidación',
  3: 'Capítulo 3 — Sabiduría para gobernar',
}

export default function StoryScreen({ onBack }: Props) {
  const chapters = [1, 2, 3] as const

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>📖 La historia</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="story-timeline">
          {chapters.map((ch) => (
            <div className={`story-chapter ${ch > 1 ? `ch-${ch}` : ''}`} key={ch}>
              <h3>{CHAPTER_TITLES[ch]}</h3>
              <ul>
                {HISTORY_EVENTS.filter((e) => e.chapter === ch).map((e) => (
                  <li key={e.id}>
                    <strong>{e.title}:</strong> {e.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
