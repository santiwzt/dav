import { useGame } from '../context/GameContext'

export default function TriviaModal() {
  const { state, answerTrivia, closeTriviaModal } = useGame()
  const question = state.activeTriviaQuestion
  if (!question) return null
  const answer = state.triviaAnswer

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-emoji-row">
          <span className="big-emoji">❓</span>
          <h2>Trivia — Capítulo {question.chapter}</h2>
        </div>
        <p style={{ fontWeight: 700, color: 'var(--ink)' }}>{question.question}</p>

        <div className="trivia-options">
          {question.options.map((opt, idx) => {
            let cls = 'option-btn'
            if (answer) {
              if (idx === question.correctIndex) cls += ' correct'
              else if (idx === answer.selectedIndex) cls += ' wrong'
            }
            return (
              <button
                key={idx}
                className={cls}
                disabled={Boolean(answer)}
                onClick={() => answerTrivia(idx)}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {answer && (
          <>
            <div className={`trivia-result-banner ${answer.correct ? 'correct' : 'wrong'}`}>
              {answer.correct ? '¡Correcto! Avanzás casilleros.' : 'Incorrecto. Retrocedés casilleros.'}
            </div>
            <div className="trivia-explanation">{question.explanation}</div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={closeTriviaModal}>
                Continuar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
