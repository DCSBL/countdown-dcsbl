import { useEffect, useState } from 'react'
import clippyImg from '../assets/clippy.png'

const CLIPPY_LINES = [
  'Het lijkt erop dat je naar een countdown zit te staren. Wil je daar hulp bij? 📎',
  'Het lijkt erop dat je probeert te focussen. Zal ik wat afleiding regelen? 👀',
  'Het lijkt erop dat je een deadline probeert te halen. Zal ik ‘m verplaatsen naar morgen? 📅',
  'Het lijkt erop dat je op het puntje van je stoel zit. Wil je hulp met wachten? ⏳',
  'Het lijkt erop dat je een e-mail probeert te schrijven. Zal ik "vrijdagmiddag!!" invullen? 📧',
  'Het lijkt erop dat je stiekem deze pagina ververst. Wil je dat ik dat voor je blijf doen? 🔄',
]

const ROTATE_INTERVAL_MS = 6000

export function Clippy() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % CLIPPY_LINES.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="clippy" aria-hidden="true">
      <div className="clippy-bubble">
        <span key={index} className="clippy-line">
          {CLIPPY_LINES[index]}
        </span>
      </div>
      <img src={clippyImg} alt="" className="clippy-face" />
    </div>
  )
}
