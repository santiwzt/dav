import { useState } from 'react'
import { TRIVIA_QUESTIONS } from '../data/triviaQuestions'
import { HISTORY_EVENTS } from '../data/historyEvents'
import { CHARACTERS } from '../data/characters'
import { ACHIEVEMENTS } from '../data/achievements'

interface Props {
  onBack: () => void
}

type ChapterFilter = 'all' | 1 | 2 | 3

const LETTERS = ['A', 'B', 'C', 'D']

export default function ContentScreen({ onBack }: Props) {
  const [filter, setFilter] = useState<ChapterFilter>('all')
  const visible = TRIVIA_QUESTIONS.filter((q) => filter === 'all' || q.chapter === filter)

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>🧠 Contenido educativo</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="rules-grid">
          <div className="rule-card">
            <div className="rule-emoji">📚</div>
            <h3>Fuente</h3>
            <p>
              El juego está basado en <strong>Melajim I (1 Reyes), capítulos 1 a 3</strong>: la vejez de David, la
              conspiración de Adoniá, la coronación de Shlomó y el comienzo de su reinado.
            </p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">🗺️</div>
            <h3>Capítulo 1 · Zona azul</h3>
            <p>La sucesión al trono: la vejez de David, la conspiración de Adoniá y la coronación de Shlomó en Guijón.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">🗺️</div>
            <h3>Capítulo 2 · Zona naranja</h3>
            <p>El testamento de David, su fallecimiento y la consolidación del reinado de Shlomó.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">🗺️</div>
            <h3>Capítulo 3 · Zona violeta</h3>
            <p>La alianza con Egipto, el sueño de Shlomó en Guibón y el célebre juicio de las dos mujeres.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">❓</div>
            <h3>Banco de trivia</h3>
            <p>{TRIVIA_QUESTIONS.length} preguntas en total, 10 por cada capítulo, cada una con su explicación.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">📖</div>
            <h3>Eventos históricos</h3>
            <p>{HISTORY_EVENTS.length} momentos clave narrados con popups informativos durante la partida.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">🗂️</div>
            <h3>Personajes</h3>
            <p>{CHARACTERS.length} personajes para descubrir y coleccionar jugando partidas.</p>
          </div>
          <div className="rule-card">
            <div className="rule-emoji">🏆</div>
            <h3>Logros</h3>
            <p>{ACHIEVEMENTS.length} logros para desbloquear según cómo juegues cada partida.</p>
          </div>
        </div>

        <section className="qbank" aria-labelledby="qbank-title">
          <h3 id="qbank-title" className="qbank-title">
            ❓ Banco de preguntas ({visible.length})
          </h3>
          <div className="tabs-row">
            {(['all', 1, 2, 3] as ChapterFilter[]).map((f) => (
              <button
                key={String(f)}
                className={`tab-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'Todas' : `Capítulo ${f}`}
              </button>
            ))}
          </div>

          <div className="qbank-list">
            {visible.map((q, i) => (
              <article className="qbank-card" key={q.id}>
                <div className="qbank-meta">
                  Capítulo {q.chapter} · Pregunta {i + 1}
                </div>
                <h4 className="qbank-question">{q.question}</h4>
                <ul className="qbank-options">
                  {q.options.map((opt, idx) => (
                    <li key={idx} className={idx === q.correctIndex ? 'correct' : ''}>
                      <span className="qbank-letter">{LETTERS[idx]}</span>
                      <span>{opt}</span>
                      {idx === q.correctIndex && <span className="qbank-tick"> ✓ Correcta</span>}
                    </li>
                  ))}
                </ul>
                <p className="qbank-explanation">{q.explanation}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
