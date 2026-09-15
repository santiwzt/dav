interface Props {
  onBack: () => void
}

export default function CreditsScreen({ onBack }: Props) {
  return (
    <div className="screen">
      <div className="screen-header">
        <h2>✨ Créditos</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="credits-list">
          <p>
            <strong>El Reino en Juego</strong> — Trabajo Práctico de Cultura Judía, 4º año.
          </p>
          <p>Basado en Melajim I (1 Reyes), capítulos 1 a 3.</p>
          <p>Diseño, contenido y desarrollo: proyecto escolar hecho con React, TypeScript y Vite.</p>
          <p>Ilustraciones: formas SVG originales realizadas para este proyecto.</p>
          <p>Sonido: generado con Web Audio API, sin archivos de audio externos.</p>
          <p>Tipografías: Baloo 2 e Inter (Google Fonts).</p>
        </div>
      </div>
    </div>
  )
}
