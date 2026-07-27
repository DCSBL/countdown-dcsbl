import { amsterdamToUtcDate } from './utils/time'

// The one thing to change to test this app: bring this closer to "now" to
// preview the escalation stages and the final celebration.
export const TARGET_DATE = amsterdamToUtcDate(2026, 7, 31, 17, 0)

// Stage thresholds are all relative to TARGET_DATE, not to the wall clock —
// moving TARGET_DATE automatically shifts when each stage kicks in.
export const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000
export const FOUR_HOURS_MS = 4 * 60 * 60 * 1000
export const ONE_HOUR_MS = 60 * 60 * 1000
export const FIFTEEN_MIN_MS = 15 * 60 * 1000
export const FIVE_MIN_MS = 5 * 60 * 1000
