const HOURS_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60

export const ONE_DAY_IN_SECONDS = 86400

export function parseSecondsToDays(seconds: number): number {
  return seconds / HOURS_IN_DAY / MINUTES_IN_HOUR / SECONDS_IN_MINUTE
}
