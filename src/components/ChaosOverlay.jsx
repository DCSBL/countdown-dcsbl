import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { GIPHY_LINKS } from '../giphyLinks'
import { SafeGif } from './SafeGif'

const EMOJI_BY_STAGE = {
  calm: [],
  mild: ['💼', '🕐', '📅'],
  building: ['🚪', '👋', '⏳', '💼'],
  frantic: ['🎉', '🚀', '🕐', '👋', '🏖️'],
  chaos: ['🎉', '🥳', '🚀', '🏖️', '👋', '➡️', '🚪'],
  done: ['🎉', '🥳', '🚀', '🏖️', '👋', '➡️', '🎊', '🕺'],
}

const BANNER_BY_STAGE = {
  frantic: 'NOG EVEN GEDULD... LAATSTE UUR! 🕐',
  chaos: '🎉 BIJNA VRIJ! LAATSTE MINUTEN! 🎉',
  done: '🎉 KLAAR MEE! OP NAAR HET VOLGENDE AVONTUUR! 🚀',
}

const SPAWN_INTERVAL_MAX_MS = 3800
const SPAWN_INTERVAL_MIN_MS = 350
const CONFETTI_BURSTS = 20
const CONFETTI_INTERVAL_MS = 600

let nextItemId = 0

export function ChaosOverlay({ stage, intensity }) {
  const [items, setItems] = useState([])
  const intensityRef = useRef(intensity)

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

    function spawn() {
      const emojiPool = EMOJI_BY_STAGE[stage] ?? []
      const gifPool = GIPHY_LINKS.filter((link) => !link.stage || link.stage === stage)
      const useGif = gifPool.length > 0 && Math.random() < 0.3
      const id = nextItemId++

      const item = useGif
        ? { id, type: 'gif', url: gifPool[Math.floor(Math.random() * gifPool.length)].url }
        : { id, type: 'emoji', char: emojiPool[Math.floor(Math.random() * emojiPool.length)] }

      const left = Math.random() * 90
      const duration = 7 + Math.random() * 5
      const size = useGif ? 40 + Math.random() * 40 : 28 + Math.random() * 28

      setItems((current) => [...current, { ...item, left, duration, size }])
      setTimeout(() => {
        setItems((current) => current.filter((entry) => entry.id !== id))
      }, duration * 1000)

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
    if (stage !== 'done') return undefined

    let count = 0
    const id = setInterval(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        startVelocity: 45,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
      })
      count += 1
      if (count >= CONFETTI_BURSTS) clearInterval(id)
    }, CONFETTI_INTERVAL_MS)

    return () => clearInterval(id)
  }, [stage])

  const banner = BANNER_BY_STAGE[stage]

  return (
    <div className={`chaos-overlay stage-${stage}`} aria-hidden="true">
      <div className="bg-layer" style={{ '--intensity': intensity }} />

      {items.map((item) =>
        item.type === 'gif' ? (
          <SafeGif
            key={item.id}
            src={item.url}
            className="floating-item floating-gif"
            style={{ left: `${item.left}%`, '--duration': `${item.duration}s`, width: item.size }}
          />
        ) : (
          <span
            key={item.id}
            className="floating-item floating-emoji"
            style={{ left: `${item.left}%`, '--duration': `${item.duration}s`, fontSize: item.size }}
          >
            {item.char}
          </span>
        ),
      )}

      {banner && (
        <div className="marquee">
          <div className="marquee-track">
            <span>{banner}</span>
            <span>{banner}</span>
            <span>{banner}</span>
          </div>
        </div>
      )}
    </div>
  )
}
