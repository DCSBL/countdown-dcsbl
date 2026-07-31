import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { GIPHY_LINKS } from '../giphyLinks'
import { fetchRandomCalmMeme } from '../randomMeme'
import { SafeGif } from './SafeGif'
import doneVideo from '../assets/untitled_video.mp4'

const EMOJI_BY_STAGE = {
  calm: [],
  mild: ['💼', '🕐', '📅'],
  building: ['🚪', '👋', '⏳', '💼'],
  restless: ['⏳', '🕐', '👋', '🚪', '😬'],
  frantic: ['🎉', '🚀', '🕐', '👋', '🏖️'],
  panic: ['😱', '🔥', '🎉', '🚀', '🏃'],
  chaos: ['🎉', '🥳', '🚀', '🏖️', '👋', '➡️', '🚪'],
  done: ['🎉', '🥳', '🚀', '🏖️', '👋', '➡️', '🎊', '🕺', '🍾', '🦅', '🔥', '🎆', '🐬'],
}

// Gif pools reuse a neighboring stage's vibe for stages that don't have
// their own curated Giphy entries yet (see giphyLinks.js).
const GIF_STAGE_FALLBACK = {
  restless: 'building',
  panic: 'frantic',
}

const BANNER_BY_STAGE = {
  mild: [
    'Nog eventjes doorbijten... 💼',
    'De klok tikt door 🕐',
    'Nog heel eventjes normaal doen 😐',
    'I am ready to face any challenges that might be foolish enough to face me.',
    'Making the world a better place...💻',
    'Nog een paar standups te gaan 📅',
    'Rustig aan, we zijn er nog lang niet 🐌',
  ],
  building: [
    'Het einde komt in zicht 👋',
    'Tas alvast inpakken? 🎒',
    'Bestand opgeslagen. Klaar voor vandaag? 💾',
    'Cool, cool, cool, cool, cool. No doubt, no doubt.',
    'Always blue! Always blue!" ',
    'De vrijdagmiddag-energie komt eraan 🕺',
  ],
  restless: [
    'Nog maar 2 uur te gaan! ⏳',
    'Nog wel doen alsof je werkt 🎭',
    'Elke 5 minuten de klok checken 👀',
    'I\'m not superstitious, but I am a little stitious.',
    'My code is compiling..." ',
    'De rekenmachine staat al klaar voor het aftellen 🧮',
  ],
  frantic: [
    'NOG EVEN GEDULD... LAATSTE UUR! ☕',
    'Laatste mailtjes wegwerken 📧',
    'De jas ligt al over de stoel 🧥',
    'OH MY GOD! IT’S HAPPENING! EVERYBODY STAY CALM!',
    'Everything is garbage. The never-ending trash fire of time.',
    'Middle-out compression level focus ⚡',
    'Nog één dingetje afmaken... en nog één... 🔁',
  ],
  panic: [
    '15 MINUTEN! PANIEK! 😱',
    'Laptop dichtklappen in 3... 2... 💻',
    'Alarm gezet? Check. Jas aan? Check. 🧥',
    'PARKOUR!',
    'HOT DAMN!',
    'Pied Piper server status: CRITICAL 🔥',
    'Elke seconde voelt als een uur nu ⏱️',
  ],
  chaos: [
    '🎉 BIJNA VRIJ! LAATSTE MINUTEN! 🎉',
    'VIJF... VIER... DRIE... 🔥',
    'THREAT LEVEL MIDNIGHT!"',
    'De deur is al in zicht 🚪',
  ],
  done: [
    '🎉 KLAAR MEE! VAKANTIE! 🚀',
    'GENIET ERVAN! 🏖️',
    'WE ZIJN VRIJ WE ZIJN VRIJ WE ZIJN VRIJ 🎆🎆🎆',
    'NOOIT MEER TERUG 😎',
    'PIVOT! PIVOT!" ',
    'Terry loves the weekend!" ',
    '364 days until next Pretzel Day...',
    'Welcome to the Tres Comas Club!" ',
  ],
};

const POP_SCORE_STORAGE_KEY = 'countdown-pop-score'

function loadPopScore() {
  const stored = Number(localStorage.getItem(POP_SCORE_STORAGE_KEY))
  return Number.isFinite(stored) && stored > 0 ? stored : 0
}

const SPAWN_INTERVAL_MAX_MS = 3800
const SPAWN_INTERVAL_MIN_MS = 350
const CONFETTI_BURSTS = 40
const CONFETTI_INTERVAL_MS = 350

// Calm stage: an occasional gif, not the chaos spawn loop above. Randomized
// around a ~15 min average, with a rolling-hour cap as a backstop in case a
// run of short random gaps would otherwise clear it.
const CALM_MIN_INTERVAL_MS = 10 * 60 * 1000
const CALM_MAX_INTERVAL_MS = 20 * 60 * 1000
const CALM_MAX_PER_HOUR = 4
const HOUR_MS = 60 * 60 * 1000

let nextItemId = 0

