import { useCountdown } from './hooks/useCountdown'
import { TARGET_DATE } from './config'
import { CountdownBox } from './components/CountdownBox'
import { ChaosOverlay } from './components/ChaosOverlay'
import './App.css'

function App() {
  const { hours, minutes, seconds, stage, intensity } = useCountdown(TARGET_DATE)

  return (
    <div className="page">
      <ChaosOverlay stage={stage} intensity={intensity} />
      <CountdownBox
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        stage={stage}
        intensity={intensity}
      />
    </div>
  )
}

export default App
