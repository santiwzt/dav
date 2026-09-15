interface Props {
  onBack: () => void
}

const RULES = [
  {
    emoji: '🎲',
    title: 'Tirar el dado',
    text: 'En tu turno tirás un dado del 1 al 6 y avanzás esa cantidad de casilleros sobre el tablero.',
  },
  {
    emoji: '🧭',
    title: 'El tablero',
    text: '40 casilleros en zigzag, divididos en 3 zonas de color: una por cada capítulo de Melajim I (1 Reyes).',
  },
  {
    emoji: '❓',
    title: 'Casillero de trivia',
    text: 'Respondés una pregunta sobre la historia. Si acertás, avanzás 3 casilleros. Si te equivocás, retrocedés 3 (nunca por debajo del casillero 1).',
  },
  {
    emoji: '📖',
    title: 'Casillero de historia',
    text: 'Aparece un popup breve que cuenta un momento clave de la historia. No suma ni resta casilleros, pero puede desbloquear un personaje nuevo.',
  },
  {
    emoji: '⭐',
    title: 'Casillero de fortuna / ⚠️ contratiempo',
    text: 'Avanzás o retrocedés automáticamente unos pocos casilleros, sin ninguna decisión de tu parte.',
  },
  {
    emoji: '🎁',
    title: 'Casillero de objeto',
    text: 'Recibís al azar uno de tres objetos: Pergamino de Natán, Bendición de Shlomó o Escudo de Benaiá. Podés guardar hasta 2 objetos, y se usan solos cuando corresponde.',
  },
  {
    emoji: '📯',
    title: 'Casillero de evento del reino',
    text: 'Se dispara un evento al azar que afecta a todos los jugadores: consejos reales, bendiciones, tributos o años de sequía.',
  },
  {
    emoji: '🔗',
    title: 'Sin cadenas infinitas',
    text: 'Si un bonus o penalización te hace caer en otro casillero especial, ese segundo casillero no se vuelve a resolver.',
  },
  {
    emoji: '🏁',
    title: 'Cómo se gana',
    text: 'Gana el primer jugador en llegar o superar el casillero 40. No hace falta caer justo en el número exacto.',
  },
  {
    emoji: '👥',
    title: 'Jugadores',
    text: 'De 2 a 4 jugadores, cada uno con su nombre, avatar y color. Todo lo que pasa en el juego es azar o gestión automática de recursos: ninguna decisión cambia los hechos bíblicos.',
  },
]

export default function RulesScreen({ onBack }: Props) {
  return (
    <div className="screen">
      <div className="screen-header">
        <h2>📋 Reglas del juego</h2>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="screen-body">
        <div className="rules-grid">
          {RULES.map((r) => (
            <div className="rule-card" key={r.title}>
              <div className="rule-emoji">{r.emoji}</div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
