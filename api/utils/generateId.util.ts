import { generateIdFromDate } from './generateIdFromDate.util'

export const generateId = (): string => {
  const id = generateIdFromDate(new Date())
  return id
}
