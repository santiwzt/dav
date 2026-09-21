# 👑 El Reino en Juego

Juego de tablero web educativo para 2 a 4 jugadores locales, basado en **Melajim I (1 Reyes), capítulos 1 a 3**.
Trabajo práctico de Cultura Judía — 4.º año.

Construido con **React + TypeScript + Vite**. Sin backend, sin dependencias pagas ni APIs externas: funciona 100% offline una vez instalado.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Objetivo del juego

Ser el primer jugador en llegar o superar el casillero 40 del tablero, recorriendo los tres capítulos de la sucesión de David y el reinado de Shlomó.

## Reglas principales

1. Tablero de 40 casilleros en recorrido en zigzag (serpiente), dividido en 3 zonas de color, una por capítulo.
2. En tu turno tirás un dado (1-6) y avanzás esa cantidad de casilleros.
3. **Casillero de trivia (❓):** respondés una pregunta de opción múltiple. Acertar = +3 casilleros. Fallar = -3 casilleros (nunca por debajo del casillero 1).
4. **Casillero de historia (📖):** un popup breve cuenta un momento clave de Melajim I. No suma ni resta casilleros, pero puede desbloquear un personaje nuevo para tu colección.
5. **Casillero de fortuna (⭐) / contratiempo (⚠️):** avanzan o retroceden automáticamente unos pocos casilleros, sin ninguna decisión del jugador.
6. **Casillero de objeto (🎁):** otorga al azar uno de tres objetos (máximo 2 guardados por jugador), que se consumen solos cuando corresponde:
   - **Pergamino de Natán:** anula la próxima respuesta incorrecta de trivia.
   - **Bendición de Shlomó:** la próxima trivia correcta da +5 en vez de +3.
   - **Escudo de Benaiá:** cancela el efecto del próximo casillero de contratiempo.
7. **Casillero de evento del reino (📯):** dispara un evento al azar que afecta a todos los jugadores (consejo real, bendición del pueblo, tributo de Egipto o año de sequía).
8. Si un bonus o penalización hace caer a alguien en otro casillero especial, ese segundo casillero **no** se vuelve a resolver (evita cadenas infinitas).
9. Gana el primero en llegar o superar el casillero 40 (no hace falta número exacto).

Ninguna mecánica es una decisión narrativa: todo el juego es azar o gestión automática de recursos. Los hechos bíblicos no cambian según lo que haga el jugador.

## Contenido educativo

- **30 preguntas de trivia** (10 por capítulo), cada una con explicación de la respuesta correcta.
- **10 eventos históricos** narrados en popups: David anciano, la conspiración de Adoniá, la intervención de Batsheba y Natán, la coronación en Guijón, el testamento de David, el pedido de Abishag, la consolidación del reino, el vínculo con Egipto, el sueño en Guibón y el juicio de las dos mujeres.
- **12 personajes coleccionables** (David, Shlomó, Natán, Batsheba, Adoniá, Yoab, Ebiatar, Tzadok, Abishag, Benaiá, Shimhí y "Las dos mujeres del juicio"), con bio y frase de sabor originales. Empiezan bloqueados y se desbloquean permanentemente al vivir el evento histórico correspondiente en una partida real (persisten entre partidas vía `localStorage`).
- **6 logros**: Coleccionista, Sabio de Israel, Corredor veloz, Historiador, Superviviente y Perfeccionista.
- Pantallas de **Reglas**, **Contenido**, **Historia** (línea de tiempo por capítulo) y **Créditos**.

## Otras características

- Menú principal con Jugar / Reglas / Contenido / Historia / Personajes / Créditos y control de sonido.
- Configuración de partida: 2 a 4 jugadores, cada uno con nombre, avatar (corona, león, shofar, pergamino, escudo, lámpara, estrella, palmera) y color propio.
- Tablero de proporcion fija 5:3 (ocupa toda la pantalla): 40 casilleros circulares sobre un camino sinuoso por capitulo, escenografia SVG original (tienda y palmeras, columnas, templo y balanza), banderas de capitulo, dado con pips, fichas que saltan casillero por casillero y barra de progreso por jugador.
- Reparto de tarjetas de personaje al empezar: a cada jugador le toca un personaje al azar (sin repetir), con animacion de carta. Es solo ambientacion, no cambia reglas.
- Retratos ilustrados (SVG original) para los 12 personajes. Para usar imagenes propias, copialas como `public/portraits/<id>.png` (ej: `david.png`, `shlomo.png`, `natan.png`, `batsheba.png`, `adonia.png`, `yoab.png`, `ebiatar.png`, `tzadok.png`, `abishag.png`, `benaia.png`, `shimhi.png`, `dos-mujeres.png`) y reemplazan al dibujo automaticamente.
- Animación de "flip" 3D al desbloquear un personaje nuevo + notificación en pantalla.
- Pantalla de victoria con estadísticas (turnos, aciertos, racha, eventos vistos) y confeti.
- Menú de pausa (continuar / salir al menú) y persistencia de configuración y sonido en `localStorage`.
- Sonido generado 100% con Web Audio API (sin archivos de audio externos), con botón de silenciar.

## Estructura del proyecto

```
src/
  components/     Pantallas y componentes de UI (menú, tablero, modales, etc.)
  context/        Estado global: motor de juego (GameContext) y colección persistente (CollectionContext)
  data/           Contenido: personajes, eventos históricos, trivia, tablero, objetos, eventos, logros
  styles/         Hoja de estilos global
  utils/          Sonido, localStorage, layout del tablero
  types.ts        Tipos TypeScript compartidos
```

## Créditos

Proyecto de Cultura Judía — 4.º año. Hecho por Santiago W, Matias O y Vicente V.
