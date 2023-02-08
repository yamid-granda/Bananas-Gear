export const generateIdFromDate = (date: Date): string => {
  const timestamp = date.getTime()
  const base36Timestamp = timestamp.toString(36)
  const id
    = base36Timestamp
    + Math.random().toString(36).slice(-4)
    + Math.random().toString(36).slice(-4)
    + Math.random().toString(36).slice(-4)
  return id
}