export function ChaosOverlay({ stage, intensity }) {
  const [items, setItems] = useState([])
  const [score, setScore] = useState(loadPopScore)
  const intensityRef = useRef(intensity)
  const doneVideoRef = useRef(null)

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    if (stage === 'calm') {
      setItems([])
      return undefined
    }

    let cancelled = false
    let spawnTimeoutId = null

    function spawnOne() {
      const emojiPool = EMOJI_BY_STAGE[stage] ?? []
      const gifStage = GIF_STAGE_FALLBACK[stage] ?? stage
      const gifPool = GIPHY_LINKS.filter((link) => !link.stage || link.stage === gifStage)
      const useGif = gifPool.length > 0 && Math.random() < 0.3
      const id = nextItemId++
      const gifSizeMin = stage === 'done' ? 110 : 80
      const gifSizeRange = stage === 'done' ? 110 : 90

      const item = useGif
        ? { id, type: 'gif', url: gifPool[Math.floor(Math.random() * gifPool.length)].url }
        : { id, type: 'emoji', char: emojiPool[Math.floor(Math.random() * emojiPool.length)] }

      const left = Math.random() * 90
      const duration = 7 + Math.random() * 5
      const size = useGif
        ? gifSizeMin + Math.random() * gifSizeRange
        : 28 + Math.random() * 28

      setItems((current) => [...current, { ...item, left, duration, size }])
      setTimeout(() => {
        setItems((current) => current.filter((entry) => entry.id !== id))
      }, duration * 1000)
    }

    function spawn() {
      spawnOne()
      if (stage === 'done') spawnOne()

      const interval =
        SPAWN_INTERVAL_MAX_MS -
        intensityRef.current * (SPAWN_INTERVAL_MAX_MS - SPAWN_INTERVAL_MIN_MS)
      spawnTimeoutId = setTimeout(() => {
        if (!cancelled) spawn()
      }, interval)
    }

    spawn()

    return () => {
      cancelled = true
      clearTimeout(spawnTimeoutId)
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'calm') return undefined

    let cancelled = false
    let timeoutId = null
    const spawnTimestamps = []

    async function spawnCalmMeme() {
      const url = await fetchRandomCalmMeme()
      if (cancelled || !url) return

      const id = nextItemId++
      const left = Math.random() * 90
      const duration = 9 + Math.random() * 4
      const size = 90 + Math.random() * 90

      setItems((current) => [...current, { id, type: 'gif', url, left, duration, size }])
      setTimeout(() => {
        setItems((current) => current.filter((entry) => entry.id !== id))
      }, duration * 1000)
    }

    function scheduleNext() {
      const delay =
        CALM_MIN_INTERVAL_MS + Math.random() * (CALM_MAX_INTERVAL_MS - CALM_MIN_INTERVAL_MS)
      timeoutId = setTimeout(() => {
        if (cancelled) return
        const now = Date.now()
        while (spawnTimestamps.length && now - spawnTimestamps[0] > HOUR_MS) {
          spawnTimestamps.shift()
        }
        if (spawnTimestamps.length < CALM_MAX_PER_HOUR) {
          spawnTimestamps.push(now)
          spawnCalmMeme()
        }
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'done') return undefined
    const video = doneVideoRef.current
    if (!video) return undefined

    video.muted = false
    const playAttempt = video.play()
    if (playAttempt) {
      playAttempt.catch(() => {
        // Autoplay with sound was blocked; fall back to a muted, silent loop.
        video.muted = true
        video.play().catch(() => {})
      })
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'done') return undefined

    let count = 0
    const id = setInterval(() => {
      confetti({
        particleCount: 220,
        spread: 160,
        startVelocity: 65,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
      })
      count += 1
      if (count >= CONFETTI_BURSTS) clearInterval(id)
    }, CONFETTI_INTERVAL_MS)

    return () => clearInterval(id)
  }, [stage])

  function popItem(id, event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const originX = (rect.left + rect.width / 2) / window.innerWidth
    const originY = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 22,
      spread: 75,
      startVelocity: 24,
      gravity: 1.1,
      scalar: 0.6,
      ticks: 60,
      origin: { x: originX, y: originY },
    })

    setItems((current) =>
      current.map((entry) =>
        entry.id === id
          ? { ...entry, popped: true, freezeLeft: rect.left, freezeTop: rect.top }
          : entry,
      ),
    )

    setTimeout(() => {
      setItems((current) => current.filter((entry) => entry.id !== id))
    }, 240)

    setScore((current) => {
      const next = current + 1
      localStorage.setItem(POP_SCORE_STORAGE_KEY, String(next))
      return next
    })
  }

  const banners = BANNER_BY_STAGE[stage]

  return (
    <div className={`chaos-overlay stage-${stage}`} aria-hidden="true">
      <div className="bg-layer" style={{ '--intensity': intensity }} />

      {stage === 'done' && (
        <video
          ref={doneVideoRef}
          className="bg-video"
          src={doneVideo}
          loop
          playsInline
          preload="auto"
        />
      )}

      {items.map((item) => {
        const frozenStyle = item.popped
          ? { left: `${item.freezeLeft}px`, top: `${item.freezeTop}px` }
          : { left: `${item.left}%` }

        return item.type === 'gif' ? (
          <SafeGif
            key={item.id}
            src={item.url}
            className={`floating-item floating-gif${item.popped ? ' pop' : ''}`}
            style={{
              ...frozenStyle,
              '--duration': `${item.duration}s`,
              width: item.size,
            }}
            onClick={(event) => popItem(item.id, event)}
          />
        ) : (
          <span
            key={item.id}
            className={`floating-item floating-emoji${item.popped ? ' pop' : ''}`}
            style={{
              ...frozenStyle,
              '--duration': `${item.duration}s`,
              fontSize: item.size,
            }}
            onClick={(event) => popItem(item.id, event)}
          >
            {item.char}
          </span>
        )
      })}

      {banners && (
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1, 2].map((rep) =>
              banners.map((line, i) => <span key={`${rep}-${i}`}>{line}</span>),
            )}
          </div>
        </div>
      )}

      {score > 0 && (
        <div className="score-counter">
          <span key={score} className="score-value">
            {score}
          </span>
        </div>
      )}
    </div>
  )
}
