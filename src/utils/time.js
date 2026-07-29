const AMSTERDAM_TIME_ZONE = 'Europe/Amsterdam'

/**
 * Converts a wall-clock date/time in Europe/Amsterdam to an absolute UTC Date.
 * DST-safe: works whether the given moment falls in CET (+1) or CEST (+2).
 */
export function amsterdamToUtcDate(year, month, day, hour, minute) {
  const guessUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0)

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: AMSTERDAM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const parts = {}
  for (const { type, value } of formatter.formatToParts(new Date(guessUtcMs))) {
    parts[type] = value
  }

  const shownAsUtcMs = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    parts.hour === '24' ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )

  return new Date(2 * guessUtcMs - shownAsUtcMs)
}

// The working day: 08:30-17:00 Amsterdam time, minus the 12:00-12:30 lunch
// break, Monday through Friday. Outside these windows no working time passes,
// so the countdown pauses through evenings, nights, weekends and lunch.
const WORK_START = { hour: 6, minute: 30 }
const LUNCH_START = { hour: 12, minute: 0 }
const LUNCH_END = { hour: 12, minute: 30 }
const WORK_END = { hour: 17, minute: 0 }

function getAmsterdamDateParts(date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: AMSTERDAM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  })

  const parts = {}
  for (const { type, value } of formatter.formatToParts(date)) {
    parts[type] = value
  }

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    isWeekend: parts.weekday === 'Sat' || parts.weekday === 'Sun',
  }
}

function nextAmsterdamCalendarDay(dayParts) {
  // Anchor at noon (not midnight) so this stays unambiguous across DST
  // transitions, then re-derive the calendar date 24h later.
  const noon = amsterdamToUtcDate(dayParts.year, dayParts.month, dayParts.day, 12, 0)
  return getAmsterdamDateParts(new Date(noon.getTime() + 24 * 60 * 60 * 1000))
}

function overlapMs(rangeStart, rangeEnd, otherStart, otherEnd) {
  return Math.max(0, Math.min(rangeEnd, otherEnd) - Math.max(rangeStart, otherStart))
}

// Total working milliseconds between `now` and `targetDate` — only time
// inside Mon-Fri 08:30-17:00 (minus the 12:00-12:30 lunch) counts.
export function computeWorkingRemaining(targetDate, now = Date.now()) {
  const from = now
  const to = targetDate.getTime()
  let totalMs = 0

  if (from < to) {
    let dayParts = getAmsterdamDateParts(new Date(from))

    // Safety cap so a far-future test date can't loop forever.
    for (let i = 0; i < 3650; i += 1) {
      const morningStart = amsterdamToUtcDate(
        dayParts.year, dayParts.month, dayParts.day, WORK_START.hour, WORK_START.minute,
      ).getTime()
      if (morningStart >= to) break

      const lunchStart = amsterdamToUtcDate(
        dayParts.year, dayParts.month, dayParts.day, LUNCH_START.hour, LUNCH_START.minute,
      ).getTime()
      const lunchEnd = amsterdamToUtcDate(
        dayParts.year, dayParts.month, dayParts.day, LUNCH_END.hour, LUNCH_END.minute,
      ).getTime()
      const workEnd = amsterdamToUtcDate(
        dayParts.year, dayParts.month, dayParts.day, WORK_END.hour, WORK_END.minute,
      ).getTime()

      if (!dayParts.isWeekend) {
        totalMs += overlapMs(morningStart, lunchStart, from, to)
        totalMs += overlapMs(lunchEnd, workEnd, from, to)
      }

      dayParts = nextAmsterdamCalendarDay(dayParts)
    }
  }

  const isFinished = to - from <= 0

  return {
    totalMs,
    hours: Math.floor(totalMs / 3_600_000),
    minutes: Math.floor((totalMs % 3_600_000) / 60_000),
    seconds: Math.floor((totalMs % 60_000) / 1000),
    isFinished,
  }
}

export function pluralize(value, singular, plural) {
  return value === 1 ? singular : plural
}
