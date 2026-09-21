interface Props {
  onBack: () => void
}

const TEAM = [
  { name: 'Santiago W', color: '#3dabdb', emoji: '🦁' },
  { name: 'Matias O', color: '#f2a93b', emoji: '👑' },
  { name: 'Vicente V', color: '#8a5fbf', emoji: '⭐' },
]

export default function CreditsScreen({ onBack }: Props) {
  return (
    <div className="credits">
      <div className="credits-inner">
        <div className="setup-header">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            ← Volver
          </button>
          <div className="setup-heading">
            <h2>Créditos</h2>
            <p>El Reino en Juego</p>
          </div>
          <span className="setup-header-spacer" />
        </div>

        <p className="credits-project">
          Proyecto de <strong>Cultura Judía</strong> · 4.º año
          <br />
          Basado en Melajim I (1 Reyes), capítulos 1 a 3
        </p>

        <h3 className="credits-label">Hecho por</h3>
        <div className="credits-team">
          {TEAM.map((member) => (
            <div className="credits-member" key={member.name} style={{ ['--pc' as string]: member.color }}>
              <span className="credits-avatar" aria-hidden="true">
                {member.emoji}
              </span>
              <span className="credits-name">{member.name}</span>
            </div>
          ))}
        </div>

        <p className="credits-tech">
          Hecho con React, TypeScript y Vite · Ilustraciones y sonidos generados con código · Tipografías Baloo 2 e
          Inter
        </p>
      </div>
    </div>
  )
}
