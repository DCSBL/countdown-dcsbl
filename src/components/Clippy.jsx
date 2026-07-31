import { useEffect, useState } from 'react'
import clippyImg from '../assets/clippy.png'

const CLIPPY_LINES = [
  'Het lijkt erop dat je naar een countdown zit te staren. Wil je daar hulp bij? 📎',
  'Het lijkt erop dat je probeert te focussen. Zal ik wat afleiding regelen? 👀',
  'Het lijkt erop dat je een deadline probeert te halen. Zal ik ‘m verplaatsen naar morgen? 📅',
  'Het lijkt erop dat je op het puntje van je stoel zit. Wil je hulp met wachten? ⏳',
  'Het lijkt erop dat je een e-mail probeert te schrijven. Zal ik "vrijdagmiddag!!" invullen? 📧',
  'Het lijkt erop dat je stiekem deze pagina ververst. Wil je dat ik dat voor je blijf doen? 🔄',
  'Het lijkt erop dat je aan het klokkijken bent. Zal ik de tijd voor je vertragen? 🐌',
  'Het lijkt erop dat je een vergadering probeert te vermijden. Zal ik "verbinding verbroken" typen? 📵',
  'Het lijkt erop dat je een Slack-bericht probeert te negeren. Zal ik "even geen tijd" sturen? 💬',
  'Het lijkt erop dat je koffie probeert te halen als excuus. Prima plan, ga door. ☕',
  'Het lijkt erop dat je een standup probeert te overleven. Zal ik "geen blockers" invullen? 🧍',
  'Het lijkt erop dat je stiekem op je telefoon kijkt. Zal ik doen alsof je notities maakt? 📱',
  'Het lijkt erop dat je de laatste minuten probeert te rekken. Slim gedaan. ⏱️',
  'Het lijkt erop dat je een excuus zoekt om te gaan. "Ik moet nog iets doen" werkt altijd. 🚪',
  'Het lijkt erop dat je jezelf moed probeert in te praten. Je haalt het einde van de dag. 💪',
  'Het lijkt erop dat je aan het weekend denkt. Zal ik daar alvast een reminder voor zetten? 🎉',
  'Het lijkt erop dat je een taak voor je uit schuift. Morgen-jij lost dit wel op. 📤',
  'Het lijkt erop dat je een goedkeuring probeert te versnellen. Zal ik gewoon "LGTM" typen? ✅',
  'Het lijkt erop dat je een reply-all probeert te vermijden. Verstandige keuze. 📨',
  'Het lijkt erop dat je je scherm probeert te vergrendelen zonder dat iemand het merkt. 🔒',
  'Het lijkt erop dat je een tweede kop koffie overweegt. Ik zeg: doen. ☕☕',
  'Het lijkt erop dat je hoopt dat de dag sneller voorbijgaat als je ernaar staart. 🕐',
  'Het lijkt erop dat je een vergadering probeert te verzetten naar "volgende week". 📅',
  'Het lijkt erop dat je stiekem aan het snacken bent onder je bureau. Geen oordeel hier. 🍪',
  'Het lijkt erop dat je een status update probeert te schrijven zonder iets te zeggen. 📝',
  'Het lijkt erop dat je jezelf afvraagt of dit al vrijdagmiddag is. Bijna! 🗓️',
  'Het lijkt erop dat je een deadline probeert te negeren tot morgen. Begrijpelijk. 🙈',
  'Het lijkt erop dat je een collega probeert te ontwijken bij het koffiezetapparaat. ☕🚶',
  'Het lijkt erop dat je aan het aftellen bent in plaats van te werken. Ik ook. 📎',
  'Het lijkt erop dat je een out-of-office probeert voor te bereiden. Zal ik "geniet van je afwezigheid" schrijven? 🏖️',
  'Het lijkt erop dat je een laatste taak probeert af te vinken voor het weekend. 📋',
  'Het lijkt erop dat je jezelf ervan probeert te overtuigen nog één ding te doen. Niet doen. 🛑',
  'Het lijkt erop dat je aan het dagdromen bent over de bank thuis. Begrijpelijk. 🛋️',
  'Het lijkt erop dat je een reminder probeert te snoozen. Nog een keertje dan. ⏰',
  'Het lijkt erop dat je een tab probeert te verstoppen voor je manager. Ik zie niks. 🙈',
  'Het lijkt erop dat je een moeilijk gesprek probeert uit te stellen tot maandag. 🗣️',
  'Het lijkt erop dat je een laatste commit probeert te pushen voor het weekend. Succes! 🚀',
  'Het lijkt erop dat je twijfelt of je nog aan iets nieuws begint. Doe het niet. ⛔',
  'Het lijkt erop dat je stiekem al je jas hebt gepakt. Wachten tot niemand kijkt? 🧥',
  'Het lijkt erop dat je een agenda-uitnodiging probeert te weigeren zonder onbeleefd te lijken. 📆',
  'Het lijkt erop dat je hoopt dat deze pagina de tijd sneller laat gaan. Sorry, nog niet. 😅',
  'Het lijkt erop dat je een goede smoes zoekt om vroeger te vertrekken. Tandarts werkt altijd. 🦷',
  'Het lijkt erop dat je een to-do lijst aan het maken bent voor volgende week. Rustig aan. 📓',
  'Het lijkt erop dat je één oog op de klok en één op je scherm hebt. Efficiënt! 👁️👁️',
  'Het lijkt erop dat je bijna klaar bent voor vandaag. Zal ik alvast de deur openhouden? 🚪',
]

const ROTATE_INTERVAL_MS = 6000

export function Clippy() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * CLIPPY_LINES.length))

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
