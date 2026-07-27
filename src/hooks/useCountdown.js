import { useEffect, useState } from 'react'
import { computeWorkingRemaining } from '../utils/time'
import {
  EIGHT_HOURS_MS,
  FOUR_HOURS_MS,
  ONE_HOUR_MS,
  FIFTEEN_MIN_MS,
} from '../config'

function getStage(totalMs) {
  if (totalMs <= 0) return 'done'
  if (totalMs <= FIFTEEN_MIN_MS) return 'chaos'
  if (totalMs <= ONE_HOUR_MS) return 'frantic'
  if (totalMs <= FOUR_HOURS_MS) return 'building'
  if (totalMs <= EIGHT_HOURS_MS) return 'mild'
  return 'calm'
}

function getIntensity(totalMs) {
  if (totalMs <= 0) return 1
  if (totalMs >= EIGHT_HOURS_MS) return 0
  return 1 - totalMs / EIGHT_HOURS_MS
}

export function useCountdown(targetDate) {
  const [remaining, setRemaining] = useState(() => computeWorkingRemaining(targetDate))

  useEffect(() => {
    const tick = () => setRemaining(computeWorkingRemaining(targetDate))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return {
    ...remaining,
    stage: getStage(remaining.totalMs),
    intensity: getIntensity(remaining.totalMs),
  }
}
