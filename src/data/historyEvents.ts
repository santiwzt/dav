import type { HistoryEvent } from '../types'

// 10 eventos historicos (popups informativos). NO otorgan ni quitan casilleros.
// Cada uno desbloquea 1 o 2 personajes (12 personajes repartidos entre 10 eventos).
export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    id: 'david-anciano',
    chapter: 1,
    title: 'David, ya anciano',
    text: 'El rey David ha envejecido y ya no logra entrar en calor por si mismo. Sus sirvientes deciden buscar una joven que lo acompane y lo cuide, mientras el reino observa con atencion quien sera su sucesor.',
    characterIds: ['david'],
  },
  {
    id: 'conspiracion-adonia',
    chapter: 1,
    title: 'La conspiración de Adoniá',
    text: 'Adonia, hijo de David, se proclama rey por su cuenta sin consultar a su padre. Organiza una gran celebracion con carros, jinetes y el apoyo de figuras influyentes de la corte, buscando asegurarse el trono antes de que nadie pueda impedirlo.',
    characterIds: ['adonia', 'ebiatar'],
  },
  {
    id: 'batsheba-natan',
    chapter: 1,
    title: 'Batsheba y Natán actúan',
    text: 'Al enterarse del plan de Adonia, el profeta Natan avisa a Batsheba y disenian juntos una estrategia: ella hablara con el rey David para recordarle su promesa, y Natan confirmara la situacion apenas despues.',
    characterIds: ['batsheba', 'natan'],
  },
  {
    id: 'coronacion-guijon',
    chapter: 1,
    title: 'La coronación en Guijón',
    text: 'Por orden de David, Shlomo es llevado a la fuente de Guijon montado en la mula real. Alli el sacerdote Tzadok lo unge como rey mientras suena el shofar y el pueblo entero celebra al nuevo monarca.',
    characterIds: ['shlomo', 'tzadok'],
  },
  {
    id: 'testamento-david',
    chapter: 2,
    title: 'El testamento de David',
    text: 'Antes de morir, David le da a Shlomo sus ultimas instrucciones: que se mantenga fiel a los caminos de Dios, y que resuelva con justicia algunas cuentas pendientes del pasado, incluyendo la de Shimhi.',
    characterIds: ['shimhi'],
  },
  {
    id: 'pedido-abishag',
    chapter: 2,
    title: 'El pedido de Abishag',
    text: 'Adonia le pide a Batsheba que interceda ante Shlomo para poder casarse con Abishag, la joven que habia cuidado a David. Shlomo interpreta el pedido como una jugada politica peligrosa contra su propio trono.',
    characterIds: ['abishag'],
  },
  {
    id: 'consolidacion-reino',
    chapter: 2,
    title: 'La consolidación del reino',
    text: 'Shlomo toma medidas firmes para asegurar la estabilidad de su gobierno: aparta a quienes habian apoyado la conspiracion de Adonia y confia en Benaia para hacer cumplir sus decisiones mas dificiles.',
    characterIds: ['yoab'],
  },
  {
    id: 'vinculo-egipto',
    chapter: 3,
    title: 'El vínculo con Egipto',
    text: 'Shlomo establece una alianza con el Faraon de Egipto y se casa con su hija, fortaleciendo la posicion de Israel entre los reinos vecinos mientras continua consolidando su gobierno.',
    characterIds: ['tzadok'],
  },
  {
    id: 'sueno-guibon',
    chapter: 3,
    title: 'El sueño en Guibón',
    text: 'Durante una noche en Guibon, Dios se le aparece a Shlomo en un sueno y le ofrece pedir lo que desee. Shlomo, en lugar de riquezas o larga vida, pide un corazon sabio para poder juzgar a su pueblo con justicia.',
    characterIds: ['benaia'],
  },
  {
    id: 'juicio-dos-mujeres',
    chapter: 3,
    title: 'El juicio de las dos mujeres',
    text: 'Dos mujeres se presentan ante Shlomo reclamando ser la madre del mismo bebe. Con una prueba tan simple como astuta, el rey descubre cual de las dos dice la verdad, y su fama de sabio se extiende por todo Israel.',
    characterIds: ['dos-mujeres'],
  },
]

export function getHistoryEventById(id: string): HistoryEvent | undefined {
  return HISTORY_EVENTS.find((e) => e.id === id)
}
