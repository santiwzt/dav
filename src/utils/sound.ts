// Sonido generado 100% con Web Audio API, sin archivos externos.

let ctx: AudioContext | null = null
let enabled = true

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  return ctx
}

export function setSoundEnabled(value: boolean): void {
  enabled = value
}

export function isSoundEnabled(): boolean {
  return enabled
}

interface ToneOptions {
  freq: number
  duration: number
  type?: OscillatorType
  volume?: number
  delay?: number
  glideTo?: number
}

function tone({ freq, duration, type = 'sine', volume = 0.15, delay = 0, glideTo }: ToneOptions): void {
  if (!enabled) return
  const audioCtx = getCtx()
  if (!audioCtx) return
  const start = audioCtx.currentTime + delay
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (glideTo) {
    osc.frequency.linearRampToValueAtTime(glideTo, start + duration)
  }
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.05)
}

export function playClick(): void {
  tone({ freq: 520, duration: 0.08, type: 'triangle', volume: 0.12 })
}

export function playDiceRoll(): void {
  if (!enabled) return
  for (let i = 0; i < 5; i++) {
    tone({ freq: 260 + Math.random() * 220, duration: 0.06, type: 'square', volume: 0.06, delay: i * 0.06 })
  }
}

export function playMoveStep(): void {
  tone({ freq: 400, duration: 0.07, type: 'triangle', volume: 0.1 })
}

export function playCorrect(): void {
  tone({ freq: 523.25, duration: 0.12, type: 'sine', volume: 0.16 })
  tone({ freq: 659.25, duration: 0.14, type: 'sine', volume: 0.16, delay: 0.12 })
  tone({ freq: 783.99, duration: 0.2, type: 'sine', volume: 0.16, delay: 0.24 })
}

export function playWrong(): void {
  tone({ freq: 300, duration: 0.22, type: 'sawtooth', volume: 0.13, glideTo: 160 })
}

export function playHistoryPopup(): void {
  tone({ freq: 440, duration: 0.18, type: 'sine', volume: 0.12 })
  tone({ freq: 550, duration: 0.22, type: 'sine', volume: 0.1, delay: 0.1 })
}

export function playItem(): void {
  tone({ freq: 660, duration: 0.1, type: 'square', volume: 0.1 })
  tone({ freq: 880, duration: 0.16, type: 'square', volume: 0.1, delay: 0.1 })
}

export function playKingdomEvent(): void {
  tone({ freq: 220, duration: 0.14, type: 'sawtooth', volume: 0.1 })
  tone({ freq: 330, duration: 0.16, type: 'sawtooth', volume: 0.1, delay: 0.12 })
}

export function playUnlock(): void {
  tone({ freq: 392, duration: 0.12, type: 'triangle', volume: 0.14 })
  tone({ freq: 523.25, duration: 0.12, type: 'triangle', volume: 0.14, delay: 0.11 })
  tone({ freq: 659.25, duration: 0.12, type: 'triangle', volume: 0.14, delay: 0.22 })
  tone({ freq: 880, duration: 0.28, type: 'triangle', volume: 0.16, delay: 0.33 })
}

export function playAchievement(): void {
  tone({ freq: 587.33, duration: 0.12, type: 'sine', volume: 0.15 })
  tone({ freq: 739.99, duration: 0.12, type: 'sine', volume: 0.15, delay: 0.1 })
  tone({ freq: 987.77, duration: 0.3, type: 'sine', volume: 0.17, delay: 0.2 })
}

export function playVictory(): void {
  const notes = [523.25, 587.33, 659.25, 783.99, 987.77]
  notes.forEach((freq, i) => tone({ freq, duration: 0.3, type: 'triangle', volume: 0.17, delay: i * 0.15 }))
}
